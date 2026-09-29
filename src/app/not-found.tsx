import type { Metadata } from "next";
import { LayoutPagina } from "@/components/layout/LayoutPagina";
import { Hero } from "@/components/sections/Hero";
import { NO_ENCONTRADA } from "@/config/sitio/empresa";
import { CTA_PRINCIPAL } from "@/config/sitio/mapa";

export const metadata: Metadata = {
  title: `${NO_ENCONTRADA.metadatos.titulo} — Latcon`,
  description: NO_ENCONTRADA.metadatos.descripcion,
  robots: { index: false },
};

/** 404 del export estático (out/404.html). Azure la sirve por responseOverrides en public/staticwebapp.config.json. */
export default function NoEncontrada() {
  return (
    <LayoutPagina ruta="/404">
      <Hero variante="full" {...NO_ENCONTRADA.hero} cta={CTA_PRINCIPAL} />
    </LayoutPagina>
  );
}
