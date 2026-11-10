# 0007 · Textos legales sin abogado, contraste del acento y drones sin pulverización

Fecha: 2026-11-10
Estado: aceptada (paso 8a)

## Contexto
- El paso 7a dejó `/tratamiento-de-datos` y `/privacidad` como borrador "para revisión legal antes de publicar". La investigación preparatoria está en `docs/consulta-legal.md`.
- La auditoría del paso 8a encontró que el acento `#f58220` no cumple WCAG 2.1 AA: 2,59:1 con texto blanco en los botones y 2,37:1 como texto sobre blanco, en todas las páginas.
- El aviso de cookies era un modal que bloqueaba y desenfocaba la primera pantalla, y Google Analytics cargaba en modo "avanzado" (enviaba señales sin cookies antes de la elección), en contradicción con lo que decía la política.
- `/soluciones/drones` ofrecía "pulverización agrícola". La consulta legal (tema 9) lo marca como riesgo alto: la aspersión comercial exige certificado de explotador UAS (RAC 100) y requisitos del ICA que LATCON no tiene.

## Decisión
1. **Los textos legales los redacta LATCON con investigación propia, sin concepto de abogado.** Decisión de la dirección (2026-11-10). Datos definidos: área responsable "Gerencia General", canal `contacto@latconservices.com`, conservación de prospectos 24 meses, correo corporativo en Google, videollamadas en Google Meet, WhatsApp como canal de seguimiento.
2. **Transmisión internacional declarada y autorizada.** La base de reservas está en Azure Brazil South; la Function y ACS, en Estados Unidos. Brasil no está en la lista de países con nivel adecuado de la SIC (Circular Única, Título V, num. 3.2, texto de la Circular 002 de 2018) [verificado]. La política nombra cada encargado con su país, y la casilla de `/agenda` autoriza la transmisión a proveedores en Brasil y Estados Unidos. Así no se depende de que el DPA de Microsoft cumpla el art. 25 del Decreto 1377.
3. **Acento de interfaz `#c2410c`** (`--c-orange-700`, 5,2:1 con blanco). `#f58220` queda como primitivo histórico, sin uso en texto. Los textos naranjas ya no usan opacidad (`text-accent/80` y similares pasan a sólidos).
4. **Consent Mode básico.** Ningún script de Google se carga hasta que el visitante acepta. El aviso no bloquea el sitio, ofrece "Rechazar" en la primera capa y se reabre con "Configurar cookies" en el footer. Revocar borra las cookies `_ga*` y recarga la página.
5. **Drones sin pulverización ni aspersión** en ninguna página. La línea queda en monitoreo RGB y multiespectral, levantamiento y mapeo, posicionamiento RTK e integración de datos. Se agrega "Qué necesitas antes" (escalón 1).
6. **WhatsApp** figura en la política como canal de seguimiento, pero no como CTA: los mensajes de error remiten al correo.

## Verificado en fuente oficial
- UVT 2026: $52.374 (Resolución DIAN 000238 de 2025). Umbral del RNBD (100.000 UVT): $5.237.400.000. Falta que el contador confirme que los activos de LATCON están por debajo.
- Lista de países con nivel adecuado (SIC): incluye Estados Unidos; no incluye Brasil.
- Azure SQL `sqldb-latcon-booking`: cifrado en reposo (TDE) activo.

## Consecuencias
- Se acepta el riesgo de publicar textos legales sin revisión de abogado. Si la operación crece (clientes con datos sensibles, proyectos de IA de alto riesgo, venta de drones a consumidores), conviene reabrir esta decisión.
- Cada cambio del texto de la política o de la casilla cambia `VERSION_POLITICA` y se registra en `docs/legal/versiones.md`.
- El cambio de acento altera el aspecto de todo el sitio frente a `landing-v1`; las comparaciones píxel a píxel contra `landing-v1` dejan de coincidir en el color.
- Quedan fuera del sitio, como documentos internos pendientes: manual interno de tratamiento (obligatorio, art. 17 lit. k de la Ley 1581), procedimiento de incidentes y formatos de contrato de transmisión (`docs/consulta-legal.md` §(d)).
- Volver a ofrecer pulverización exige el certificado de explotador UAS propio o de un aliado, y una redacción que lo diga.
