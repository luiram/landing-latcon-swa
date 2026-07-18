import { Nunito } from "next/font/google";

/**
 * Solo para titulares de las secciones oscuras "museo" (Soluciones, Experiencia, CTA final).
 * No se usa en el H1 del Hero a propósito — es el elemento LCP de la página y el criterio
 * de aceptación es Lighthouse mobile >=90; no vale el riesgo ahí.
 */
export const nunito = Nunito({
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
  variable: "--font-nunito",
});
