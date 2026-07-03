import type { Metadata } from "next";
import "./globals.css";
import { getSiteContent } from "@/config/landing";
import { LocaleDocument } from "@/components/layout/LocaleDocument";
import { LocaleProvider } from "@/context/LocaleProvider";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { CookieConsentBanner } from "@/components/analytics/CookieConsentBanner";

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
    images: [{ url: "/hero-background.webp", width: 2560, height: 1440 }],
    locale: "es_CO",
    type: "website",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Latcon",
  url: "https://latconservices.com",
  logo: "https://latconservices.com/logo/logo_1_primary_horizontal.svg",
  description: defaultSite.metadataDescription,
  email: "contacto@latconservices.com",
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
        <LocaleProvider>
          <LocaleDocument />
          {children}
          <CookieConsentBanner />
        </LocaleProvider>
      </body>
    </html>
  );
}
