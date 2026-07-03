import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { PrivacyPolicy } from "@/features/privacy/PrivacyPolicy";

export const metadata = {
  title: "Política de Privacidad — Latcon",
  description: "Cómo Latcon recopila, usa y protege tus datos personales.",
};

export default function PrivacidadPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen scroll-mt-36 bg-bg-page pb-24 pt-28 sm:pt-32">
        <Container>
          <PrivacyPolicy />
        </Container>
      </main>
      <Footer />
    </>
  );
}
