const PERSONAL_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "hotmail.com",
  "hotmail.es",
  "hotmail.com.co",
  "hotmail.com.mx",
  "outlook.com",
  "outlook.es",
  "live.com",
  "yahoo.com",
  "yahoo.es",
  "yahoo.com.co",
  "yahoo.com.mx",
  "icloud.com",
  "me.com",
  "aol.com",
  "protonmail.com",
  "gmx.com",
  "mail.com",
]);

/** Detección informativa (no bloqueante) de correos de proveedores personales gratuitos. */
export function isPersonalEmailDomain(email: string): boolean {
  const parts = email.trim().toLowerCase().split("@");
  if (parts.length !== 2) return false;
  return PERSONAL_EMAIL_DOMAINS.has(parts[1]!);
}
