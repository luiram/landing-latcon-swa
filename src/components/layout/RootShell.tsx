import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { CookieConsentBanner } from "@/components/analytics/CookieConsentBanner";
import { buildOrganizationJsonLd } from "@/lib/seo";
import type { LocaleCode } from "@/lib/locales";

/** Cuerpo compartido de los dos root layouts ((en) y [locale]): JSON-LD, analytics, banner de cookies. */
export function RootShell({ locale, children }: { locale: LocaleCode; children: React.ReactNode }) {
  const jsonLd = buildOrganizationJsonLd(locale);

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GoogleAnalytics />
      {children}
      <CookieConsentBanner locale={locale} />
    </>
  );
}
