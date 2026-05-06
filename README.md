# Landing Latcon (`2_plata`)

Landing B2B (Next.js + React + Tailwind) según la especificación y el brief en `1_bronce/`.

## Requisitos

- Node.js 20+ (recomendado 22 LTS) y npm.

## Instalación y desarrollo

```bash
cd 2_plata
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Contenido y marca

- Textos y listas: [`src/config/content.ts`](src/config/content.ts)
- Marca, email, LinkedIn, agenda, privacidad: [`src/config/site.ts`](src/config/site.ts)

## Fases

- **Fase 1**: estructura, secciones, copy, estilos base, responsive.
- **Fase 2**: microanimaciones (`Reveal`, stagger en diferenciadores), hovers en cards/CTA, navbar al scroll, hero visual (línea SVG animada + motion), `focus-visible` en enlaces y botones.
- **Fase 3**: SEO (`metadata`, sitemap, robots, OG), JSON-LD, enlaces finales.
