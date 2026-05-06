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
          className="object-cover object-[68%_center] brightness-[0.94] contrast-[0.9] saturate-[0.8] sm:object-[70%_center] lg:object-[84%_center]"
          sizes="100vw"
        />
        {/* Velo base muy sutil, neutro */}
        <div className="absolute inset-0 bg-black/[0.115]" />
        {/* Gradiente principal: izquierda protegida → centro suave → derecha limpia (sin tinte azul) */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,6,8,0.97)_0%,rgba(10,10,12,0.86)_24%,rgba(16,16,20,0.62)_46%,rgba(14,14,16,0.33)_66%,rgba(0,0,0,0.14)_84%,rgba(255,248,242,0.04)_100%)]" />
        {/* Refuerzo solo en zona de texto: charcoal suave, no bloque pesado */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,7,0.56)_0%,rgba(10,10,12,0.4)_30%,rgba(15,15,17,0.24)_52%,transparent_76%)]" />
        {/* Velo local del bloque de texto para mejorar legibilidad sin tarjeta visible */}
        <div className="absolute left-0 top-[10%] h-[66%] w-[min(60rem,68vw)] bg-[radial-gradient(ellipse_at_left,rgba(5,5,7,0.72)_0%,rgba(8,8,10,0.48)_42%,rgba(8,8,10,0.08)_70%,rgba(8,8,10,0)_84%)] blur-[2px]" />
        {/* Calidez ligera a la derecha (luz natural / ambiente cálido) */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_66%,rgba(245,130,32,0.02)_88%,rgba(255,248,240,0.05)_100%)]" />
        {/* Móvil / tablet: humo neutro, legibilidad sin apelmazar */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/66 via-black/[0.26] to-black/56 lg:hidden" />
        {/* Anclaje inferior: smoke, no azul */}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(12,12,14,0.42)] via-transparent to-transparent to-42%" />
      </div>

      <Container className="relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-12 xl:gap-14">
          <Reveal className="lg:col-span-8 xl:col-span-9">
            <div className="max-w-[34rem] sm:max-w-[38rem] lg:max-w-[46rem] xl:max-w-[52rem]">
              <p className="inline-flex max-w-full rounded-full border border-white/12 bg-white/[0.045] px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-white/68 backdrop-blur-[2px] sm:px-4 sm:text-xs sm:tracking-[0.11em]">
                {chip}
              </p>
              <h1 className="mt-8 max-w-[min(100%,28.5rem)] text-balance text-[2.62rem] font-semibold leading-[1.16] tracking-normal text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.38)] sm:mt-9 sm:max-w-[32.5rem] sm:text-[2.4rem] sm:leading-[1.14] lg:mt-10 lg:max-w-[44rem] lg:text-[2.9rem] lg:leading-[1.1] xl:max-w-[48rem] xl:text-[3.08rem] xl:leading-[1.08]">
                {title}
              </h1>
              <p className="mt-10 max-w-[min(100%,31rem)] text-pretty text-[1.08rem] leading-[1.82] text-white/96 [text-shadow:0_2px_14px_rgba(0,0,0,0.3)] sm:mt-11 sm:max-w-[33rem] sm:text-[1.16rem] sm:leading-[1.84] lg:mt-12 lg:max-w-[46rem] xl:max-w-[50rem]">
                {subtitle}
              </p>
              <div className="mt-[3.35rem] sm:mt-[3.85rem]">
                <Button href={site.agendaUrl} external variant="primary">
                  {ctaPrimary}
                </Button>
              </div>
            </div>
          </Reveal>
          <div className="hidden min-h-[min(52vh,400px)] lg:col-span-4 lg:block xl:col-span-3" aria-hidden />
        </div>
      </Container>
    </section>
  );
}
