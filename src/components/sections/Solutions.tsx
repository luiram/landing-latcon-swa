import {
  Boxes,
  Workflow,
  LayoutDashboard,
  Brain,
  ScanEye,
  Bot,
} from "lucide-react";
import { content } from "@/config/content";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/motion/Reveal";

const icons = [Boxes, Workflow, LayoutDashboard, Brain, ScanEye, Bot];

export function Solutions() {
  const { title, intro, cards } = content.solutions;

  return (
    <section
      id="solutions"
      className="scroll-mt-36 border-t border-border-subtle bg-blue-mid-1/10 py-24 sm:py-28"
    >
      <Container>
        <Reveal>
          <SectionHeader title={title} intro={intro} />
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => {
            const Icon = icons[i] ?? Boxes;
            return (
              <Reveal key={card.title} delay={i * 0.06} y={14}>
                <Card className="flex flex-col gap-4">
                  <span className="inline-flex size-11 items-center justify-center rounded-2xl border border-blue-mid-1/20 bg-gradient-to-br from-blue-mid-1/14 to-transparent text-blue-mid-2 transition-transform duration-300 hover:scale-[1.03]">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary">{card.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-muted">{card.body}</p>
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
