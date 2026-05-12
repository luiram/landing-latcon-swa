import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Problems } from "@/components/sections/Problems";
import { Solutions } from "@/components/sections/Solutions";
import { Verticals } from "@/components/sections/Verticals";
import { Process } from "@/components/sections/Process";
import { About } from "@/components/sections/About";

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
        <About />
      </main>
      <Footer />
    </>
  );
}
