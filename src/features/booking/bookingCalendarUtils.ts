/** Fecha de muro en America/Bogota a mediodía → instante UTC estable para weekday. */
export function bogotaNoonUtcMs(isoDate: string): number {
  return Date.parse(`${isoDate}T17:00:00.000Z`);
}

export function bogotaTodayIso(): string {
  return new Date().toLocaleDateString("en-CA", { timeZone: "America/Bogota" });
}

export function daysInBogotaMonth(year: number, monthIndex: number): number {
  const m = monthIndex + 1;
  const nextM = m === 12 ? 1 : m + 1;
  const nextY = m === 12 ? year + 1 : year;
  const start = Date.parse(`${year}-${String(m).padStart(2, "0")}-01T17:00:00.000Z`);
  const end = Date.parse(`${nextY}-${String(nextM).padStart(2, "0")}-01T17:00:00.000Z`);
  return Math.round((end - start) / 86400000);
}

/** 0 = domingo … 6 = sábado (según calendario en Bogota). */
export function bogotaWeekdaySunday0(isoDate: string): number {
  return new Date(bogotaNoonUtcMs(isoDate)).getUTCDay();
}

export function isoFromParts(year: number, monthIndex: number, day: number): string {
  return `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function parseMonthFromIso(iso: string): { year: number; monthIndex: number } {
  const [y, m] = iso.split("-").map(Number);
  return { year: y, monthIndex: m - 1 };
}

type Month = { year: number; monthIndex: number };

export function monthCompare(a: Month, b: Month): number {
  if (a.year !== b.year) return a.year - b.year;
  return a.monthIndex - b.monthIndex;
}

export function monthAfter(a: Month, b: Month): boolean {
  return monthCompare(a, b) > 0;
}

export function monthBefore(a: Month, b: Month): boolean {
  return monthCompare(a, b) < 0;
}

export function monthNotBefore(a: Month, b: Month): boolean {
  return monthCompare(a, b) >= 0;
}

export function monthNotAfter(a: Month, b: Month): boolean {
  return monthCompare(a, b) <= 0;
}
