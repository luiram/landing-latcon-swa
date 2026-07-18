import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { getBlogIndexContent, getBlogPost, type BlogPost } from "@/config/blog";
import { getSiteContent, getLandingContent } from "@/config/landing";
import type { LocaleCode } from "@/lib/locales";
import { withLocalePrefix } from "@/lib/localePaths";
import { estimateReadingMinutes } from "@/lib/readingTime";

export function BlogPostView({ locale, slug }: { locale: LocaleCode; slug: string }) {
  const post = getBlogPost(locale, slug);
  if (!post) return null;
  return <BlogPostBody locale={locale} post={post} />;
}

function BlogPostBody({ locale, post }: { locale: LocaleCode; post: BlogPost }) {
  const t = getBlogIndexContent(locale);
  const site = getSiteContent(locale);
  const { hero } = getLandingContent(locale);

  return (
    <div className="mx-auto max-w-3xl">
      <Reveal>
        <header>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-ink">{post.topic}</p>
          <h1 className="mt-3 text-balance text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl">
            {post.title}
          </h1>
          <p className="mt-3 text-xs font-medium uppercase tracking-[0.08em] text-text-muted">
            <time dateTime={post.date}>{post.dateLabel}</time>
            {" · "}
            {t.readingTimeLabel.replace("{n}", String(estimateReadingMinutes(post.body)))}
          </p>
        </header>
      </Reveal>

      <div className="mt-8 space-y-5 sm:mt-10">
        {post.body.map((block, i) => {
          if (block.type === "heading") {
            return (
              <h2 key={i} className="pt-2 text-lg font-semibold text-text-primary">
                {block.text}
              </h2>
            );
          }
          if (block.type === "list") {
            return (
              <ul key={i} className="space-y-2 text-sm leading-relaxed text-text-muted sm:text-base">
                {block.items.map((item) => (
                  <li key={item} className="border-l border-border-subtle pl-3">
                    {item}
                  </li>
                ))}
              </ul>
            );
          }
          return (
            <p key={i} className="text-sm leading-relaxed text-text-muted sm:text-base">
              {block.text}
            </p>
          );
        })}
      </div>

      <Reveal>
        <div className="mt-12 rounded-2xl border border-border-subtle bg-bg-panel p-6 text-center sm:p-7">
          <Button href={site.bookingPath} variant="primary">
            {site.ctaSchedule}
          </Button>
          <p className="mt-3 text-xs leading-relaxed text-text-muted sm:text-sm">{hero.ctaReassurance}</p>
        </div>
      </Reveal>

      <Link
        href={withLocalePrefix("/blog", locale)}
        className="mt-8 inline-flex text-sm font-semibold text-blue-mid-2 underline-offset-4 hover:underline"
      >
        {t.backLink}
      </Link>
    </div>
  );
}
