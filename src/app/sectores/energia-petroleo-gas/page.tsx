import { LayoutPagina } from "@/components/layout/LayoutPagina";
import { BandaCTA } from "@/components/sections/BandaCTA";
import { EscaleraContextual } from "@/components/sections/EscaleraContextual";
import { FranjaPrueba } from "@/components/sections/FranjaPrueba";
import { Hero } from "@/components/sections/Hero";
import { TextoConImagen } from "@/components/sections/TextoConImagen";
import { Timeline } from "@/components/sections/Timeline";
import { ENERGIA } from "@/config/sitio/sectores";
import { metadatosPagina } from "@/lib/metadatos";

export const metadata = metadatosPagina({ ...ENERGIA.metadatos, ruta: ENERGIA.ruta });

/**
 * Página de sector (docs/recomendaciones-sitio.md §1.4 y §1.6). Paso 5: prueba del sistema,
 * armada sin crear ni modificar ningún componente.
 */
export default function EnergiaPage() {
  const { hero, dolor, escalera, loQueHacemos, casos, metodo, cierre } = ENERGIA;

  return (
    <LayoutPagina ruta={ENERGIA.ruta}>
      <Hero variante="full" {...hero} />
      <TextoConImagen id="el-problema" variante="full" {...dolor} />
      <EscaleraContextual {...escalera} />
      <TextoConImagen id="lo-que-hacemos" variante="full" {...loQueHacemos} />
      <FranjaPrueba id="casos" variante="full" items={casos} />
      <Timeline id="metodo" variante="compact" {...metodo} />
      <BandaCTA variante="full" {...cierre} />
    </LayoutPagina>
  );
}
