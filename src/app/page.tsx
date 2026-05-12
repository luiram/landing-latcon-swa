import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Problems } from "@/components/sections/Problems";
import { Solutions } from "@/components/sections/Solutions";
import { Verticals } from "@/components/sections/Verticals";
import { Process } from "@/components/sections/Process";
import { Differentiators } from "@/components/sections/Differentiators";
import { About } from "@/components/sections/About";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problems />
        <Solutions />
        <Verticals />
        <Process />
        <Differentiators />
        <About />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
