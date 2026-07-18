"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ParticleCanvas = dynamic(() => import("./ParticleCanvas").then((m) => m.ParticleCanvas), {
  ssr: false,
});

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/** Mismas posiciones semilladas que el canvas — el poster es el primer frame, no un asset aparte. */
function ParticlePoster({ density }: { density: number }) {
  const rand = seededRandom(42);
  const count = Math.round(70 * density);
  const dots = Array.from({ length: count }, () => ({ x: rand() * 100, y: rand() * 100 }));
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full opacity-40"
    >
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={0.28} fill="#f58220" fillOpacity={0.4} />
      ))}
    </svg>
  );
}

/**
 * Arranca siempre en modo poster (SSR-safe, sin mismatch de hidratación). Si el navegador no
 * pide prefers-reduced-motion, monta el motor de canvas tras el primer paint.
 */
export function ParticleField({
  density = 1,
  interactive = true,
  className,
}: {
  density?: number;
  interactive?: boolean;
  className?: string;
}) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!mq.matches) setEnabled(true);
  }, []);

  return (
    <div className={className} aria-hidden="true">
      <ParticlePoster density={density} />
      {enabled ? <ParticleCanvas density={density} interactive={interactive} /> : null}
    </div>
  );
}
