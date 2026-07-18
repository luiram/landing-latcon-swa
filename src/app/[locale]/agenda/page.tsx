import type { Metadata } from "next";
import { AgendaPageBody } from "@/components/pages/AgendaPageBody";
import { AGENDA_METADATA, absoluteUrl, buildAlternates, pathFor } from "@/lib/seo";
import type { LocaleCode } from "@/lib/locales";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as LocaleCode;
  const meta = AGENDA_METADATA[locale];
  return {
    title: meta.title,
    description: meta.description,
    alternates: buildAlternates("agenda", locale),
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: absoluteUrl(pathFor("agenda", locale)),
      type: "website",
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <AgendaPageBody locale={locale as LocaleCode} />;
}
