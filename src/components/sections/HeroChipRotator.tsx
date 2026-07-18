"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type ChipWord = { lead: string; emphasis: string };

/**
 * El nodo visual queda aria-hidden y rota cada 3.5s; un bloque sr-only aparte lleva las
 * frases completas siempre presentes para lectores de pantalla. Con prefers-reduced-motion,
 * el intervalo ni siquiera arranca — se queda fija en la primera palabra.
 */
export function HeroChipRotator({
  prefix,
  words,
}: {
  prefix: string;
  words: readonly ChipWord[];
}) {
  const [index, setIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || words.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, 3500);
    return () => clearInterval(id);
  }, [reducedMotion, words.length]);

  const active = words[index];

  return (
    <>
      <span aria-hidden="true">
        {prefix}{" "}
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={active.emphasis}
            initial={reducedMotion ? false : { y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reducedMotion ? undefined : { y: -14, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block"
          >
            <span className="opacity-90">{active.lead}</span>{" "}
            <span className="font-semibold text-accent">{active.emphasis}</span>
          </motion.span>
        </AnimatePresence>
        .
      </span>
      <span className="sr-only">
        {words.map((w) => `${prefix} ${w.lead} ${w.emphasis}.`).join(" ")}
      </span>
    </>
  );
}
