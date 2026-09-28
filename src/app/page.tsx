import type { Metadata } from "next";
import { LayoutPagina } from "@/components/layout/LayoutPagina";
import { BandaCTA } from "@/components/sections/BandaCTA";
import { FranjaPrueba } from "@/components/sections/FranjaPrueba";
import { GridDeTarjetas } from "@/components/sections/GridDeTarjetas";
import { Hero } from "@/components/sections/Hero";
import { Timeline } from "@/components/sections/Timeline";
import { INICIO } from "@/config/sitio/inicio";
import { PrefetchAgenda } from "@/features/booking/PrefetchAgenda";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/** Home: distribuidor, no embudo (docs/recomendaciones-sitio.md §1.5). Seis bloques cortos, cinco con salida. */
export default function Home() {
  const { hero, dondeTrabajamos, paraQuien, soluciones, metodo, cierre } = INICIO;

  return (
    <LayoutPagina ruta="/">
      <PrefetchAgenda />
      <Hero variante="compact" {...hero} />
      <FranjaPrueba id="donde-trabajamos" variante="compact" {...dondeTrabajamos} />
      <GridDeTarjetas id="para-quien" variante="compact" columnas={4} {...paraQuien} />
      <GridDeTarjetas id="soluciones" variante="compact" columnas={3} {...soluciones} />
      <Timeline id="metodo" variante="compact" {...metodo} />
      <BandaCTA variante="compact" {...cierre} />
    </LayoutPagina>
  );
}
