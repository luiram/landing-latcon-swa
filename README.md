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
npm run preview:out   # sirve out/ en http://localhost:3000 (export estático)
```

Producción: el sitio se despliega con **GitHub Actions** a Azure Static Web Apps (`out/`). Ver [docs/github-ci.md](docs/github-ci.md).

## Contenido y marca

- Textos y listas: [`src/config/content.ts`](src/config/content.ts)
- Marca, descriptor, ruta de agenda y privacidad: [`src/config/site.ts`](src/config/site.ts)
- Flujo **Agendar conversación**: [`/agenda`](src/app/agenda/page.tsx), [`src/features/booking/`](src/features/booking/)
- API de reservas (Azure Functions): [`api/`](api/) — ver [`docs/azure-swa.md`](docs/azure-swa.md)
- SQL inicial: [`db/migrations/001_init.sql`](db/migrations/001_init.sql)

## Producción

- **Sitio:** https://latconservices.com · **Agenda:** https://latconservices.com/agenda

## Documentación

Índice completo: [**docs/README.md**](docs/README.md)

| Tema | Documento |
|------|-----------|
| Runbook producción | [docs/produccion.md](docs/produccion.md) |
| Azure (SWA, Functions, SQL) | [docs/azure-swa.md](docs/azure-swa.md) |
| Cloudflare / dominio | [docs/cloudflare-latconservices.md](docs/cloudflare-latconservices.md) |
| GitHub CI/CD | [docs/github-ci.md](docs/github-ci.md) |
| Operación agenda | [docs/agenda-operacion.md](docs/agenda-operacion.md) |
| Correo ACS | [docs/email-acs.md](docs/email-acs.md) |
| Mejoras (roadmap) | [docs/mejoras-roadmap.md](docs/mejoras-roadmap.md) |

## Fases

- **Fase 1**: estructura, secciones, copy, estilos base, responsive.
- **Fase 2**: microanimaciones (`Reveal`, stagger en diferenciadores), hovers en cards/CTA, navbar al scroll, hero visual (línea SVG animada + motion), `focus-visible` en enlaces y botones.
- **Fase 3**: SEO (`metadata`, sitemap, robots, OG), JSON-LD, enlaces finales.
