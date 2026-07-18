import type { Metadata } from "next";
import { TermsPageBody } from "@/components/pages/TermsPageBody";
import { getTermsContent } from "@/config/landing";
import { absoluteUrl, buildAlternates, pathFor } from "@/lib/seo";
import type { LocaleCode } from "@/lib/locales";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as LocaleCode;
  const content = getTermsContent(locale);
  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: buildAlternates("terms", locale),
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      url: absoluteUrl(pathFor("terms", locale)),
      type: "website",
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <TermsPageBody locale={locale as LocaleCode} />;
}
