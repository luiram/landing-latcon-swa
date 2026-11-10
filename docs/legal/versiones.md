# Versiones de la política de tratamiento y de la casilla de /agenda

Prueba de la autorización (Decreto 1377 de 2013, art. 8) y conservación del modelo del aviso (art. 16).
Cada reserva guarda `data_policy_version`; con esa versión se ubica aquí el texto que la persona aceptó.
El texto íntegro de la política de cada versión está en `src/config/sitio/legal.ts` en el commit indicado:
`git show <commit>:src/config/sitio/legal.ts`.

| Versión | Vigente desde | Commit | Texto de la casilla de /agenda (obligatoria) |
|---|---|---|---|
| `2026-09-29` | Nunca se publicó (borrador del paso 7a) | `4112b59` | "Autorizo a LATIN CONSULTING SERVICES SAS a tratar mis datos personales para coordinar esta reunión y hacer su seguimiento, según la Política de tratamiento de datos." |
| `2026-11-10` | Lanzamiento (paso 8b) | commit del paso 8a | "Autorizo a LATIN CONSULTING SERVICES SAS a tratar mis datos personales para coordinar esta reunión, hacer su seguimiento, preparar una propuesta y saber por qué canal llegué, incluida su transmisión a proveedores en Brasil y Estados Unidos, según la Política de tratamiento de datos." |

## Casilla opcional de comunicaciones comerciales

Va debajo de la obligatoria, sin marcar. Se guarda como `marketing_consent_at_utc` (NULL = no autorizó) junto a la misma `data_policy_version`.

| Desde la versión | Texto |
|---|---|
| `2026-11-10` | "Opcional: también quiero recibir novedades, invitaciones a eventos y ofertas de LATCON por correo o WhatsApp. Puedo retirar esta autorización cuando quiera." |

Retiro: se pone `marketing_consent_at_utc` en NULL y se anota la fecha en `marketing_revoked_at_utc`.

Al cambiar el texto: nueva fila, nueva `VERSION_POLITICA` y, si el cambio es sustancial, aviso por correo a los titulares antes de aplicarlo.
