import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { ParticleField } from "@/components/motion/ParticleField";
import { getLandingContent, getSiteContent } from "@/config/landing";
import type { LocaleCode } from "@/lib/locales";

export function FinalCta({ locale }: { locale: LocaleCode }) {
  const content = getLandingContent(locale);
  const site = getSiteContent(locale);
  const { title, body, ctaPrimary, ctaReassurance } = content.finalCta;

  return (
    <section className="relative scroll-mt-36 overflow-hidden border-t border-border-deep bg-bg-deep py-24 sm:py-28 lg:py-32">
      <ParticleField density={0.3} interactive={false} className="absolute inset-0" />
      <Container className="relative z-10">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading-deep text-balance text-2xl font-extrabold tracking-tight text-text-on-dark sm:text-3xl">
              {title}
            </h2>
            <p className="mt-4 text-pretty text-sm leading-relaxed text-text-on-dark-muted sm:text-base">{body}</p>
            <div className="mt-8 flex flex-col items-center">
              <Button href={site.bookingPath} variant="primary" onDark className="group">
                {ctaPrimary}
                <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">
                  →
                </span>
              </Button>
              <p className="mt-3 max-w-md text-xs leading-relaxed text-text-on-dark-muted sm:text-sm">{ctaReassurance}</p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
