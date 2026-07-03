import type { LocaleCode } from "@/lib/locales";
import type { CookieConsentContent } from "./types";

const byLocale: Record<LocaleCode, CookieConsentContent> = {
  es: {
    message: "Usamos cookies para analizar el uso del sitio.",
    privacyLink: "Más info",
    customize: "Personalizar",
    acceptAll: "Aceptar",
    expandedTitle: "Elige qué cookies permites",
    essentialLabel: "Esenciales",
    essentialDescription: "Necesarias para el funcionamiento básico del sitio.",
    essentialBadge: "Siempre activo",
    analyticsLabel: "Analítica de uso",
    analyticsDescription: "Nos ayuda a entender cómo se usa este sitio.",
    back: "Volver",
    savePreferences: "Guardar preferencias",
  },
  en: {
    message: "We use cookies to analyze site usage.",
    privacyLink: "More info",
    customize: "Customize",
    acceptAll: "Accept",
    expandedTitle: "Choose which cookies you allow",
    essentialLabel: "Essential",
    essentialDescription: "Necessary for the site's basic functionality.",
    essentialBadge: "Always active",
    analyticsLabel: "Usage analytics",
    analyticsDescription: "Helps us understand how this site is used.",
    back: "Back",
    savePreferences: "Save preferences",
  },
  pt: {
    message: "Usamos cookies para analisar o uso do site.",
    privacyLink: "Mais informações",
    customize: "Personalizar",
    acceptAll: "Aceitar",
    expandedTitle: "Escolha quais cookies permite",
    essentialLabel: "Essenciais",
    essentialDescription: "Necessários para o funcionamento básico do site.",
    essentialBadge: "Sempre ativo",
    analyticsLabel: "Análise de uso",
    analyticsDescription: "Nos ajuda a entender como este site é usado.",
    back: "Voltar",
    savePreferences: "Salvar preferências",
  },
  fr: {
    message: "Nous utilisons des cookies pour analyser l'utilisation du site.",
    privacyLink: "Plus d'infos",
    customize: "Personnaliser",
    acceptAll: "Accepter",
    expandedTitle: "Choisissez les cookies que vous autorisez",
    essentialLabel: "Essentiels",
    essentialDescription: "Nécessaires au fonctionnement de base du site.",
    essentialBadge: "Toujours actif",
    analyticsLabel: "Analyse d'utilisation",
    analyticsDescription: "Nous aide à comprendre comment ce site est utilisé.",
    back: "Retour",
    savePreferences: "Enregistrer les préférences",
  },
};

export function getCookieConsentContent(locale: LocaleCode): CookieConsentContent {
  return byLocale[locale] ?? byLocale.es;
}
