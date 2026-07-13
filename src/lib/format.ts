import type { Locale } from "@/lib/i18n/dictionaries";
import { getDictionary } from "@/lib/i18n/dictionaries";

export function timeAgo(locale: Locale, dateString: string) {
  const t = getDictionary(locale).time;
  const seconds = Math.floor((Date.now() - new Date(dateString).getTime()) / 1000);

  const units: [string, number][] = [
    [t.year, 31536000],
    [t.month, 2592000],
    [t.day, 86400],
    [t.hour, 3600],
    [t.minute, 60],
  ];

  for (const [label, secondsInUnit] of units) {
    const value = Math.floor(seconds / secondsInUnit);
    if (value >= 1) return `${value}${label}`;
  }

  return t.justNow;
}
