import { cookies } from "next/headers";
import type { Locale } from "@/lib/i18n/dictionaries";

const COOKIE_NAME = "locale";
const DEFAULT_LOCALE: Locale = "ko";

export async function getLocale(): Promise<Locale> {
  const store = await cookies();
  const value = store.get(COOKIE_NAME)?.value;
  return value === "en" ? "en" : DEFAULT_LOCALE;
}

export { COOKIE_NAME as LOCALE_COOKIE_NAME };
