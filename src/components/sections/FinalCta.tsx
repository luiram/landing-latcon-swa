"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { useLandingContent } from "@/hooks/useLandingContent";

export function FinalCta() {
  const { content, site } = useLandingContent();
  const { title, body, ctaPrimary, ctaReassurance } = content.finalCta;

  return (
    <section className="scroll-mt-36 border-t border-border-subtle bg-bg-page py-20 sm:py-24 lg:py-28">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl">{title}</h2>
            <p className="mt-4 text-pretty text-sm leading-relaxed text-text-muted sm:text-base">{body}</p>
            <div className="mt-8 flex flex-col items-center">
              <Button href={site.bookingPath} variant="primary">
                {ctaPrimary}
              </Button>
              <p className="mt-3 max-w-md text-xs leading-relaxed text-text-muted sm:text-sm">{ctaReassurance}</p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
