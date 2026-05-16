import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BookingWizard } from "@/features/booking/BookingWizard";
import { Container } from "@/components/ui/Container";

export const metadata = {
  title: "Agendar conversación — Latcon",
  description: "Reserva una reunión con Latcon.",
};

export default function AgendaPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen scroll-mt-36 bg-bg-page pb-24 pt-28 sm:pt-32">
        <Container>
          <BookingWizard />
        </Container>
      </main>
      <Footer />
    </>
  );
}
