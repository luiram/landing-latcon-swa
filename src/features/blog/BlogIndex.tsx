import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { getBlogIndexContent, getBlogPosts } from "@/config/blog";
import type { LocaleCode } from "@/lib/locales";
import { withLocalePrefix } from "@/lib/localePaths";
import { estimateReadingMinutes } from "@/lib/readingTime";

export function BlogIndex({ locale }: { locale: LocaleCode }) {
  const t = getBlogIndexContent(locale);
  const posts = getBlogPosts(locale);
  const blogBase = withLocalePrefix("/blog", locale);

  return (
    <div className="mx-auto max-w-3xl">
      <Reveal>
        <header>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-accent-ink">{t.eyebrow}</p>
          <h1 className="text-balance text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl">
            {t.title}
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-sm leading-relaxed text-text-muted sm:text-base">
            {t.intro}
          </p>
        </header>
      </Reveal>

      {posts.length === 0 ? (
        <Reveal>
          <div className="mt-10 rounded-2xl border border-border-subtle bg-bg-panel p-6 text-sm text-text-muted">
            {t.emptyState}
          </div>
        </Reveal>
      ) : (
        <div className="mt-10 space-y-6 sm:mt-12">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.06}>
              <article className="rounded-2xl border border-border-subtle bg-bg-panel p-6 transition-colors duration-300 hover:border-blue-mid-2/40 sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-accent-ink">{post.topic}</p>
                <h2 className="mt-2 text-lg font-semibold tracking-tight text-text-primary sm:text-xl">
                  <Link href={`${blogBase}/${post.slug}`} className="hover:text-blue-mid-2">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-text-muted sm:text-[0.9375rem]">{post.excerpt}</p>
                <p className="mt-4 text-xs font-medium uppercase tracking-[0.08em] text-text-muted">
                  <time dateTime={post.date}>{post.dateLabel}</time>
                  {" · "}
                  {t.readingTimeLabel.replace("{n}", String(estimateReadingMinutes(post.body)))}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
