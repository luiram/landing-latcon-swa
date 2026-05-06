"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Delay in seconds */
  delay?: number;
  /** Initial vertical offset in px */
  y?: number;
  /** Use `li` when this reveal is a direct child of `ol` */
  as?: "div" | "li";
};

export function Reveal({ children, className, delay = 0, y = 18, as = "div" }: RevealProps) {
  const common = {
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2, margin: "0px 0px -10% 0px" } as const,
    transition: { duration: 0.52, delay, ease: [0.22, 1, 0.36, 1] as const },
    className: cn(className),
  };

  if (as === "li") {
    return <motion.li {...common}>{children}</motion.li>;
  }

  return <motion.div {...common}>{children}</motion.div>;
}
