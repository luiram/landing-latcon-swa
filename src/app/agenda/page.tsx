import { LayoutPagina } from "@/components/layout/LayoutPagina";
import { BookingWizard } from "@/features/booking/BookingWizard";
import { Contenedor } from "@/components/ui/Contenedor";
import { metadatosPagina } from "@/lib/metadatos";
import { RUTAS } from "@/config/sitio/mapa";
import { AGENDA } from "@/config/sitio/empresa-paginas";
import { GridDeTarjetas } from "@/components/sections/GridDeTarjetas";

export const metadata = metadatosPagina({
  titulo: "Agenda tu diagnóstico gratuito",
  descripcion:
    "Elige fecha y hora para un diagnóstico de 30 minutos, sin compromiso: revisamos cómo fluye tu operación y te damos una recomendación concreta.",
  ruta: RUTAS.agenda,
});

export default function AgendaPage() {
  return (
    <LayoutPagina ruta={RUTAS.agenda}>
      <Contenedor>
        <BookingWizard />
      </Contenedor>
      <GridDeTarjetas id="que-esperar" variante="full" columnas={3} {...AGENDA.queEsperar} />
    </LayoutPagina>
  );
}
