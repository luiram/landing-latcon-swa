import type { Metadata } from "next";
import { LayoutPagina } from "@/components/layout/LayoutPagina";
import { Hero } from "@/components/sections/Hero";
import { Audience } from "@/components/sections/Audience";
import { FinalCta } from "@/components/sections/FinalCta";
import { Solutions } from "@/components/sections/Solutions";
import { Process } from "@/components/sections/Process";
import { About } from "@/components/sections/About";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <LayoutPagina ruta="/">
      <Hero />
      <Audience />
      <Solutions />
      <Process />
      <About />
      <FinalCta />
    </LayoutPagina>
  );
}
