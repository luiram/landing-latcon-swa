/** Tipos y utilidades de navegación. No contienen texto: el contenido vive en src/config/sitio/. */

export type EnlaceNav = {
  etiqueta: string;
  ruta: string;
};

export type GrupoNav = {
  titulo: string;
  /** Frase corta bajo el título del grupo, dentro del desplegable. */
  frase?: string;
  enlaces: readonly EnlaceNav[];
};

export type EntradaMenu =
  | { tipo: "enlace"; etiqueta: string; ruta: string }
  | {
      tipo: "desplegable";
      id: string;
      etiqueta: string;
      grupos: readonly GrupoNav[];
      /** Enlaces al pie del desplegable (overview, páginas relacionadas). */
      pie?: readonly EnlaceNav[];
    };

/** Página registrada en el mapa, con su padre para armar el breadcrumb. */
export type PaginaMapa = {
  etiqueta: string;
  padre?: string;
};

export type Miga = EnlaceNav & { actual: boolean };

/** `/soluciones/drones/` y `/soluciones/drones` son la misma ruta. */
export function normalizarRuta(ruta: string): string {
  if (ruta.length > 1 && ruta.endsWith("/")) return ruta.slice(0, -1);
  return ruta;
}

/** Rutas a las que lleva una entrada del menú, incluidas las de sus grupos y su pie. */
export function rutasDeEntrada(entrada: EntradaMenu): string[] {
  if (entrada.tipo === "enlace") return [entrada.ruta];
  return [
    ...entrada.grupos.flatMap((g) => g.enlaces.map((e) => e.ruta)),
    ...(entrada.pie ?? []).map((e) => e.ruta),
  ];
}

/** La entrada está activa si la ruta actual es una de sus rutas o cuelga de ella. */
export function entradaActiva(entrada: EntradaMenu, rutaActual: string): boolean {
  const actual = normalizarRuta(rutaActual);
  return rutasDeEntrada(entrada).some((r) => r !== "/" && (actual === r || actual.startsWith(r + "/")));
}

/** Breadcrumb de una ruta a partir del registro de páginas. El inicio siempre va primero. */
export function migasDe(ruta: string, paginas: Readonly<Record<string, PaginaMapa>>): Miga[] {
  const cadena: EnlaceNav[] = [];
  let actual: string | undefined = normalizarRuta(ruta);
  while (actual) {
    const pagina: PaginaMapa | undefined = paginas[actual];
    if (!pagina) break;
    cadena.unshift({ etiqueta: pagina.etiqueta, ruta: actual });
    actual = pagina.padre;
  }
  return cadena.map((m, i) => ({ ...m, actual: i === cadena.length - 1 }));
}
