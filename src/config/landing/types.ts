export type LandingContent = {
  hero: {
    chip: string;
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
  problems: {
    title: string;
    intro: string;
    signalsHeading: string;
    groups: ReadonlyArray<{
      title: string;
      narrative: string;
      signals: ReadonlyArray<{ title: string; body: string }>;
    }>;
  };
  solutions: {
    eyebrow: string;
    title: string;
    intro: string;
    srOnlyCarousel: string;
    prevCapabilityAria: string;
    nextCapabilityAria: string;
    capabilitiesNavAria: string;
    capabilityNavAria: (title: string, index: number, total: number) => string;
    includesLabel: string;
    resultLabel: string;
    capabilities: ReadonlyArray<{
      line: "integrate" | "coordinate" | "amplify";
      image: string;
      imageAlt: string;
      title: string;
      body: string;
      includes: readonly string[];
      result: string;
    }>;
  };
  verticals: {
    title: string;
    intro: string;
    useCasesLabel: string;
    componentsLabel: string;
    midCtaLabel: string;
    blocks: ReadonlyArray<{
      title: string;
      body: string;
      image: string;
      imageAlt: string;
      useCases: readonly string[];
      components: readonly string[];
    }>;
  };
  process: {
    eyebrow: string;
    title: string;
    intro: string;
    resultLabel: string;
    steps: ReadonlyArray<{ title: string; body: string; result: string }>;
    closing: string;
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

export type SiteContent = {
  brand: string;
  descriptor: string;
  metadataTitle: string;
  metadataDescription: string;
  bookingPath: string;
  privacyUrl: string;
  nav: ReadonlyArray<{ label: string; href: string }>;
  ctaSchedule: string;
  privacy: string;
  copyright: string;
  navAriaMain: string;
  navAriaMobile: string;
  navAriaFooter: string;
  openMenu: string;
  closeMenu: string;
};
