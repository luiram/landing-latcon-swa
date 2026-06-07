"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

import { LanguageSelector } from "@/components/layout/LanguageSelector";
import { useLandingContent } from "@/hooks/useLandingContent";
import { cn } from "@/lib/cn";

const NAV_HREFS = ["#solutions", "#verticals", "#process", "#nosotros"] as const;
type NavHref = (typeof NAV_HREFS)[number];

const navLinkBase =
  "rounded-full px-3 py-1 text-sm tracking-tight transition-[color,background-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent";

function navLinkClass(href: string, activeHref: NavHref | "") {
  const isCurrent = href === activeHref;
  return cn(
    navLinkBase,
    isCurrent
      ? "bg-stone-200/22 font-semibold text-neutral-950 hover:bg-stone-200/32 active:bg-stone-300/40"
      : "font-medium text-neutral-800/92 hover:bg-white/34 hover:text-neutral-900 active:bg-stone-200/38",
  );
}

function mobileNavLinkClass(href: string, activeHref: NavHref | "") {
  const isCurrent = href === activeHref;
  return cn(
    "rounded-2xl px-4 py-3.5 text-sm tracking-tight transition-[color,background-color] duration-200",
    isCurrent
      ? "bg-stone-200/40 font-semibold text-neutral-950 hover:bg-stone-200/52 active:bg-stone-300/45"
      : "font-medium text-neutral-800 hover:bg-stone-100/88 hover:text-neutral-950 active:bg-stone-200/50",
  );
}

export function Navbar() {
  const { site } = useLandingContent();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState<NavHref | "">("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_HREFS.map((href) => {
      const el = document.querySelector<HTMLElement>(href);
      return el ? { href, el } : null;
    }).filter((p): p is { href: NavHref; el: HTMLElement } => p !== null);

    if (sections.length === 0) return undefined;

    /**
     * Activo = sección del menú con mayor altura visible en el viewport por debajo de
     * scroll-padding-top. Así, si la línea de lectura cae en un “hueco” entre #process y #nosotros,
     * no se vuelve a Método por el fallback
     * antiguo (última con top <= Y).
     */
    const measureActive = () => {
      const scrollPad =
        Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 96;
      const navBottom = scrollPad;
      const vh = window.innerHeight;

      let best: NavHref | "" = "";
      let bestOverlap = -1;

      for (let i = 0; i < sections.length; i++) {
        const { href, el } = sections[i];
        const r = el.getBoundingClientRect();
        const overlapTop = Math.max(r.top, navBottom);
        const overlapBottom = Math.min(r.bottom, vh);
        const overlap = Math.max(0, overlapBottom - overlapTop);

        if (overlap > bestOverlap) {
          bestOverlap = overlap;
          best = href;
        } else if (overlap === bestOverlap && overlap > 0) {
          best = href;
        }
      }

      if (bestOverlap > 0) {
        setActiveHref(best);
        return;
      }

      const firstTop = sections[0].el.getBoundingClientRect().top;
      if (firstTop > navBottom) {
        setActiveHref("");
        return;
      }

      const mid = navBottom + (vh - navBottom) * 0.5;
      let fallback: NavHref = sections[0].href;
      for (const { href, el } of sections) {
        if (el.getBoundingClientRect().top <= mid) {
          fallback = href;
        }
      }
      setActiveHref(fallback);
    };

    let raf = 0;
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measureActive);
    };

    measureActive();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", measureActive);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", measureActive);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <header className="pointer-events-none fixed left-0 right-0 top-3 z-50 flex justify-center px-4 sm:top-4 sm:px-6">
        <div
          className={cn(
            "pointer-events-auto flex w-full max-w-[min(75rem,calc(100vw-2rem))] items-center gap-2 rounded-full border border-white/20 bg-[rgba(255,253,250,0.68)] px-3 py-1.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.92),0_1px_2px_rgba(255,255,255,0.22),0_4px_32px_-6px_rgba(0,0,0,0.13),0_1px_4px_rgba(0,0,0,0.05)] backdrop-blur-2xl backdrop-saturate-[110%] backdrop-brightness-[1.18] backdrop-contrast-[0.92] transition-[box-shadow,border-color,background-color,backdrop-filter] duration-300 sm:gap-2.5 sm:px-3.5 sm:py-1.5",
            scrolled &&
              "border-white/26 bg-[rgba(255,253,250,0.82)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.96),0_1px_2px_rgba(255,255,255,0.24),0_4px_30px_-8px_rgba(0,0,0,0.08),0_1px_5px_rgba(0,0,0,0.04)] backdrop-brightness-[1.06] backdrop-contrast-[0.96]",
          )}
        >
          <Link
            href="/"
            className="shrink-0 rounded-full px-1 py-0.5 transition-opacity hover:opacity-[0.88] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          >
            <img
                src="/logo/logo_1_primary_horizontal.png"
                alt="Latcon Services"
                className="h-7 w-auto"
                draggable={false}
              />
          </Link>

          <nav
            className="hidden flex-1 justify-center gap-1 lg:flex"
            aria-label={site.navAriaMain}
          >
            {site.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={navLinkClass(item.href, activeHref)}
                aria-current={item.href === activeHref ? "true" : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-4 sm:gap-5">
            <LanguageSelector className="flex items-center" />
            <Button
              href={site.bookingPath}
              variant="primary"
              className="hidden h-9 shrink-0 items-center px-4 py-0 text-sm leading-none sm:inline-flex"
            >
              {site.ctaSchedule}
            </Button>
            <button
              type="button"
              className="inline-flex size-9 items-center justify-center rounded-full border border-white/36 bg-[rgba(255,252,249,0.55)] text-neutral-800 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.78),0_1px_2px_rgba(255,255,255,0.16),0_2px_14px_-4px_rgba(0,0,0,0.065)] backdrop-blur-xl backdrop-saturate-[115%] transition-colors hover:border-white/46 hover:bg-[rgba(255,252,249,0.72)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-transparent lg:hidden"
              aria-expanded={open}
              aria-label={open ? site.closeMenu : site.openMenu}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-[1.125rem]" /> : <Menu className="size-[1.125rem]" />}
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          aria-hidden={!open}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/28 backdrop-blur-[2px]"
            aria-label={site.closeMenu}
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-4 right-4 top-[4.25rem] max-h-[min(70vh,calc(100vh-6rem))] overflow-y-auto rounded-3xl border border-border-subtle bg-bg-page/98 p-4 shadow-[0_20px_50px_-16px_rgba(75,104,140,0.25)] backdrop-blur-lg sm:left-6 sm:right-6 sm:top-[4.5rem]">
            <nav className="flex flex-col gap-1" aria-label={site.navAriaMobile}>
              {site.nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={mobileNavLinkClass(item.href, activeHref)}
                  aria-current={item.href === activeHref ? "true" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="mt-4 border-t border-border-subtle pt-4 sm:hidden">
              <Button
                href={site.bookingPath}
                variant="primary"
                className="w-full justify-center"
                onClick={() => setOpen(false)}
              >
                {site.ctaSchedule}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
