"use client";

import Image from "next/image";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { useLandingContent } from "@/hooks/useLandingContent";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

const lineCard = {
  integrate:
    "border-blue-mid-1/25 bg-gradient-to-b from-blue-mid-1/[0.14] via-bg-panel to-bg-panel shadow-[0_10px_36px_-20px_rgba(75,104,140,0.16)]",
  coordinate:
    "border-teal-600/22 bg-gradient-to-b from-teal-600/[0.11] via-bg-panel to-bg-panel shadow-[0_10px_36px_-20px_rgba(13,148,136,0.12)]",
  amplify:
    "border-amber-200/50 bg-gradient-to-b from-accent/[0.08] via-bg-panel to-amber-50/[0.42] shadow-[0_10px_36px_-20px_rgba(245,130,32,0.1)]",
} as const;

type SolutionLine = keyof typeof lineCard;

function isSolutionLine(v: string): v is SolutionLine {
  return v in lineCard;
}

function lineDotClass(line: SolutionLine, active: boolean) {
  if (active) return "h-2 w-8 bg-accent/80";
  if (line === "integrate") return "size-2 bg-blue-mid-2/35 hover:bg-blue-mid-2/55";
  if (line === "coordinate") return "size-2 bg-teal-700/30 hover:bg-teal-600/45";
  return "size-2 bg-accent/35 hover:bg-accent/55";
}

function scrollLeftToCenterCard(root: HTMLElement, card: HTMLElement) {
  const rootRect = root.getBoundingClientRect();
  const cardRect = card.getBoundingClientRect();
  const cardLeftInScrollCoords = root.scrollLeft + (cardRect.left - rootRect.left);
  const cardW = cardRect.width;
  const target = cardLeftInScrollCoords - (root.clientWidth - cardW) / 2;
  const maxScroll = Math.max(0, root.scrollWidth - root.clientWidth);
  return Math.max(0, Math.min(target, maxScroll));
}

/** Índice inicial: tarjeta centrada al cargar (4.ª capacidad: analítica avanzada). */
const SOLUTIONS_INITIAL_ACTIVE = 3;

export function Solutions() {
  const { content } = useLandingContent();
  const {
    title,
    intro,
    capabilities,
    srOnlyCarousel,
    prevCapabilityAria,
    nextCapabilityAria,
    capabilitiesNavAria,
    capabilityNavAria,
  } = content.solutions;
  const count = capabilities.length;
  const scrollerRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(SOLUTIONS_INITIAL_ACTIVE);
  const [active, setActive] = useState(SOLUTIONS_INITIAL_ACTIVE);
  const [sidePad, setSidePad] = useState(0);

  activeRef.current = active;

  const scrollToIndex = useCallback(
    (i: number, behavior: ScrollBehavior = "smooth") => {
      const clamped = Math.max(0, Math.min(count - 1, i));
      const root = scrollerRef.current;
      const card = root?.querySelector<HTMLElement>(`[data-cap-index="${clamped}"]`);
      if (!root || !card) return;

      const reduceMotion =
        typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const b = reduceMotion ? "instant" : behavior;

      root.scrollTo({
        left: scrollLeftToCenterCard(root, card),
        behavior: b,
      });
      setActive(clamped);
    },
    [count],
  );

  const goPrev = useCallback(() => {
    scrollToIndex(activeRef.current - 1);
  }, [scrollToIndex]);

  const goNext = useCallback(() => {
    scrollToIndex(activeRef.current + 1);
  }, [scrollToIndex]);

  useLayoutEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;

    const measure = () => {
      const card = root.querySelector<HTMLElement>('[data-cap-index="0"]');
      if (!card) return;
      const cw = root.clientWidth;
      const cardW = card.offsetWidth;
      if (cw <= 0 || cardW <= 0) return;
      setSidePad(Math.max(12, Math.floor((cw - cardW) / 2)));
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(root);
    return () => ro.disconnect();
  }, [count]);

  useLayoutEffect(() => {
    if (sidePad === 0) return;
    const root = scrollerRef.current;
    const card = root?.querySelector<HTMLElement>(`[data-cap-index="${activeRef.current}"]`);
    if (!root || !card) return;
    root.scrollLeft = scrollLeftToCenterCard(root, card);
  }, [sidePad]);

  return (
    <section
      id="solutions"
      className="scroll-mt-36 border-t border-border-subtle bg-bg-page pb-20 pt-20 sm:pb-24 sm:pt-24 lg:pb-28 lg:pt-28"
    >
      <Container>
        {/* Bloque 1: título */}
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

        {/* Bloque 2: pasarela (debajo) */}
        <div className="mt-4 pt-2 sm:mt-6 sm:pt-3 lg:mt-7 lg:pt-4">
          <Reveal delay={0.05} y={12}>
            <div className="relative">
                <p className="sr-only">{srOnlyCarousel}</p>

                <div
                  className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-bg-page to-transparent sm:w-10"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-bg-page to-transparent sm:w-10"
                  aria-hidden
                />

                <button
                  type="button"
                  className="absolute left-0 top-[42%] z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border-subtle/70 bg-bg-panel text-text-primary shadow-sm transition-colors hover:border-accent/30 hover:text-accent sm:left-0 sm:size-11"
                  aria-label={prevCapabilityAria}
                  onClick={goPrev}
                >
                  <ChevronLeft className="size-5" strokeWidth={2} aria-hidden />
                </button>
                <button
                  type="button"
                  className="absolute right-0 top-[42%] z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border-subtle/70 bg-bg-panel text-text-primary shadow-sm transition-colors hover:border-accent/30 hover:text-accent sm:right-0 sm:size-11"
                  aria-label={nextCapabilityAria}
                  onClick={goNext}
                >
                  <ChevronRight className="size-5" strokeWidth={2} aria-hidden />
                </button>

                <div
                  ref={scrollerRef}
                  style={{ paddingLeft: sidePad, paddingRight: sidePad }}
                  className={cn(
                    // pt/pb: overflow-x-auto fuerza overflow-y:auto y recorta sombras; el padding deja margen dentro del padding-box
                    "flex justify-start gap-4 overflow-x-auto overscroll-x-contain pb-4 pt-4 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-5 sm:pb-5 sm:pt-5 [&::-webkit-scrollbar]:hidden",
                  )}
                >
                  {capabilities.map((cap, i) => {
                    const line = isSolutionLine(cap.line) ? cap.line : "integrate";
                    const selected = i === active;
                    return (
                      <article
                        key={cap.title}
                        data-cap-index={i}
                        className={cn(
                          "w-[min(78vw,280px)] shrink-0 overflow-hidden rounded-2xl border sm:w-[300px]",
                          /* Escala solo en el bloque visual: evita transform + opacidad sobre el texto (se ve borroso). */
                          "transition-[transform,box-shadow] duration-500 ease-out motion-reduce:transition-none",
                          lineCard[line],
                          selected
                            ? "z-[1] shadow-[0_22px_44px_-18px_rgba(0,0,0,0.14)] ring-1 ring-black/[0.06]"
                            : "shadow-[0_1px_3px_rgba(89,90,93,0.06)] hover:shadow-[0_14px_44px_-22px_rgba(245,130,32,0.12)]",
                        )}
                      >
                        <div className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-[5/3]">
                          <div
                            className={cn(
                              "absolute inset-0 transition-transform duration-500 ease-out motion-reduce:transition-none",
                              selected ? "scale-[1.04]" : "scale-100",
                            )}
                          >
                            <Image
                              src={cap.image}
                              alt={cap.imageAlt}
                              fill
                              className="object-cover object-center"
                              sizes="(max-width: 768px) 78vw, 300px"
                              priority={i === SOLUTIONS_INITIAL_ACTIVE || i < 2}
                            />
                            <div
                              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-panel/30 via-transparent to-transparent"
                              aria-hidden
                            />
                          </div>
                        </div>
                        <div className="relative z-10 border-t border-border-subtle/35 bg-bg-panel px-5 py-5 sm:px-6 sm:py-6">
                          <h3 className="text-balance text-[1.0625rem] font-semibold leading-snug tracking-[-0.015em] text-text-primary sm:text-lg">
                            {cap.title}
                          </h3>
                          <p className="mt-3 text-pretty text-sm font-normal leading-relaxed text-text-muted sm:mt-3.5 sm:text-[0.9375rem] sm:leading-[1.65]">
                            {cap.body}
                          </p>
                        </div>
                      </article>
                    );
                  })}
                </div>

                <nav className="mt-6 flex flex-wrap justify-center gap-2 sm:mt-7" aria-label={capabilitiesNavAria}>
                  {capabilities.map((cap, i) => {
                    const line = isSolutionLine(cap.line) ? cap.line : "integrate";
                    const selected = i === active;
                    return (
                      <button
                        key={`nav-${cap.title}`}
                        type="button"
                        aria-label={capabilityNavAria(cap.title, i + 1, count)}
                        aria-current={selected ? "true" : undefined}
                        onClick={() => scrollToIndex(i, "smooth")}
                        className="flex min-h-10 min-w-10 items-center justify-center rounded-full p-2 touch-manipulation"
                      >
                        <span
                          className={cn(
                            "block rounded-full transition-all duration-300 motion-reduce:transition-none",
                            lineDotClass(line, selected),
                          )}
                        />
                      </button>
                    );
                  })}
                </nav>
              </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
