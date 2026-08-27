import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Whether a card in a CMS-driven 12-column stat grid sits in a 3-across row.
 * The card count changes whenever an editor adds or removes a stat, so the
 * split is derived from the count rather than hardcoded: the trailing 2 or 4
 * cards drop to 2-across so the last row is never left half empty.
 * 6 -> 3+3, 5 -> 3+2, 4 -> 2+2, 3 -> 3.
 */
export function isWideStatCard(index: number, count: number): boolean {
  const tail = Math.min(count % 3 === 0 ? 0 : count % 3 === 2 ? 2 : 4, count);
  return index >= count - tail;
}

/** Column classes for a card in a CMS-driven 12-column stat grid. */
export function statGridSpan(index: number, count: number): string {
  return isWideStatCard(index, count)
    ? "col-span-12 md:col-span-6"
    : "col-span-12 md:col-span-6 lg:col-span-4";
}
