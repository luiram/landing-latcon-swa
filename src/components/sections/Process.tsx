"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { useLandingContent } from "@/hooks/useLandingContent";
import { cn } from "@/lib/cn";

/** Tarjetas: borde accent + mismo hover que Problemas (elevación suave). */
const STEP_CARD_SURFACE =
  "overflow-hidden border border-accent/30 bg-bg-panel shadow-[0_1px_3px_rgba(245,130,32,0.07)] transition-all duration-300 ease-out motion-reduce:transition-none motion-reduce:hover:translate-y-0 hover:-translate-y-0.5 hover:border-accent/48 hover:shadow-[0_2px_16px_-6px_rgba(245,130,32,0.14)]";

function stepOrdinal(idx: number) {
  return String(idx + 1).padStart(2, "0");
}

export function Process() {
  const { content } = useLandingContent();
  const { title, intro, steps, closing, resultLabel } = content.process;

  return (
    <section
      id="process"
      className="scroll-mt-36 border-t border-border-subtle bg-bg-page py-24 sm:py-28"
    >
      <Container>
        <Reveal>
          <SectionHeader title={title} intro={intro} />
        </Reveal>

        {/* Desktop: subgrid alinea la fila "Resultado" entre columnas aunque los títulos ocupen distinta altura */}
        <div className="mt-14 hidden md:block">
          <ol className="m-0 grid list-none grid-cols-4 grid-rows-[auto_1fr_auto] gap-x-6 gap-y-0 p-0 lg:gap-x-8">
            {steps.map((step, idx) => (
              <Reveal
                key={step.title}
                as="li"
                delay={idx * 0.08}
                y={14}
                className={cn(
                  "row-span-3 grid min-h-0 grid-rows-[subgrid] rounded-2xl",
                  STEP_CARD_SURFACE,
                )}
              >
                <h3 className="px-5 pt-5 pb-1 text-[0.9rem] font-semibold leading-snug tracking-[-0.015em] text-text-primary lg:text-[0.95rem]">
                  <span className="font-bold tabular-nums text-accent/80">{stepOrdinal(idx)}.</span>{" "}
                  <span>{step.title}</span>
                </h3>
                <p className="min-h-0 px-5 pb-3 text-[0.8125rem] font-normal leading-[1.7] text-text-muted/92 lg:text-[0.84375rem] lg:leading-[1.69]">
                  {step.body}
                </p>
                <div className="border-t border-accent/22 px-5 pb-5 pt-5">
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-accent/80">
                    {resultLabel}
                  </p>
                  <p className="mt-2.5 text-[0.8125rem] font-medium leading-snug text-text-primary lg:text-sm lg:leading-snug">
                    {step.result}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* Mobile: lista vertical */}
        <ol className="mt-12 flex flex-col gap-4 md:hidden">
          {steps.map((step, idx) => (
            <Reveal key={step.title} as="li" delay={idx * 0.06} y={12}>
              <div className={cn("rounded-2xl px-5 py-5", STEP_CARD_SURFACE)}>
                <h3 className="text-base font-semibold leading-snug tracking-[-0.015em] text-text-primary">
                  <span className="font-bold tabular-nums text-accent/80">{stepOrdinal(idx)}.</span>{" "}
                  <span>{step.title}</span>
                </h3>
                <p className="mt-2.5 text-[0.8125rem] font-normal leading-[1.7] text-text-muted/92 sm:text-sm sm:leading-[1.69]">
                  {step.body}
                </p>
                <div className="mt-5 border-t border-accent/22 pt-5">
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-accent/80">
                    {resultLabel}
                  </p>
                  <p className="mt-2.5 text-sm font-medium leading-snug text-text-primary">{step.result}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>

        {/* Frase de cierre */}
        {closing ? (
          <Reveal delay={0.32}>
            <p className="mx-auto mt-12 max-w-2xl text-center text-sm leading-relaxed text-text-muted sm:mt-14 sm:text-base">
              {closing}
            </p>
          </Reveal>
        ) : null}
      </Container>
    </section>
  );
}
