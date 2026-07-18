import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostPageBody } from "@/components/pages/BlogPostPageBody";
import { getBlogPost, getBlogSlugs } from "@/config/blog";
import { absoluteUrl, buildBlogPostAlternates } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return getBlogSlugs("en").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost("en", slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.metaDescription,
    alternates: buildBlogPostAlternates(post.slug),
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      url: absoluteUrl(`/blog/${post.slug}`),
      type: "article",
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost("en", slug);
  if (!post) notFound();
  return <BlogPostPageBody locale="en" slug={slug} />;
}
