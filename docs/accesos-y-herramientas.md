# Accesos y herramientas

Inventario de las herramientas externas que administran la landing y la agenda de Latcon. Sirve para identificar rápido a qué plataforma ir ante un incidente y quién debería tener acceso.

> **Este documento NUNCA debe contener contraseñas, tokens ni claves reales.** Solo referencia dónde vive cada acceso. Las credenciales reales van en un gestor de contraseñas compartido (ver abajo).

## Gestor de contraseñas del equipo

Las credenciales reales (usuario + contraseña + notas de MFA) se guardan en un **gestor de contraseñas con bóveda compartida** para el equipo — no en documentos, hojas de cálculo ni chats.

- Recomendado: **Bitwarden** (plan gratuito para empezar; plan Teams ~US$4-5/usuario/mes si se necesitan carpetas separadas y registro de accesos)
- Organizar por carpetas: una por herramienta de la tabla siguiente

---

## Inventario de herramientas

| Herramienta | Para qué sirve | Cómo se entra | Quién debería tener acceso |
|---|---|---|---|
| **Azure Portal** (portal.azure.com) | Contiene todo el backend: Function App (`func-latcon-booking-prd`), SQL, correo (ACS), hosting (Static Web App), presupuestos y facturación | Cuenta Microsoft `latcon_ia@hotmail.com`, tenant Entra ID por defecto | Los desarrolladores del equipo |
| **Azure SQL** (`sqldb-latcon-booking` en `sql-latcon-prd-2026`) | Base de datos de reservas (`appointments`, `companies`, `contacts`, etc.) | Autenticación **Microsoft Entra ID** (mismo login que Azure Portal, sin contraseña SQL separada) | Igual que Azure Portal |
| **GitHub** (`luiram/landing-latcon-swa`) | Código fuente + despliegue automático (GitHub Actions → Azure Static Web Apps) | Cuenta de GitHub del dueño del repositorio | Quien haga cambios de código o revise el CI/CD |
| **Cloudflare** (dash.cloudflare.com) | DNS de `latconservices.com`, SSL/proxy, SPF/DKIM/DMARC del correo, **y registrador del dominio** (confirmado por WHOIS/RDAP el 2026-07-03) | Cuenta Cloudflare | Quien administre DNS, correo o renovación del dominio |
| **Gmail `latconwebapp@gmail.com`** | Recibe notificación interna de cada reserva nueva + reportes agregados de DMARC | Cuenta de Google | Quien revise las reservas entrantes |

### Dominio `latconservices.com`

- **Registrador**: Cloudflare, Inc. (mismo panel que el DNS — no hay una cuenta separada que buscar)
- **Fecha de expiración**: **16 de mayo de 2027**
- **Recomendación**: confirmar en Cloudflare → dominio → que la renovación automática esté activa con un método de pago vigente; poner recordatorio unos meses antes de la fecha de expiración

---

## Notas

- El login de Azure SQL con Entra ID reemplaza la necesidad de recordar usuario/contraseña de SQL Server (ver [azure-swa.md](./azure-swa.md) para detalle de arquitectura).
- Los *secrets* de despliegue (token SWA, URL de la API) viven dentro de GitHub → Settings → Secrets, documentados en [github-ci.md](./github-ci.md) — no se duplican aquí.
- Las variables de conexión de la Function App (`SQL_CONNECTION_STRING`, `ACS_*`, `ALLOWED_ORIGINS`) viven en Azure Portal → Function App → Configuración, documentadas en [produccion.md](./produccion.md).
