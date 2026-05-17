"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { useLandingContent } from "@/hooks/useLandingContent";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

function parseNumberedTitle(title: string): { num: string; label: string } {
  const m = title.match(/^(\d+)\.\s+(.+)$/);
  if (m) return { num: m[1], label: m[2] };
  return { num: "", label: title };
}

function SignalsList({
  signals,
  dotClass,
  heading,
}: {
  signals: ReadonlyArray<{ title: string; body: string }>;
  dotClass: string;
  heading?: string;
}) {
  return (
    <div>
      {heading ? (
        <p className="mb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-accent/80">
          {heading}
        </p>
      ) : null}
      <ul className="space-y-3.5 border-t border-accent/22 pt-3.5">
        {signals.map((signal) => (
          <li key={signal.title} className="flex gap-2.5">
            <span className={cn("mt-2 size-1 shrink-0 rounded-full sm:size-1.5", dotClass)} aria-hidden />
            <div className="min-w-0">
              <p className="text-[0.8125rem] font-medium leading-snug text-text-primary">{signal.title}</p>
              <p className="mt-1 text-[0.75rem] leading-relaxed text-text-muted">{signal.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Problems() {
  const { content } = useLandingContent();
  const { title, intro, groups, signalsHeading } = content.problems;
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIdx((prev) => (prev === idx ? null : idx));
  };

  const cardSurface =
    "overflow-hidden rounded-xl transition-all duration-300 ease-out motion-reduce:transition-none motion-reduce:hover:translate-y-0 hover:-translate-y-0.5";

  return (
    <section
      id="problems"
      className="scroll-mt-36 bg-bg-warm pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pt-28 lg:pb-24"
    >
      <Container>
        <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-8 xl:gap-x-11">
          <Reveal className="lg:col-span-5 xl:col-span-4">
            <header className="lg:max-w-[min(100%,28.5rem)] xl:max-w-[30rem]">
              <h2 className="text-balance text-[1.6875rem] font-semibold leading-[1.2] tracking-[-0.02em] text-text-primary sm:text-[1.9375rem] sm:leading-[1.18] lg:text-[2rem] lg:leading-[1.17]">
                {title}
              </h2>
              <p className="mt-4 max-w-[34rem] text-pretty text-sm font-normal leading-[1.68] text-text-muted lg:max-w-none lg:text-[0.9375rem] lg:leading-[1.72]">
                {intro}
              </p>
            </header>
          </Reveal>

          <Reveal delay={0.05} className="mt-8 lg:col-span-7 lg:mt-0 xl:col-span-8">
            <div className="flex flex-col gap-2.5 sm:gap-3 lg:gap-3">
              {groups.map((group, gi) => {
                const isOpen = openIdx === gi;
                const panelId = `problem-panel-${gi}`;
                const triggerId = `problem-trigger-${gi}`;
                const { num, label } = parseNumberedTitle(group.title);

                return (
                  <article key={group.title}>
                    <div
                      className={cn(
                        "group",
                        cardSurface,
                        isOpen
                          ? "border border-accent/30 bg-bg-panel shadow-[0_14px_44px_-20px_rgba(245,130,32,0.12)] hover:border-accent/48 hover:shadow-[0_18px_48px_-20px_rgba(245,130,32,0.16)]"
                          : "border border-accent/30 bg-bg-panel shadow-[0_1px_3px_rgba(245,130,32,0.07)] hover:border-accent/48 hover:shadow-[0_2px_16px_-6px_rgba(245,130,32,0.14)]",
                      )}
                    >
                      <button
                        type="button"
                        id={triggerId}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => toggle(gi)}
                        className={cn(
                          "flex w-full items-start gap-3 px-4 py-3.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent/30 sm:px-[1.125rem] sm:py-4 lg:px-5 lg:py-[1.125rem]",
                          isOpen &&
                            "border-b border-accent/22 bg-gradient-to-b from-accent/[0.05] to-transparent group-hover:border-accent/35",
                        )}
                      >
                        <span className="min-w-0 flex-1 pr-1">
                          <span
                            className={cn(
                              "block font-semibold leading-[1.22] tracking-[-0.015em] transition-colors duration-300",
                              isOpen
                                ? "text-[1.03rem] text-text-primary sm:text-[1.0625rem]"
                                : "text-[0.96875rem] text-text-primary sm:text-[1.02rem]",
                            )}
                          >
                            {num ? (
                              <>
                                <span className="font-bold tabular-nums text-accent/80">{num}.</span>{" "}
                                <span>{label}</span>
                              </>
                            ) : (
                              group.title
                            )}
                          </span>
                          <span
                            className={cn(
                              "mt-2.5 block text-[0.84375rem] font-normal leading-[1.58] tracking-[0.01em] transition-colors duration-300 sm:mt-3 sm:text-[0.875rem] sm:leading-[1.6]",
                              isOpen ? "text-text-primary/80" : "text-text-muted",
                            )}
                          >
                            {group.narrative}
                          </span>
                        </span>
                        <ChevronDown
                          className={cn(
                            "mt-1 size-5 shrink-0 text-accent/38 transition-transform duration-300 ease-out",
                            isOpen && "rotate-180 text-accent/55",
                          )}
                          strokeWidth={2}
                          aria-hidden
                        />
                      </button>
                      <div
                        id={panelId}
                        role="region"
                        aria-labelledby={triggerId}
                        className={cn(
                          "grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                        )}
                      >
                        <div className="min-h-0 overflow-hidden">
                          <div className="border-t border-accent/22 bg-bg-panel/80 px-4 pb-4 pt-4 transition-colors duration-300 group-hover:border-accent/35 sm:px-[1.125rem] lg:px-5">
                            <SignalsList
                              signals={group.signals}
                              dotClass="bg-gradient-to-br from-accent to-blue-mid-2"
                              heading={signalsHeading}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
