import type { Metadata } from "next";
import { SolutionsPageBody } from "@/components/pages/SolutionsPageBody";
import { getSolutionsPageContent } from "@/config/landing";
import { absoluteUrl, buildAlternates, pathFor } from "@/lib/seo";

const content = getSolutionsPageContent("en");

export const metadata: Metadata = {
  title: content.metaTitle,
  description: content.metaDescription,
  alternates: buildAlternates("solutions", "en"),
  openGraph: {
    title: content.metaTitle,
    description: content.metaDescription,
    url: absoluteUrl(pathFor("solutions", "en")),
    type: "website",
  },
};

export default function Page() {
  return <SolutionsPageBody locale="en" />;
}
