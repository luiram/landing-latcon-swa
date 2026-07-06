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

const SITE_URL = "https://latconservices.com";
const AGENDA_URL = `${SITE_URL}/agenda`;
const PRIVACY_URL = `${SITE_URL}/privacidad`;
const LOGO_URL = `${SITE_URL}/logo/logo_1_primary_horizontal_email.png`;
const PHONE_DISPLAY = "+57 318 397 1073";
const PHONE_WA_URL = "https://wa.me/573183971073";

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

const helloText: Record<LocaleCode, string> = {
  es: "Hola",
  en: "Hello",
  pt: "Olá",
  fr: "Bonjour",
};

const leadText: Record<LocaleCode, string> = {
  es: "Tu reunión con <strong>Latcon</strong> quedó agendada.",
  en: "Your meeting with <strong>Latcon</strong> has been scheduled.",
  pt: "Sua reunião com a <strong>Latcon</strong> foi agendada.",
  fr: "Votre rendez-vous avec <strong>Latcon</strong> est confirmé.",
};

const thanksText: Record<LocaleCode, string> = {
  es: "Gracias por tu interés.",
  en: "Thank you.",
  pt: "Obrigado.",
  fr: "Merci.",
};

const companyLabel: Record<LocaleCode, string> = {
  es: "Empresa",
  en: "Company",
  pt: "Empresa",
  fr: "Entreprise",
};

const dateLabel: Record<LocaleCode, string> = {
  es: "Fecha y hora",
  en: "Date and time",
  pt: "Data e hora",
  fr: "Date et heure",
};

const taglineText: Record<LocaleCode, string> = {
  es: "Conectamos tu operación, tus datos y tu tecnología.",
  en: "We connect your operations, your data, and your technology.",
  pt: "Conectamos sua operação, seus dados e sua tecnologia.",
  fr: "Nous connectons votre opération, vos données et votre technologie.",
};

const phoneLabelText: Record<LocaleCode, string> = {
  es: "Tel / WhatsApp",
  en: "Phone / WhatsApp",
  pt: "Tel / WhatsApp",
  fr: "Tél / WhatsApp",
};

const ctaLabelText: Record<LocaleCode, string> = {
  es: "Agenda una reunión",
  en: "Book a meeting",
  pt: "Agende uma reunião",
  fr: "Planifiez un rendez-vous",
};

const privacyLabelText: Record<LocaleCode, string> = {
  es: "Privacidad",
  en: "Privacy",
  pt: "Privacidade",
  fr: "Confidentialité",
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function detailRow(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:6px 14px 6px 0; color:#6b7280; font-size:13px; white-space:nowrap; vertical-align:top;">${label}</td>
      <td style="padding:6px 0; color:#1f2937; font-size:14px; font-weight:600;">${value}</td>
    </tr>`;
}

function emailShell(opts: { locale: LocaleCode; bodyHtml: string; showCta: boolean }): string {
  const { locale, bodyHtml, showCta } = opts;
  const tagline = taglineText[locale] ?? taglineText.es;
  const phoneLabel = phoneLabelText[locale] ?? phoneLabelText.es;
  const ctaLabel = ctaLabelText[locale] ?? ctaLabelText.es;
  const privacyLabel = privacyLabelText[locale] ?? privacyLabelText.es;

  return `<!doctype html>
<html lang="${locale}">
  <body style="margin:0; padding:0; background-color:#f4f1ee; font-family: Arial, Helvetica, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f1ee; padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px; width:100%; background-color:#ffffff; border-radius:12px; border:1px solid #e5e0da;">
            <tr>
              <td style="padding:28px 32px 20px 32px; text-align:center;">
                <img src="${LOGO_URL}" width="160" alt="Latcon Services" style="display:block; margin:0 auto 8px auto; border:0;" />
                <p style="margin:0; font-size:12px; color:#8a8f98;">${escapeHtml(tagline)}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px;">
                <hr style="border:none; border-top:1px solid #f0ece6; margin:0;" />
              </td>
            </tr>
            <tr>
              <td style="padding:28px 32px;">
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px;">
                <hr style="border:none; border-top:1px solid #f0ece6; margin:0;" />
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px 28px 32px;">
                <p style="margin:0 0 4px 0; font-size:13px; color:#1f2937; font-weight:700;">Latcon Services</p>
                <p style="margin:0 0 ${showCta ? "14" : "0"}px 0; font-size:13px; color:#6b7280; line-height:1.6;">
                  ${phoneLabel}: <a href="${PHONE_WA_URL}" style="color:#f58220; text-decoration:none;">${PHONE_DISPLAY}</a><br />
                  <a href="${SITE_URL}" style="color:#f58220; text-decoration:none;">latconservices.com</a>
                </p>
                ${
                  showCta
                    ? `<p style="margin:0;">
                  <a href="${AGENDA_URL}" style="color:#ffffff; background-color:#f58220; text-decoration:none; font-weight:700; font-size:13px; padding:10px 18px; border-radius:6px; display:inline-block;">${ctaLabel}</a>
                </p>`
                    : ""
                }
                <p style="margin:16px 0 0 0; font-size:11px; color:#a3a8b0;">
                  <a href="${PRIVACY_URL}" style="color:#a3a8b0; text-decoration:underline;">${privacyLabel}</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function userHtml(p: BookingEmailPayload): string {
  const when = formatSlotColombia(p.slotStartUtc, p.locale);
  const tz = tzLine[p.locale] ?? tzLine.es;
  const hello = helloText[p.locale] ?? helloText.es;
  const lead = leadText[p.locale] ?? leadText.es;
  const thanks = thanksText[p.locale] ?? thanksText.es;

  const body = `
    <p style="margin:0 0 12px 0; font-size:15px; color:#1f2937;">${hello} ${escapeHtml(p.contactName)},</p>
    <p style="margin:0 0 20px 0; font-size:15px; color:#1f2937; line-height:1.5;">${lead}</p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%; margin-bottom:18px;">
      ${detailRow(companyLabel[p.locale] ?? companyLabel.es, escapeHtml(p.companyName))}
      ${detailRow(dateLabel[p.locale] ?? dateLabel.es, escapeHtml(when))}
    </table>
    <p style="margin:0 0 16px 0; font-size:12px; color:#9ca3af;">${escapeHtml(tz)}</p>
    <p style="margin:0; font-size:15px; color:#1f2937;">${thanks}</p>
  `;

  return emailShell({ locale: p.locale, bodyHtml: body, showCta: false });
}

function userPlain(p: BookingEmailPayload): string {
  const when = formatSlotColombia(p.slotStartUtc, p.locale);
  return [
    `${p.contactName} — ${p.companyName} — ${when}`,
    tzLine[p.locale] ?? tzLine.es,
    "",
    "Latcon Services",
    `${phoneLabelText[p.locale] ?? phoneLabelText.es}: ${PHONE_DISPLAY}`,
    SITE_URL,
    AGENDA_URL,
  ].join("\n");
}

function internalSubject(): string {
  return "[Latcon agenda] Nueva reserva";
}

function internalHtml(p: BookingEmailPayload): string {
  const slotUtc = `${p.slotStartUtc.toISOString()} – ${p.slotEndUtc.toISOString()} (UTC)`;
  const whenCo = formatSlotColombia(p.slotStartUtc, "es");

  const body = `
    <p style="margin:0 0 16px 0; font-size:16px; color:#1f2937; font-weight:700;">Nueva reserva</p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;">
      ${detailRow("Contacto", escapeHtml(p.contactName))}
      ${detailRow("Empresa", escapeHtml(p.companyName))}
      ${detailRow("Sector", escapeHtml(p.sector))}
      ${detailRow("Ciudad / país", escapeHtml(p.cityCountry))}
      ${detailRow("Necesidad principal", escapeHtml(p.primaryNeed))}
      ${detailRow("Comentario", escapeHtml(p.freeText ?? "—"))}
      ${detailRow("Correo contacto", escapeHtml(p.userEmail))}
      ${detailRow("Slot (UTC)", escapeHtml(slotUtc))}
      ${detailRow("Slot (CO)", escapeHtml(whenCo))}
    </table>
  `;

  return emailShell({ locale: "es", bodyHtml: body, showCta: false });
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
