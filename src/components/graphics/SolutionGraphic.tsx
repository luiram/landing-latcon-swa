"use client";

import type { Pillar } from "@/config/landing/types";
import { useInViewport } from "@/lib/useInViewport";
import { PlanGraphic } from "@/components/graphics/PlanGraphic";
import { ExecuteGraphic } from "@/components/graphics/ExecuteGraphic";
import { AdaptGraphic } from "@/components/graphics/AdaptGraphic";

const GRAPHICS: Record<Pillar, typeof PlanGraphic> = {
  plan: PlanGraphic,
  execute: ExecuteGraphic,
  adapt: AdaptGraphic,
};

export function SolutionGraphic({ kind, className }: { kind: Pillar; className?: string }) {
  const { ref, inViewport } = useInViewport<HTMLDivElement>();
  const Graphic = GRAPHICS[kind];

  return (
    <div ref={ref} className={className}>
      <Graphic paused={!inViewport} />
    </div>
  );
}
