import { EmailClient } from "@azure/communication-email";
import type { LocaleCode } from "./types";

export type BookingEmailPayload = {
  locale: LocaleCode;
  contactName: string;
  companyName: string;
  sector: string;
  cityCountry: string;
  primaryNeed: string;
  freeText: string | null;
  slotStartUtc: Date;
  slotEndUtc: Date;
  userEmail: string;
};

const intlLocale: Record<LocaleCode, string> = {
  es: "es-CO",
  en: "en-CO",
  pt: "pt-BR",
  fr: "fr-FR",
};

function formatSlotColombia(isoStart: Date, locale: LocaleCode): string {
  return new Intl.DateTimeFormat(intlLocale[locale], {
    timeZone: "America/Bogota",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(isoStart);
}

const userSubject: Record<LocaleCode, string> = {
  es: "Confirmación: reunión agendada con Latcon",
  en: "Confirmation: your meeting with Latcon is scheduled",
  pt: "Confirmação: reunião agendada com a Latcon",
  fr: "Confirmation : votre rendez-vous avec Latcon est planifié",
};

const tzLine: Record<LocaleCode, string> = {
  es: "La hora indicada corresponde a Colombia (America/Bogotá).",
  en: "The time shown is Colombia (America/Bogota).",
  pt: "O horário indicado corresponde à Colômbia (América/Bogotá).",
  fr: "L'heure indiquée correspond à la Colombie (America/Bogota).",
};

function userHtml(p: BookingEmailPayload): string {
  const when = formatSlotColombia(p.slotStartUtc, p.locale);
  const subj = userSubject[p.locale] ?? userSubject.es;
  const tz = tzLine[p.locale] ?? tzLine.es;
  const hello =
    p.locale === "en"
      ? "Hello"
      : p.locale === "pt"
        ? "Olá"
        : p.locale === "fr"
          ? "Bonjour"
          : "Hola";
  const lead =
    p.locale === "en"
      ? "Your meeting with <strong>Latcon</strong> has been scheduled."
      : p.locale === "pt"
        ? "Sua reunião com a <strong>Latcon</strong> foi agendada."
        : p.locale === "fr"
          ? "Votre rendez-vous avec <strong>Latcon</strong> est confirmé."
          : "Tu reunión con <strong>Latcon</strong> quedó agendada.";
  const thanks =
    p.locale === "en"
      ? "Thank you."
      : p.locale === "pt"
        ? "Obrigado."
        : p.locale === "fr"
          ? "Merci."
          : "Gracias por tu interés.";
  return `
  <p>${hello} ${escapeHtml(p.contactName)},</p>
  <p>${lead}</p>
  <ul>
    <li><strong>${p.locale === "en" ? "Company" : p.locale === "pt" ? "Empresa" : p.locale === "fr" ? "Entreprise" : "Empresa"}:</strong> ${escapeHtml(p.companyName)}</li>
    <li><strong>${p.locale === "en" ? "Date and time" : p.locale === "pt" ? "Data e hora" : p.locale === "fr" ? "Date et heure" : "Fecha y hora"}:</strong> ${escapeHtml(when)}</li>
    <li>${escapeHtml(tz)}</li>
  </ul>
  <p>${thanks}</p>
  <p>— Latcon</p>
  `;
}

function userPlain(p: BookingEmailPayload): string {
  const when = formatSlotColombia(p.slotStartUtc, p.locale);
  return `${p.contactName} — ${p.companyName} — ${when}\n${tzLine[p.locale] ?? tzLine.es}`;
}

function internalSubject(): string {
  return "[Latcon agenda] Nueva reserva";
}

function internalHtml(p: BookingEmailPayload): string {
  const slotUtc = `${p.slotStartUtc.toISOString()} – ${p.slotEndUtc.toISOString()} (UTC)`;
  const whenCo = formatSlotColombia(p.slotStartUtc, "es");
  return `
  <h2>Nueva reserva</h2>
  <ul>
    <li><strong>Contacto:</strong> ${escapeHtml(p.contactName)}</li>
    <li><strong>Empresa:</strong> ${escapeHtml(p.companyName)}</li>
    <li><strong>Sector:</strong> ${escapeHtml(p.sector)}</li>
    <li><strong>Ciudad / país:</strong> ${escapeHtml(p.cityCountry)}</li>
    <li><strong>Necesidad principal:</strong> ${escapeHtml(p.primaryNeed)}</li>
    <li><strong>Comentario:</strong> ${escapeHtml(p.freeText ?? "—")}</li>
    <li><strong>Correo contacto:</strong> ${escapeHtml(p.userEmail)}</li>
    <li><strong>Slot (UTC):</strong> ${escapeHtml(slotUtc)}</li>
    <li><strong>Slot (CO):</strong> ${escapeHtml(whenCo)}</li>
  </ul>
  `;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export type SendResult = { ok: boolean; messageId?: string; error?: string };

export async function sendUserConfirmation(p: BookingEmailPayload): Promise<SendResult> {
  const conn = process.env.ACS_CONNECTION_STRING;
  const from = process.env.ACS_EMAIL_FROM;
  if (!conn || !from) {
    return { ok: false, error: "ACS_CONNECTION_STRING or ACS_EMAIL_FROM missing" };
  }
  try {
    const client = new EmailClient(conn);
    const poller = await client.beginSend({
      senderAddress: from,
      content: {
        subject: userSubject[p.locale] ?? userSubject.es,
        html: userHtml(p),
        plainText: userPlain(p),
      },
      recipients: { to: [{ address: p.userEmail }] },
    });
    const r = await poller.pollUntilDone();
    return { ok: true, messageId: r.id };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

export async function sendInternalNotification(p: BookingEmailPayload): Promise<SendResult> {
  const conn = process.env.ACS_CONNECTION_STRING;
  const from = process.env.ACS_EMAIL_FROM;
  const to = process.env.CONTACT_NOTIFICATION_TO;
  if (!conn || !from) {
    return { ok: false, error: "ACS_CONNECTION_STRING or ACS_EMAIL_FROM missing" };
  }
  if (!to) {
    return { ok: false, error: "CONTACT_NOTIFICATION_TO missing" };
  }
  try {
    const client = new EmailClient(conn);
    const poller = await client.beginSend({
      senderAddress: from,
      content: {
        subject: internalSubject(),
        html: internalHtml(p),
        plainText: `Nueva reserva: ${p.contactName} / ${p.companyName}`,
      },
      recipients: { to: [{ address: to }] },
    });
    const r = await poller.pollUntilDone();
    return { ok: true, messageId: r.id };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}
