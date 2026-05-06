import Image from "next/image";
import { content } from "@/config/content";
import { site } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

export function Hero() {
  const { chip, title, subtitle, ctaPrimary } = content.hero;

  return (
    <section className="relative scroll-mt-36 overflow-hidden border-b border-white/15 bg-[#101012] pb-20 pt-32 sm:pb-28 sm:pt-36 lg:pb-32 lg:pt-40">
      {/* Imagen de fondo + velos neutros (negro / charcoal / humo); calidez solo al final derecho */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src="/hero-background.webp"
          alt=""
          fill
          priority
          className="object-cover object-[64%_center] brightness-[1.06] contrast-[1.02] saturate-[1.06] sm:object-[62%_center] lg:object-[76%_center]"
          sizes="100vw"
        />
        {/* Velo base muy sutil, neutro */}
        <div className="absolute inset-0 bg-black/[0.045]" />
        {/* Gradiente principal: izquierda protegida → centro suave → derecha limpia (sin tinte azul) */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,12,0.78)_0%,rgba(16,16,18,0.62)_17%,rgba(22,22,26,0.36)_38%,rgba(12,12,14,0.12)_64%,rgba(0,0,0,0.04)_80%,rgba(255,248,242,0.08)_100%)]" />
        {/* Refuerzo solo en zona de texto: charcoal suave, no bloque pesado */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,10,0.42)_0%,rgba(14,14,16,0.2)_24%,rgba(18,18,20,0.08)_46%,transparent_70%)]" />
        {/* Calidez ligera a la derecha (luz natural / ambiente cálido) */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_54%,rgba(245,130,32,0.055)_80%,rgba(255,248,240,0.11)_100%)]" />
        {/* Móvil / tablet: humo neutro, legibilidad sin apelmazar */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/52 via-black/[0.14] to-black/46 lg:hidden" />
        {/* Anclaje inferior: smoke, no azul */}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(12,12,14,0.42)] via-transparent to-transparent to-42%" />
      </div>

      <Container className="relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-12 xl:gap-14">
          <Reveal className="lg:col-span-7 xl:col-span-8">
            <div className="max-w-[36rem] sm:max-w-[40rem] lg:max-w-[42rem] xl:max-w-[44rem]">
              <p className="inline-flex max-w-full rounded-full border border-white/16 bg-white/[0.06] px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-white/72 backdrop-blur-[2px] sm:px-4 sm:text-xs sm:tracking-[0.12em]">
                {chip}
              </p>
              <h1 className="mt-7 max-w-[min(100%,28rem)] text-balance text-4xl font-semibold leading-[1.16] tracking-tight text-white sm:mt-8 sm:max-w-[32rem] sm:text-[2.125rem] sm:leading-[1.14] lg:mt-9 lg:max-w-[36rem] lg:text-[2.5rem] lg:leading-[1.11] xl:text-[2.625rem] xl:leading-[1.09]">
                {title}
              </h1>
              <p className="mt-7 max-w-[min(100%,36rem)] text-pretty text-base leading-[1.7] text-white/90 sm:mt-8 sm:max-w-[38rem] sm:text-lg sm:leading-[1.74] lg:mt-9 lg:max-w-[40rem]">
                {subtitle}
              </p>
              <div className="mt-10 sm:mt-11">
                <Button href={site.agendaUrl} external variant="primary">
                  {ctaPrimary}
                </Button>
              </div>
            </div>
          </Reveal>
          <div className="hidden min-h-[min(52vh,400px)] lg:col-span-5 lg:block xl:col-span-4" aria-hidden />
        </div>
      </Container>
    </section>
  );
}
