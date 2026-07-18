import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { BlogIndex } from "@/features/blog/BlogIndex";
import type { LocaleCode } from "@/lib/locales";

export function BlogIndexPageBody({ locale }: { locale: LocaleCode }) {
  return (
    <>
      <Navbar locale={locale} />
      <main className="min-h-screen scroll-mt-36 bg-[color-mix(in_srgb,var(--color-blue-mid-1)_12%,var(--color-bg-page))] pb-24 pt-28 sm:pt-32">
        <Container>
          <BlogIndex locale={locale} />
        </Container>
      </main>
      <Footer locale={locale} />
    </>
  );
}
