import type { Metadata } from "next";
import { BlogIndexPageBody } from "@/components/pages/BlogIndexPageBody";
import { getBlogIndexContent } from "@/config/blog";
import { absoluteUrl, buildAlternates, pathFor } from "@/lib/seo";

const content = getBlogIndexContent("en");

export const metadata: Metadata = {
  title: content.metaTitle,
  description: content.metaDescription,
  alternates: buildAlternates("blog", "en"),
  openGraph: {
    title: content.metaTitle,
    description: content.metaDescription,
    url: absoluteUrl(pathFor("blog", "en")),
    type: "website",
  },
};

export default function Page() {
  return <BlogIndexPageBody locale="en" />;
}
