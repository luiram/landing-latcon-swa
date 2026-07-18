# GitHub Actions — CI/CD del front

Despliegue automático del sitio estático (**Next.js `output: "export"`** → carpeta `out/`) hacia **Azure Static Web Apps**.

## Repositorio

- **Org/usuario:** `luiram`
- **Repo:** `landing-latcon-swa`
- **Rama de producción:** `main`

## Workflow

Archivo: [`.github/workflows/azure-static-web-apps.yml`](../.github/workflows/azure-static-web-apps.yml)

**Nombre:** Azure Static Web Apps CI/CD

### Triggers

| Evento | Comportamiento |
|--------|----------------|
| `push` a `main` | Build + deploy a SWA |
| `workflow_dispatch` | Ejecución manual |
| `pull_request` (abierto/sync) | Build (entorno PR SWA si aplica) |
| `pull_request` (cerrado) | Job `close_pr_environment` |

### Job principal: Build and deploy

| Paso | Descripción |
|------|-------------|
| checkout | Código del repo |
| setup-node | Node **22** |
| Check API URL secret | Falla si falta `NEXT_PUBLIC_FUNCTIONS_BASE_URL` |
| npm ci | Instala dependencias raíz (sin `api/node_modules`) |
| Verify CSS native bindings | `require('lightningcss')` en Linux |
| Build static export | `npm run build` → genera `out/` |
| Upload build log on failure | Artefacto `build-log.txt` (3 días) |
| Verify out/ | Comprueba `out/index.html` |
| Deploy | `Azure/static-web-apps-deploy@v1` sube `out/` |

### Deploy SWA (parámetros clave)

```yaml
app_location: out
output_location: ""
skip_app_build: true
```

Con `skip_app_build: true`, **`app_location` es la carpeta ya compilada**, no la raíz del repo. Usar `app_location: /` + `output_location: out` provocaba fallos de deploy.

La **API no** se despliega en este workflow; vive en **Function App** aparte (`func-latcon-booking-prd`).

---

## Secrets (GitHub → Settings → Secrets and variables → Actions)

| Secret | Uso |
|--------|-----|
| `AZURE_STATIC_WEB_APPS_API_TOKEN_ASHY_STONE_04E30940F` | Token de despliegue del SWA (creado al enlazar GitHub en Azure) |
| `NEXT_PUBLIC_FUNCTIONS_BASE_URL` | URL del Function App **sin** barra final; se embebe en el build del front |

**Importante:** `NEXT_PUBLIC_*` debe ser **Secret**, no Variable, si el workflow usa `secrets.NEXT_PUBLIC_FUNCTIONS_BASE_URL`.

Valor de producción (ejemplo):

```text
https://func-latcon-booking-prd-euemhuf7drh3emac.centralus-01.azurewebsites.net
```

Al pegar en GitHub: sin comillas ni espacios extra (el workflow los elimina con `tr`).

---

## TypeScript y carpeta `api/`

El build de Next en CI **no** instala `api/node_modules`. El `tsconfig.json` raíz **excluye** `api/` para evitar:

```text
Cannot find module '@azure/functions'
```

La API se compila por separado (`cd api && npm run build`) al publicar Functions.

---

## Build local (reproducir CI)

```bash
npm ci --no-audit
CI=true NEXT_PUBLIC_FUNCTIONS_BASE_URL=https://func-latcon-booking-prd-euemhuf7drh3emac.centralus-01.azurewebsites.net npm run build
```

Comprobar: existe `out/index.html`, `out/agenda.html` y `out/privacy.html` (inglés, en la raíz — sin `trailingSlash`, Next exporta archivos planos, no `agenda/index.html`), más `out/es.html`+`out/es/agenda.html`+`out/es/privacy.html` y el mismo patrón para `fr`/`pt` (rutas por idioma desde la Fase 3 de i18n, ver `docs/latcon-v2-decisiones.md`).

---

## Troubleshooting

| Fallo | Causa habitual | Acción |
|-------|----------------|--------|
| Check API URL secret | Secret vacío o mal nombrado | Crear `NEXT_PUBLIC_FUNCTIONS_BASE_URL` en Secrets |
| Build static export | Tipos, lightningcss, memoria | Descargar artefacto `build-log`; ver abajo |
| Verify out/ | Build no exportó | Revisar `next.config.ts` `output: "export"` |
| Deploy SWA | Token inválido o `app_location` incorrecto | Renovar token en Azure; confirmar `app_location: out` |

### Errores de build frecuentes (ya resueltos en repo)

1. **Typecheck incluye `api/`** → `exclude: ["api"]` en `tsconfig.json`.
2. **ESLint en `.next`** → `eslint.ignoreDuringBuilds: true` en `next.config.ts`.
3. **lightningcss en Linux** → paso `require('lightningcss')` tras `npm ci`.

### Re-ejecutar workflow

GitHub → **Actions** → workflow → **Re-run all jobs** (tras corregir secrets o código).

---

## Relación con scripts locales

| Método | Cuándo |
|--------|--------|
| **GitHub Actions** | Despliegue normal del front a SWA |
| [`scripts/deploy/publish-swa.ps1`](../scripts/deploy/publish-swa.ps1) | Deploy manual con token SWA |
| [`scripts/deploy/publish-functions.ps1`](../scripts/deploy/publish-functions.ps1) | Deploy API (no está en CI) |

Ver también: [scripts/deploy/README.md](../scripts/deploy/README.md), [produccion.md](./produccion.md).
