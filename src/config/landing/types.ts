/** Los 3 pilares del framing plan→ejecución→adaptación, reutilizados por `solutions` y `experience`. */
export type Pillar = "plan" | "execute" | "adapt";

export type LandingContent = {
  hero: {
    /** Prefijo fijo del rotador, p. ej. "It breaks first". La preposición ("in"/"en la"/"no"/"na") vive
     *  en cada palabra de chipWords porque cambia por género en portugués — no se puede fijar una sola vez. */
    chipPrefix: string;
    chipWords: ReadonlyArray<{ lead: string; emphasis: string }>;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaReassurance: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
  };
  audience: {
    eyebrow: string;
    title: string;
    intro: string;
    profiles: ReadonlyArray<{
      title: string;
      description: string;
      quote: string;
      sectors: string;
    }>;
  };
  /** Teaser de home — "título + resumen de 2 líneas + gráfico animado, nada más" (plan maestro §5.3).
   *  El detalle rico (includes/result/capacidades por pilar) vive en /solutions (Fase 5), no aquí. */
  solutions: {
    eyebrow: string;
    title: string;
    intro: string;
    cards: ReadonlyArray<{ kind: Pillar; title: string; summary: string }>;
  };
  experience: {
    eyebrow: string;
    title: string;
    cases: ReadonlyArray<{
      industry: string;
      pillar: Pillar;
      headline: string;
      situation: string;
      built: string;
      changed: string;
    }>;
  };
  process: {
    eyebrow: string;
    title: string;
    intro: string;
    resultLabel: string;
    steps: ReadonlyArray<{ title: string; body: string; result: string }>;
    closing: string;
    /** Nota de César, corre junto a la línea conectora — no es un 5º paso. */
    strategyNote: string;
  };
  about: {
    panel: { eyebrow: string; headline: string; body: string };
    title: string;
    members: ReadonlyArray<{ name: string; role: string; credential: string }>;
    paragraphs: readonly string[];
    tags: readonly string[];
  };
  finalCta: {
    title: string;
    body: string;
    ctaPrimary: string;
    ctaReassurance: string;
  };
};

export type CookieConsentContent = {
  /** aria-label del dialog — accesible incluso antes de que se anuncie el resto del contenido. */
  dialogLabel: string;
  message: string;
  privacyLink: string;
  customize: string;
  acceptAll: string;
  expandedTitle: string;
  essentialLabel: string;
  essentialDescription: string;
  essentialBadge: string;
  analyticsLabel: string;
  analyticsDescription: string;
  back: string;
  savePreferences: string;
};

export type PrivacyContent = {
  metaTitle: string;
  metaDescription: string;
  pageTitle: string;
  lastUpdated: string;
  intro: string;
  sections: ReadonlyArray<{ heading: string; body: string }>;
  contactLabel: string;
  contactEmail: string;
  backLink: string;
};

/** Mismo shape que PrivacyContent por coincidencia (ambas son "página legal simple") — se
 *  duplica a propósito en vez de generalizar, son entidades distintas. */
export type TermsContent = {
  metaTitle: string;
  metaDescription: string;
  pageTitle: string;
  lastUpdated: string;
  intro: string;
  sections: ReadonlyArray<{ heading: string; body: string }>;
  contactLabel: string;
  contactEmail: string;
  backLink: string;
};

/** Detalle rico de /solutions (Fase 5) — complementa el teaser LandingContent.solutions de home. */
export type SolutionsPageContent = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  intro: string;
  labels: { includes: string; result: string; capabilities: string };
  pillars: ReadonlyArray<{
    kind: Pillar;
    title: string;
    lead: string;
    includes: readonly string[];
    result: readonly string[];
    capabilities: readonly string[];
  }>;
  closing: { title: string };
};

export type SiteContent = {
  brand: string;
  descriptor: string;
  metadataTitle: string;
  metadataDescription: string;
  bookingPath: string;
  privacyUrl: string;
  solutionsUrl: string;
  termsUrl: string;
  nav: ReadonlyArray<{ label: string; href: string }>;
  ctaSchedule: string;
  privacy: string;
  terms: string;
  copyright: string;
  navAriaMain: string;
  navAriaMobile: string;
  navAriaFooter: string;
  openMenu: string;
  closeMenu: string;
};
