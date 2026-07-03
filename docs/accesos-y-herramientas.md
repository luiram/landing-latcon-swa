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
| **Google Workspace** (`admin.google.com`, plan Starter) | Bandeja de correo real del negocio: `luis.ramirez@latconservices.com` (buzón principal, usado también para prospección en frío con YAMM) y su alias `contacto@latconservices.com` (recibe notificación interna de cada reserva nueva + reportes agregados de DMARC desde 2026-07-03) | Cuenta Google Workspace propia del dominio | Quien revise reservas entrantes y/o dé seguimiento comercial |

### Dominio `latconservices.com`

- **Registrador**: Cloudflare, Inc. (mismo panel que el DNS — no hay una cuenta separada que buscar)
- **Fecha de expiración**: **16 de mayo de 2027**
- **Recomendación**: confirmar en Cloudflare → dominio → que la renovación automática esté activa con un método de pago vigente; poner recordatorio unos meses antes de la fecha de expiración

---

## Notas

- El login de Azure SQL con Entra ID reemplaza la necesidad de recordar usuario/contraseña de SQL Server (ver [azure-swa.md](./azure-swa.md) para detalle de arquitectura).
- Los *secrets* de despliegue (token SWA, URL de la API) viven dentro de GitHub → Settings → Secrets, documentados en [github-ci.md](./github-ci.md) — no se duplican aquí.
- Las variables de conexión de la Function App (`SQL_CONNECTION_STRING`, `ACS_*`, `ALLOWED_ORIGINS`) viven en Azure Portal → Function App → Configuración, documentadas en [produccion.md](./produccion.md).
- **2026-07-03**: la notificación interna de reservas y el `rua` de DMARC se migraron de `latconwebapp@gmail.com` (Gmail personal) a `contacto@latconservices.com` (alias de Google Workspace, mismo dominio). Esto se hizo para evitar el requisito de autorización cruzada de DMARC entre dominios distintos y para tener un correo de rol en vez de uno personal. Ver la variable `CONTACT_NOTIFICATION_TO` en la Function App y el registro `_dmarc` en Cloudflare.
- **2026-07-03**: el remitente de los correos transaccionales (`ACS_EMAIL_FROM`) también cambió de `DoNotReply@latconservices.com` a `contacto@latconservices.com` — como ahora es un buzón real, las respuestas de clientes sí llegan. Requirió registrar `contacto` como usuario válido en **ACS → Dominios → MailFrom addresses** (detalle en [email-acs.md](./email-acs.md)).
