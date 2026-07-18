import { LOCALE_CODES, type LocaleCode } from "@/lib/locales";

/** Inglés vive sin prefijo en "/" (grupo de rutas `(en)`); el resto usa `/es`, `/fr`, `/pt` (`[locale]`). */
export const DEFAULT_LOCALE: LocaleCode = "en";

/** "/es/agenda" -> "/agenda"; "/es" -> "/"; "/agenda" -> "/agenda"; "/" -> "/" */
export function stripLocalePrefix(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  const [first, ...rest] = segments;
  if (first && first !== DEFAULT_LOCALE && (LOCALE_CODES as readonly string[]).includes(first)) {
    const bare = `/${rest.join("/")}`;
    return bare === "/" ? "/" : bare;
  }
  return pathname === "" ? "/" : pathname;
}

/** "/agenda" + "es" -> "/es/agenda"; "/agenda" + "en" -> "/agenda" (sin prefijo) */
export function withLocalePrefix(bare: string, locale: LocaleCode): string {
  const normalized = bare === "/" ? "" : bare;
  if (locale === DEFAULT_LOCALE) {
    return normalized === "" ? "/" : normalized;
  }
  return `/${locale}${normalized}`;
}

/** Dado el pathname actual y un locale destino, arma la URL de la misma página en ese idioma. */
export function switchLocalePath(pathname: string, target: LocaleCode): string {
  return withLocalePrefix(stripLocalePrefix(pathname), target);
}
