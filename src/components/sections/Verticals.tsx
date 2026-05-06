import { Leaf, MapPinned, ClipboardList, Rocket } from "lucide-react";
import { content } from "@/config/content";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/motion/Reveal";

const icons = [Leaf, MapPinned, ClipboardList, Rocket];

export function Verticals() {
  const { title, cards } = content.verticals;

  return (
    <section id="verticals" className="scroll-mt-36 bg-bg-warm py-24 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeader title={title} />
        </Reveal>
        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {cards.map((card, i) => {
            const Icon = icons[i] ?? Leaf;
            return (
              <Reveal key={card.title} delay={i * 0.08} y={16}>
                <Card className="p-7 sm:p-8">
                  <div className="flex items-start gap-4">
                    <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl border border-blue-mid-1/22 bg-blue-mid-1/10 text-blue-mid-2 transition-transform duration-300 hover:scale-[1.04]">
                      <Icon className="size-6" aria-hidden />
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold text-text-primary">{card.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-text-muted sm:text-base">{card.body}</p>
                    </div>
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
