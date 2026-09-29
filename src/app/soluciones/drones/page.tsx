import { LayoutPagina } from "@/components/layout/LayoutPagina";
import { BandaCTA } from "@/components/sections/BandaCTA";
import { EscaleraContextual } from "@/components/sections/EscaleraContextual";
import { GridDeTarjetas } from "@/components/sections/GridDeTarjetas";
import { Hero } from "@/components/sections/Hero";
import { TextoConImagen } from "@/components/sections/TextoConImagen";
import { Timeline } from "@/components/sections/Timeline";
import { ESCALONES } from "@/config/sitio/mapa";
import { COMUN_ESCALON, DRONES, tarjetaEscalon } from "@/config/sitio/soluciones";
import { metadatosPagina } from "@/lib/metadatos";

export const metadata = metadatosPagina({ ...DRONES.metadatos, ruta: DRONES.ruta });

/** /soluciones/drones: el módulo del brief (docs/brief-drones.md), dentro del escalón 2. */
export default function DronesPage() {
  const { hero, posicionamiento, frentes, comoTrabajamos, despues, cierre } = DRONES;
  return (
    <LayoutPagina ruta={DRONES.ruta} aRasDelFooter>
      <Hero variante="full" {...hero} />
      <EscaleraContextual etiqueta={COMUN_ESCALON.etiquetaEscalera} escalones={ESCALONES} actual={2} />
      <TextoConImagen id="enfoque" variante="full" bloques={posicionamiento} />
      <GridDeTarjetas id="que-construimos" variante="full" columnas={2} {...frentes} />
      <Timeline id="como-trabajamos" variante="full" {...comoTrabajamos} />
      <GridDeTarjetas
        id="que-viene-despues"
        variante="full"
        columnas={2}
        encabezado={despues.encabezado}
        tarjetas={despues.destinos.map((n) => tarjetaEscalon(n))}
      />
      <BandaCTA variante="full" {...cierre} />
    </LayoutPagina>
  );
}
