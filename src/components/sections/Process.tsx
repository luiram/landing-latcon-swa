import { content } from "@/config/content";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

const mobileStep =
  "rounded-2xl border border-border-subtle bg-bg-panel px-4 py-5 shadow-sm transition-all duration-300 hover:border-blue-mid-1/25 hover:shadow-[0_0_0_1px_rgba(86,123,165,0.08)] sm:px-5";

export function Process() {
  const { title, steps } = content.process;

  return (
    <section
      id="process"
      className="scroll-mt-36 border-t border-border-subtle bg-bg-warm py-24 sm:py-28"
    >
      <Container>
        <Reveal>
          <SectionHeader title={title} />
        </Reveal>
        <div className="mt-14 hidden md:block">
          <div className="relative">
            <div className="absolute left-0 right-0 top-5 h-px bg-gradient-to-r from-transparent via-blue-mid-1/40 to-transparent" />
            <ol className="relative grid grid-cols-5 gap-4">
              {steps.map((step, idx) => (
                <Reveal
                  key={step.title}
                  as="li"
                  delay={idx * 0.07}
                  y={12}
                  className="flex flex-col items-center text-center"
                >
                  <span className="z-10 inline-flex size-10 items-center justify-center rounded-full border border-blue-mid-1/35 bg-bg-panel text-sm font-semibold text-blue-mid-2 shadow-sm transition-transform duration-300 hover:scale-110 hover:border-accent/40 hover:text-accent">
                    {idx + 1}
                  </span>
                  <h3 className="mt-4 text-sm font-semibold text-text-primary">{step.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-text-muted">{step.body}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>

        <ol className="mt-12 flex flex-col gap-4 md:hidden">
          {steps.map((step, idx) => (
            <Reveal key={step.title} as="li" delay={idx * 0.06} y={12}>
              <div className={cn(mobileStep)}>
                <div className="flex items-start gap-4 text-left">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-blue-mid-1/35 bg-bg-panel text-sm font-semibold text-blue-mid-2 shadow-sm">
                    {idx + 1}
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-text-primary">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-muted">{step.body}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
