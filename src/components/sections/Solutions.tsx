import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { SolutionGraphic } from "@/components/graphics/SolutionGraphic";
import { getLandingContent } from "@/config/landing";
import type { LocaleCode } from "@/lib/locales";
import { withLocalePrefix } from "@/lib/localePaths";

export function Solutions({ locale }: { locale: LocaleCode }) {
  const content = getLandingContent(locale);
  const { eyebrow, title, intro, cards } = content.solutions;
  const solutionsHref = withLocalePrefix("/solutions", locale);

  return (
    <section
      id="solutions"
      className="scroll-mt-36 border-t border-border-deep bg-bg-deep pb-8 pt-20 sm:pt-24 lg:pt-28"
    >
      <Container>
        <Reveal>
          <header className="max-w-[38rem]">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-accent/90">{eyebrow}</p>
            <h2 className="font-heading-deep text-balance text-[1.75rem] font-extrabold leading-[1.2] tracking-[-0.02em] text-text-on-dark sm:text-[2rem] sm:leading-[1.18]">
              {title}
            </h2>
            <p className="mt-3 max-w-[34rem] text-pretty text-sm font-normal leading-[1.68] text-text-on-dark-muted sm:mt-4 sm:text-[0.9375rem] sm:leading-[1.72]">
              {intro}
            </p>
          </header>
        </Reveal>
      </Container>

      <div className="mt-14 sm:mt-16">
        {cards.map((card, i) => (
          <div key={card.title} className="solution-rail" style={{ zIndex: i + 1 }}>
            <div className="solution-card">
              <Container>
                <Link
                  href={`${solutionsHref}#${card.kind}`}
                  className="solution-card-surface block transition-colors duration-300 hover:border-white/22 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep"
                >
                  <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
                    <div className="order-2 lg:order-1">
                      <span className="text-sm font-bold tabular-nums text-accent/80">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-heading-deep mt-2 text-balance text-xl font-extrabold leading-snug tracking-[-0.01em] text-text-on-dark sm:text-2xl">
                        {card.title}
                      </h3>
                      <p className="mt-3 max-w-md text-pretty text-sm leading-relaxed text-text-on-dark-muted sm:text-base">
                        {card.summary}
                      </p>
                    </div>
                    <div className="order-1 aspect-[4/3] w-full lg:order-2">
                      <SolutionGraphic kind={card.kind} className="h-full w-full" />
                    </div>
                  </div>
                </Link>
              </Container>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
