import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Audience } from "@/components/sections/Audience";
import { FinalCta } from "@/components/sections/FinalCta";
import { Solutions } from "@/components/sections/Solutions";
import { Experience } from "@/components/sections/Experience";
import { Process } from "@/components/sections/Process";
import { About } from "@/components/sections/About";
import type { LocaleCode } from "@/lib/locales";

export function HomePageBody({ locale }: { locale: LocaleCode }) {
  return (
    <>
      <Navbar locale={locale} />
      <main>
        <Hero locale={locale} />
        <Audience locale={locale} />
        <Solutions locale={locale} />
        <Experience locale={locale} />
        <Process locale={locale} />
        <About locale={locale} />
        <FinalCta locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
