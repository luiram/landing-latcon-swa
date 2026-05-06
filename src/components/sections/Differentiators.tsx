"use client";

import { motion } from "framer-motion";
import { content } from "@/config/content";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";

const list = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
};

const row = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Differentiators() {
  const { title, items } = content.differentiators;

  return (
    <section
      id="differentiators"
      className="scroll-mt-36 border-t border-border-subtle bg-gradient-to-b from-blue-mid-1/10 via-bg-warm to-bg-warm py-24 sm:py-28"
    >
      <Container>
        <Reveal>
          <SectionHeader title={title} />
        </Reveal>
        <motion.ol
          className="mt-14 space-y-4"
          variants={list}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {items.map((item, idx) => (
            <motion.li
              key={item}
              variants={row}
              className="group flex gap-4 rounded-2xl border border-border-subtle bg-bg-panel px-5 py-4 shadow-sm transition-all duration-300 hover:border-blue-mid-1/22 hover:shadow-[0_12px_40px_-24px_rgba(75,104,140,0.12)] sm:px-6 sm:py-5"
            >
              <span className="mt-0.5 inline-flex h-8 w-10 shrink-0 items-center justify-center rounded-lg border border-blue-mid-1/18 bg-blue-mid-1/10 text-xs font-semibold text-blue-mid-2 transition-transform duration-300 group-hover:scale-105 group-hover:border-accent/30 group-hover:text-accent">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <p className="text-sm font-medium leading-relaxed text-text-primary sm:text-base">{item}</p>
            </motion.li>
          ))}
        </motion.ol>
      </Container>
    </section>
  );
}
