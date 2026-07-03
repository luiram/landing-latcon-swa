import type { LocaleCode } from "@/lib/locales";
import type { SiteContent } from "./types";

const siteEs: SiteContent = {
  brand: "Latcon",
  descriptor: "Conectamos tu operación, tus datos y tu tecnología.",
  metadataTitle: "Latcon — Operación, datos y tecnología para empresas en crecimiento",
  metadataDescription:
    "¿Qué tanto le cuesta a tu empresa operar con información dispersa? Integramos datos, procesos y tecnología para que tu organización gane visibilidad y capacidad de decisión.",
  bookingPath: "/agenda",
  privacyUrl: "/privacidad",
  nav: [
    { label: "Para quién", href: "#para-quien" },
    { label: "Soluciones", href: "#solutions" },
    { label: "Método", href: "#process" },
    { label: "Nosotros", href: "#nosotros" },
  ],
  ctaSchedule: "Agenda tu diagnóstico gratuito",
  privacy: "Privacidad",
  copyright: "Todos los derechos reservados.",
  navAriaMain: "Principal",
  navAriaMobile: "Móvil",
  navAriaFooter: "Enlaces de pie de página",
  openMenu: "Abrir menú",
  closeMenu: "Cerrar menú",
};

const siteEn: SiteContent = {
  brand: "Latcon",
  descriptor: "We connect your operations, your data, and your technology.",
  metadataTitle: "Latcon — Operations, data, and technology for growing companies",
  metadataDescription:
    "How much does scattered information cost your company? We integrate data, processes, and technology so your organization gains visibility and decision-making capacity.",
  bookingPath: "/agenda",
  privacyUrl: "/privacidad",
  nav: [
    { label: "Who we help", href: "#para-quien" },
    { label: "Solutions", href: "#solutions" },
    { label: "Method", href: "#process" },
    { label: "About us", href: "#nosotros" },
  ],
  ctaSchedule: "Book your free diagnostic",
  privacy: "Privacy",
  copyright: "All rights reserved.",
  navAriaMain: "Main",
  navAriaMobile: "Mobile",
  navAriaFooter: "Footer links",
  openMenu: "Open menu",
  closeMenu: "Close menu",
};

const sitePt: SiteContent = {
  brand: "Latcon",
  descriptor: "Conectamos sua operação, seus dados e sua tecnologia.",
  metadataTitle: "Latcon — Operação, dados e tecnologia para empresas em crescimento",
  metadataDescription:
    "Quanto custa à sua empresa operar com informação dispersa? Integramos dados, processos e tecnologia para ganhar visibilidade e capacidade de decisão.",
  bookingPath: "/agenda",
  privacyUrl: "/privacidad",
  nav: [
    { label: "Para quem", href: "#para-quien" },
    { label: "Soluções", href: "#solutions" },
    { label: "Método", href: "#process" },
    { label: "Sobre nós", href: "#nosotros" },
  ],
  ctaSchedule: "Agende seu diagnóstico gratuito",
  privacy: "Privacidade",
  copyright: "Todos os direitos reservados.",
  navAriaMain: "Principal",
  navAriaMobile: "Móvel",
  navAriaFooter: "Links do rodapé",
  openMenu: "Abrir menu",
  closeMenu: "Fechar menu",
};

const siteFr: SiteContent = {
  brand: "Latcon",
  descriptor: "Nous connectons votre opération, vos données et votre technologie.",
  metadataTitle: "Latcon — Opérations, données et technologie pour les entreprises en croissance",
  metadataDescription:
    "Combien coûte à votre entreprise une information dispersée ? Nous intégrons données, processus et technologie pour gagner en visibilité et en capacité de décision.",
  bookingPath: "/agenda",
  privacyUrl: "/privacidad",
  nav: [
    { label: "Pour qui", href: "#para-quien" },
    { label: "Solutions", href: "#solutions" },
    { label: "Méthode", href: "#process" },
    { label: "À propos", href: "#nosotros" },
  ],
  ctaSchedule: "Planifiez votre diagnostic gratuit",
  privacy: "Confidentialité",
  copyright: "Tous droits réservés.",
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
