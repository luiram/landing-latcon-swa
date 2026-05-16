#!/usr/bin/env bash
# Genera out/ + api/dist. Uso: bash scripts/deploy/build-all.sh
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"

echo "== Next.js (export -> out/) =="
if [[ -f package-lock.json ]]; then npm ci; else npm install; fi
npm run build

echo "== Azure Functions (api/) =="
cd "$ROOT/api"
if [[ -f package-lock.json ]]; then npm ci; else npm install; fi
npm run build

echo "Listo."
