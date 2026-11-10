/**
 * Datos legales y de contacto de la empresa.
 * Fuente: docs/recomendaciones-sitio.md §1.1 y docs/contenido-sitio.md (Footer).
 */
export const EMPRESA = {
  marca: "Latcon",
  razonSocial: "LATIN CONSULTING SERVICES SAS",
  nit: "NIT 901.229.904-6",
  regimen: "Responsable de IVA",
  direccion: "Cra 7 Este 7-100, Cajicá, Cundinamarca, Colombia",
  /** La misma dirección por partes, para los datos estructurados (schema.org PostalAddress). */
  direccionPostal: { calle: "Cra 7 Este 7-100", ciudad: "Cajicá", region: "Cundinamarca", pais: "CO" },
  telefono: "+57 318 397 1073",
  telefonoHref: "tel:+573183971073",
  correo: "contacto@latconservices.com",
  descriptor: "Conectamos tu operación, tus datos y tu tecnología.",
  logo: "/logo/logo_latcon.svg",
  logoAlt: "Latcon Services",
} as const;

/** Textos de interfaz del chasis (etiquetas accesibles y rótulos). */
export const TEXTOS_CHASIS = {
  menuPrincipal: "Principal",
  menuMovil: "Menú",
  abrirMenu: "Abrir menú",
  cerrarMenu: "Cerrar menú",
  inicio: "Ir al inicio",
  migas: "Ruta de navegación",
  pie: "Enlaces del sitio",
  legal: "Información legal",
  derechos: "Todos los derechos reservados.",
  /** Reabre el aviso de cookies (paso 8a). */
  cookies: "Configurar cookies",
} as const;

/** Página 404 (src/app/not-found.tsx): la que sirve Azure para cualquier URL que no existe. */
export const NO_ENCONTRADA = {
  metadatos: { titulo: "Página no encontrada", descripcion: "La página que buscas no existe o cambió de lugar." },
  hero: {
    antetitulo: "Error 404",
    titulo: "Esta página no existe",
    bajada: "Puede que el enlace esté mal escrito o que la página haya cambiado de lugar. Desde el inicio llegas a los sectores, las soluciones y el método.",
    enlaceSecundario: { etiqueta: "Ir al inicio →", ruta: "/" },
  },
} as const;
