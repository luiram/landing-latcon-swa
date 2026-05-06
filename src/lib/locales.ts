export const LOCALE_CODES = ["es", "en", "pt", "fr"] as const;

export type LocaleCode = (typeof LOCALE_CODES)[number];

/** Metadatos por idioma; la bandera visible se renderiza con `LocaleFlag` (SVG), no con códigos. */
export type LocaleDefinition = {
  code: LocaleCode;
  label: string;
};

export const LOCALES: LocaleDefinition[] = [
  /** Español: bandera de Colombia en UI (LocaleFlag). */
  { code: "es", label: "Español" },
  /** English: bandera del Reino Unido en UI (LocaleFlag). */
  { code: "en", label: "English" },
  /** Português con bandera de Brasil en UI (LocaleFlag). */
  { code: "pt", label: "Português" },
  { code: "fr", label: "Français" },
];

export function isLocaleCode(value: string): value is LocaleCode {
  return (LOCALE_CODES as readonly string[]).includes(value);
}

export const LOCALE_STORAGE_KEY = "latcon-locale";
