import Link from "next/link";
import { BotonPreferenciasCookies } from "@/components/analytics/BotonPreferenciasCookies";
import { Contenedor } from "@/components/ui/Contenedor";
import { cn } from "@/lib/cn";
import type { EnlaceNav, GrupoNav } from "@/lib/navegacion";

type FooterProps = {
  columnas: readonly GrupoNav[];
  legales: readonly EnlaceNav[];
  empresa: {
    marca: string;
    razonSocial: string;
    nit: string;
    regimen: string;
    direccion: string;
    telefono: string;
    telefonoHref: string;
    correo: string;
    descriptor: string;
    logo: string;
    logoAlt: string;
  };
  textos: { pie: string; legal: string; derechos: string; cookies: string };
  anio: number;
};

const enlace =
  "inline-flex min-h-6 items-center rounded-control text-body-sm text-text-muted transition-colors duration-200 hover:text-blue-mid-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-page";

export function Footer({ columnas, legales, empresa, textos, anio }: FooterProps) {
  return (
    <footer className="border-t border-border-subtle bg-bg-page pb-8 pt-12 sm:pt-14">
      <Contenedor>
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.3fr)_repeat(3,minmax(0,1fr))] md:gap-8">
          <div className="max-w-prose-narrow">
            <img src={empresa.logo} alt={empresa.logoAlt} className="h-11 w-auto" draggable={false} />
            <p className="mt-2.5 text-body-sm leading-body text-text-muted">{empresa.descriptor}</p>
          </div>

          <nav aria-label={textos.pie} className="contents">
            {columnas.map((columna) => (
              <div key={columna.titulo}>
                <p className="text-label font-semibold uppercase tracking-eyebrow text-text-primary">
                  {columna.titulo}
                </p>
                <ul className="mt-3 space-y-2">
                  {columna.enlaces.map((e) => (
                    <li key={e.ruta}>
                      <Link href={e.ruta} className={enlace}>
                        {e.etiqueta}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-10 border-t border-border-subtle pt-6 sm:mt-12">
          <address className="text-caption not-italic leading-body text-text-muted">
            <p>
              <span className="font-semibold text-text-primary">{empresa.razonSocial}</span> · {empresa.nit} ·{" "}
              {empresa.regimen}
            </p>
            <p>{empresa.direccion}</p>
            <p>
              <a href={empresa.telefonoHref} className={cn(enlace, "text-caption")}>
                {empresa.telefono}
              </a>{" "}
              ·{" "}
              <a href={`mailto:${empresa.correo}`} className={cn(enlace, "text-caption")}>
                {empresa.correo}
              </a>
            </p>
          </address>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <nav aria-label={textos.legal} className="flex flex-wrap gap-x-5 gap-y-2">
              {legales.map((e) => (
                <Link key={e.ruta} href={e.ruta} className={cn(enlace, "text-caption font-medium")}>
                  {e.etiqueta}
                </Link>
              ))}
              <BotonPreferenciasCookies etiqueta={textos.cookies} className={cn(enlace, "text-caption font-medium")} />
            </nav>
            <p className="text-caption text-text-muted">
              © {anio} {empresa.marca}. {textos.derechos}
            </p>
          </div>
        </div>
      </Contenedor>
    </footer>
  );
}
