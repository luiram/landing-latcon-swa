import { LayoutPagina } from "@/components/layout/LayoutPagina";
import { BookingWizard } from "@/features/booking/BookingWizard";
import { Container } from "@/components/ui/Container";
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
      <Container>
        <BookingWizard />
      </Container>
    </LayoutPagina>
  );
}
