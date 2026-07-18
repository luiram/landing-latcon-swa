import type { LocaleCode } from "@/lib/locales";
import type { BlogPost } from "./types";
import { blogPostsEs } from "./es";
import { blogPostsEn } from "./en";
import { blogPostsPt } from "./pt";
import { blogPostsFr } from "./fr";

export type { BlogBlock, BlogPost, BlogIndexContent } from "./types";
export { getBlogIndexContent } from "./indexContent";

const postsByLocale: Record<LocaleCode, BlogPost[]> = {
  es: blogPostsEs,
  en: blogPostsEn,
  pt: blogPostsPt,
  fr: blogPostsFr,
};

export function getBlogPosts(locale: LocaleCode): BlogPost[] {
  return postsByLocale[locale] ?? [];
}

export function getBlogPost(locale: LocaleCode, slug: string): BlogPost | undefined {
  return getBlogPosts(locale).find((post) => post.slug === slug);
}

export function getBlogSlugs(locale: LocaleCode): string[] {
  return getBlogPosts(locale).map((post) => post.slug);
}
