import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { MethodStepsScroller } from "@/components/sections/MethodConnector";
import { getLandingContent, getSiteContent } from "@/config/landing";
import type { LocaleCode } from "@/lib/locales";
import { cn } from "@/lib/cn";

/** Tarjetas: borde accent + mismo hover que Problemas (elevación suave). */
const STEP_CARD_SURFACE =
  "overflow-hidden rounded-2xl border border-accent/30 bg-bg-panel shadow-[0_1px_3px_rgba(245,130,32,0.07)] transition-all duration-300 ease-out motion-reduce:transition-none motion-reduce:hover:translate-y-0 hover:-translate-y-0.5 hover:border-accent/48 hover:shadow-[0_2px_16px_-6px_rgba(245,130,32,0.14)]";

function stepOrdinal(idx: number) {
  return String(idx + 1).padStart(2, "0");
}

export function Process({ locale }: { locale: LocaleCode }) {
  const content = getLandingContent(locale);
  const site = getSiteContent(locale);
  const { eyebrow, title, intro, steps, closing, resultLabel, strategyNote } = content.process;

  return (
    <section
      id="process"
      className="scroll-mt-36 border-t border-border-subtle bg-bg-page py-24 sm:py-28"
    >
      <Container>
        <Reveal>
          <SectionHeader eyebrow={eyebrow} title={title} intro={intro} />
        </Reveal>

        {strategyNote ? (
          <Reveal delay={0.1}>
            <p className="mx-auto mt-8 max-w-2xl text-center text-sm italic leading-relaxed text-accent-deep sm:text-[0.9375rem]">
              {strategyNote}
            </p>
          </Reveal>
        ) : null}

        {/* Un solo render, responsive por ítem — antes había dos <ol> completos (desktop/mobile) con el mismo array. */}
        <MethodStepsScroller>
          <ol className="relative m-0 mt-14 flex list-none flex-col gap-4 p-0 md:grid md:grid-cols-4 md:grid-rows-[auto_1fr_auto] md:gap-x-6 md:gap-y-0 lg:gap-x-8">
            {steps.map((step, idx) => (
              <Reveal
                key={step.title}
                as="li"
                delay={idx * 0.08}
                y={14}
                className={cn("md:row-span-3 md:grid md:min-h-0 md:grid-rows-[subgrid]", STEP_CARD_SURFACE)}
              >
                <h3 className="px-5 pt-5 pb-1 text-base font-semibold leading-snug tracking-[-0.015em] text-text-primary md:text-[0.9rem] lg:text-[0.95rem]">
                  <span className="font-bold tabular-nums text-accent-ink">{stepOrdinal(idx)}.</span>{" "}
                  <span>{step.title}</span>
                </h3>
                <p className="min-h-0 px-5 pb-3 text-[0.8125rem] font-normal leading-[1.7] text-text-muted/92 lg:text-[0.84375rem] lg:leading-[1.69]">
                  {step.body}
                </p>
                <div className="border-t border-accent/22 px-5 pb-5 pt-5">
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-accent-ink">
                    {resultLabel}
                  </p>
                  <p className="mt-2.5 text-[0.8125rem] font-medium leading-snug text-text-primary lg:text-sm lg:leading-snug">
                    {step.result}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </MethodStepsScroller>

        {/* Frase de cierre */}
        {closing ? (
          <Reveal delay={0.32}>
            <p className="mx-auto mt-12 max-w-2xl text-center text-sm leading-relaxed text-text-muted sm:mt-14 sm:text-base">
              {closing}
            </p>
          </Reveal>
        ) : null}

        <Reveal delay={0.38} className="mt-10 flex justify-center sm:mt-12">
          <Button href={site.bookingPath} variant="primary">
            {site.ctaSchedule}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
