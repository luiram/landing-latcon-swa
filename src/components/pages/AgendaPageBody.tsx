import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BookingWizard } from "@/features/booking/BookingWizard";
import { Container } from "@/components/ui/Container";
import type { LocaleCode } from "@/lib/locales";

export function AgendaPageBody({ locale }: { locale: LocaleCode }) {
  return (
    <>
      <Navbar locale={locale} />
      <main className="min-h-screen scroll-mt-36 bg-bg-page pb-24 pt-28 sm:pt-32">
        <Container>
          <BookingWizard locale={locale} />
        </Container>
      </main>
      <Footer locale={locale} />
    </>
  );
}
