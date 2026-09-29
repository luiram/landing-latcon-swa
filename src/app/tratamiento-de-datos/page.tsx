import { LayoutPagina } from "@/components/layout/LayoutPagina";
import { Hero } from "@/components/sections/Hero";
import { TextoConImagen } from "@/components/sections/TextoConImagen";
import { TRATAMIENTO_DATOS } from "@/config/sitio/legal";
import { metadatosPagina } from "@/lib/metadatos";

export const metadata = metadatosPagina({ ...TRATAMIENTO_DATOS.metadatos, ruta: TRATAMIENTO_DATOS.ruta });

/** /tratamiento-de-datos: política exigida por la Ley 1581 de 2012 (docs/recomendaciones-sitio.md §1.1, ADR 0006). */
export default function TratamientoDatosPage() {
  const { hero, bloques } = TRATAMIENTO_DATOS;
  return (
    <LayoutPagina ruta={TRATAMIENTO_DATOS.ruta}>
      <Hero variante="full" {...hero} />
      <TextoConImagen variante="full" numerado bloques={bloques} />
    </LayoutPagina>
  );
}
