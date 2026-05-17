import { DateTime } from "luxon";

export const TZ = "America/Bogota";
export const MEETING_MINUTES = 30;
export const BUFFER_MINUTES = 15;
export const WORK_START_HOUR = 8;
export const WORK_END_HOUR = 16;

export type BusyInterval = { start: DateTime; end: DateTime };

/** Martes, miércoles y jueves (Luxon: 2, 3, 4). */
export const BOOKING_WEEKDAYS = [2, 3, 4] as const;

export function appointmentBlockEnd(slotEndUtc: DateTime): DateTime {
  return slotEndUtc.plus({ minutes: BUFFER_MINUTES });
}

export function isBookingWeekday(dayLocal: DateTime): boolean {
  return (BOOKING_WEEKDAYS as readonly number[]).includes(dayLocal.setZone(TZ).weekday);
}

/** Primeros `count` días de reserva (mar–jue) desde la fecha local Bogotá de `from` (sin festivos). */
export function nextBusinessDays(fromUtc: DateTime, count: number): DateTime[] {
  const days: DateTime[] = [];
  let cursor = fromUtc.setZone(TZ).startOf("day");
  const maxScan = 60;
  for (let i = 0; i < maxScan && days.length < count; i++) {
    if (isBookingWeekday(cursor)) {
      days.push(cursor);
    }
    cursor = cursor.plus({ days: 1 });
  }
  return days;
}

export function slotStartsForDay(dayLocal: DateTime): DateTime[] {
  const dayStart = dayLocal.setZone(TZ).startOf("day");
  const starts: DateTime[] = [];
  let t = dayStart.set({ hour: WORK_START_HOUR, minute: 0, second: 0, millisecond: 0 });
  const dayEnd = dayStart.set({ hour: WORK_END_HOUR, minute: 0, second: 0, millisecond: 0 });
  while (true) {
    const end = t.plus({ minutes: MEETING_MINUTES });
    if (end > dayEnd) break;
    starts.push(t);
    t = t.plus({ minutes: MEETING_MINUTES });
  }
  return starts;
}

export function intervalsOverlap(aStart: DateTime, aEnd: DateTime, bStart: DateTime, bEnd: DateTime): boolean {
  return aStart < bEnd && aEnd > bStart;
}

export function isSlotFree(
  slotStartUtc: DateTime,
  slotEndUtc: DateTime,
  busy: BusyInterval[],
): boolean {
  for (const b of busy) {
    if (intervalsOverlap(slotStartUtc, slotEndUtc, b.start, b.end)) return false;
  }
  return true;
}
