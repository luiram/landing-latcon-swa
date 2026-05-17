import { app, type HttpRequest, type HttpResponseInit, type InvocationContext } from "@azure/functions";
import { DateTime } from "luxon";
import { corsHeaders, jsonResponse } from "../lib/cors";
import { getSqlPool, sql } from "../lib/db";
import { sendInternalNotification, sendUserConfirmation, type BookingEmailPayload } from "../lib/email";
import {
  TZ,
  MEETING_MINUTES,
  appointmentBlockEnd,
  isBookingWeekday,
  nextBusinessDays,
  isSlotFree,
  type BusyInterval,
} from "../lib/slots";
import { isLocaleCode, type LocaleCode } from "../lib/types";

type Body = {
  idempotencyKey: string;
  locale: string;
  company: { name: string; sector: string; cityCountry: string };
  contact: { fullName: string; roleTitle?: string | null; email: string; phoneWhatsapp: string };
  need: { primary: string; comment?: string | null };
  slotStartUtc: string;
};

function isNonEmpty(s: unknown): s is string {
  return typeof s === "string" && s.trim().length > 0;
}

function isValidEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());
}

function isValidGridSlot(startUtc: DateTime): boolean {
  const b = startUtc.setZone(TZ);
  if (!isBookingWeekday(b)) return false;
  if (b.minute !== 0 && b.minute !== 30) return false;
  if (b.second !== 0 || b.millisecond !== 0) return false;
  if (b.hour < 8 || b.hour > 15) return false;
  if (b.hour === 15 && b.minute > 30) return false;
  const end = b.plus({ minutes: MEETING_MINUTES });
  const dayEnd = b.startOf("day").set({ hour: 16, minute: 0, second: 0, millisecond: 0 });
  if (end > dayEnd) return false;
  return true;
}

function slotDayInBusinessWindow(startUtc: DateTime): boolean {
  const now = DateTime.utc();
  const days = nextBusinessDays(now.setZone(TZ), 5);
  const d = startUtc.setZone(TZ).toISODate();
  return days.some((x) => x.toISODate() === d);
}

async function loadBusyForSlot(
  pool: import("mssql").ConnectionPool,
  rangeStart: DateTime,
  rangeEnd: DateTime,
): Promise<BusyInterval[]> {
  const busy: BusyInterval[] = [];
  const rs = await pool
    .request()
    .input("rangeStart", sql.DateTime2, rangeStart.toJSDate())
    .input("rangeEnd", sql.DateTime2, rangeEnd.toJSDate())
    .query(
      `SELECT slot_start_utc, slot_end_utc FROM dbo.appointments
       WHERE status = N'scheduled'
         AND slot_start_utc < @rangeEnd
         AND DATEADD(MINUTE, 15, slot_end_utc) > @rangeStart`,
    );
  for (const row of rs.recordset as { slot_start_utc: Date; slot_end_utc: Date }[]) {
    const s = DateTime.fromJSDate(row.slot_start_utc, { zone: "utc" });
    const e = DateTime.fromJSDate(row.slot_end_utc, { zone: "utc" });
    busy.push({ start: s, end: appointmentBlockEnd(e) });
  }
  const rb = await pool
    .request()
    .input("rangeStart", sql.DateTime2, rangeStart.toJSDate())
    .input("rangeEnd", sql.DateTime2, rangeEnd.toJSDate())
    .query(
      `SELECT block_start_utc, block_end_utc FROM dbo.manual_slot_blocks
       WHERE block_start_utc < @rangeEnd AND block_end_utc > @rangeStart`,
    );
  for (const row of rb.recordset as { block_start_utc: Date; block_end_utc: Date }[]) {
    busy.push({
      start: DateTime.fromJSDate(row.block_start_utc, { zone: "utc" }),
      end: DateTime.fromJSDate(row.block_end_utc, { zone: "utc" }),
    });
  }
  return busy;
}

async function logNotification(
  pool: import("mssql").ConnectionPool,
  appointmentId: string,
  channel: string,
  status: string,
  error: string | null,
  providerId: string | null,
): Promise<void> {
  await pool
    .request()
    .input("appointmentId", sql.UniqueIdentifier, appointmentId)
    .input("channel", sql.NVarChar(40), channel)
    .input("status", sql.NVarChar(40), status)
    .input("error", sql.NVarChar(2000), error)
    .input("providerId", sql.NVarChar(200), providerId)
    .query(
      `INSERT INTO dbo.notification_logs (appointment_id, channel, status, error, provider_message_id)
       VALUES (@appointmentId, @channel, @status, @error, @providerId)`,
    );
}

app.http("createAppointment", {
  methods: ["POST", "OPTIONS"],
  authLevel: "anonymous",
  route: "appointments",
  handler: async (request: HttpRequest, _context: InvocationContext): Promise<HttpResponseInit> => {
    const origin = request.headers.get("origin") ?? undefined;
    if (request.method === "OPTIONS") {
      return { status: 204, headers: corsHeaders(origin) };
    }

    const pool = await getSqlPool();
    if (!pool) {
      return jsonResponse(503, { code: "SQL_NOT_CONFIGURED" }, origin);
    }

    let body: Body;
    try {
      body = (await request.json()) as Body;
    } catch {
      return jsonResponse(400, { code: "INVALID_JSON" }, origin);
    }

    if (!isNonEmpty(body.idempotencyKey)) {
      return jsonResponse(400, { code: "VALIDATION", fields: ["idempotencyKey"] }, origin);
    }
    const locale: LocaleCode = isLocaleCode(body.locale) ? body.locale : "es";

    if (
      !isNonEmpty(body.company?.name) ||
      !isNonEmpty(body.company?.sector) ||
      !isNonEmpty(body.company?.cityCountry) ||
      !isNonEmpty(body.contact?.fullName) ||
      !isNonEmpty(body.contact?.email) ||
      !isValidEmail(body.contact.email) ||
      !isNonEmpty(body.contact?.phoneWhatsapp) ||
      !isNonEmpty(body.need?.primary) ||
      !isNonEmpty(body.slotStartUtc)
    ) {
      return jsonResponse(400, { code: "VALIDATION", message: "Missing or invalid required fields" }, origin);
    }

    const slotStart = DateTime.fromISO(body.slotStartUtc, { zone: "utc" });
    if (!slotStart.isValid || !isValidGridSlot(slotStart) || !slotDayInBusinessWindow(slotStart)) {
      return jsonResponse(400, { code: "INVALID_SLOT" }, origin);
    }
    const slotEnd = slotStart.plus({ minutes: MEETING_MINUTES });

    const existing = await pool
      .request()
      .input("ik", sql.NVarChar(80), body.idempotencyKey.trim())
      .query<{ id: string; slot_start_utc: Date }>(
        `SELECT CAST(id AS NVARCHAR(36)) AS id, slot_start_utc FROM dbo.appointments WHERE idempotency_key = @ik`,
      );
    if (existing.recordset.length > 0) {
      const row = existing.recordset[0]!;
      return jsonResponse(
        200,
        {
          appointmentId: row.id,
          slotStartUtc: DateTime.fromJSDate(row.slot_start_utc, { zone: "utc" }).toISO(),
          idempotentReplay: true,
          emailUser: "skipped",
          emailInternal: "skipped",
        },
        origin,
      );
    }

    const padStart = slotStart.minus({ hours: 1 });
    const padEnd = slotEnd.plus({ hours: 1 });
    let busy: BusyInterval[] = [];
    try {
      busy = await loadBusyForSlot(pool, padStart, padEnd);
    } catch (e) {
      return jsonResponse(500, { code: "SQL_ERROR", message: e instanceof Error ? e.message : String(e) }, origin);
    }
    if (!isSlotFree(slotStart, slotEnd, busy)) {
      return jsonResponse(409, { code: "SLOT_TAKEN" }, origin);
    }

    const transaction = new sql.Transaction(pool);
    let appointmentId: string;
    try {
      await transaction.begin();
      const rq = new sql.Request(transaction);
      rq.input("idemp", sql.NVarChar(80), body.idempotencyKey.trim());
      const dup = await rq.query(`SELECT CAST(id AS NVARCHAR(36)) AS id FROM dbo.appointments WHERE idempotency_key = @idemp`);
      if ((dup.recordset as { id: string }[]).length > 0) {
        await transaction.rollback();
        const id = (dup.recordset as { id: string }[])[0]!.id;
        return jsonResponse(200, { appointmentId: id, idempotentReplay: true }, origin);
      }

      const companyId = await insertCompany(transaction, body.company);
      const contactId = await insertContact(transaction, companyId, body.contact);
      const meetingId = await insertMeetingRequest(transaction, contactId, body.need, locale);
      appointmentId = await insertAppointment(
        transaction,
        meetingId,
        companyId,
        contactId,
        slotStart,
        slotEnd,
        body.idempotencyKey.trim(),
      );
      await transaction.commit();
    } catch (e: unknown) {
      try {
        await transaction.rollback();
      } catch {
        /* ignore */
      }
      const err = e as { number?: number; message?: string };
      if (err?.number === 2627 || (typeof err?.message === "string" && err.message.includes("UQ_appointments"))) {
        return jsonResponse(409, { code: "SLOT_TAKEN" }, origin);
      }
      return jsonResponse(500, { code: "SQL_ERROR", message: err?.message ?? String(e) }, origin);
    }

    const emailPayload: BookingEmailPayload = {
      locale,
      contactName: body.contact.fullName.trim(),
      companyName: body.company.name.trim(),
      sector: body.company.sector.trim(),
      cityCountry: body.company.cityCountry.trim(),
      primaryNeed: body.need.primary.trim(),
      freeText: body.need.comment?.trim() ?? null,
      slotStartUtc: slotStart.toJSDate(),
      slotEndUtc: slotEnd.toJSDate(),
      userEmail: body.contact.email.trim(),
    };

    const userSend = await sendUserConfirmation(emailPayload);
    await logNotification(
      pool,
      appointmentId,
      "email_user",
      userSend.ok ? "sent" : "failed",
      userSend.ok ? null : userSend.error ?? "error",
      userSend.messageId ?? null,
    );

    const internalSend = await sendInternalNotification(emailPayload);
    await logNotification(
      pool,
      appointmentId,
      "email_internal",
      internalSend.ok ? "sent" : "failed",
      internalSend.ok ? null : internalSend.error ?? "error",
      internalSend.messageId ?? null,
    );

    return jsonResponse(
      201,
      {
        appointmentId,
        slotStartUtc: slotStart.toISO(),
        slotEndUtc: slotEnd.toISO(),
        emailUser: userSend.ok ? "sent" : "failed",
        emailInternal: internalSend.ok ? "sent" : "failed",
      },
      origin,
    );
  },
});

async function insertCompany(
  tr: import("mssql").Transaction,
  c: Body["company"],
): Promise<string> {
  const r = await new sql.Request(tr)
    .input("name", sql.NVarChar(260), c.name.trim())
    .input("sector", sql.NVarChar(160), c.sector.trim())
    .input("city", sql.NVarChar(200), c.cityCountry.trim())
    .query(
      `INSERT INTO dbo.companies (name, sector, city_country)
       OUTPUT CAST(INSERTED.id AS NVARCHAR(36)) AS id
       VALUES (@name, @sector, @city)`,
    );
  return (r.recordset as { id: string }[])[0]!.id;
}

async function insertContact(
  tr: import("mssql").Transaction,
  companyId: string,
  c: Body["contact"],
): Promise<string> {
  const r = await new sql.Request(tr)
    .input("companyId", sql.UniqueIdentifier, companyId)
    .input("fullName", sql.NVarChar(200), c.fullName.trim())
    .input("role", sql.NVarChar(160), c.roleTitle?.trim() ?? null)
    .input("email", sql.NVarChar(320), c.email.trim())
    .input("phone", sql.NVarChar(80), c.phoneWhatsapp.trim())
    .query(
      `INSERT INTO dbo.contacts (company_id, full_name, role_title, email, phone_whatsapp)
       OUTPUT CAST(INSERTED.id AS NVARCHAR(36)) AS id
       VALUES (@companyId, @fullName, @role, @email, @phone)`,
    );
  return (r.recordset as { id: string }[])[0]!.id;
}

async function insertMeetingRequest(
  tr: import("mssql").Transaction,
  contactId: string,
  need: Body["need"],
  locale: LocaleCode,
): Promise<string> {
  const r = await new sql.Request(tr)
    .input("contactId", sql.UniqueIdentifier, contactId)
    .input("primary", sql.NVarChar(500), need.primary.trim())
    .input("free", sql.NVarChar(2000), need.comment?.trim() ?? null)
    .input("loc", sql.Char(2), locale)
    .query(
      `INSERT INTO dbo.meeting_requests (contact_id, primary_need, free_text, locale, status)
       OUTPUT CAST(INSERTED.id AS NVARCHAR(36)) AS id
       VALUES (@contactId, @primary, @free, @loc, N'scheduled')`,
    );
  return (r.recordset as { id: string }[])[0]!.id;
}

async function insertAppointment(
  tr: import("mssql").Transaction,
  meetingId: string,
  companyId: string,
  contactId: string,
  slotStart: DateTime,
  slotEnd: DateTime,
  idempotencyKey: string,
): Promise<string> {
  const r = await new sql.Request(tr)
    .input("mr", sql.UniqueIdentifier, meetingId)
    .input("co", sql.UniqueIdentifier, companyId)
    .input("ct", sql.UniqueIdentifier, contactId)
    .input("ss", sql.DateTime2, slotStart.toJSDate())
    .input("se", sql.DateTime2, slotEnd.toJSDate())
    .input("ik", sql.NVarChar(80), idempotencyKey)
    .query(
      `INSERT INTO dbo.appointments (meeting_request_id, company_id, contact_id, slot_start_utc, slot_end_utc, timezone_id, status, idempotency_key)
       OUTPUT CAST(INSERTED.id AS NVARCHAR(36)) AS id
       VALUES (@mr, @co, @ct, @ss, @se, N'America/Bogota', N'scheduled', @ik)`,
    );
  return (r.recordset as { id: string }[])[0]!.id;
}
