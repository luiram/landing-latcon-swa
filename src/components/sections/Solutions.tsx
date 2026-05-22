"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { useLandingContent } from "@/hooks/useLandingContent";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

const lineBorder = {
  integrate: "border-blue-mid-1/25",
  coordinate: "border-teal-600/22",
  amplify: "border-amber-200/50",
} as const;

type SolutionLine = keyof typeof lineBorder;

function isSolutionLine(v: string): v is SolutionLine {
  return v in lineBorder;
}

export function Solutions() {
  const { content, site } = useLandingContent();
  const { title, intro, capabilities, includesLabel, resultLabel } =
    content.solutions;

  return (
    <section
      id="solutions"
      className="scroll-mt-36 border-t border-border-subtle bg-bg-page pb-20 pt-20 sm:pb-24 sm:pt-24 lg:pb-28 lg:pt-28"
    >
      <Container>
        <Reveal>
          <header className="max-w-[38rem]">
            <h2 className="text-balance text-[1.75rem] font-semibold leading-[1.2] tracking-[-0.02em] text-text-primary sm:text-[2rem] sm:leading-[1.18]">
              {title}
            </h2>
            <p className="mt-3 max-w-[34rem] text-pretty text-sm font-normal leading-[1.68] text-text-muted sm:mt-4 sm:text-[0.9375rem] sm:leading-[1.72]">
              {intro}
            </p>
          </header>
        </Reveal>

        <div className="mt-14 space-y-16 sm:mt-16 sm:space-y-20 lg:mt-18 lg:space-y-24">
          {capabilities.map((cap, i) => {
            const line = isSolutionLine(cap.line) ? cap.line : "integrate";
            const imageRight = i % 2 === 1;
            return (
              <Reveal key={cap.title} delay={i * 0.06}>
                <article className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-14">
                  {/* Imagen */}
                  <div
                    className={cn(
                      "relative overflow-hidden rounded-2xl",
                      imageRight && "lg:order-2",
                    )}
                  >
                    <div className="relative aspect-[16/10] w-full sm:aspect-[5/3]">
                      <Image
                        src={cap.image}
                        alt={cap.imageAlt}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority={i === 0}
                      />
                    </div>
                  </div>

                  {/* Texto */}
                  <div className={cn(imageRight && "lg:order-1")}>
                    <h3 className="text-balance text-xl font-semibold leading-snug tracking-[-0.02em] text-text-primary sm:text-2xl">
                      <span className="mr-2 text-accent/80">{String(i + 1).padStart(2, "0")}.</span>
                      {cap.title}
                    </h3>
                    <p className="mt-3 text-pretty text-sm font-normal leading-relaxed text-text-muted sm:mt-4 sm:text-[0.9375rem] sm:leading-[1.65]">
                      {cap.body}
                    </p>

                    {cap.includes.length > 0 && (
                      <div
                        className={cn(
                          "mt-5 border-t pt-5",
                          lineBorder[line],
                        )}
                      >
                        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-accent/80">
                          {includesLabel}
                        </p>
                        <ul className="mt-2.5 space-y-1.5 text-sm leading-relaxed text-text-muted">
                          {cap.includes.map((item) => (
                            <li key={item} className="flex gap-2">
                              <span className="text-accent/70" aria-hidden>
                                ·
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {cap.result && (
                      <p
                        className={cn(
                          "mt-4 border-t pt-4 text-sm font-medium leading-snug text-text-primary",
                          lineBorder[line],
                        )}
                      >
                        <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-accent/80">
                          {resultLabel}:{" "}
                        </span>
                        {cap.result}
                      </p>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1} className="mt-14 flex justify-center sm:mt-16">
          <Button href={site.bookingPath} variant="primary">
            {site.ctaSchedule}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
