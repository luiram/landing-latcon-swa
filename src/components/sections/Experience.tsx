import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { getLandingContent } from "@/config/landing";
import type { LocaleCode } from "@/lib/locales";
import type { Pillar } from "@/config/landing/types";

const PILLAR_LABEL: Record<Pillar, string> = {
  plan: "Plan",
  execute: "Execute",
  adapt: "Adapt",
};

export function Experience({ locale }: { locale: LocaleCode }) {
  const content = getLandingContent(locale);
  const { eyebrow, title, cases } = content.experience;

  return (
    <section
      id="experience"
      className="scroll-mt-36 border-t border-border-deep bg-bg-deep py-24 sm:py-28"
    >
      <Container>
        <Reveal>
          <header className="max-w-[38rem]">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-accent/90">{eyebrow}</p>
            <h2 className="font-heading-deep text-balance text-[1.75rem] font-extrabold leading-[1.2] tracking-[-0.02em] text-text-on-dark sm:text-[2rem] sm:leading-[1.18]">
              {title}
            </h2>
          </header>
        </Reveal>

        <div className="mt-16 space-y-16 sm:mt-20 sm:space-y-20 lg:space-y-24">
          {cases.map((c, i) => (
            <Reveal key={c.headline} delay={i * 0.08}>
              <article className="mx-auto max-w-[36rem]">
                <p className="flex items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-text-on-dark-muted">
                  <span>{c.industry}</span>
                  <span aria-hidden className="text-accent/60">
                    ·
                  </span>
                  <span className="text-accent/85">{PILLAR_LABEL[c.pillar]}</span>
                </p>
                <p className="font-heading-deep mt-4 text-balance text-2xl font-extrabold italic leading-snug tracking-[-0.01em] text-text-on-dark sm:text-[1.75rem]">
                  {c.headline}
                </p>
                <div className="mt-6 space-y-3 border-l border-border-deep pl-5 text-sm leading-relaxed text-text-on-dark-muted sm:text-[0.9375rem]">
                  <p>{c.situation}</p>
                  <p>{c.built}</p>
                  <p className="font-medium text-text-on-dark">{c.changed}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
