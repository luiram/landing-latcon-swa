import type { Metadata } from "next";
import "../globals.css";
import { RootShell } from "@/components/layout/RootShell";
import { buildBaseMetadata } from "@/lib/seo";
import { nunito } from "@/lib/fonts";
import type { LocaleCode } from "@/lib/locales";

/** Nunca "en" — el inglés vive sin prefijo en el grupo (en). Ver src/lib/localePaths.ts. */
export function generateStaticParams() {
  return [{ locale: "es" }, { locale: "fr" }, { locale: "pt" }];
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildBaseMetadata(locale as LocaleCode);
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as LocaleCode;
  return (
    <html lang={locale}>
      <body className={`${nunito.variable} min-h-screen bg-bg-warm text-text-primary`}>
        <RootShell locale={locale}>{children}</RootShell>
      </body>
    </html>
  );
}
