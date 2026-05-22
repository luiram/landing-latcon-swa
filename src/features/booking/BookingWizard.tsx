"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocale } from "@/context/LocaleProvider";
import type { LocaleCode } from "@/lib/locales";
import { Button } from "@/components/ui/Button";
import { BookingCalendar } from "@/features/booking/BookingCalendar";
import { createAppointment, fetchSlots, type SlotsResponse } from "@/features/booking/bookingApi";
import { formatDayCard, formatSlotLabel, formatSlotsLoadError, getBookingCopy } from "@/features/booking/bookingCopy";
import { bogotaTodayIso, nextBookingDayIsos } from "@/features/booking/bookingCalendarUtils";
import { getVisibleSlotsForSelectedDay } from "@/features/booking/bookingSlotDisplay";

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

export function BookingWizard() {
  const { locale } = useLocale();
  const t = useMemo(() => getBookingCopy(locale as LocaleCode), [locale]);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(initialForm);
  const [formError, setFormError] = useState<string | null>(null);
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

  const validateContact = (): boolean => {
    if (
      !form.fullName.trim() ||
      !form.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) ||
      !form.phoneWhatsapp.trim() ||
      !form.company.trim()
    ) {
      setFormError(t.errorValidation);
      return false;
    }
    setFormError(null);
    return true;
  };

  const validateContext = (): boolean => {
    if (!form.sector.trim() || !form.primaryNeed.trim()) {
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
      {stepLabelText ? (
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">{stepLabelText}</p>
      ) : null}
      <h1 className="mt-2 text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl">{t.pageTitle}</h1>

      {step === 1 ? (
        <div className="mt-10 space-y-6">
          <h2 className="text-lg font-semibold text-text-primary">{t.step1Title}</h2>
          <p className="text-sm text-text-muted">{t.step1Intro}</p>
          {slotsLoading ? <p className="text-sm text-text-muted">{t.loadingSlots}</p> : null}
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
          <div className="flex flex-col gap-2 pt-4">
            <div className="flex justify-end">
              <Button type="button" variant="primary" disabled={!selectedSlotStart || slotsLoading} onClick={goStep2}>
                {t.next}
              </Button>
            </div>
            <ContinueHint text={t.continueHint} />
          </div>
        </div>
      ) : null}

      {step === 2 ? (
        <div className="mt-10 space-y-6">
          <h2 className="text-lg font-semibold text-text-primary">{t.step2Title}</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block sm:col-span-2">
              <span className="text-sm font-medium text-text-primary">{t.fields.fullName} *</span>
              <input
                className={inputClass}
                value={form.fullName}
                onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))}
                autoComplete="name"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-text-primary">{t.fields.roleTitle}</span>
              <input
                className={inputClass}
                value={form.roleTitle}
                onChange={(e) => setForm((p) => ({ ...p, roleTitle: e.target.value }))}
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-text-primary">{t.fields.email} *</span>
              <input
                className={inputClass}
                type="email"
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                autoComplete="email"
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="text-sm font-medium text-text-primary">{t.fields.phone} *</span>
              <input
                className={inputClass}
                value={form.phoneWhatsapp}
                onChange={(e) => setForm((p) => ({ ...p, phoneWhatsapp: e.target.value }))}
                autoComplete="tel"
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="text-sm font-medium text-text-primary">{t.fields.company} *</span>
              <input
                className={inputClass}
                value={form.company}
                onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))}
                autoComplete="organization"
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="text-sm font-medium text-text-primary">{t.fields.cityCountryOptional}</span>
              <input
                className={inputClass}
                value={form.cityCountry}
                onChange={(e) => setForm((p) => ({ ...p, cityCountry: e.target.value }))}
              />
            </label>
          </div>
          {formError ? <p className="text-sm text-accent">{formError}</p> : null}
          <div className="flex flex-col gap-2 pt-2">
            <div className="flex flex-wrap justify-between gap-3">
              <Button type="button" variant="secondary" onClick={() => setStep(1)}>
                {t.back}
              </Button>
              <Button type="button" variant="primary" onClick={goStep3}>
                {t.next}
              </Button>
            </div>
            <ContinueHint text={t.continueHint} />
          </div>
        </div>
      ) : null}

      {step === 3 ? (
        <div className="mt-10 space-y-6">
          <h2 className="text-lg font-semibold text-text-primary">{t.step3Title}</h2>
          <div className="grid gap-5">
            <label className="block">
              <span className="text-sm font-medium text-text-primary">{t.fields.sector} *</span>
              <select
                className={inputClass}
                value={form.sector}
                onChange={(e) => setForm((p) => ({ ...p, sector: e.target.value }))}
              >
                <option value="">{t.sectorPlaceholder}</option>
                {t.sectorOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-medium text-text-primary">{t.fields.need} *</span>
              <textarea
                className={`${inputClass} min-h-[5rem] resize-y`}
                value={form.primaryNeed}
                onChange={(e) => setForm((p) => ({ ...p, primaryNeed: e.target.value }))}
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-text-primary">{t.fields.comment}</span>
              <textarea
                className={`${inputClass} min-h-[4rem] resize-y`}
                value={form.comment}
                onChange={(e) => setForm((p) => ({ ...p, comment: e.target.value }))}
              />
            </label>
          </div>
          {formError ? <p className="text-sm text-accent">{formError}</p> : null}
          <div className="flex flex-col gap-2 pt-2">
            <div className="flex flex-wrap justify-between gap-3">
              <Button type="button" variant="secondary" onClick={() => setStep(2)}>
                {t.back}
              </Button>
              <Button type="button" variant="primary" onClick={goConfirm}>
                {t.next}
              </Button>
            </div>
            <ContinueHint text={t.continueHint} />
          </div>
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
                  {formatSlotLabel(selectedSlotStart, locale as LocaleCode)} ({slotsData?.timezone ?? "America/Bogota"})
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
          <div className="flex flex-wrap justify-between gap-3 pt-2">
            <Button type="button" variant="secondary" disabled={submitting} onClick={() => setStep(3)}>
              {t.back}
            </Button>
            <Button type="button" variant="primary" disabled={submitting} onClick={() => void confirmBooking()}>
              {submitting ? "…" : t.confirm}
            </Button>
          </div>
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
