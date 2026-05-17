import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/config/site";
import { LocaleDocument } from "@/components/layout/LocaleDocument";
import { LocaleProvider } from "@/context/LocaleProvider";

export const metadata: Metadata = {
  title: `${site.brand} — ${site.descriptor}`,
  description:
    "Soluciones que integran operación, datos y tecnología. Automatización, analítica e IA aplicada con enfoque consultivo.",
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
