import type { LocaleCode } from "@/lib/locales";

export type SlotsDay = { date: string; slots: { startUtc: string; endUtc: string }[] };
export type SlotsResponse = { locale: string; timezone: string; days: SlotsDay[] };

const base = (): string => {
  const b = process.env.NEXT_PUBLIC_FUNCTIONS_BASE_URL;
  if (!b) return "";
  return b.replace(/\/$/, "");
};

// Fires once per page session to wake up the Azure Function before the user navigates to /agenda.
let _prefetchFired = false;
export function prefetchSlots(locale: LocaleCode): void {
  if (_prefetchFired) return;
  const root = base();
  if (!root) return;
  _prefetchFired = true;
  fetch(`${root}/api/slots?locale=${encodeURIComponent(locale)}`, { method: "GET" }).catch(() => undefined);
}

export async function fetchSlots(locale: LocaleCode): Promise<SlotsResponse> {
  const root = base();
  if (!root) {
    throw new Error("NEXT_PUBLIC_FUNCTIONS_BASE_URL is not configured");
  }
  const res = await fetch(`${root}/api/slots?locale=${encodeURIComponent(locale)}`, {
    method: "GET",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(t || `HTTP ${res.status}`);
  }
  return res.json() as Promise<SlotsResponse>;
}

export type CreateAppointmentBody = {
  idempotencyKey: string;
  locale: LocaleCode;
  company: { name: string; sector: string; cityCountry: string };
  contact: { fullName: string; roleTitle: string | null; email: string; phoneWhatsapp: string };
  need: { primary: string; comment: string | null };
  slotStartUtc: string;
};

export async function createAppointment(
  body: CreateAppointmentBody,
): Promise<{ ok: true; data: unknown } | { ok: false; status: number; body: unknown }> {
  const root = base();
  if (!root) {
    return { ok: false, status: 0, body: { message: "API not configured" } };
  }
  const res = await fetch(`${root}/api/appointments`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Idempotency-Key": body.idempotencyKey,
    },
    body: JSON.stringify(body),
  });
  const data = (await res.json().catch(() => ({}))) as unknown;
  if (!res.ok) {
    return { ok: false, status: res.status, body: data };
  }
  return { ok: true, data };
}
