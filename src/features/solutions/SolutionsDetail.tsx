import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { SolutionGraphic } from "@/components/graphics/SolutionGraphic";
import { getSolutionsPageContent, getSiteContent, getLandingContent } from "@/config/landing";
import type { LocaleCode } from "@/lib/locales";

export function SolutionsDetail({ locale }: { locale: LocaleCode }) {
  const content = getSolutionsPageContent(locale);
  const site = getSiteContent(locale);
  const { hero } = getLandingContent(locale);

  return (
    <>
      <Reveal>
        <header className="max-w-[42rem]">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-accent-ink">{content.eyebrow}</p>
          <h1 className="text-balance text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl">
            {content.title}
          </h1>
          <p className="mt-4 max-w-[38rem] text-pretty text-sm leading-relaxed text-text-muted sm:text-base">
            {content.intro}
          </p>
        </header>
      </Reveal>

      <div className="mt-12 space-y-10 sm:mt-14 sm:space-y-12">
        {content.pillars.map((pillar, i) => (
          <Reveal key={pillar.kind} delay={i * 0.08}>
            <section id={pillar.kind} className="solution-card-surface block scroll-mt-36">
              <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-12">
                <div>
                  <span className="text-sm font-bold tabular-nums text-accent/80">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-heading-deep mt-2 text-balance text-xl font-extrabold leading-snug tracking-[-0.01em] text-text-on-dark sm:text-2xl">
                    {pillar.title}
                  </h2>
                  <p className="mt-3 max-w-xl text-pretty text-sm leading-relaxed text-text-on-dark-muted sm:text-base">
                    {pillar.lead}
                  </p>

                  <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
                    {(
                      [
                        [content.labels.includes, pillar.includes],
                        [content.labels.result, pillar.result],
                        [content.labels.capabilities, pillar.capabilities],
                      ] as const
                    ).map(([label, items]) => (
                      <div key={label}>
                        <h3 className="text-xs font-semibold uppercase tracking-[0.1em] text-text-on-dark-muted">
                          {label}
                        </h3>
                        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-text-on-dark-muted">
                          {items.map((item) => (
                            <li key={item} className="border-l border-border-deep pl-3">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="order-first aspect-[4/3] w-full max-w-[16rem] lg:order-none lg:w-64">
                  <SolutionGraphic kind={pillar.kind} className="h-full w-full" />
                </div>
              </div>
            </section>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mx-auto mt-14 max-w-xl text-center sm:mt-16">
          <h2 className="text-balance text-xl font-semibold tracking-tight text-text-primary sm:text-2xl">
            {content.closing.title}
          </h2>
          <div className="mt-6 flex flex-col items-center">
            <Button href={site.bookingPath} variant="primary">
              {site.ctaSchedule}
            </Button>
            <p className="mt-3 text-xs leading-relaxed text-text-muted sm:text-sm">{hero.ctaReassurance}</p>
          </div>
        </div>
      </Reveal>
    </>
  );
}
