import { LayoutPagina } from "@/components/layout/LayoutPagina";
import { BookingWizard } from "@/features/booking/BookingWizard";
import { Contenedor } from "@/components/ui/Contenedor";
import { metadatosPagina } from "@/lib/metadatos";
import { RUTAS } from "@/config/sitio/mapa";

export const metadata = metadatosPagina({
  titulo: "Agendar conversación",
  descripcion: "Reserva una reunión con Latcon.",
  ruta: RUTAS.agenda,
});

export default function AgendaPage() {
  return (
    <LayoutPagina ruta={RUTAS.agenda}>
      <Contenedor>
        <BookingWizard />
      </Contenedor>
    </LayoutPagina>
  );
}
