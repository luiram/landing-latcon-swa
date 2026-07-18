import type { MetadataRoute } from "next";
import { LOCALE_CODES } from "@/lib/locales";
import { absoluteUrl, buildBlogPostLanguageAlternates, buildLanguageAlternates, pathFor, type PageKind } from "@/lib/seo";
import { withLocalePrefix } from "@/lib/localePaths";
import { getBlogPosts } from "@/config/blog";

export const dynamic = "force-static";

const PAGES: { kind: PageKind; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { kind: "home", changeFrequency: "weekly", priority: 1 },
  { kind: "agenda", changeFrequency: "monthly", priority: 0.8 },
  { kind: "solutions", changeFrequency: "monthly", priority: 0.8 },
  { kind: "blog", changeFrequency: "weekly", priority: 0.6 },
  { kind: "privacy", changeFrequency: "yearly", priority: 0.3 },
  { kind: "terms", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticPages = PAGES.flatMap(({ kind, changeFrequency, priority }) => {
    const languages = buildLanguageAlternates(kind);
    return LOCALE_CODES.map((locale) => ({
      url: absoluteUrl(pathFor(kind, locale)),
      lastModified,
      changeFrequency,
      priority,
      alternates: { languages },
    }));
  });

  /** Un post puede no existir todavía en todos los locales (ver docs/latcon-v2-decisiones.md §1.10/Fase 6) —
   *  a diferencia de PAGES, no se itera sobre LOCALE_CODES a ciegas, solo sobre los locales reales por post. */
  const blogPosts = LOCALE_CODES.flatMap((locale) =>
    getBlogPosts(locale).map((post) => ({
      url: absoluteUrl(withLocalePrefix(`/blog/${post.slug}`, locale)),
      lastModified: new Date(post.date),
      changeFrequency: "yearly" as const,
      priority: 0.5,
      alternates: { languages: buildBlogPostLanguageAlternates(post.slug) },
    })),
  );

  return [...staticPages, ...blogPosts];
}
