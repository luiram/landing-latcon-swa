import type { Metadata } from "next";
import { PrivacyPageBody } from "@/components/pages/PrivacyPageBody";
import { getPrivacyContent } from "@/config/landing";
import { absoluteUrl, buildAlternates, pathFor } from "@/lib/seo";
import type { LocaleCode } from "@/lib/locales";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as LocaleCode;
  const content = getPrivacyContent(locale);
  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: buildAlternates("privacy", locale),
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      url: absoluteUrl(pathFor("privacy", locale)),
      type: "website",
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <PrivacyPageBody locale={locale as LocaleCode} />;
}
