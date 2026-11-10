/*
  Latcon — Paso 7 del sitio (ADR 0006).
  1. Prueba de la autorización de tratamiento de datos (Ley 1581 de 2012; Decreto 1377 de 2013, art. 7):
     fecha y hora del servidor en que se recibió la autorización y versión de la política aceptada.
  1b. Autorización opcional de comunicaciones comerciales (casilla aparte, sin marcar; paso 8a, ADR 0007):
     fecha y hora del servidor en que se recibió. NULL = no autorizó. Si la persona la retira, se deja en NULL
     y se anota la fecha del retiro en marketing_revoked_at_utc.
  2. Origen de la reserva (UTM, página de entrada y referente). Se llena desde el paso 7b.
  Columnas nulas: las reservas anteriores y las del formulario publicado hoy (sin casilla) quedan en NULL.
  Idempotente: se puede ejecutar más de una vez. No borra datos.
*/

IF COL_LENGTH(N'dbo.meeting_requests', N'data_consent_at_utc') IS NULL
  ALTER TABLE dbo.meeting_requests ADD data_consent_at_utc DATETIME2 NULL;
IF COL_LENGTH(N'dbo.meeting_requests', N'data_policy_version') IS NULL
  ALTER TABLE dbo.meeting_requests ADD data_policy_version NVARCHAR(20) NULL;
IF COL_LENGTH(N'dbo.meeting_requests', N'marketing_consent_at_utc') IS NULL
  ALTER TABLE dbo.meeting_requests ADD marketing_consent_at_utc DATETIME2 NULL;
IF COL_LENGTH(N'dbo.meeting_requests', N'marketing_revoked_at_utc') IS NULL
  ALTER TABLE dbo.meeting_requests ADD marketing_revoked_at_utc DATETIME2 NULL;

IF COL_LENGTH(N'dbo.meeting_requests', N'utm_source') IS NULL
  ALTER TABLE dbo.meeting_requests ADD utm_source NVARCHAR(100) NULL;
IF COL_LENGTH(N'dbo.meeting_requests', N'utm_medium') IS NULL
  ALTER TABLE dbo.meeting_requests ADD utm_medium NVARCHAR(100) NULL;
IF COL_LENGTH(N'dbo.meeting_requests', N'utm_campaign') IS NULL
  ALTER TABLE dbo.meeting_requests ADD utm_campaign NVARCHAR(150) NULL;
IF COL_LENGTH(N'dbo.meeting_requests', N'utm_content') IS NULL
  ALTER TABLE dbo.meeting_requests ADD utm_content NVARCHAR(150) NULL;
IF COL_LENGTH(N'dbo.meeting_requests', N'utm_term') IS NULL
  ALTER TABLE dbo.meeting_requests ADD utm_term NVARCHAR(150) NULL;
IF COL_LENGTH(N'dbo.meeting_requests', N'landing_path') IS NULL
  ALTER TABLE dbo.meeting_requests ADD landing_path NVARCHAR(500) NULL;
IF COL_LENGTH(N'dbo.meeting_requests', N'referrer') IS NULL
  ALTER TABLE dbo.meeting_requests ADD referrer NVARCHAR(500) NULL;
GO
