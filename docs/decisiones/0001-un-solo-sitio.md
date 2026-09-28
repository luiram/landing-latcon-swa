# 0001 · Un solo sitio: la landing pasa a ser el home

Fecha: 2026-09-27
Estado: aceptada

## Contexto
latconservices.com es hoy una landing de un solo scroll: 6 secciones, 6.130 px de alto a 1440 px y 992 palabras en `<main>` (medido el 2026-09-27 sobre `landing-v1`). El copy funciona y es el mejor activo comercial que existe. El plan es un sitio de 21 páginas (docs/recomendaciones-sitio.md §1.3).

## Decisión
- Mismo repositorio (`luiram/landing-latcon-swa`), mismo dominio y mismo código base.
- La landing se convierte en el home. Su contenido se redistribuye hacia las páginas interiores; no se duplica ni se archiva.
- El home resultante queda más corto que `landing-v1`: menos de 6.130 px de alto a 1440 px y menos de 992 palabras en `<main>`. Se mide igual que la línea base (export estático, Chromium, animaciones desactivadas).
- Las landings de campaña (`/lp/<evento>`) son rutas del mismo sitio, armadas con los mismos componentes.

## Alternativas descartadas
- Sitio paralelo en otro dominio o repositorio: compite con la landing en búsqueda, duplica despliegue, analítica y formularios, y uno de los dos se desactualiza.
- Arreglar la landing primero y construir el sitio después: el documento de recomendaciones lo descarta; los ajustes se hacen como parte de la construcción.

## Consecuencias
- Toda página nueva depende del mismo sistema de diseño (ADR 0002 y 0003).
- `/agenda` y la API de reservas no cambian de dirección; el sitio los reutiliza.
