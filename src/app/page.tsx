import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Audience } from "@/components/sections/Audience";
import { FinalCta } from "@/components/sections/FinalCta";
import { Solutions } from "@/components/sections/Solutions";
import { Process } from "@/components/sections/Process";
import { About } from "@/components/sections/About";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Audience />
        <Solutions />
        <Process />
        <About />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
