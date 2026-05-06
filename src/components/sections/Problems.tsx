import {
  DatabaseZap,
  Hand,
  Clock3,
  Route,
  Users,
  TrendingUp,
} from "lucide-react";
import { content } from "@/config/content";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/motion/Reveal";

const icons = [DatabaseZap, Hand, Clock3, Route, Users, TrendingUp];

export function Problems() {
  const { title, intro, cards } = content.problems;

  return (
    <section id="problems" className="scroll-mt-36 bg-bg-page py-24 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeader title={title} intro={intro} />
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => {
            const Icon = icons[i] ?? DatabaseZap;
            return (
              <Reveal key={card.title} delay={i * 0.06} y={14}>
                <Card className="flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl border border-blue-mid-1/22 bg-blue-mid-1/10 text-blue-mid-2 transition-colors duration-300 group-hover:border-accent/35 group-hover:text-accent">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-text-primary">{card.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-text-muted">{card.body}</p>
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
