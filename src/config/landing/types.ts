export type LandingContent = {
  hero: {
    chip: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
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
    title: string;
    intro: string;
    srOnlyCarousel: string;
    prevCapabilityAria: string;
    nextCapabilityAria: string;
    capabilitiesNavAria: string;
    capabilityNavAria: (title: string, index: number, total: number) => string;
    capabilities: ReadonlyArray<{
      line: "integrate" | "coordinate" | "amplify";
      image: string;
      imageAlt: string;
      title: string;
      body: string;
    }>;
  };
  verticals: {
    title: string;
    intro: string;
    useCasesLabel: string;
    componentsLabel: string;
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
    title: string;
    intro: string;
    resultLabel: string;
    steps: ReadonlyArray<{ title: string; body: string; result: string }>;
    closing: string;
  };
  about: {
    panel: { eyebrow: string; headline: string; body: string };
    title: string;
    paragraphs: readonly string[];
    tags: readonly string[];
    ctaAgenda: string;
  };
};

export type SiteContent = {
  brand: string;
  descriptor: string;
  bookingPath: string;
  privacyUrl: string;
  nav: ReadonlyArray<{ label: string; href: string }>;
  ctaSchedule: string;
  privacy: string;
  copyright: string;
  metadataDescription: string;
  navAriaMain: string;
  navAriaMobile: string;
  navAriaFooter: string;
  openMenu: string;
  closeMenu: string;
};
