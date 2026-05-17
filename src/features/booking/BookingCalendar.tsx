"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { LocaleCode } from "@/lib/locales";
import {
  bogotaNoonUtcMs,
  bogotaTodayIso,
  bogotaWeekdaySunday0,
  daysInBogotaMonth,
  isoFromParts,
  monthAfter,
  monthBefore,
  monthNotAfter,
  monthNotBefore,
  parseMonthFromIso,
} from "@/features/booking/bookingCalendarUtils";

type ViewMonth = { year: number; monthIndex: number };

function weekdayShortLabels(locale: LocaleCode): string[] {
  const loc =
    locale === "en" ? "en-CO" : locale === "pt" ? "pt-BR" : locale === "fr" ? "fr-FR" : "es-CO";
  const fmt = new Intl.DateTimeFormat(loc, { weekday: "short", timeZone: "UTC" });
  const base = Date.UTC(2020, 5, 7);
  return Array.from({ length: 7 }, (_, i) => fmt.format(new Date(base + i * 86400000)));
}

function monthTitle(view: ViewMonth, locale: LocaleCode): string {
  const loc =
    locale === "en" ? "en-CO" : locale === "pt" ? "pt-BR" : locale === "fr" ? "fr-FR" : "es-CO";
  const iso = isoFromParts(view.year, view.monthIndex, 1);
  return new Intl.DateTimeFormat(loc, {
    timeZone: "America/Bogota",
    month: "long",
    year: "numeric",
  }).format(new Date(bogotaNoonUtcMs(iso)));
}

function prevMonthNavAria(locale: LocaleCode): string {
  if (locale === "en") return "Previous month";
  if (locale === "fr") return "Mois précédent";
  if (locale === "pt") return "Mês anterior";
  return "Mes anterior";
}

function nextMonthNavAria(locale: LocaleCode): string {
  if (locale === "en") return "Next month";
  if (locale === "fr") return "Mois suivant";
  if (locale === "pt") return "Próximo mês";
  return "Mes siguiente";
}

export type BookingCalendarProps = {
  locale: LocaleCode;
  timezone: string;
  availableIsoDates: string[];
  /** Cupos sugeridos visibles por día (p. ej. 3, 4, 5, 4, 3) para indicador en el calendario. */
  dayPreviewCounts?: Record<string, number>;
  selectedDate: string | null;
  onSelectDate: (iso: string) => void;
};

export function BookingCalendar({
  locale,
  timezone,
  availableIsoDates,
  dayPreviewCounts,
  selectedDate,
  onSelectDate,
}: BookingCalendarProps) {
  const todayIso = useMemo(() => bogotaTodayIso(), []);
  const todayYm = useMemo(() => parseMonthFromIso(todayIso), [todayIso]);

  const bounds = useMemo(() => {
    const sorted = [...availableIsoDates].sort();
    if (sorted.length === 0) return { min: todayYm, max: todayYm };
    return { min: parseMonthFromIso(sorted[0]), max: parseMonthFromIso(sorted[sorted.length - 1]) };
  }, [availableIsoDates, todayYm]);

  const [view, setView] = useState<ViewMonth>(todayYm);

  const availableKey = useMemo(() => [...availableIsoDates].sort().join(","), [availableIsoDates]);

  useEffect(() => {
    if (!availableKey) {
      setView(todayYm);
      return;
    }
    const list = availableKey.split(",");
    const dim = daysInBogotaMonth(todayYm.year, todayYm.monthIndex);
    const setAvail = new Set(list);
    let hasInTodayMonth = false;
    for (let d = 1; d <= dim; d++) {
      if (setAvail.has(isoFromParts(todayYm.year, todayYm.monthIndex, d))) {
        hasInTodayMonth = true;
        break;
      }
    }
    const first = list[0];
    setView(hasInTodayMonth ? todayYm : parseMonthFromIso(first));
  }, [availableKey, todayYm]);

  const available = useMemo(() => new Set(availableIsoDates), [availableIsoDates]);

  const canPrev = monthAfter(view, todayYm);
  const canNext = monthBefore(view, bounds.max);

  const goPrev = () => {
    if (!canPrev) return;
    let y = view.year;
    let mi = view.monthIndex - 1;
    if (mi < 0) {
      y -= 1;
      mi = 11;
    }
    const next = { year: y, monthIndex: mi };
    if (monthNotBefore(next, todayYm)) setView(next);
  };

  const goNext = () => {
    if (!canNext) return;
    let y = view.year;
    let mi = view.monthIndex + 1;
    if (mi > 11) {
      y += 1;
      mi = 0;
    }
    const n = { year: y, monthIndex: mi };
    if (monthNotAfter(n, bounds.max)) setView(n);
  };

  const dim = daysInBogotaMonth(view.year, view.monthIndex);
  const firstIso = isoFromParts(view.year, view.monthIndex, 1);
  const startPad = bogotaWeekdaySunday0(firstIso);
  const totalCells = Math.ceil((startPad + dim) / 7) * 7;

  const weekdays = weekdayShortLabels(locale);

  const cells = useMemo(() => {
    const out: { iso: string | null; dayNum: number | null }[] = [];
    for (let i = 0; i < totalCells; i++) {
      const dayNum = i - startPad + 1;
      if (dayNum < 1 || dayNum > dim) {
        out.push({ iso: null, dayNum: null });
      } else {
        out.push({
          iso: isoFromParts(view.year, view.monthIndex, dayNum),
          dayNum,
        });
      }
    }
    return out;
  }, [dim, startPad, totalCells, view.monthIndex, view.year]);

  const tzLine =
    locale === "en"
      ? "Time zone"
      : locale === "fr"
        ? "Fuseau horaire"
        : locale === "pt"
          ? "Fuso horário"
          : "Zona horaria";

  return (
    <div className="rounded-2xl border border-border-subtle bg-bg-panel p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={goPrev}
          disabled={!canPrev}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border-subtle bg-bg-warm text-text-primary transition-colors hover:border-accent/40 hover:bg-accent/[0.06] disabled:cursor-not-allowed disabled:opacity-35"
          aria-label={prevMonthNavAria(locale)}
        >
          <ChevronLeft className="h-5 w-5" aria-hidden />
        </button>
        <h3 className="min-w-0 truncate text-center text-base font-semibold capitalize text-text-primary">
          {monthTitle(view, locale)}
        </h3>
        <button
          type="button"
          onClick={goNext}
          disabled={!canNext}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border-subtle bg-bg-warm text-text-primary transition-colors hover:border-accent/40 hover:bg-accent/[0.06] disabled:cursor-not-allowed disabled:opacity-35"
          aria-label={nextMonthNavAria(locale)}
        >
          <ChevronRight className="h-5 w-5" aria-hidden />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-[0.65rem] font-semibold uppercase tracking-wide text-text-muted sm:text-xs">
        {weekdays.map((w) => (
          <div key={w} className="py-1">
            {w.replace(/\.$/, "")}
          </div>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-1">
        {cells.map((cell, idx) => {
          if (!cell.iso || cell.dayNum === null) {
            return <div key={`empty-${idx}`} className="aspect-square" />;
          }
          const iso = cell.iso;
          const isAvail = available.has(iso);
          const isSel = selectedDate === iso;
          const isToday = iso === todayIso;
          const preview = dayPreviewCounts?.[iso];
          return (
            <button
              key={iso}
              type="button"
              disabled={!isAvail}
              onClick={() => onSelectDate(iso)}
              className={[
                "relative flex aspect-square flex-col items-center justify-center rounded-full text-sm font-medium transition-colors",
                !isAvail && "cursor-not-allowed text-text-muted/40",
                isAvail && !isSel && "bg-bg-warm text-text-primary hover:bg-accent/15",
                isSel && "bg-accent text-white shadow-sm",
                isToday && !isSel && isAvail && "ring-2 ring-accent/40 ring-offset-2 ring-offset-bg-panel",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <span>{cell.dayNum}</span>
              {isAvail && preview && preview > 0 ? (
                <span className="mt-0.5 text-[0.6rem] font-semibold leading-none text-accent/90">{preview}</span>
              ) : null}
            </button>
          );
        })}
      </div>

      <p className="mt-4 border-t border-border-subtle pt-3 text-xs text-text-muted">
        {tzLine}: <span className="font-medium text-text-primary">{timezone.replace("_", " ")}</span>
      </p>
    </div>
  );
}
