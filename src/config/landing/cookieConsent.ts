import type { LocaleCode } from "@/lib/locales";
import type { CookieConsentContent } from "./types";

const byLocale: Record<LocaleCode, CookieConsentContent> = {
  es: {
    message: "Usamos cookies de análisis para entender cómo se usa el sitio. Puedes aceptarlas o rechazarlas.",
    accept: "Aceptar",
    reject: "Rechazar",
    privacyLink: "Más info",
  },
  en: {
    message: "We use analytics cookies to understand how the site is used. You can accept or reject them.",
    accept: "Accept",
    reject: "Reject",
    privacyLink: "More info",
  },
  pt: {
    message: "Usamos cookies de análise para entender como o site é usado. Você pode aceitar ou rejeitar.",
    accept: "Aceitar",
    reject: "Rejeitar",
    privacyLink: "Mais informações",
  },
  fr: {
    message:
      "Nous utilisons des cookies d'analyse pour comprendre l'utilisation du site. Vous pouvez les accepter ou les refuser.",
    accept: "Accepter",
    reject: "Refuser",
    privacyLink: "Plus d'infos",
  },
};

export function getCookieConsentContent(locale: LocaleCode): CookieConsentContent {
  return byLocale[locale] ?? byLocale.es;
}
