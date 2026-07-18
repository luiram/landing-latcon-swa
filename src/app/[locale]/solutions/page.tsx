import type { Metadata } from "next";
import { SolutionsPageBody } from "@/components/pages/SolutionsPageBody";
import { getSolutionsPageContent } from "@/config/landing";
import { absoluteUrl, buildAlternates, pathFor } from "@/lib/seo";
import type { LocaleCode } from "@/lib/locales";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as LocaleCode;
  const content = getSolutionsPageContent(locale);
  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: buildAlternates("solutions", locale),
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      url: absoluteUrl(pathFor("solutions", locale)),
      type: "website",
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <SolutionsPageBody locale={locale as LocaleCode} />;
}
