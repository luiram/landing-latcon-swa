export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: readonly string[] };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  metaDescription: string;
  /** ISO "2026-07-18" — fuente de verdad para ordenar y para <time dateTime>. */
  date: string;
  /** Ya formateada por idioma, ej. "July 18, 2026" / "18 de julio de 2026". */
  dateLabel: string;
  /** Línea editorial visible, ej. "Field productivity". */
  topic: string;
  body: ReadonlyArray<BlogBlock>;
};

export type BlogIndexContent = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  intro: string;
  emptyState: string;
  readingTimeLabel: string;
  backLink: string;
};
