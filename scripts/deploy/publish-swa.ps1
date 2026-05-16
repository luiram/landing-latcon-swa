# Publica el front estático (out/) en Azure Static Web Apps.
# Requiere: token de despliegue (Portal SWA → Manage deployment token) o variable SWA_DEPLOYMENT_TOKEN
#
# Uso:
#   $env:SWA_DEPLOYMENT_TOKEN = "..."   # PowerShell
#   .\scripts\deploy\publish-swa.ps1
#
# Si el SWA incluye la API en el mismo recurso (carpeta api/):
#   .\scripts\deploy\publish-swa.ps1 -IncludeApi
param(
  [string] $DeploymentToken = $env:SWA_DEPLOYMENT_TOKEN,
  [switch] $IncludeApi
)

$ErrorActionPreference = "Stop"
if (-not $DeploymentToken) {
  throw "Define SWA_DEPLOYMENT_TOKEN o pasa -DeploymentToken (valor del portal Azure Static Web Apps)."
}

$root = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
Set-Location $root

if (-not (Test-Path "out")) {
  throw "No existe out/. Ejecuta primero scripts/deploy/build-all.ps1"
}

Write-Host "== Publicando Static Web App (desde $root) ==" -ForegroundColor Cyan
if ($IncludeApi) {
  npx --yes @azure/static-web-apps-cli deploy out --api-location api --deployment-token $DeploymentToken --env production
} else {
  npx --yes @azure/static-web-apps-cli deploy out --deployment-token $DeploymentToken --env production
}
if ($LASTEXITCODE -ne 0) {
  throw "swa deploy falló con código $LASTEXITCODE"
}
Write-Host "OK." -ForegroundColor Green
