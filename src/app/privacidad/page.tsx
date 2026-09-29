import { LayoutPagina } from "@/components/layout/LayoutPagina";
import { Hero } from "@/components/sections/Hero";
import { TextoConImagen } from "@/components/sections/TextoConImagen";
import { PRIVACIDAD } from "@/config/sitio/legal";
import { metadatosPagina } from "@/lib/metadatos";

export const metadata = metadatosPagina({ ...PRIVACIDAD.metadatos, ruta: PRIVACIDAD.ruta });

/** /privacidad: aviso de privacidad y cookies; remite a /tratamiento-de-datos. */
export default function PrivacidadPage() {
  const { hero, bloques } = PRIVACIDAD;
  return (
    <LayoutPagina ruta={PRIVACIDAD.ruta}>
      <Hero variante="full" {...hero} />
      <TextoConImagen variante="full" bloques={bloques} />
    </LayoutPagina>
  );
}
