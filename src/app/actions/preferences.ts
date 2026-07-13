"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import type { Locale } from "@/lib/i18n/dictionaries";
import { LOCALE_COOKIE_NAME } from "@/lib/i18n/locale";
import { THEME_COOKIE_NAME, type Theme } from "@/lib/theme";

const ONE_YEAR = 60 * 60 * 24 * 365;

export async function setLocale(locale: Locale) {
  const store = await cookies();
  store.set(LOCALE_COOKIE_NAME, locale, { maxAge: ONE_YEAR, path: "/" });
  revalidatePath("/", "layout");
}

export async function setTheme(theme: Theme) {
  const store = await cookies();
  store.set(THEME_COOKIE_NAME, theme, { maxAge: ONE_YEAR, path: "/" });
  revalidatePath("/", "layout");
}
