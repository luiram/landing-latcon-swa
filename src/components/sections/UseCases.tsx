import {
  Sprout,
  GitBranch,
  BarChart3,
  LineChart,
  Camera,
  Bot,
  Cloud,
} from "lucide-react";
import { content } from "@/config/content";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/motion/Reveal";

const icons = [Sprout, GitBranch, BarChart3, LineChart, Camera, Bot, Cloud];

export function UseCases() {
  const { title, cards } = content.useCases;

  return (
    <section id="use-cases" className="scroll-mt-36 bg-bg-page py-24 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeader title={title} />
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => {
            const Icon = icons[i] ?? Cloud;
            return (
              <Reveal key={card.title} delay={i * 0.05} y={14}>
                <Card className="flex flex-col gap-3">
                  <span className="inline-flex size-10 items-center justify-center rounded-xl border border-blue-mid-1/22 bg-blue-mid-1/10 text-blue-mid-2 transition-transform duration-300 hover:scale-[1.05]">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="text-base font-semibold text-text-primary">{card.title}</h3>
                  <p className="text-sm leading-relaxed text-text-muted">{card.body}</p>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
