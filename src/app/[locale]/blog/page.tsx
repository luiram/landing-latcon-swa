import type { Metadata } from "next";
import { BlogIndexPageBody } from "@/components/pages/BlogIndexPageBody";
import { getBlogIndexContent } from "@/config/blog";
import { absoluteUrl, buildAlternates, pathFor } from "@/lib/seo";
import type { LocaleCode } from "@/lib/locales";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as LocaleCode;
  const content = getBlogIndexContent(locale);
  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: buildAlternates("blog", locale),
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      url: absoluteUrl(pathFor("blog", locale)),
      type: "website",
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <BlogIndexPageBody locale={locale as LocaleCode} />;
}
