import type { Metadata } from "next";
import "./globals.css";
import { getSiteContent } from "@/config/landing";
import { LocaleDocument } from "@/components/layout/LocaleDocument";
import { LocaleProvider } from "@/context/LocaleProvider";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { CookieConsentBanner } from "@/components/analytics/CookieConsentBanner";
import { Instrumentacion } from "@/components/analytics/Instrumentacion";
import { EMPRESA } from "@/config/sitio/empresa";
import { SITIO } from "@/lib/metadatos";

const defaultSite = getSiteContent("es");

export const metadata: Metadata = {
  metadataBase: new URL("https://latconservices.com"),
  title: defaultSite.metadataTitle,
  description: defaultSite.metadataDescription,
  openGraph: {
    title: defaultSite.metadataTitle,
    description: defaultSite.metadataDescription,
    url: "https://latconservices.com",
    siteName: defaultSite.brand,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    locale: "es_CO",
    type: "website",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: EMPRESA.marca,
  legalName: EMPRESA.razonSocial,
  taxID: EMPRESA.nit.replace(/^NIT\s*/, ""),
  url: SITIO,
  logo: `${SITIO}${EMPRESA.logo}`,
  description: defaultSite.metadataDescription,
  email: EMPRESA.correo,
  telephone: EMPRESA.telefono,
  address: {
    "@type": "PostalAddress",
    streetAddress: EMPRESA.direccionPostal.calle,
    addressLocality: EMPRESA.direccionPostal.ciudad,
    addressRegion: EMPRESA.direccionPostal.region,
    addressCountry: EMPRESA.direccionPostal.pais,
  },
  areaServed: "CO",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-bg-warm text-text-primary">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <GoogleAnalytics />
        <Instrumentacion />
        <LocaleProvider>
          <LocaleDocument />
          {children}
          <CookieConsentBanner />
        </LocaleProvider>
      </body>
    </html>
  );
}
