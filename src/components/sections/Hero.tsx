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
          className="object-cover object-[68%_center] brightness-[0.894] contrast-[0.848] saturate-[0.708] sm:object-[70%_center] lg:object-[84%_center]"
          sizes="100vw"
        />
        {/* Velo base muy sutil, neutro */}
        <div className="absolute inset-0 bg-black/[0.107]" />
        {/* Ligera bruma neutra: unifica izquierda/derecha sin aplanar la foto */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_125%_85%_at_22%_48%,rgba(10,10,12,0.028)_0%,rgba(10,10,11,0.018)_45%,rgba(10,10,11,0.032)_100%)]" />
        {/* Gradiente principal: izquierda intacta; más lectura hacia la derecha sin corte duro */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,10,0.87)_0%,rgba(10,10,12,0.79)_14%,rgba(12,12,15,0.66)_28%,rgba(14,14,18,0.46)_44%,rgba(12,12,14,0.26)_58%,rgba(11,11,13,0.21)_64%,rgba(9,9,11,0.168)_70%,rgba(8,8,10,0.138)_74%,rgba(7,7,9,0.114)_80%,rgba(6,6,8,0.09)_86%,rgba(5,5,7,0.068)_92%,rgba(6,6,7,0.056)_100%)]" />
        {/* Refuerzo en zona de texto */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,7,9,0.405)_0%,rgba(10,10,12,0.235)_26%,rgba(14,14,16,0.11)_48%,rgba(10,10,12,0.034)_68%,transparent_87%)]" />
        {/* Velo local del bloque de texto */}
        <div className="absolute left-0 top-[10%] h-[66%] w-[min(62rem,72vw)] bg-[radial-gradient(ellipse_at_left,rgba(8,8,10,0.505)_0%,rgba(10,10,12,0.248)_46%,rgba(10,10,12,0.058)_74%,transparent_90%)] blur-[3px]" />
        {/* Sin aclarado central: el copy manda; imagen como atmósfera */}
        {/* Velo ancho al tercio derecho: transición suave, tono neutro (sin manchas duras) */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_54%,rgba(12,12,14,0.042)_71%,rgba(11,11,12,0.064)_86%,rgba(10,10,11,0.078)_100%)]" />
        {/* Ventana / flare */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_118%_92%_at_97%_5%,rgba(17,15,14,0.14)_0%,rgba(12,11,11,0.056)_40%,transparent_64%)]" />
        {/* Figura derecha + mapa / detalle del borde */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_64%_74%_at_84%_36%,rgba(11,10,10,0.1)_0%,rgba(10,9,9,0.038)_48%,transparent_78%)]" />
        {/* Borde derecho */}
        <div className="absolute inset-0 bg-[linear-gradient(270deg,rgba(10,10,11,0.07)_0%,rgba(9,9,10,0.028)_28%,transparent_54%)]" />
        {/* Móvil / tablet */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/54 via-black/[0.22] to-black/46 lg:hidden" />
        {/* Anclaje inferior: smoke suave */}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(12,12,14,0.36)] via-transparent to-transparent to-42%" />
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
              <p className="mt-10 max-w-[min(100%,31rem)] text-pretty text-[1.045rem] font-normal leading-[1.92] tracking-[0.009em] text-white/88 [text-shadow:0_1px_14px_rgba(0,0,0,0.24)] sm:mt-11 sm:max-w-[33.5rem] sm:text-[1.105rem] sm:leading-[1.93] lg:mt-12 lg:max-w-[40.5rem] lg:text-[1.12rem] lg:leading-[1.94] xl:max-w-[42.5rem]">
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
