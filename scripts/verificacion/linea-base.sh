#!/usr/bin/env bash
# Compila una etiqueta (por defecto landing-v1, lo publicado antes del sitio) en
# scripts/verificacion/out-<etiqueta>/. Usa un git worktree temporal: no toca la rama actual ni su out/.
#
#   bash scripts/verificacion/linea-base.sh [etiqueta]
set -euo pipefail

ETIQUETA="${1:-landing-v1}"
RAIZ="$(git rev-parse --show-toplevel)"
DESTINO="$RAIZ/scripts/verificacion/out-$ETIQUETA"
TMP_BASE="${TMPDIR:-${TEMP:-/tmp}}"
WT="$TMP_BASE/latcon-worktree-$ETIQUETA"
ES_WINDOWS=false
[[ "${OS:-}" == "Windows_NT" ]] && ES_WINDOWS=true

# El worktree usa un enlace al node_modules real. Hay que quitar el enlace ANTES de borrar
# el worktree; si no, el borrado puede seguirlo y vaciar el node_modules de verdad.
quitar_enlace() {
  [[ -e "$WT/node_modules" || -L "$WT/node_modules" ]] || return 0
  if $ES_WINDOWS; then
    MSYS_NO_PATHCONV=1 cmd /c rmdir "$(cygpath -w "$WT/node_modules")" >/dev/null
  else
    rm "$WT/node_modules"
  fi
  if [[ -e "$WT/node_modules" || -L "$WT/node_modules" ]]; then
    echo "No se pudo quitar el enlace $WT/node_modules. Quítalo a mano antes de borrar el worktree." >&2
    exit 1
  fi
}

limpiar() {
  [[ -d "$WT" ]] || return 0
  quitar_enlace
  git -C "$RAIZ" worktree remove --force "$WT"
}
trap limpiar EXIT

cd "$RAIZ"
limpiar
git worktree prune
git worktree add --detach "$WT" "$ETIQUETA" >/dev/null

# Mismas dependencias y variables que la copia de trabajo (el build usa NEXT_PUBLIC_*).
if $ES_WINDOWS; then
  MSYS_NO_PATHCONV=1 cmd /c mklink /J "$(cygpath -w "$WT/node_modules")" "$(cygpath -w "$RAIZ/node_modules")" >/dev/null
else
  ln -s "$RAIZ/node_modules" "$WT/node_modules"
fi
if [[ -f "$RAIZ/.env.local" ]]; then cp "$RAIZ/.env.local" "$WT/.env.local"; fi

(cd "$WT" && npx next build >/dev/null)

rm -rf "$DESTINO"
cp -r "$WT/out" "$DESTINO"
echo "Línea base de $ETIQUETA en $DESTINO"
