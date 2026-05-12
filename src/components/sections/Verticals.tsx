"use client";

import { useState } from "react";
import Image from "next/image";
import { content } from "@/config/content";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { VerticalBlockExpandables } from "@/components/sections/VerticalBlockExpandables";
import { cn } from "@/lib/cn";

export function Verticals() {
  const { title, intro, blocks } = content.verticals;
  /** Solo un acordeón abierto a la vez en toda la sección Contextos. */
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  return (
    <section id="verticals" className="scroll-mt-36 bg-bg-page pb-20 pt-20 sm:pb-24 sm:pt-24 lg:pb-28 lg:pt-28">
      <Container>
        <Reveal>
          <header className="max-w-[42rem]">
            <h2 className="text-balance text-[1.75rem] font-semibold leading-[1.2] tracking-[-0.02em] text-text-primary sm:text-[2rem] sm:leading-[1.18] lg:text-[2.125rem] lg:leading-[1.17]">
              {title}
            </h2>
            <p className="mt-4 max-w-[40rem] text-pretty text-sm font-normal leading-[1.72] text-text-muted sm:mt-5 sm:text-[0.9375rem] sm:leading-[1.75] lg:text-[1rem]">
              {intro}
            </p>
          </header>
        </Reveal>

        <div className="mt-14 sm:mt-16 lg:mt-20">
          {blocks.map((block, i) => {
            const imageOnLeftDesktop = i % 2 === 1;
            return (
              <article key={block.title} className={cn(i > 0 && "mt-10 sm:mt-12 lg:mt-14")}>
                <div className="grid grid-cols-1 items-start gap-10 sm:gap-11 lg:grid-cols-2 lg:items-center lg:gap-x-10 xl:gap-x-12">
                  <Reveal
                    className={cn(
                      "min-w-0 lg:flex lg:items-center",
                      imageOnLeftDesktop ? "lg:order-2 lg:col-start-2 lg:justify-start" : "lg:justify-start",
                    )}
                    y={16}
                  >
                    <div className="w-full max-w-[min(100%,30rem)]">
                      <h3 className="text-balance text-xl font-semibold leading-[1.22] tracking-[-0.02em] text-text-primary sm:text-2xl lg:text-[1.6875rem] lg:leading-[1.2]">
                        {block.title}
                      </h3>
                      <p className="mt-4 text-pretty text-sm font-normal leading-[1.72] text-text-muted sm:mt-5 sm:text-[0.9375rem] sm:leading-[1.75] lg:text-[1rem]">
                        {block.body}
                      </p>
                      <VerticalBlockExpandables
                        blockId={`vertical-${i}`}
                        blockIndex={i}
                        activeKey={activeAccordion}
                        onActiveChange={setActiveAccordion}
                        useCases={block.useCases}
                        components={block.components}
                      />
                    </div>
                  </Reveal>

                  <Reveal
                    className={cn(
                      "flex w-full justify-center lg:items-center",
                      imageOnLeftDesktop ? "lg:order-1 lg:col-start-1" : "",
                    )}
                    delay={0.07}
                    y={16}
                  >
                    <figure className="group w-full max-w-[min(92vw,364px)] sm:max-w-[392px] lg:max-w-[min(100%,428px)]">
                      <div
                        className={cn(
                          "relative aspect-[16/10] w-full overflow-hidden rounded-[1.625rem] border border-border-subtle/50 bg-bg-elevated",
                          "shadow-[0_18px_50px_-26px_rgba(75,104,140,0.2)]",
                          "transition-[box-shadow,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                          "sm:aspect-[5/3] sm:rounded-[2rem]",
                          "group-hover:shadow-[0_26px_60px_-22px_rgba(75,104,140,0.26)] group-hover:-translate-y-0.5",
                        )}
                      >
                        <Image
                          src={block.image}
                          alt={block.imageAlt}
                          fill
                          className={cn(
                            "object-cover object-center",
                            "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                            "group-hover:scale-[1.03]",
                          )}
                          sizes="(max-width: 1024px) min(92vw, 392px), 428px"
                        />
                      </div>
                    </figure>
                  </Reveal>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
