"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll } from "framer-motion";

/**
 * Envuelve los 4 pasos de Método y dibuja una línea decorativa detrás con el scroll
 * (horizontal en desktop, vertical en mobile — mismo mecanismo vía scaleX/scaleY).
 * Mantiene el ref propio para no forzar a Process.tsx (Server Component) a volverse cliente
 * solo por esto — recibe los pasos ya renderizados como children.
 */
export function MethodStepsScroller({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.35"] });

  // El server no conoce prefers-reduced-motion y siempre renderiza el conector; ramificar
  // directo sobre `reducedMotion` en el primer render del cliente (que sí lo conoce de
  // inmediato) produce un mismatch de hidratación real. Se espera al montaje —igual que
  // ParticleField— para que el primer paint del cliente coincida con el del servidor.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const showConnector = !mounted || !reducedMotion;

  return (
    <div ref={ref} className="relative">
      {showConnector ? (
        <>
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-[2.15rem] hidden h-px origin-left bg-accent/35 md:block"
            style={{ scaleX: scrollYProgress }}
          />
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-6 left-[1.75rem] top-6 w-px origin-top bg-accent/35 md:hidden"
            style={{ scaleY: scrollYProgress }}
          />
        </>
      ) : null}
      {children}
    </div>
  );
}
