# 0005 · Rama `sitio-web` y despliegue

Fecha: 2026-09-27
Estado: aceptada

## Contexto
El público sigue viendo la landing hasta el lanzamiento. El 2026-08-07 un despliegue manual publicó por error un rediseño desde otra rama (ver MEMORY.md). El workflow de GitHub Actions publica en producción solo con push a `main`; un pull request hacia `main` crea un entorno de vista previa.

## Decisión
- La landing publicada queda etiquetada como `landing-v1` (commit `b1e9f21`).
- Todo el sitio se construye en la rama `sitio-web`, creada desde `main`.
- Cada paso aprobado cierra con un commit en `sitio-web`.
- La revisión visual se hace con un pull request `sitio-web` → `main`, que crea un entorno de vista previa. El pull request no se fusiona hasta el paso 8.
- Los arreglos urgentes sobre la landing publicada se hacen en `main` y se llevan a `sitio-web` con `git merge main`.
- Nadie publica a mano (`swa deploy`, `publish-swa`) un `out/` generado desde `sitio-web`.

## Alternativas descartadas
- Construir directamente en `main`: cada commit se publicaría.
- Un sitio de pruebas en otro recurso de Azure: costo y configuración extra para lo que el entorno de vista previa ya resuelve.

## Consecuencias
- `sitio-web` va a vivir varias semanas, contra la recomendación de ramas cortas del documento de buenas prácticas. Se compensa con merges frecuentes desde `main`.
- Los entornos de vista previa del plan Free son públicos para quien tenga la URL. No se comparten fuera del equipo.
