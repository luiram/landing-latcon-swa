"use client";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { useLandingContent } from "@/hooks/useLandingContent";
import { cn } from "@/lib/cn";

export function Audience() {
  const { content } = useLandingContent();
  const { eyebrow, title, intro, profiles } = content.audience;

  return (
    <section
      id="para-quien"
      className="scroll-mt-36 border-b border-border-subtle bg-bg-page py-20 sm:py-24 lg:py-28"
    >
      <Container>
        <Reveal>
          <header className="max-w-[42rem]">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent/90">{eyebrow}</p>
            <h2 className="mt-3 text-balance text-[1.75rem] font-semibold leading-[1.2] tracking-[-0.02em] text-text-primary sm:text-[2rem] sm:leading-[1.18]">
              {title}
            </h2>
            {intro && (
              <p className="mt-4 max-w-[38rem] text-pretty text-sm leading-[1.68] text-text-muted sm:text-[0.9375rem] sm:leading-[1.72]">
                {intro}
              </p>
            )}
          </header>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-6">
          {profiles.map((profile, i) => (
            <Reveal key={profile.title} delay={0.08 + i * 0.05} y={14}>
              <article
                className={cn(
                  "flex h-full flex-col rounded-2xl border border-border-subtle bg-bg-panel p-5 shadow-[0_1px_3px_rgba(89,90,93,0.06)] sm:p-6",
                  "transition-all duration-300 hover:border-accent/30 hover:shadow-[0_14px_44px_-22px_rgba(245,130,32,0.12)]",
                )}
              >
                <h3 className="text-lg font-semibold tracking-tight text-text-primary">{profile.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-text-muted">{profile.description}</p>
                <p className="mt-4 text-sm font-semibold italic leading-relaxed text-text-muted/90">{profile.quote}</p>
                <p className="mt-4 border-t border-border-subtle pt-4 text-xs font-medium uppercase tracking-wide text-accent/85">
                  {profile.sectors}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
