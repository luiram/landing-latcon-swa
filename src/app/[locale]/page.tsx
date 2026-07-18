import type { Metadata } from "next";
import { HomePageBody } from "@/components/pages/HomePageBody";
import { buildAlternates } from "@/lib/seo";
import type { LocaleCode } from "@/lib/locales";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return { alternates: buildAlternates("home", locale as LocaleCode) };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <HomePageBody locale={locale as LocaleCode} />;
}
