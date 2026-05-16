/*
  Latcon — Fase 1 agendamiento (Azure SQL).
  Slots calculados en API; sin tabla maestra de slots.
  manual_slot_blocks: bloqueos manuales (futuro / admin).
  Festivos: fuera de MVP (solo lun–vie en código).
*/

IF OBJECT_ID(N'dbo.notification_logs', N'U') IS NOT NULL DROP TABLE dbo.notification_logs;
IF OBJECT_ID(N'dbo.appointments', N'U') IS NOT NULL DROP TABLE dbo.appointments;
IF OBJECT_ID(N'dbo.meeting_requests', N'U') IS NOT NULL DROP TABLE dbo.meeting_requests;
IF OBJECT_ID(N'dbo.contacts', N'U') IS NOT NULL DROP TABLE dbo.contacts;
IF OBJECT_ID(N'dbo.companies', N'U') IS NOT NULL DROP TABLE dbo.companies;
IF OBJECT_ID(N'dbo.manual_slot_blocks', N'U') IS NOT NULL DROP TABLE dbo.manual_slot_blocks;
GO

CREATE TABLE dbo.companies (
  id UNIQUEIDENTIFIER NOT NULL DEFAULT NEWSEQUENTIALID() PRIMARY KEY,
  name NVARCHAR(260) NOT NULL,
  sector NVARCHAR(160) NOT NULL,
  city_country NVARCHAR(200) NOT NULL,
  created_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);

CREATE TABLE dbo.contacts (
  id UNIQUEIDENTIFIER NOT NULL DEFAULT NEWSEQUENTIALID() PRIMARY KEY,
  company_id UNIQUEIDENTIFIER NOT NULL,
  full_name NVARCHAR(200) NOT NULL,
  role_title NVARCHAR(160) NULL,
  email NVARCHAR(320) NOT NULL,
  phone_whatsapp NVARCHAR(80) NOT NULL,
  created_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
  CONSTRAINT FK_contacts_company FOREIGN KEY (company_id) REFERENCES dbo.companies (id)
);

CREATE TABLE dbo.meeting_requests (
  id UNIQUEIDENTIFIER NOT NULL DEFAULT NEWSEQUENTIALID() PRIMARY KEY,
  contact_id UNIQUEIDENTIFIER NOT NULL,
  primary_need NVARCHAR(500) NOT NULL,
  free_text NVARCHAR(2000) NULL,
  locale CHAR(2) NOT NULL CONSTRAINT CK_meeting_requests_locale CHECK (locale IN ('es', 'en', 'pt', 'fr')),
  status NVARCHAR(40) NOT NULL DEFAULT N'scheduled',
  created_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
  CONSTRAINT FK_meeting_requests_contact FOREIGN KEY (contact_id) REFERENCES dbo.contacts (id)
);

CREATE TABLE dbo.appointments (
  id UNIQUEIDENTIFIER NOT NULL DEFAULT NEWSEQUENTIALID() PRIMARY KEY,
  meeting_request_id UNIQUEIDENTIFIER NOT NULL,
  company_id UNIQUEIDENTIFIER NOT NULL,
  contact_id UNIQUEIDENTIFIER NOT NULL,
  slot_start_utc DATETIME2 NOT NULL,
  slot_end_utc DATETIME2 NOT NULL,
  timezone_id NVARCHAR(64) NOT NULL CONSTRAINT DF_appointments_tz DEFAULT N'America/Bogota',
  status NVARCHAR(40) NOT NULL DEFAULT N'scheduled',
  idempotency_key NVARCHAR(80) NOT NULL,
  created_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
  CONSTRAINT FK_appointments_meeting_request FOREIGN KEY (meeting_request_id) REFERENCES dbo.meeting_requests (id),
  CONSTRAINT FK_appointments_company FOREIGN KEY (company_id) REFERENCES dbo.companies (id),
  CONSTRAINT FK_appointments_contact FOREIGN KEY (contact_id) REFERENCES dbo.contacts (id),
  CONSTRAINT UQ_appointments_idempotency UNIQUE (idempotency_key)
);

CREATE UNIQUE INDEX UQ_appointments_active_slot
  ON dbo.appointments (slot_start_utc, slot_end_utc)
  WHERE status = N'scheduled';

CREATE TABLE dbo.notification_logs (
  id UNIQUEIDENTIFIER NOT NULL DEFAULT NEWSEQUENTIALID() PRIMARY KEY,
  appointment_id UNIQUEIDENTIFIER NOT NULL,
  channel NVARCHAR(40) NOT NULL,
  status NVARCHAR(40) NOT NULL,
  provider_message_id NVARCHAR(200) NULL,
  error NVARCHAR(2000) NULL,
  payload_json NVARCHAR(MAX) NULL,
  created_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
  CONSTRAINT FK_notification_logs_appointment FOREIGN KEY (appointment_id) REFERENCES dbo.appointments (id)
);

CREATE TABLE dbo.manual_slot_blocks (
  id UNIQUEIDENTIFIER NOT NULL DEFAULT NEWSEQUENTIALID() PRIMARY KEY,
  block_start_utc DATETIME2 NOT NULL,
  block_end_utc DATETIME2 NOT NULL,
  reason NVARCHAR(300) NULL,
  created_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
  CONSTRAINT CK_manual_slot_blocks_range CHECK (block_end_utc > block_start_utc)
);

CREATE INDEX IX_appointments_slot_range ON dbo.appointments (slot_start_utc, slot_end_utc) WHERE status = N'scheduled';
CREATE INDEX IX_manual_slot_blocks_range ON dbo.manual_slot_blocks (block_start_utc, block_end_utc);
