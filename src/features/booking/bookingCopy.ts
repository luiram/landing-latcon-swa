import type { LocaleCode } from "@/lib/locales";

export type BookingCopy = {
  pageTitle: string;
  stepLabel: (n: number) => string;
  step1Title: string;
  step1Intro: string;
  step2Title: string;
  step3Title: string;
  step4Title: string;
  step5Title: string;
  timesPanelTitle: string;
  selectDayFirst: string;
  continueHint: string;
  sectorPlaceholder: string;
  sectorOptions: ReadonlyArray<{ value: string; label: string }>;
  fields: {
    fullName: string;
    roleTitle: string;
    email: string;
    phone: string;
    company: string;
    sector: string;
    cityCountry: string;
    cityCountryOptional: string;
    need: string;
    comment: string;
  };
  next: string;
  back: string;
  loadingSlots: string;
  noSlots: string;
  selectDay: string;
  selectSlot: string;
  confirm: string;
  summary: string;
  successTitle: string;
  successBody: string;
  emailPartialWarning: string;
  errorValidation: string;
  errorRequired: string;
  errorInvalidEmail: string;
  errorSlotTaken: string;
  errorGeneric: string;
  errorApiNotConfigured: string;
  /** Navegador bloqueó la petición (CORS, red, API caída). */
  errorFetchFailed: string;
  homeLink: string;
};

const copy: Record<LocaleCode, BookingCopy> = {
  es: {
    pageTitle: "Agenda tu diagnóstico gratuito",
    stepLabel: (n) => (n <= 4 ? `Paso ${n} de 4` : ""),
    step1Title: "Fecha y hora",
    step1Intro:
      "Selecciona uno de los cinco días disponibles en el calendario; luego elige un horario de los mostrados para ese día.",
    step2Title: "Datos de contacto",
    step3Title: "Contexto",
    step4Title: "Confirmar",
    step5Title: "Listo",
    timesPanelTitle: "Horarios disponibles",
    selectDayFirst: "Primero elige un día en el calendario.",
    continueHint: "Recibirás una confirmación por correo con los detalles de la sesión.",
    sectorPlaceholder: "Selecciona un sector",
    sectorOptions: [
      { value: "Agroindustria", label: "Agroindustria" },
      { value: "Logística", label: "Logística" },
      { value: "Manufactura", label: "Manufactura" },
      { value: "Servicios", label: "Servicios" },
      { value: "Retail", label: "Retail" },
      { value: "Tecnología", label: "Tecnología" },
      { value: "Otro", label: "Otro" },
    ],
    fields: {
      fullName: "Nombre completo",
      roleTitle: "Cargo",
      email: "Correo",
      phone: "Teléfono / WhatsApp",
      company: "Empresa",
      sector: "Sector",
      cityCountry: "Ciudad / país",
      cityCountryOptional: "Ciudad / país (opcional)",
      need: "Necesidad principal",
      comment: "Comentario (opcional)",
    },
    next: "Continuar",
    back: "Atrás",
    loadingSlots: "Consultando horarios disponibles…",
    noSlots:
      "No hay horarios disponibles en los próximos martes, miércoles o jueves. Intenta más tarde o contáctanos por otro canal.",
    selectDay: "Selecciona un día",
    selectSlot: "Selecciona una hora",
    confirm: "Confirmar agendamiento",
    summary: "Resumen",
    successTitle: "Reserva creada",
    successBody:
      "Tu reunión quedó registrada. Recibirás un correo de confirmación en la dirección indicada (si el envío fallara, la reserva sigue activa y nuestro equipo verá el aviso en sistema).",
    emailPartialWarning: "La reserva está confirmada; hubo un problema al enviar uno de los correos. Te contactaremos si hace falta.",
    errorValidation: "Revisa los campos obligatorios.",
    errorRequired: "Campo requerido.",
    errorInvalidEmail: "Correo inválido.",
    errorSlotTaken: "Ese horario acaba de ser tomado. Elige otro.",
    errorGeneric: "No pudimos completar la acción. Intenta de nuevo.",
    errorApiNotConfigured: "El servicio de agenda no está configurado (falta URL de API).",
    errorFetchFailed:
      "No se pudo conectar con el servidor de horarios. Suele deberse a CORS en Azure: en el Function App añade https://latconservices.com en API → CORS y en ALLOWED_ORIGINS, guarda y reinicia.",
    homeLink: "Volver al inicio",
  },
  en: {
    pageTitle: "Book your free diagnostic",
    stepLabel: (n) => (n <= 4 ? `Step ${n} of 4` : ""),
    step1Title: "Date & time",
    step1Intro:
      "Select one of the five available days on the calendar, then choose a time from the options shown for that day.",
    step2Title: "Contact details",
    step3Title: "Context",
    step4Title: "Confirm",
    step5Title: "Done",
    timesPanelTitle: "Available times",
    selectDayFirst: "Choose a day on the calendar first.",
    continueHint: "You will receive a confirmation email with the session details.",
    sectorPlaceholder: "Select an industry",
    sectorOptions: [
      { value: "Agroindustria", label: "Agribusiness" },
      { value: "Logística", label: "Logistics" },
      { value: "Manufactura", label: "Manufacturing" },
      { value: "Servicios", label: "Services" },
      { value: "Retail", label: "Retail" },
      { value: "Tecnología", label: "Technology" },
      { value: "Otro", label: "Other" },
    ],
    fields: {
      fullName: "Full name",
      roleTitle: "Role",
      email: "Email",
      phone: "Phone / WhatsApp",
      company: "Company",
      sector: "Industry",
      cityCountry: "City / country",
      cityCountryOptional: "City / country (optional)",
      need: "Main need",
      comment: "Comments (optional)",
    },
    next: "Continue",
    back: "Back",
    loadingSlots: "Checking available times…",
    noSlots: "No slots are available on the upcoming Tuesdays, Wednesdays, or Thursdays. Please try again later.",
    selectDay: "Choose a day",
    selectSlot: "Choose a time",
    confirm: "Confirm booking",
    summary: "Summary",
    successTitle: "Booking created",
    successBody:
      "Your meeting is saved. You should receive a confirmation email (if sending fails, the booking still stands and our team is notified in the system).",
    emailPartialWarning: "Your booking is confirmed; there was an issue sending one of the emails. We may reach out if needed.",
    errorValidation: "Please check required fields.",
    errorRequired: "Required field.",
    errorInvalidEmail: "Invalid email.",
    errorSlotTaken: "That time was just taken. Please pick another.",
    errorGeneric: "We could not complete the action. Please try again.",
    errorApiNotConfigured: "The booking API URL is not configured.",
    errorFetchFailed:
      "Could not reach the scheduling server. Often a CORS issue: add https://latconservices.com to the Function App (API → CORS and ALLOWED_ORIGINS), then restart.",
    homeLink: "Back to home",
  },
  pt: {
    pageTitle: "Agende seu diagnóstico gratuito",
    stepLabel: (n) => (n <= 4 ? `Passo ${n} de 4` : ""),
    step1Title: "Data e hora",
    step1Intro:
      "Selecione um dos cinco dias disponíveis no calendário; em seguida escolha um horário entre os exibidos para esse dia.",
    step2Title: "Dados de contato",
    step3Title: "Contexto",
    step4Title: "Confirmar",
    step5Title: "Concluído",
    timesPanelTitle: "Horários disponíveis",
    selectDayFirst: "Primeiro escolha um dia no calendário.",
    continueHint: "Você receberá um e-mail de confirmação com os detalhes da sessão.",
    sectorPlaceholder: "Selecione um setor",
    sectorOptions: [
      { value: "Agroindustria", label: "Agroindústria" },
      { value: "Logística", label: "Logística" },
      { value: "Manufactura", label: "Manufatura" },
      { value: "Servicios", label: "Serviços" },
      { value: "Retail", label: "Varejo" },
      { value: "Tecnología", label: "Tecnologia" },
      { value: "Otro", label: "Outro" },
    ],
    fields: {
      fullName: "Nome completo",
      roleTitle: "Cargo",
      email: "E-mail",
      phone: "Telefone / WhatsApp",
      company: "Empresa",
      sector: "Setor",
      cityCountry: "Cidade / país",
      cityCountryOptional: "Cidade / país (opcional)",
      need: "Necessidade principal",
      comment: "Comentário (opcional)",
    },
    next: "Continuar",
    back: "Voltar",
    loadingSlots: "Consultando horários disponíveis…",
    noSlots: "Não há horários nas próximas terças, quartas ou quintas. Tente mais tarde.",
    selectDay: "Selecione um dia",
    selectSlot: "Selecione um horário",
    confirm: "Confirmar agendamento",
    summary: "Resumo",
    successTitle: "Reserva criada",
    successBody:
      "Sua reunião foi registrada. Você receberá um e-mail de confirmação (se o envio falhar, a reserva permanece e nossa equipe verá no sistema).",
    emailPartialWarning: "A reserva está confirmada; houve problema ao enviar um dos e-mails. Podemos contatá-lo se necessário.",
    errorValidation: "Verifique os campos obrigatórios.",
    errorRequired: "Campo obrigatório.",
    errorInvalidEmail: "E-mail inválido.",
    errorSlotTaken: "Esse horário acabou de ser reservado. Escolha outro.",
    errorGeneric: "Não foi possível concluir. Tente novamente.",
    errorApiNotConfigured: "A URL da API de agendamento não está configurada.",
    errorFetchFailed:
      "Não foi possível contactar o servidor de horários. Verifique CORS no Function App (https://latconservices.com).",
    homeLink: "Voltar ao início",
  },
  fr: {
    pageTitle: "Planifiez votre diagnostic gratuit",
    stepLabel: (n) => (n <= 4 ? `Étape ${n} sur 4` : ""),
    step1Title: "Date et heure",
    step1Intro:
      "Sélectionnez l’un des cinq jours disponibles dans le calendrier, puis choisissez un créneau parmi ceux proposés pour ce jour.",
    step2Title: "Coordonnées",
    step3Title: "Contexte",
    step4Title: "Confirmer",
    step5Title: "Terminé",
    timesPanelTitle: "Créneaux disponibles",
    selectDayFirst: "Choisissez d’abord un jour dans le calendrier.",
    continueHint: "Vous recevrez un e-mail de confirmation avec les détails de la session.",
    sectorPlaceholder: "Sélectionnez un secteur",
    sectorOptions: [
      { value: "Agroindustria", label: "Agro-industrie" },
      { value: "Logística", label: "Logistique" },
      { value: "Manufactura", label: "Manufacture" },
      { value: "Servicios", label: "Services" },
      { value: "Retail", label: "Commerce de détail" },
      { value: "Tecnología", label: "Technologie" },
      { value: "Otro", label: "Autre" },
    ],
    fields: {
      fullName: "Nom complet",
      roleTitle: "Fonction",
      email: "E-mail",
      phone: "Téléphone / WhatsApp",
      company: "Entreprise",
      sector: "Secteur",
      cityCountry: "Ville / pays",
      cityCountryOptional: "Ville / pays (facultatif)",
      need: "Besoin principal",
      comment: "Commentaire (facultatif)",
    },
    next: "Continuer",
    back: "Retour",
    loadingSlots: "Vérification des créneaux…",
    noSlots: "Aucun créneau disponible sur les prochains mardis, mercredis ou jeudis. Réessayez plus tard.",
    selectDay: "Choisissez un jour",
    selectSlot: "Choisissez une heure",
    confirm: "Confirmer le rendez-vous",
    summary: "Récapitulatif",
    successTitle: "Rendez-vous enregistré",
    successBody:
      "Votre réunion est enregistrée. Vous recevrez un e-mail de confirmation (en cas d’échec d’envoi, le rendez-vous reste valide et notre équipe est informée dans le système).",
    emailPartialWarning: "Le rendez-vous est confirmé ; l’envoi d’un des e-mails a échoué. Nous pourrons vous recontacter si besoin.",
    errorValidation: "Vérifiez les champs obligatoires.",
    errorRequired: "Champ requis.",
    errorInvalidEmail: "E-mail invalide.",
    errorSlotTaken: "Ce créneau vient d’être pris. Choisissez-en un autre.",
    errorGeneric: "L’action n’a pas pu aboutir. Réessayez.",
    errorApiNotConfigured: "L’URL de l’API de réservation n’est pas configurée.",
    errorFetchFailed:
      "Impossible de joindre le serveur des créneaux. Vérifiez CORS sur le Function App (https://latconservices.com).",
    homeLink: "Retour à l’accueil",
  },
};

/** Mensaje legible para errores al cargar /api/slots. */
export function formatSlotsLoadError(message: string, t: BookingCopy): string {
  if (message.includes("NEXT_PUBLIC")) return `${message} — ${t.errorApiNotConfigured}`;
  if (message === "Failed to fetch" || message.includes("NetworkError") || message.includes("Load failed")) {
    return t.errorFetchFailed;
  }
  return message;
}

export function getBookingCopy(locale: LocaleCode): BookingCopy {
  return copy[locale] ?? copy.es;
}

export function formatSlotLabel(isoUtc: string, locale: LocaleCode): string {
  const d = new Date(isoUtc);
  const loc =
    locale === "en" ? "en-CO" : locale === "pt" ? "pt-BR" : locale === "fr" ? "fr-FR" : "es-CO";
  return new Intl.DateTimeFormat(loc, {
    timeZone: "America/Bogota",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

export function formatDayCard(isoDate: string, locale: LocaleCode): string {
  const d = new Date(`${isoDate}T12:00:00Z`);
  const loc =
    locale === "en" ? "en-CO" : locale === "pt" ? "pt-BR" : locale === "fr" ? "fr-FR" : "es-CO";
  return new Intl.DateTimeFormat(loc, {
    timeZone: "America/Bogota",
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(d);
}
