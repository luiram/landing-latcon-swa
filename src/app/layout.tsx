import type { Metadata } from "next";
import "./globals.css";
import { getSiteContent } from "@/config/landing";
import { LocaleDocument } from "@/components/layout/LocaleDocument";
import { LocaleProvider } from "@/context/LocaleProvider";

const defaultSite = getSiteContent("es");

export const metadata: Metadata = {
  metadataBase: new URL("https://latconservices.com"),
  title: defaultSite.metadataTitle,
  description: defaultSite.metadataDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-bg-warm text-text-primary">
        <LocaleProvider>
          <LocaleDocument />
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
