import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { PrivacyPolicy } from "@/features/privacy/PrivacyPolicy";

export const metadata = {
  title: "Política de Privacidad — Latcon",
  description: "Cómo Latcon recopila, usa y protege tus datos personales.",
  alternates: { canonical: "/privacidad" },
  openGraph: {
    title: "Política de Privacidad — Latcon",
    description: "Cómo Latcon recopila, usa y protege tus datos personales.",
    url: "https://latconservices.com/privacidad",
    type: "website",
  },
};

export default function PrivacidadPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen scroll-mt-36 bg-[color-mix(in_srgb,var(--color-blue-mid-1)_12%,var(--color-bg-page))] pb-24 pt-28 sm:pt-32">
        <Container>
          <PrivacyPolicy />
        </Container>
      </main>
      <Footer />
    </>
  );
}
