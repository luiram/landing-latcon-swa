export const LOCALES = ["es", "en", "pt", "fr"] as const;
export type LocaleCode = (typeof LOCALES)[number];

export function isLocaleCode(v: string): v is LocaleCode {
  return (LOCALES as readonly string[]).includes(v);
}
