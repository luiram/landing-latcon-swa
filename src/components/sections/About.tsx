import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { getLandingContent, getSiteContent } from "@/config/landing";
import type { LocaleCode } from "@/lib/locales";

export function About({ locale }: { locale: LocaleCode }) {
  const content = getLandingContent(locale);
  const site = getSiteContent(locale);
  const { panel, title, members, paragraphs, tags } = content.about;

  return (
    <section id="nosotros" className="scroll-mt-36 border-t border-border-subtle bg-bg-warm py-24 sm:py-28">
      <Container>
        <div>
          <Reveal delay={0.08} y={20}>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-accent-ink">{panel.eyebrow}</p>
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
              {title}
            </h2>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-text-muted">
              {paragraphs.map((p, i) => (
                <p key={`about-p-${i}`}>{p}</p>
              ))}
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {members.map((member, i) => (
                <Reveal key={`member-${i}`} delay={0.1 + i * 0.06} y={12}>
                  <div className="flex h-full flex-col gap-3 rounded-xl border border-border-subtle bg-bg-page p-4">
                    <div className="flex size-12 items-center justify-center rounded-full border border-border-subtle bg-bg-panel">
                      <svg className="size-6 text-text-muted/40" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-3.333 0-10 1.667-10 5v1h20v-1c0-3.333-6.667-5-10-5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text-primary">{member.name}</p>
                      <p className="mt-0.5 text-xs font-medium text-accent-ink">{member.role}</p>
                    </div>
                    <p className="text-xs leading-relaxed text-text-muted">{member.credential}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <div className="mt-9 flex flex-wrap gap-2">
              {tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
            <div className="mt-10 flex justify-center sm:mt-12">
              <Button href={site.bookingPath} variant="primary">
                {site.ctaSchedule}
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
