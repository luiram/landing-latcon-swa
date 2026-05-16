# Requiere: Azure Functions Core Tools (`func`) en PATH, Node 20+
# Uso: .\scripts\deploy\publish-functions.ps1 -FunctionAppName func-latcon-booking-prd
param(
  [Parameter(Mandatory = $true)]
  [string] $FunctionAppName
)

$ErrorActionPreference = "Stop"
$root = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
Set-Location $root

Write-Host "== Build API (api/) ==" -ForegroundColor Cyan
Push-Location (Join-Path $root "api")
try {
  if (Test-Path "package-lock.json") { npm ci } else { npm install }
  npm run build

  # func debe ejecutarse desde la carpeta que contiene host.json (api/).
  # Sin local.settings.json + FUNCTIONS_WORKER_RUNTIME, Core Tools muestra
  # "Can't determine project language" y "Worker runtime cannot be 'None'".
  $lsPath = Join-Path (Get-Location) "local.settings.json"
  if (-not (Test-Path $lsPath)) {
    Write-Host "Aviso: no hay local.settings.json; se crea uno mínimo solo para publicar (sin secretos). Para desarrollo local, copia local.settings.json.example." -ForegroundColor Yellow
    @"
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "FUNCTIONS_WORKER_RUNTIME": "node"
  }
}
"@ | Set-Content -Path $lsPath -Encoding utf8
  }

  Write-Host "== Publicando $FunctionAppName ==" -ForegroundColor Cyan
  func azure functionapp publish $FunctionAppName
  if ($LASTEXITCODE -ne 0) {
    throw "func azure functionapp publish falló con código $LASTEXITCODE"
  }
}
finally {
  Pop-Location
}

Write-Host "OK. Revisa Application Settings: SQL_CONNECTION_STRING, ACS_*, CONTACT_NOTIFICATION_TO, ALLOWED_ORIGINS." -ForegroundColor Green
