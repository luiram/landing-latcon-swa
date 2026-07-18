import type { Metadata } from "next";
import { PrivacyPageBody } from "@/components/pages/PrivacyPageBody";
import { getPrivacyContent } from "@/config/landing";
import { absoluteUrl, buildAlternates, pathFor } from "@/lib/seo";

const content = getPrivacyContent("en");

export const metadata: Metadata = {
  title: content.metaTitle,
  description: content.metaDescription,
  alternates: buildAlternates("privacy", "en"),
  openGraph: {
    title: content.metaTitle,
    description: content.metaDescription,
    url: absoluteUrl(pathFor("privacy", "en")),
    type: "website",
  },
};

export default function Page() {
  return <PrivacyPageBody locale="en" />;
}
