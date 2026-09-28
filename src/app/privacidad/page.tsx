import { LayoutPagina } from "@/components/layout/LayoutPagina";
import { Contenedor } from "@/components/ui/Contenedor";
import { PrivacyPolicy } from "@/features/privacy/PrivacyPolicy";
import { metadatosPagina } from "@/lib/metadatos";
import { RUTAS } from "@/config/sitio/mapa";

export const metadata = metadatosPagina({
  titulo: "Política de Privacidad",
  descripcion: "Cómo Latcon recopila, usa y protege tus datos personales.",
  ruta: RUTAS.privacidad,
});

export default function PrivacidadPage() {
  return (
    <LayoutPagina ruta={RUTAS.privacidad} fondo="tinted">
      <Contenedor>
        <PrivacyPolicy />
      </Contenedor>
    </LayoutPagina>
  );
}
