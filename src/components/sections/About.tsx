import { content } from "@/config/content";
import { site } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/motion/Reveal";

export function About() {
  const { panel, title, paragraphs, tags, ctaAgenda } = content.about;

  return (
    <section id="nosotros" className="scroll-mt-36 border-t border-border-subtle bg-bg-warm py-24 sm:py-28">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:items-start">
          <Reveal className="lg:col-span-5" y={20}>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-blue-mid-2 to-blue-mid-1 shadow-[0_28px_70px_-28px_rgba(75,104,140,0.35)] transition-all duration-500 hover:border-white/30 hover:shadow-[0_32px_80px_-28px_rgba(75,104,140,0.42)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(245,130,32,0.2),transparent_52%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_72%,rgba(255,255,255,0.18),transparent_48%)]" />
              <div className="relative flex h-full flex-col justify-end p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/85">{panel.eyebrow}</p>
                <p className="mt-3 text-xl font-semibold leading-snug tracking-tight text-white sm:text-2xl">
                  {panel.headline}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/82 sm:text-[0.9375rem]">{panel.body}</p>
              </div>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={0.08} y={20}>
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
              {title}
            </h2>
            <div className="mt-7 space-y-5 text-base leading-relaxed text-text-muted">
              {paragraphs.map((p, i) => (
                <p key={`about-p-${i}`}>{p}</p>
              ))}
            </div>
            <div className="mt-9 flex flex-wrap gap-2">
              {tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
            <div className="mt-9">
              <Button href={site.bookingPath} variant="primary">
                {ctaAgenda}
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
