import type { Metadata } from "next";
import { LOCALE_CODES, type LocaleCode } from "@/lib/locales";
import { getSiteContent } from "@/config/landing";
import { getBlogPost } from "@/config/blog";
import { withLocalePrefix } from "@/lib/localePaths";

export const SITE_URL = "https://latconservices.com";

const OG_LOCALE: Record<LocaleCode, string> = {
  en: "en_US",
  es: "es_CO",
  pt: "pt_BR",
  fr: "fr_FR",
};

export type PageKind = "home" | "agenda" | "privacy" | "solutions" | "terms" | "blog";

/** Slug fijo en los 4 idiomas (decisión Fase 3: sin traducir rutas, ver docs/latcon-v2-decisiones.md). */
const BARE_PATH: Record<PageKind, string> = {
  home: "/",
  agenda: "/agenda",
  privacy: "/privacy",
  solutions: "/solutions",
  terms: "/terms",
  blog: "/blog",
};

export function pathFor(page: PageKind, locale: LocaleCode): string {
  return withLocalePrefix(BARE_PATH[page], locale);
}

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path === "/" ? "" : path}`;
}

/** hreflang: una entrada por idioma + "x-default" apuntando al inglés. */
export function buildLanguageAlternates(page: PageKind): Record<string, string> {
  const entries = LOCALE_CODES.reduce<Record<string, string>>((acc, code) => {
    acc[code] = absoluteUrl(pathFor(page, code));
    return acc;
  }, {});
  entries["x-default"] = absoluteUrl(pathFor(page, "en"));
  return entries;
}

export function buildAlternates(page: PageKind, locale: LocaleCode): Metadata["alternates"] {
  return {
    canonical: pathFor(page, locale),
    languages: buildLanguageAlternates(page),
  };
}

/**
 * hreflang para un post de blog individual — a diferencia de `buildLanguageAlternates`, un post
 * puede no existir todavía en todos los locales, así que solo se listan los que sí lo tienen.
 * x-default apunta al primer locale disponible (hoy siempre "en").
 */
export function buildBlogPostLanguageAlternates(slug: string): Record<string, string> {
  const available = LOCALE_CODES.filter((code) => getBlogPost(code, slug) !== undefined);
  const languages = available.reduce<Record<string, string>>((acc, code) => {
    acc[code] = absoluteUrl(withLocalePrefix(`/blog/${slug}`, code));
    return acc;
  }, {});
  if (available.length > 0) {
    languages["x-default"] = absoluteUrl(withLocalePrefix(`/blog/${slug}`, available[0]));
  }
  return languages;
}

/** Variante de `buildBlogPostLanguageAlternates` con el shape que espera `Metadata["alternates"]`. */
export function buildBlogPostAlternates(slug: string): Metadata["alternates"] {
  return { languages: buildBlogPostLanguageAlternates(slug) };
}

/** Metadata base compartida por los 2 root layouts ((en) y [locale]) — cada page.tsx la extiende. */
export function buildBaseMetadata(locale: LocaleCode): Metadata {
  const site = getSiteContent(locale);
  return {
    metadataBase: new URL(SITE_URL),
    title: site.metadataTitle,
    description: site.metadataDescription,
    openGraph: {
      title: site.metadataTitle,
      description: site.metadataDescription,
      url: absoluteUrl(pathFor("home", locale)),
      siteName: site.brand,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
      locale: OG_LOCALE[locale],
      type: "website",
    },
  };
}

/** Título/descripción de `/agenda` por idioma — no existe un campo de contenido para esto, se define aquí. */
export const AGENDA_METADATA: Record<LocaleCode, { title: string; description: string }> = {
  en: { title: "Book a conversation — Latcon", description: "Schedule a meeting with Latcon." },
  es: { title: "Agendar conversación — Latcon", description: "Reserva una reunión con Latcon." },
  fr: { title: "Réserver un échange — Latcon", description: "Planifiez une réunion avec Latcon." },
  pt: { title: "Agendar conversa — Latcon", description: "Agende uma reunião com a Latcon." },
};

export function buildOrganizationJsonLd(locale: LocaleCode) {
  const site = getSiteContent(locale);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Latcon",
    url: SITE_URL,
    logo: `${SITE_URL}/logo/logo_1_primary_horizontal.svg`,
    description: site.metadataDescription,
    email: "contacto@latconservices.com",
    areaServed: "CO",
  };
}
