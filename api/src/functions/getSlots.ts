import { app, type HttpRequest, type HttpResponseInit, type InvocationContext } from "@azure/functions";
import { DateTime } from "luxon";
import { corsHeaders, jsonResponse } from "../lib/cors";
import { getSqlPool, sql } from "../lib/db";
import {
  TZ,
  MEETING_MINUTES,
  appointmentBlockEnd,
  nextBusinessDays,
  slotStartsForDay,
  isSlotFree,
  type BusyInterval,
} from "../lib/slots";
import { isLocaleCode } from "../lib/types";

async function loadBusy(pool: import("mssql").ConnectionPool, rangeStart: DateTime, rangeEnd: DateTime): Promise<BusyInterval[]> {
  const busy: BusyInterval[] = [];
  const rs = await pool
    .request()
    .input("rangeStart", sql.DateTime2, rangeStart.toUTC().toJSDate())
    .input("rangeEnd", sql.DateTime2, rangeEnd.toUTC().toJSDate())
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
    .input("rangeStart", sql.DateTime2, rangeStart.toUTC().toJSDate())
    .input("rangeEnd", sql.DateTime2, rangeEnd.toUTC().toJSDate())
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

app.http("getSlots", {
  methods: ["GET", "OPTIONS"],
  authLevel: "anonymous",
  route: "slots",
  handler: async (request: HttpRequest, _context: InvocationContext): Promise<HttpResponseInit> => {
    const origin = request.headers.get("origin") ?? undefined;
    if (request.method === "OPTIONS") {
      return { status: 204, headers: corsHeaders(origin) };
    }

    const pool = await getSqlPool();
    if (!pool) {
      return jsonResponse(503, { code: "SQL_NOT_CONFIGURED", message: "SQL_CONNECTION_STRING is not set" }, origin);
    }

    const localeParam = request.query.get("locale") ?? "es";
    const locale = isLocaleCode(localeParam) ? localeParam : "es";

    const now = DateTime.utc().setZone(TZ);
    const days = nextBusinessDays(now, 5);
    if (days.length === 0) {
      return jsonResponse(200, { locale, days: [] }, origin);
    }

    const rangeStart = days[0].setZone(TZ).startOf("day").toUTC();
    const rangeEnd = days[days.length - 1]
      .setZone(TZ)
      .set({ hour: 23, minute: 59, second: 59 })
      .toUTC();

    let busy: BusyInterval[] = [];
    try {
      busy = await loadBusy(pool, rangeStart, rangeEnd);
    } catch (e) {
      return jsonResponse(
        500,
        { code: "SQL_ERROR", message: e instanceof Error ? e.message : String(e) },
        origin,
      );
    }

    const outDays: {
      date: string;
      slots: { startUtc: string; endUtc: string }[];
    }[] = [];

    const nowUtc = DateTime.utc();
    for (const d of days) {
      const starts = slotStartsForDay(d);
      const slots: { startUtc: string; endUtc: string }[] = [];
      for (const st of starts) {
        const startUtc = st.setZone(TZ).toUTC();
        const endUtc = startUtc.plus({ minutes: MEETING_MINUTES });
        if (startUtc <= nowUtc) continue;
        if (isSlotFree(startUtc, endUtc, busy)) {
          slots.push({ startUtc: startUtc.toISO()!, endUtc: endUtc.toISO()! });
        }
      }
      outDays.push({
        date: d.toISODate()!,
        slots,
      });
    }

    return jsonResponse(200, { locale, timezone: TZ, days: outDays }, origin);
  },
});
