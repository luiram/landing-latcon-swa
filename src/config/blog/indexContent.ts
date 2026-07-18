import type { LocaleCode } from "@/lib/locales";
import type { BlogIndexContent } from "./types";

const blogIndexEs: BlogIndexContent = {
  metaTitle: "Blog — Latcon",
  metaDescription:
    "Notas prácticas sobre dónde se separan el plan y la operación — campo, energía y alertas tempranas.",
  eyebrow: "Blog",
  title: "Notas sobre cerrar la brecha.",
  intro: "Escritura breve y práctica sobre dónde se separan el plan y la operación — y qué cierra esa brecha en la realidad.",
  emptyState: "Próximamente en español.",
  readingTimeLabel: "{n} min de lectura",
  backLink: "Volver al blog",
};

const blogIndexEn: BlogIndexContent = {
  metaTitle: "Blog — Latcon",
  metaDescription:
    "Practical notes on where plans and operations drift apart — field operations, energy, and early warning.",
  eyebrow: "Blog",
  title: "Notes from closing the gap.",
  intro: "Short, practical writing on where plans and operations drift apart — and what closes that gap in practice.",
  emptyState: "New posts coming soon.",
  readingTimeLabel: "{n} min read",
  backLink: "Back to blog",
};

const blogIndexPt: BlogIndexContent = {
  metaTitle: "Blog — Latcon",
  metaDescription:
    "Notas práticas sobre onde o plano e a operação se distanciam — campo, energia e alerta antecipado.",
  eyebrow: "Blog",
  title: "Notas sobre fechar a lacuna.",
  intro: "Escrita breve e prática sobre onde o plano e a operação se distanciam — e o que fecha essa lacuna na prática.",
  emptyState: "Em breve em português.",
  readingTimeLabel: "{n} min de leitura",
  backLink: "Voltar ao blog",
};

const blogIndexFr: BlogIndexContent = {
  metaTitle: "Blog — Latcon",
  metaDescription:
    "Notes pratiques sur les écarts entre le plan et l'opération — terrain, énergie et alerte précoce.",
  eyebrow: "Blog",
  title: "Notes sur comment combler l'écart.",
  intro: "Des textes courts et pratiques sur les écarts entre le plan et l'opération — et ce qui les comble en pratique.",
  emptyState: "Bientôt disponible en français.",
  readingTimeLabel: "{n} min de lecture",
  backLink: "Retour au blog",
};

const byLocale: Record<LocaleCode, BlogIndexContent> = {
  es: blogIndexEs,
  en: blogIndexEn,
  pt: blogIndexPt,
  fr: blogIndexFr,
};

export function getBlogIndexContent(locale: LocaleCode): BlogIndexContent {
  return byLocale[locale] ?? blogIndexEs;
}
