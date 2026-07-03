"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocale } from "@/context/LocaleProvider";
import type { LocaleCode } from "@/lib/locales";
import { Button } from "@/components/ui/Button";
import { BookingCalendar } from "@/features/booking/BookingCalendar";
import { createAppointment, fetchSlots, type SlotsResponse } from "@/features/booking/bookingApi";
import { formatDayCard, formatSlotFull, formatSlotLabel, formatSlotsLoadError, getBookingCopy } from "@/features/booking/bookingCopy";
import { bogotaTodayIso, nextBookingDayIsos } from "@/features/booking/bookingCalendarUtils";
import { getVisibleSlotsForSelectedDay } from "@/features/booking/bookingSlotDisplay";
import { isPersonalEmailDomain } from "@/features/booking/emailDomains";

type FormState = {
  fullName: string;
  roleTitle: string;
  email: string;
  phoneWhatsapp: string;
  company: string;
  sector: string;
  cityCountry: string;
  primaryNeed: string;
  comment: string;
};

const initialForm: FormState = {
  fullName: "",
  roleTitle: "",
  email: "",
  phoneWhatsapp: "",
  company: "",
  sector: "",
  cityCountry: "",
  primaryNeed: "",
  comment: "",
};

function ContinueHint({ text }: { text: string }) {
  return <p className="text-center text-xs text-text-muted sm:text-right">{text}</p>;
}

function Spinner({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

function StepFooter({
  stepLabel,
  hint,
  onBack,
  backLabel,
  backDisabled,
  onNext,
  nextLabel,
  nextDisabled,
  nextLoading,
}: {
  stepLabel: string;
  hint?: string;
  onBack?: () => void;
  backLabel?: string;
  backDisabled?: boolean;
  onNext: () => void;
  nextLabel: string;
  nextDisabled?: boolean;
  nextLoading?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2 pt-4">
      <div className="grid grid-cols-3 items-center gap-3">
        <div className="justify-self-start">
          {onBack ? (
            <Button type="button" variant="secondary" disabled={backDisabled} onClick={onBack}>
              {backLabel}
            </Button>
          ) : null}
        </div>
        <p className="justify-self-center text-center text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
          {stepLabel}
        </p>
        <div className="justify-self-end">
          <Button type="button" variant="primary" disabled={nextDisabled} onClick={onNext}>
            {nextLoading ? <Spinner className="h-4 w-4" /> : null}
            {nextLabel}
          </Button>
        </div>
      </div>
      {hint ? <ContinueHint text={hint} /> : null}
    </div>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-xs text-accent">{message}</p>;
}

export function BookingWizard() {
  const { locale } = useLocale();
  const t = useMemo(() => getBookingCopy(locale as LocaleCode), [locale]);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(initialForm);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState<string | null>(null);
  const [slotsData, setSlotsData] = useState<SlotsResponse | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlotStart, setSelectedSlotStart] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMeta, setSuccessMeta] = useState<{ emailUser: string; emailInternal: string } | null>(null);
  const idempotencyRef = useRef<string | null>(null);

  const allowedBookingDates = useMemo(
    () => new Set(nextBookingDayIsos(bogotaTodayIso(), 5)),
    [step],
  );

  const daysWithSlots = useMemo(
    () =>
      (slotsData?.days ?? []).filter(
        (d) => d.slots.length > 0 && allowedBookingDates.has(d.date),
      ),
    [slotsData, allowedBookingDates],
  );
  const availableIsoDates = useMemo(() => daysWithSlots.map((d) => d.date), [daysWithSlots]);

  useEffect(() => {
    if (selectedDate && !availableIsoDates.includes(selectedDate)) {
      setSelectedDate(null);
      setSelectedSlotStart(null);
    }
  }, [selectedDate, availableIsoDates]);

  const visibleSlotsForDay = useMemo(
    () => getVisibleSlotsForSelectedDay(daysWithSlots, selectedDate),
    [daysWithSlots, selectedDate],
  );

  const loadSlots = useCallback(async () => {
    setSlotsLoading(true);
    setSlotsError(null);
    try {
      const data = await fetchSlots(locale as LocaleCode);
      setSlotsData(data);
    } catch (e) {
      setSlotsError(e instanceof Error ? e.message : String(e));
      setSlotsData(null);
    } finally {
      setSlotsLoading(false);
    }
  }, [locale]);

  useEffect(() => {
    if (step === 1 && !slotsData && !slotsLoading && !slotsError) {
      void loadSlots();
    }
  }, [step, slotsData, slotsLoading, slotsError, loadSlots]);

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((p) => ({ ...p, [key]: value }));
    setFieldErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const validateContact = (): boolean => {
    const errors: Partial<Record<keyof FormState, string>> = {};
    if (!form.fullName.trim()) errors.fullName = t.errorRequired;
    if (!form.email.trim()) {
      errors.email = t.errorRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errors.email = t.errorInvalidEmail;
    }
    if (!form.phoneWhatsapp.trim()) errors.phoneWhatsapp = t.errorRequired;
    if (!form.company.trim()) errors.company = t.errorRequired;
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      setFormError(t.errorValidation);
      return false;
    }
    setFormError(null);
    return true;
  };

  const validateContext = (): boolean => {
    const errors: Partial<Record<keyof FormState, string>> = {};
    if (!form.sector.trim()) errors.sector = t.errorRequired;
    if (!form.primaryNeed.trim()) errors.primaryNeed = t.errorRequired;
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      setFormError(t.errorValidation);
      return false;
    }
    setFormError(null);
    return true;
  };

  const goStep2 = () => {
    if (!selectedSlotStart) return;
    setFormError(null);
    setStep(2);
  };

  const goStep3 = () => {
    if (!validateContact()) return;
    setStep(3);
  };

  const goConfirm = () => {
    if (!validateContext()) return;
    if (!idempotencyRef.current) {
      idempotencyRef.current = crypto.randomUUID();
    }
    setStep(4);
  };

  const confirmBooking = async () => {
    if (!selectedSlotStart || !idempotencyRef.current) return;
    setSubmitting(true);
    setSubmitError(null);
    const body = {
      idempotencyKey: idempotencyRef.current,
      locale: locale as LocaleCode,
      company: {
        name: form.company.trim(),
        sector: form.sector.trim(),
        cityCountry: form.cityCountry.trim(),
      },
      contact: {
        fullName: form.fullName.trim(),
        roleTitle: form.roleTitle.trim() || null,
        email: form.email.trim(),
        phoneWhatsapp: form.phoneWhatsapp.trim(),
      },
      need: {
        primary: form.primaryNeed.trim(),
        comment: form.comment.trim() || null,
      },
      slotStartUtc: selectedSlotStart,
    };
    const res = await createAppointment(body);
    setSubmitting(false);
    if (!res.ok) {
      const code =
        typeof res.body === "object" && res.body !== null && "code" in res.body
          ? String((res.body as { code?: string }).code)
          : "";
      if (res.status === 409 || code === "SLOT_TAKEN") {
        setSubmitError(t.errorSlotTaken);
        setStep(1);
        setSelectedSlotStart(null);
        void loadSlots();
        return;
      }
      if (res.status === 429 || code === "RATE_LIMITED") {
        setSubmitError(t.errorRateLimited);
        return;
      }
      setSubmitError(t.errorGeneric);
      return;
    }
    const data = res.data as {
      emailUser?: string;
      emailInternal?: string;
      idempotentReplay?: boolean;
    };
    setSuccessMeta({
      emailUser: data.idempotentReplay ? "sent" : data.emailUser === "sent" ? "sent" : "failed",
      emailInternal: data.idempotentReplay ? "sent" : data.emailInternal === "sent" ? "sent" : "failed",
    });
    setStep(5);
  };

  const inputClass =
    "mt-1.5 w-full rounded-lg border border-border-subtle bg-bg-panel px-3 py-2.5 text-sm text-text-primary shadow-sm outline-none transition-colors focus:border-blue-mid-1/45 focus:ring-2 focus:ring-blue-mid-1/18";

  const stepLabelText = step <= 4 ? t.stepLabel(step) : "";

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl">{t.pageTitle}</h1>

      {step === 1 ? (
        <div className="mt-10 space-y-6">
          <h2 className="text-lg font-semibold text-text-primary">{t.step1Title}</h2>
          <p className="text-sm text-text-muted">{t.step1Intro}</p>
          {slotsLoading ? (
            <div className="flex flex-col items-center gap-2 py-2 text-sm text-text-muted">
              <Spinner className="h-6 w-6 text-accent" />
              <span>{t.loadingSlots}</span>
            </div>
          ) : null}
          {slotsError ? (
            <p className="text-sm text-accent">{formatSlotsLoadError(slotsError, t)}</p>
          ) : null}
          {!slotsLoading && slotsData && daysWithSlots.length === 0 ? (
            <p className="text-sm text-text-muted">{t.noSlots}</p>
          ) : null}
          {!slotsLoading && slotsData && daysWithSlots.length > 0 ? (
            <div className="grid gap-8 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:items-start">
              <BookingCalendar
                locale={locale as LocaleCode}
                timezone={slotsData.timezone}
                availableIsoDates={availableIsoDates}
                selectedDate={selectedDate}
                onSelectDate={(iso) => {
                  setSelectedDate(iso);
                  setSelectedSlotStart(null);
                }}
              />
              <div className="rounded-2xl border border-border-subtle bg-bg-panel p-4 sm:p-5">
                <h3 className="text-sm font-semibold text-text-primary">{t.timesPanelTitle}</h3>
                {!selectedDate ? (
                  <p className="mt-3 text-sm text-text-muted">{t.selectDayFirst}</p>
                ) : (
                  <>
                    <p className="mt-1 text-xs capitalize text-text-muted">
                      {formatDayCard(selectedDate, locale as LocaleCode)}
                    </p>
                    <p className="mt-3 text-xs text-text-muted">{t.selectSlot}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {visibleSlotsForDay.map((s) => {
                        const sel = selectedSlotStart === s.startUtc;
                        return (
                          <button
                            key={s.startUtc}
                            type="button"
                            onClick={() => setSelectedSlotStart(s.startUtc)}
                            className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                              sel
                                ? "border-accent bg-accent text-white shadow-sm"
                                : "border-border-subtle bg-bg-warm text-text-primary hover:border-accent/35"
                            }`}
                          >
                            {formatSlotLabel(s.startUtc, locale as LocaleCode)}
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : null}
          <StepFooter
            stepLabel={stepLabelText}
            hint={t.continueHint}
            onNext={goStep2}
            nextLabel={t.next}
            nextDisabled={!selectedSlotStart || slotsLoading}
          />
        </div>
      ) : null}

      {step === 2 ? (
        <div className="mt-10 space-y-6">
          <h2 className="text-lg font-semibold text-text-primary">{t.step2Title}</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block sm:col-span-2">
              <span className="text-sm font-medium text-text-primary">{t.fields.fullName} *</span>
              <input
                className={`${inputClass}${fieldErrors.fullName ? " border-accent focus:border-accent focus:ring-accent/20" : ""}`}
                value={form.fullName}
                onChange={(e) => setField("fullName", e.target.value)}
                autoComplete="name"
              />
              <FieldError message={fieldErrors.fullName} />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-text-primary">{t.fields.roleTitle}</span>
              <input
                className={inputClass}
                value={form.roleTitle}
                onChange={(e) => setField("roleTitle", e.target.value)}
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-text-primary">{t.fields.email} *</span>
              <input
                className={`${inputClass}${fieldErrors.email ? " border-accent focus:border-accent focus:ring-accent/20" : ""}`}
                type="email"
                value={form.email}
                onChange={(e) => setField("email", e.target.value)}
                autoComplete="email"
              />
              <FieldError message={fieldErrors.email} />
              {!fieldErrors.email && isPersonalEmailDomain(form.email) ? (
                <p className="mt-1.5 text-xs text-blue-mid-2">{t.personalEmailWarning}</p>
              ) : null}
            </label>
            <label className="block sm:col-span-2">
              <span className="text-sm font-medium text-text-primary">{t.fields.phone} *</span>
              <input
                className={`${inputClass}${fieldErrors.phoneWhatsapp ? " border-accent focus:border-accent focus:ring-accent/20" : ""}`}
                value={form.phoneWhatsapp}
                onChange={(e) => setField("phoneWhatsapp", e.target.value)}
                autoComplete="tel"
              />
              <FieldError message={fieldErrors.phoneWhatsapp} />
            </label>
            <label className="block sm:col-span-2">
              <span className="text-sm font-medium text-text-primary">{t.fields.company} *</span>
              <input
                className={`${inputClass}${fieldErrors.company ? " border-accent focus:border-accent focus:ring-accent/20" : ""}`}
                value={form.company}
                onChange={(e) => setField("company", e.target.value)}
                autoComplete="organization"
              />
              <FieldError message={fieldErrors.company} />
            </label>
            <label className="block sm:col-span-2">
              <span className="text-sm font-medium text-text-primary">{t.fields.cityCountryOptional}</span>
              <input
                className={inputClass}
                value={form.cityCountry}
                onChange={(e) => setField("cityCountry", e.target.value)}
              />
            </label>
          </div>
          {formError ? <p className="text-sm text-accent">{formError}</p> : null}
          <StepFooter
            stepLabel={stepLabelText}
            hint={t.continueHint}
            onBack={() => setStep(1)}
            backLabel={t.back}
            onNext={goStep3}
            nextLabel={t.next}
          />
        </div>
      ) : null}

      {step === 3 ? (
        <div className="mt-10 space-y-6">
          <h2 className="text-lg font-semibold text-text-primary">{t.step3Title}</h2>
          <div className="grid gap-5">
            <label className="block">
              <span className="text-sm font-medium text-text-primary">{t.fields.sector} *</span>
              <select
                className={`${inputClass}${fieldErrors.sector ? " border-accent focus:border-accent focus:ring-accent/20" : ""}`}
                value={form.sector}
                onChange={(e) => setField("sector", e.target.value)}
              >
                <option value="">{t.sectorPlaceholder}</option>
                {t.sectorOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <FieldError message={fieldErrors.sector} />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-text-primary">{t.fields.need} *</span>
              <textarea
                className={`${inputClass} min-h-[5rem] resize-y${fieldErrors.primaryNeed ? " border-accent focus:border-accent focus:ring-accent/20" : ""}`}
                value={form.primaryNeed}
                onChange={(e) => setField("primaryNeed", e.target.value)}
              />
              <FieldError message={fieldErrors.primaryNeed} />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-text-primary">{t.fields.comment}</span>
              <textarea
                className={`${inputClass} min-h-[4rem] resize-y`}
                value={form.comment}
                onChange={(e) => setField("comment", e.target.value)}
              />
            </label>
          </div>
          {formError ? <p className="text-sm text-accent">{formError}</p> : null}
          <StepFooter
            stepLabel={stepLabelText}
            hint={t.continueHint}
            onBack={() => setStep(2)}
            backLabel={t.back}
            onNext={goConfirm}
            nextLabel={t.next}
          />
        </div>
      ) : null}

      {step === 4 ? (
        <div className="mt-10 space-y-6">
          <h2 className="text-lg font-semibold text-text-primary">{t.step4Title}</h2>
          <div className="rounded-2xl border border-border-subtle bg-bg-panel p-5 text-sm leading-relaxed text-text-muted">
            <p className="font-semibold text-text-primary">{t.summary}</p>
            <ul className="mt-3 list-inside list-disc space-y-1">
              {selectedSlotStart ? (
                <li>
                  {formatSlotFull(selectedSlotStart, locale as LocaleCode)} ({slotsData?.timezone ?? "America/Bogota"})
                </li>
              ) : null}
              <li>
                {form.fullName} — {form.email}
                {form.roleTitle.trim() ? ` · ${form.roleTitle.trim()}` : ""}
              </li>
              <li>
                {form.phoneWhatsapp} · {form.company}
              </li>
              {form.cityCountry.trim() ? <li>{form.cityCountry.trim()}</li> : null}
              <li>
                {form.sector} — {form.primaryNeed}
              </li>
              {form.comment.trim() ? <li>{form.comment.trim()}</li> : null}
            </ul>
          </div>
          {submitError ? <p className="text-sm text-accent">{submitError}</p> : null}
          <StepFooter
            stepLabel={stepLabelText}
            onBack={() => setStep(3)}
            backLabel={t.back}
            backDisabled={submitting}
            onNext={() => void confirmBooking()}
            nextLabel={submitting ? t.submitting : t.confirm}
            nextDisabled={submitting}
            nextLoading={submitting}
          />
        </div>
      ) : null}

      {step === 5 ? (
        <div className="mt-10 space-y-6">
          <h2 className="text-lg font-semibold text-text-primary">{t.step5Title}</h2>
          <p className="text-base font-medium text-text-primary">{t.successTitle}</p>
          <p className="text-sm leading-relaxed text-text-muted">{t.successBody}</p>
          {successMeta && (successMeta.emailUser !== "sent" || successMeta.emailInternal !== "sent") ? (
            <p className="text-sm text-accent">{t.emailPartialWarning}</p>
          ) : null}
          <Link href="/" className="inline-flex text-sm font-semibold text-blue-mid-2 underline-offset-4 hover:underline">
            {t.homeLink}
          </Link>
        </div>
      ) : null}
    </div>
  );
}
