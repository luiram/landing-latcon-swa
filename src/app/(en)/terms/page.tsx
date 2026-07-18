import type { Metadata } from "next";
import { TermsPageBody } from "@/components/pages/TermsPageBody";
import { getTermsContent } from "@/config/landing";
import { absoluteUrl, buildAlternates, pathFor } from "@/lib/seo";

const content = getTermsContent("en");

export const metadata: Metadata = {
  title: content.metaTitle,
  description: content.metaDescription,
  alternates: buildAlternates("terms", "en"),
  openGraph: {
    title: content.metaTitle,
    description: content.metaDescription,
    url: absoluteUrl(pathFor("terms", "en")),
    type: "website",
  },
};

export default function Page() {
  return <TermsPageBody locale="en" />;
}
