# Scripts de despliegue (Azure)

## Requisitos

- **Node.js 20+** (recomendado 22)
- **Azure Functions Core Tools** (`func`) — [instalación](https://learn.microsoft.com/azure/azure-functions/functions-run-local)
- Para SWA por CLI: token de despliegue del recurso Static Web Apps
- Para Functions: nombre del Function App ya creado en Azure

## Cambio importante en Next.js

El sitio usa **`output: "export"`** ([`next.config.ts`](../../next.config.ts)): el build genera la carpeta **`out/`** (HTML estático), compatible con **Azure Static Web Apps**. Las imágenes van con `images.unoptimized: true`.

Tras `npm run build`, **no** uses `next start` para servir producción local; usa por ejemplo:

```bash
npx serve@14 out -p 3000
```

(o el script `npm run preview:out` en la raíz del repo).

## Scripts

| Script | Descripción |
|--------|-------------|
| [`build-all.ps1`](./build-all.ps1) | `npm ci` + `next build` (raíz) + build de `api/`. |
| [`build-all.sh`](./build-all.sh) | Equivalente en Bash (CI/Linux). |
| [`publish-functions.ps1`](./publish-functions.ps1) | Compila `api/` y ejecuta `func azure functionapp publish <nombre>`. |
| [`publish-swa.ps1`](./publish-swa.ps1) | Despliega `out/` con `@azure/static-web-apps-cli` (variable `SWA_DEPLOYMENT_TOKEN`). Opción `-IncludeApi` si el SWA empaqueta la API del repo. |

### Ejemplo (PowerShell)

```powershell
# 1) Artefactos
.\scripts\deploy\build-all.ps1

# 2) API (Function App vinculado o independiente)
.\scripts\deploy\publish-functions.ps1 -FunctionAppName func-latcon-booking-prd

# 3) Front (SWA)
$env:SWA_DEPLOYMENT_TOKEN = "<token del portal>"
.\scripts\deploy\publish-swa.ps1 -IncludeApi   # o sin -IncludeApi si la API es otro recurso
```

Si la **API está en un Function App aparte** (recomendado para Fase 1 con CORS y URL fija), despliega Functions con el script 2 y el front **sin** `-IncludeApi`; configura `NEXT_PUBLIC_FUNCTIONS_BASE_URL` en el build (GitHub variable o `.env.production` local) apuntando a la URL del Function App.

## GitHub Actions

Workflow: [`.github/workflows/azure-static-web-apps.yml`](../../.github/workflows/azure-static-web-apps.yml).

1. En Azure Portal: Static Web App → **Manage deployment token** → copiar token.
2. En GitHub: **Settings → Secrets → Actions** → `AZURE_STATIC_WEB_APPS_API_TOKEN`.
3. Opcional: **Variables** → `NEXT_PUBLIC_FUNCTIONS_BASE_URL` = URL HTTPS del Function App.

Documentación ampliada: [`docs/azure-swa.md`](../../docs/azure-swa.md).
