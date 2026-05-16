# Requiere: Node 20+, build previo opcional
# Genera `out/` (Next export) y compila `api/dist` para SWA o publicación manual.
$ErrorActionPreference = "Stop"
$root = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
Set-Location $root

Write-Host "== Next.js (export -> out/) ==" -ForegroundColor Cyan
if (Test-Path "package-lock.json") { npm ci } else { npm install }
npm run build

Write-Host "== Azure Functions (api/) ==" -ForegroundColor Cyan
Push-Location (Join-Path $root "api")
if (Test-Path "package-lock.json") { npm ci } else { npm install }
npm run build
Pop-Location

Write-Host "Listo: carpeta out/ y api/dist. Siguiente: publish-swa.ps1 o GitHub Actions." -ForegroundColor Green
