import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge debe conocer las escalas de src/app/globals.css. Si no, trata `text-body-sm`
 * como un color y descarta el color de texto al combinar clases. Mantener sincronizado con @theme.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        "label",
        "caption",
        "small",
        "body-sm",
        "body",
        "body-lg",
        "title-sm",
        "title",
        "heading-sm",
        "heading",
        "heading-lg",
        "display-sm",
        "display",
      ],
      leading: ["display", "heading", "title", "body", "body-loose"],
      tracking: ["display", "heading", "title", "label", "eyebrow"],
      container: ["prose-narrow", "prose", "prose-wide", "page"],
      spacing: ["section-sm", "section-md", "section-lg"],
      radius: ["control", "card-sm", "card", "pill"],
      shadow: [
        "card",
        "card-hover",
        "card-accent",
        "card-accent-hover",
        "control-inset",
        "control-hover",
        "control-outline",
        "dialog",
        "popover",
        "glass",
        "glass-scrolled",
        "glass-sm",
      ],
      "text-shadow": ["glow", "display", "lead"],
      ease: ["out-soft"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
