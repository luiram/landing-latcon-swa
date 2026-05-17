import type { LocaleCode } from "@/lib/locales";
import type { SiteContent } from "./types";

const siteEs: SiteContent = {
  brand: "Latcon",
  descriptor: "Soluciones que integran operación, datos y tecnología.",
  bookingPath: "/agenda",
  privacyUrl: "#privacidad",
  nav: [
    { label: "Soluciones", href: "#solutions" },
    { label: "Contextos", href: "#verticals" },
    { label: "Método", href: "#process" },
    { label: "Nosotros", href: "#nosotros" },
  ],
  ctaSchedule: "Agendar conversación",
  privacy: "Privacidad",
  copyright: "Todos los derechos reservados.",
  metadataDescription:
    "Soluciones que integran operación, datos y tecnología. Automatización, analítica e IA aplicada con enfoque consultivo.",
  navAriaMain: "Principal",
  navAriaMobile: "Móvil",
  navAriaFooter: "Enlaces de pie de página",
  openMenu: "Abrir menú",
  closeMenu: "Cerrar menú",
};

const siteEn: SiteContent = {
  brand: "Latcon",
  descriptor: "Solutions that integrate operations, data, and technology.",
  bookingPath: "/agenda",
  privacyUrl: "#privacidad",
  nav: [
    { label: "Solutions", href: "#solutions" },
    { label: "Contexts", href: "#verticals" },
    { label: "Method", href: "#process" },
    { label: "About us", href: "#nosotros" },
  ],
  ctaSchedule: "Schedule a conversation",
  privacy: "Privacy",
  copyright: "All rights reserved.",
  metadataDescription:
    "Solutions that integrate operations, data, and technology. Automation, analytics, and applied AI with a consultative approach.",
  navAriaMain: "Main",
  navAriaMobile: "Mobile",
  navAriaFooter: "Footer links",
  openMenu: "Open menu",
  closeMenu: "Close menu",
};

const sitePt: SiteContent = {
  brand: "Latcon",
  descriptor: "Soluções que integram operação, dados e tecnologia.",
  bookingPath: "/agenda",
  privacyUrl: "#privacidad",
  nav: [
    { label: "Soluções", href: "#solutions" },
    { label: "Contextos", href: "#verticals" },
    { label: "Método", href: "#process" },
    { label: "Sobre nós", href: "#nosotros" },
  ],
  ctaSchedule: "Agendar conversa",
  privacy: "Privacidade",
  copyright: "Todos os direitos reservados.",
  metadataDescription:
    "Soluções que integram operação, dados e tecnologia. Automação, analítica e IA aplicada com abordagem consultiva.",
  navAriaMain: "Principal",
  navAriaMobile: "Móvel",
  navAriaFooter: "Links do rodapé",
  openMenu: "Abrir menu",
  closeMenu: "Fechar menu",
};

const siteFr: SiteContent = {
  brand: "Latcon",
  descriptor: "Des solutions qui intègrent opérations, données et technologie.",
  bookingPath: "/agenda",
  privacyUrl: "#privacidad",
  nav: [
    { label: "Solutions", href: "#solutions" },
    { label: "Contextes", href: "#verticals" },
    { label: "Méthode", href: "#process" },
    { label: "À propos", href: "#nosotros" },
  ],
  ctaSchedule: "Planifier un entretien",
  privacy: "Confidentialité",
  copyright: "Tous droits réservés.",
  metadataDescription:
    "Des solutions qui intègrent opérations, données et technologie. Automatisation, analytique et IA appliquée avec une approche consultative.",
  navAriaMain: "Principal",
  navAriaMobile: "Mobile",
  navAriaFooter: "Liens du pied de page",
  openMenu: "Ouvrir le menu",
  closeMenu: "Fermer le menu",
};

const byLocale: Record<LocaleCode, SiteContent> = {
  es: siteEs,
  en: siteEn,
  pt: sitePt,
  fr: siteFr,
};

export function getSiteContent(locale: LocaleCode): SiteContent {
  return byLocale[locale] ?? siteEs;
}
