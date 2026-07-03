import type { LocaleCode } from "@/lib/locales";
import type { CookieConsentContent } from "./types";

const byLocale: Record<LocaleCode, CookieConsentContent> = {
  es: {
    message: "Usamos cookies de análisis para entender cómo se usa el sitio. Puedes aceptarlas todas o quedarte solo con las esenciales.",
    accept: "Aceptar todo",
    reject: "Solo esencial",
    privacyLink: "Más info",
  },
  en: {
    message: "We use analytics cookies to understand how the site is used. You can accept all of them or keep only the essential ones.",
    accept: "Accept all",
    reject: "Essential only",
    privacyLink: "More info",
  },
  pt: {
    message: "Usamos cookies de análise para entender como o site é usado. Você pode aceitar todos ou manter apenas os essenciais.",
    accept: "Aceitar tudo",
    reject: "Somente essencial",
    privacyLink: "Mais informações",
  },
  fr: {
    message:
      "Nous utilisons des cookies d'analyse pour comprendre l'utilisation du site. Vous pouvez tous les accepter ou ne garder que les essentiels.",
    accept: "Tout accepter",
    reject: "Essentiels uniquement",
    privacyLink: "Plus d'infos",
  },
};

export function getCookieConsentContent(locale: LocaleCode): CookieConsentContent {
  return byLocale[locale] ?? byLocale.es;
}
