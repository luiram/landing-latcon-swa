"use client";

import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { Boton } from "@/components/ui/Boton";
import { cn } from "@/lib/cn";
import { entradaActiva, type EnlaceNav, type EntradaMenu } from "@/lib/navegacion";

type HeaderProps = {
  menu: readonly EntradaMenu[];
  cta: EnlaceNav;
  logo: { src: string; alt: string };
  textos: {
    menuPrincipal: string;
    menuMovil: string;
    abrirMenu: string;
    cerrarMenu: string;
    inicio: string;
  };
};

type Desplegable = Extract<EntradaMenu, { tipo: "desplegable" }>;

/** Retraso al salir con el puntero, para poder cruzar del botón al panel sin que se cierre. */
const RETRASO_CIERRE_MS = 150;

const focoAnillo =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent";

function claseItem(activo: boolean, abierto = false) {
  return cn(
    "inline-flex items-center gap-1 rounded-pill px-3 py-1 text-body-sm tracking-tight transition-colors duration-200",
    focoAnillo,
    activo || abierto
      ? "bg-bg-warm/60 font-semibold text-text-strong"
      : "font-medium text-text-strong/90 hover:bg-glass-edge/40 hover:text-text-strong",
  );
}

type PanelProps = {
  entrada: Desplegable;
  pathname: string;
  onPointerEnter: () => void;
  onPointerLeave: (e: React.PointerEvent) => void;
};

/** Panel del desplegable de escritorio. Va justo después de su botón en el DOM para que Tab entre en él. */
function PanelDesplegable({ entrada, pathname, onPointerEnter, onPointerLeave }: PanelProps) {
  const variosGrupos = entrada.grupos.length > 1;
  return (
    <div
      id={`menu-${entrada.id}`}
      className="absolute left-1/2 top-full hidden -translate-x-1/2 pt-3 lg:block"
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      <div
        className={cn(
          "rounded-card border border-border-subtle bg-bg-page p-6 shadow-popover",
          variosGrupos ? "w-[min(46rem,calc(100vw-2rem))]" : "w-72",
        )}
      >
        <div className={cn("grid gap-6", variosGrupos && "grid-cols-3")}>
          {entrada.grupos.map((grupo) => (
            <div key={grupo.titulo}>
              <p className="text-label font-semibold uppercase tracking-eyebrow text-accent">{grupo.titulo}</p>
              {grupo.frase ? <p className="mt-1.5 text-caption leading-body text-text-muted">{grupo.frase}</p> : null}
              <ul className="mt-3 space-y-1">
                {grupo.enlaces.map((enlace) => (
                  <li key={enlace.ruta}>
                    <Link
                      href={enlace.ruta}
                      className={cn(
                        "-mx-2 block rounded-control px-2 py-1.5 text-body-sm font-medium text-text-strong transition-colors hover:bg-bg-warm hover:text-accent",
                        focoAnillo,
                      )}
                      aria-current={pathname === enlace.ruta ? "page" : undefined}
                    >
                      {enlace.etiqueta}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {entrada.pie?.length ? (
          <div className="mt-5 flex flex-wrap justify-between gap-3 border-t border-border-subtle pt-4">
            {entrada.pie.map((enlace) => (
              <Link
                key={enlace.ruta}
                href={enlace.ruta}
                className={cn(
                  "rounded-control text-body-sm font-semibold text-blue-mid-2 underline-offset-4 hover:underline",
                  focoAnillo,
                )}
              >
                {enlace.etiqueta} →
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function Header({ menu, cta, logo, textos }: HeaderProps) {
  const pathname = usePathname() ?? "/";
  const [abierto, setAbierto] = useState<string | null>(null);
  const [movilAbierto, setMovilAbierto] = useState(false);
  const [grupoMovil, setGrupoMovil] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const botones = useRef<Record<string, HTMLButtonElement | null>>({});
  const temporizador = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ultimoPuntero = useRef<string | null>(null);

  const cancelarCierre = useCallback(() => {
    if (temporizador.current) clearTimeout(temporizador.current);
    temporizador.current = null;
  }, []);

  const abrir = useCallback(
    (id: string) => {
      cancelarCierre();
      setAbierto(id);
    },
    [cancelarCierre],
  );

  const programarCierre = useCallback(() => {
    cancelarCierre();
    temporizador.current = setTimeout(() => setAbierto(null), RETRASO_CIERRE_MS);
  }, [cancelarCierre]);

  const alSalirConMouse = useCallback(
    (e: React.PointerEvent) => {
      if (e.pointerType === "mouse") programarCierre();
    },
    [programarCierre],
  );

  // Sombra más suave al hacer scroll.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Al navegar se cierra todo.
  useEffect(() => {
    setAbierto(null);
    setMovilAbierto(false);
    setGrupoMovil(null);
  }, [pathname]);

  // Esc cierra y devuelve el foco al botón; clic afuera cierra.
  useEffect(() => {
    if (!abierto && !movilAbierto) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (abierto) botones.current[abierto]?.focus();
      setAbierto(null);
      setMovilAbierto(false);
    };
    const onPointer = (e: PointerEvent) => {
      if (abierto && headerRef.current && !headerRef.current.contains(e.target as Node)) setAbierto(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [abierto, movilAbierto]);

  // Sin scroll de fondo con el menú móvil abierto.
  useEffect(() => {
    if (!movilAbierto) return;
    const previo = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previo;
    };
  }, [movilAbierto]);

  useEffect(() => cancelarCierre, [cancelarCierre]);

  return (
    <>
      <header className="pointer-events-none fixed left-0 right-0 top-3 z-50 flex justify-center px-4 sm:top-4 sm:px-6">
        <div
          ref={headerRef}
          className={cn(
            "pointer-events-auto relative flex h-[48px] w-full max-w-[min(75rem,calc(100vw-2rem))] items-center gap-2 rounded-pill border px-3 backdrop-blur-2xl backdrop-saturate-[110%] transition-[box-shadow,border-color,background-color,backdrop-filter] duration-300 sm:gap-2.5 sm:px-3.5",
            scrolled
              ? "border-glass-edge/26 bg-bg-glass/82 shadow-glass-scrolled backdrop-brightness-[1.06] backdrop-contrast-[0.96]"
              : "border-glass-edge/20 bg-bg-glass/68 shadow-glass backdrop-brightness-[1.18] backdrop-contrast-[0.92]",
          )}
        >
          <Link
            href="/"
            aria-label={textos.inicio}
            className={cn(
              "flex h-full shrink-0 items-center rounded-pill px-0.5 transition-opacity hover:opacity-[0.88]",
              focoAnillo,
            )}
          >
            <img
              src={logo.src}
              alt={logo.alt}
              className="h-[46px] w-auto max-h-full object-contain object-left"
              draggable={false}
            />
          </Link>

          <nav className="hidden flex-1 justify-center gap-1 lg:flex" aria-label={textos.menuPrincipal}>
            {menu.map((entrada) => {
              const activo = entradaActiva(entrada, pathname);
              if (entrada.tipo === "enlace") {
                return (
                  <Link
                    key={entrada.ruta}
                    href={entrada.ruta}
                    className={claseItem(activo)}
                    aria-current={activo ? "page" : undefined}
                  >
                    {entrada.etiqueta}
                  </Link>
                );
              }
              const estaAbierto = abierto === entrada.id;
              return (
                <Fragment key={entrada.id}>
                  <button
                    ref={(el) => {
                      botones.current[entrada.id] = el;
                    }}
                    type="button"
                    className={claseItem(activo, estaAbierto)}
                    aria-expanded={estaAbierto}
                    aria-controls={`menu-${entrada.id}`}
                    onPointerDown={(e) => {
                      ultimoPuntero.current = e.pointerType;
                    }}
                    onClick={() => {
                      // Con mouse el hover ya lo abrió: el clic no debe cerrarlo. Teclado y táctil alternan.
                      const conMouse = ultimoPuntero.current === "mouse";
                      ultimoPuntero.current = null;
                      if (estaAbierto && conMouse) return;
                      if (estaAbierto) setAbierto(null);
                      else abrir(entrada.id);
                    }}
                    onPointerEnter={(e) => e.pointerType === "mouse" && abrir(entrada.id)}
                    onPointerLeave={alSalirConMouse}
                  >
                    {entrada.etiqueta}
                    <ChevronDown
                      aria-hidden
                      className={cn("size-3.5 transition-transform duration-200", estaAbierto && "rotate-180")}
                    />
                  </button>
                  {estaAbierto ? (
                    <PanelDesplegable
                      entrada={entrada}
                      pathname={pathname}
                      onPointerEnter={cancelarCierre}
                      onPointerLeave={alSalirConMouse}
                    />
                  ) : null}
                </Fragment>
              );
            })}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-4 sm:gap-5">
            <Boton
              href={cta.ruta}
              variante="primario"
              className="hidden h-9 shrink-0 items-center px-4 py-0 text-body-sm leading-none sm:inline-flex"
            >
              {cta.etiqueta}
            </Boton>
            <button
              type="button"
              className={cn(
                "inline-flex size-9 items-center justify-center rounded-pill border border-glass-edge/36 bg-bg-glass/55 text-text-strong shadow-glass-sm backdrop-blur-xl transition-colors hover:border-glass-edge/46 hover:bg-bg-glass/72 lg:hidden",
                focoAnillo,
              )}
              aria-expanded={movilAbierto}
              aria-controls="menu-movil"
              aria-label={movilAbierto ? textos.cerrarMenu : textos.abrirMenu}
              onClick={() => setMovilAbierto((v) => !v)}
            >
              {movilAbierto ? <X className="size-[1.125rem]" /> : <Menu className="size-[1.125rem]" />}
            </button>
          </div>
        </div>
      </header>

      {movilAbierto ? (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-overlay/28 backdrop-blur-[2px]"
            aria-label={textos.cerrarMenu}
            onClick={() => setMovilAbierto(false)}
          />
          <div
            id="menu-movil"
            className="absolute left-4 right-4 top-[4.25rem] max-h-[min(75vh,calc(100vh-6rem))] overflow-y-auto rounded-card border border-border-subtle bg-bg-page p-4 shadow-popover sm:left-6 sm:right-6 sm:top-[4.5rem]"
          >
            <nav className="flex flex-col gap-1" aria-label={textos.menuMovil}>
              {menu.map((entrada) => {
                const activo = entradaActiva(entrada, pathname);
                if (entrada.tipo === "enlace") {
                  return (
                    <Link
                      key={entrada.ruta}
                      href={entrada.ruta}
                      className={cn(
                        "rounded-card px-4 py-3.5 text-body-sm tracking-tight text-text-strong transition-colors hover:bg-bg-warm",
                        activo ? "bg-bg-warm font-semibold" : "font-medium",
                      )}
                      aria-current={activo ? "page" : undefined}
                    >
                      {entrada.etiqueta}
                    </Link>
                  );
                }
                const expandido = grupoMovil === entrada.id;
                return (
                  <div key={entrada.id}>
                    <button
                      type="button"
                      className={cn(
                        "flex w-full items-center justify-between rounded-card px-4 py-3.5 text-left text-body-sm tracking-tight text-text-strong transition-colors hover:bg-bg-warm",
                        activo ? "font-semibold" : "font-medium",
                      )}
                      aria-expanded={expandido}
                      aria-controls={`menu-movil-${entrada.id}`}
                      onClick={() => setGrupoMovil(expandido ? null : entrada.id)}
                    >
                      {entrada.etiqueta}
                      <ChevronDown
                        aria-hidden
                        className={cn("size-4 transition-transform duration-200", expandido && "rotate-180")}
                      />
                    </button>
                    {expandido ? (
                      <div id={`menu-movil-${entrada.id}`} className="space-y-4 px-4 pb-3 pt-1">
                        {entrada.grupos.map((grupo) => (
                          <div key={grupo.titulo}>
                            <p className="text-label font-semibold uppercase tracking-eyebrow text-accent">
                              {grupo.titulo}
                            </p>
                            <ul className="mt-1.5">
                              {grupo.enlaces.map((enlace) => (
                                <li key={enlace.ruta}>
                                  <Link
                                    href={enlace.ruta}
                                    className="block rounded-control py-2 text-body-sm font-medium text-text-strong hover:text-accent"
                                    aria-current={pathname === enlace.ruta ? "page" : undefined}
                                  >
                                    {enlace.etiqueta}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                        {entrada.pie?.map((enlace) => (
                          <Link
                            key={enlace.ruta}
                            href={enlace.ruta}
                            className="block text-body-sm font-semibold text-blue-mid-2"
                          >
                            {enlace.etiqueta} →
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </nav>
            <div className="mt-4 border-t border-border-subtle pt-4 sm:hidden">
              <Boton href={cta.ruta} variante="primario" className="w-full justify-center">
                {cta.etiqueta}
              </Boton>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
