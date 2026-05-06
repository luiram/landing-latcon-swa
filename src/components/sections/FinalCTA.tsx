import { content } from "@/config/content";
import { site } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

export function FinalCTA() {
  const { title, body, cta } = content.finalCta;

  return (
    <section className="scroll-mt-36 bg-bg-warm py-24 sm:py-28">
      <Container>
        <Reveal y={22}>
          <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-blue-mid-2 via-blue-mid-2 to-blue-mid-1 px-6 py-14 shadow-[0_28px_70px_-32px_rgba(75,104,140,0.45)] transition-all duration-500 hover:border-white/25 sm:px-12 sm:py-16">
            <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-accent/25 blur-3xl transition-opacity duration-700" />
            <div className="pointer-events-none absolute -bottom-28 -left-16 size-80 rounded-full bg-white/15 blur-3xl" />
            <div className="relative mx-auto max-w-3xl text-center">
              <h2 className="text-balance text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {title}
              </h2>
              <p className="mt-6 text-pretty text-base leading-relaxed text-white/88 sm:text-lg">{body}</p>
              <div className="mt-10 flex justify-center">
                <Button href={site.agendaUrl} external variant="primary" className="px-7">
                  {cta}
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
