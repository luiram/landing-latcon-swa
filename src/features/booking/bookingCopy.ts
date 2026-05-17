import type { LocaleCode } from "@/lib/locales";

export type BookingCopy = {
  pageTitle: string;
  stepLabel: (n: number) => string;
  step1Title: string;
  step2Title: string;
  step2Intro: string;
  step3Title: string;
  step4Title: string;
  timesPanelTitle: string;
  selectDayFirst: string;
  fields: {
    fullName: string;
    roleTitle: string;
    email: string;
    phone: string;
    company: string;
    sector: string;
    cityCountry: string;
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
  errorSlotTaken: string;
  errorGeneric: string;
  errorApiNotConfigured: string;
  /** Navegador bloqueó la petición (CORS, red, API caída). */
  errorFetchFailed: string;
  homeLink: string;
};

const copy: Record<LocaleCode, BookingCopy> = {
  es: {
    pageTitle: "Agendar conversación",
    stepLabel: (n) => `Paso ${n} de 4`,
    step1Title: "Tus datos",
    step2Title: "Fecha y hora",
    step2Intro:
      "Selecciona uno de los cinco días hábiles disponibles en el calendario; luego elige un horario de los mostrados para ese día.",
    step3Title: "Confirmar",
    step4Title: "Listo",
    timesPanelTitle: "Horarios disponibles",
    selectDayFirst: "Primero elige un día en el calendario.",
    fields: {
      fullName: "Nombre completo",
      roleTitle: "Cargo",
      email: "Correo",
      phone: "Teléfono / WhatsApp",
      company: "Empresa",
      sector: "Sector",
      cityCountry: "Ciudad / país",
      need: "Necesidad principal",
      comment: "Comentario (opcional)",
    },
    next: "Continuar",
    back: "Atrás",
    loadingSlots: "Consultando horarios disponibles…",
    noSlots: "No hay horarios disponibles en los próximos días hábiles. Intenta más tarde o contáctanos por otro canal.",
    selectDay: "Selecciona un día",
    selectSlot: "Selecciona una hora",
    confirm: "Confirmar agendamiento",
    summary: "Resumen",
    successTitle: "Reserva creada",
    successBody:
      "Tu reunión quedó registrada. Recibirás un correo de confirmación en la dirección indicada (si el envío fallara, la reserva sigue activa y nuestro equipo verá el aviso en sistema).",
    emailPartialWarning: "La reserva está confirmada; hubo un problema al enviar uno de los correos. Te contactaremos si hace falta.",
    errorValidation: "Revisa los campos obligatorios.",
    errorSlotTaken: "Ese horario acaba de ser tomado. Elige otro.",
    errorGeneric: "No pudimos completar la acción. Intenta de nuevo.",
    errorApiNotConfigured: "El servicio de agenda no está configurado (falta URL de API).",
    errorFetchFailed:
      "No se pudo conectar con el servidor de horarios. Suele deberse a CORS en Azure: en el Function App añade https://latconservices.com en API → CORS y en ALLOWED_ORIGINS, guarda y reinicia.",
    homeLink: "Volver al inicio",
  },
  en: {
    pageTitle: "Schedule a conversation",
    stepLabel: (n) => `Step ${n} of 4`,
    step1Title: "Your details",
    step2Title: "Date & time",
    step2Intro:
      "Select one of the five available business days on the calendar, then choose a time from the options shown for that day.",
    step3Title: "Confirm",
    step4Title: "Done",
    timesPanelTitle: "Available times",
    selectDayFirst: "Choose a day on the calendar first.",
    fields: {
      fullName: "Full name",
      roleTitle: "Role",
      email: "Email",
      phone: "Phone / WhatsApp",
      company: "Company",
      sector: "Industry",
      cityCountry: "City / country",
      need: "Main need",
      comment: "Comments (optional)",
    },
    next: "Continue",
    back: "Back",
    loadingSlots: "Checking available times…",
    noSlots: "No slots are available in the next business days. Please try again later.",
    selectDay: "Choose a day",
    selectSlot: "Choose a time",
    confirm: "Confirm booking",
    summary: "Summary",
    successTitle: "Booking created",
    successBody:
      "Your meeting is saved. You should receive a confirmation email (if sending fails, the booking still stands and our team is notified in the system).",
    emailPartialWarning: "Your booking is confirmed; there was an issue sending one of the emails. We may reach out if needed.",
    errorValidation: "Please check required fields.",
    errorSlotTaken: "That time was just taken. Please pick another.",
    errorGeneric: "We could not complete the action. Please try again.",
    errorApiNotConfigured: "The booking API URL is not configured.",
    errorFetchFailed:
      "Could not reach the scheduling server. Often a CORS issue: add https://latconservices.com to the Function App (API → CORS and ALLOWED_ORIGINS), then restart.",
    homeLink: "Back to home",
  },
  pt: {
    pageTitle: "Agendar conversa",
    stepLabel: (n) => `Passo ${n} de 4`,
    step1Title: "Seus dados",
    step2Title: "Data e hora",
    step2Intro:
      "Selecione um dos cinco dias úteis disponíveis no calendário; em seguida escolha um horário entre os exibidos para esse dia.",
    step3Title: "Confirmar",
    step4Title: "Concluído",
    timesPanelTitle: "Horários disponíveis",
    selectDayFirst: "Primeiro escolha um dia no calendário.",
    fields: {
      fullName: "Nome completo",
      roleTitle: "Cargo",
      email: "E-mail",
      phone: "Telefone / WhatsApp",
      company: "Empresa",
      sector: "Setor",
      cityCountry: "Cidade / país",
      need: "Necessidade principal",
      comment: "Comentário (opcional)",
    },
    next: "Continuar",
    back: "Voltar",
    loadingSlots: "Consultando horários disponíveis…",
    noSlots: "Não há horários nos próximos dias úteis. Tente mais tarde.",
    selectDay: "Selecione um dia",
    selectSlot: "Selecione um horário",
    confirm: "Confirmar agendamento",
    summary: "Resumo",
    successTitle: "Reserva criada",
    successBody:
      "Sua reunião foi registrada. Você receberá um e-mail de confirmação (se o envio falhar, a reserva permanece e nossa equipe verá no sistema).",
    emailPartialWarning: "A reserva está confirmada; houve problema ao enviar um dos e-mails. Podemos contatá-lo se necessário.",
    errorValidation: "Verifique os campos obrigatórios.",
    errorSlotTaken: "Esse horário acabou de ser reservado. Escolha outro.",
    errorGeneric: "Não foi possível concluir. Tente novamente.",
    errorApiNotConfigured: "A URL da API de agendamento não está configurada.",
    errorFetchFailed:
      "Não foi possível contactar o servidor de horários. Verifique CORS no Function App (https://latconservices.com).",
    homeLink: "Voltar ao início",
  },
  fr: {
    pageTitle: "Planifier un entretien",
    stepLabel: (n) => `Étape ${n} sur 4`,
    step1Title: "Vos coordonnées",
    step2Title: "Date et heure",
    step2Intro:
      "Sélectionnez l’un des cinq jours ouvrés disponibles dans le calendrier, puis choisissez un créneau parmi ceux proposés pour ce jour.",
    step3Title: "Confirmer",
    step4Title: "Terminé",
    timesPanelTitle: "Créneaux disponibles",
    selectDayFirst: "Choisissez d’abord un jour dans le calendrier.",
    fields: {
      fullName: "Nom complet",
      roleTitle: "Fonction",
      email: "E-mail",
      phone: "Téléphone / WhatsApp",
      company: "Entreprise",
      sector: "Secteur",
      cityCountry: "Ville / pays",
      need: "Besoin principal",
      comment: "Commentaire (facultatif)",
    },
    next: "Continuer",
    back: "Retour",
    loadingSlots: "Vérification des créneaux…",
    noSlots: "Aucun créneau disponible sur les prochains jours ouvrés. Réessayez plus tard.",
    selectDay: "Choisissez un jour",
    selectSlot: "Choisissez une heure",
    confirm: "Confirmer le rendez-vous",
    summary: "Récapitulatif",
    successTitle: "Rendez-vous enregistré",
    successBody:
      "Votre réunion est enregistrée. Vous recevrez un e-mail de confirmation (en cas d’échec d’envoi, le rendez-vous reste valide et notre équipe est informée dans le système).",
    emailPartialWarning: "Le rendez-vous est confirmé ; l’envoi d’un des e-mails a échoué. Nous pourrons vous recontacter si besoin.",
    errorValidation: "Vérifiez les champs obligatoires.",
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
