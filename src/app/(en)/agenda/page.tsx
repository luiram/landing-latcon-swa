import type { Metadata } from "next";
import { AgendaPageBody } from "@/components/pages/AgendaPageBody";
import { AGENDA_METADATA, absoluteUrl, buildAlternates, pathFor } from "@/lib/seo";

const meta = AGENDA_METADATA.en;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: buildAlternates("agenda", "en"),
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: absoluteUrl(pathFor("agenda", "en")),
    type: "website",
  },
};

export default function Page() {
  return <AgendaPageBody locale="en" />;
}
