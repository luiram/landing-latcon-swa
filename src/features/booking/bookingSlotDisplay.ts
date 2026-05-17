import type { SlotsDay } from "@/features/booking/bookingApi";

/** Cupos visibles por índice de día hábil (1.º → 3, 2.º → 4, 3.º → 5, 4.º → 4, 5.º → 3). */
export const VISIBLE_SLOTS_BY_DAY_INDEX = [3, 4, 5, 4, 3] as const;

export function visibleSlotLimitForDayIndex(dayIndex: number): number {
  if (dayIndex < 0) return VISIBLE_SLOTS_BY_DAY_INDEX[0];
  return VISIBLE_SLOTS_BY_DAY_INDEX[dayIndex % VISIBLE_SLOTS_BY_DAY_INDEX.length];
}

/** Reparte `count` horarios a lo largo del día (no solo los primeros de la mañana). */
export function pickSpreadSlots<T>(items: readonly T[], count: number): T[] {
  if (count <= 0 || items.length === 0) return [];
  if (items.length <= count) return [...items];

  const picked: T[] = [];
  for (let i = 0; i < count; i++) {
    const idx = Math.min(items.length - 1, Math.floor(((i + 0.5) * items.length) / count));
    const item = items[idx];
    if (!picked.includes(item)) picked.push(item);
  }

  while (picked.length < count) {
    for (const item of items) {
      if (picked.length >= count) break;
      if (!picked.includes(item)) picked.push(item);
    }
    if (picked.length < count) break;
  }

  return picked;
}

export type DaySlotsDisplay = {
  date: string;
  dayIndex: number;
  allSlots: SlotsDay["slots"];
  visibleSlots: SlotsDay["slots"];
  hiddenCount: number;
};

export function buildDaySlotsDisplay(days: SlotsDay[], expandedDates: ReadonlySet<string>): DaySlotsDisplay[] {
  return days
    .filter((d) => d.slots.length > 0)
    .map((day, dayIndex) => {
      const limit = visibleSlotLimitForDayIndex(dayIndex);
      const expanded = expandedDates.has(day.date);
      const visibleSlots = expanded ? day.slots : pickSpreadSlots(day.slots, limit);
      const hiddenCount = expanded ? 0 : Math.max(0, day.slots.length - visibleSlots.length);
      return {
        date: day.date,
        dayIndex,
        allSlots: day.slots,
        visibleSlots,
        hiddenCount,
      };
    });
}
