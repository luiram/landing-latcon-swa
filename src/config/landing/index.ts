import type { LocaleCode } from "@/lib/locales";
import type { LandingContent } from "./types";
import { landingContentEs } from "./es";
import { landingContentEn } from "./en";
import { landingContentPt } from "./pt";
import { landingContentFr } from "./fr";

export type { LandingContent, SiteContent, PrivacyContent, CookieConsentContent } from "./types";
export { getSiteContent } from "./site";
export { getPrivacyContent } from "./privacy";
export { getCookieConsentContent } from "./cookieConsent";

const byLocale: Record<LocaleCode, LandingContent> = {
  es: landingContentEs,
  en: landingContentEn,
  pt: landingContentPt,
  fr: landingContentFr,
};

export function getLandingContent(locale: LocaleCode): LandingContent {
  return byLocale[locale] ?? landingContentEs;
}
