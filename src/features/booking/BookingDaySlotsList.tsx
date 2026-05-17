"use client";

import type { LocaleCode } from "@/lib/locales";
import { formatDayCard, formatSlotLabel } from "@/features/booking/bookingCopy";
import type { DaySlotsDisplay } from "@/features/booking/bookingSlotDisplay";
import { visibleSlotLimitForDayIndex } from "@/features/booking/bookingSlotDisplay";

type BookingDaySlotsListProps = {
  days: DaySlotsDisplay[];
  locale: LocaleCode;
  selectedDate: string | null;
  selectedSlotStart: string | null;
  expandedDates: ReadonlySet<string>;
  onToggleExpand: (date: string) => void;
  onSelectSlot: (date: string, startUtc: string) => void;
  labels: {
    selectSlot: string;
    showMore: (n: number) => string;
    showLess: string;
  };
};

export function BookingDaySlotsList({
  days,
  locale,
  selectedDate,
  selectedSlotStart,
  expandedDates,
  onToggleExpand,
  onSelectSlot,
  labels,
}: BookingDaySlotsListProps) {
  return (
    <div className="max-h-[min(32rem,70vh)] space-y-4 overflow-y-auto pr-1">
      {days.map((day) => {
        const isDaySelected = selectedDate === day.date;
        const expanded = expandedDates.has(day.date);
        const canCollapse = expanded && day.allSlots.length > visibleSlotLimitForDayIndex(day.dayIndex);
        return (
          <section
            key={day.date}
            className={`rounded-xl border p-3 sm:p-4 transition-colors ${
              isDaySelected ? "border-accent/45 bg-accent/[0.04]" : "border-border-subtle bg-bg-warm/50"
            }`}
          >
            <h3 className="text-sm font-semibold capitalize text-text-primary">{formatDayCard(day.date, locale)}</h3>
            <p className="mt-1 text-xs text-text-muted">{labels.selectSlot}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {day.visibleSlots.map((s) => {
                const sel = isDaySelected && selectedSlotStart === s.startUtc;
                return (
                  <button
                    key={s.startUtc}
                    type="button"
                    onClick={() => onSelectSlot(day.date, s.startUtc)}
                    className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                      sel
                        ? "border-accent bg-accent text-white shadow-sm"
                        : "border-border-subtle bg-bg-panel text-text-primary hover:border-accent/35"
                    }`}
                  >
                    {formatSlotLabel(s.startUtc, locale)}
                  </button>
                );
              })}
            </div>
            {day.hiddenCount > 0 ? (
              <button
                type="button"
                onClick={() => onToggleExpand(day.date)}
                className="mt-3 text-xs font-semibold text-blue-mid-2 underline-offset-2 hover:underline"
              >
                {labels.showMore(day.hiddenCount)}
              </button>
            ) : null}
            {canCollapse ? (
              <button
                type="button"
                onClick={() => onToggleExpand(day.date)}
                className="mt-3 text-xs font-semibold text-text-muted underline-offset-2 hover:underline"
              >
                {labels.showLess}
              </button>
            ) : null}
          </section>
        );
      })}
    </div>
  );
}
