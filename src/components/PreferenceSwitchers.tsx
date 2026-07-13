import { setLocale, setTheme } from "@/app/actions/preferences";
import type { Locale } from "@/lib/i18n/dictionaries";
import type { Theme } from "@/lib/theme";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const next: Locale = locale === "ko" ? "en" : "ko";
  const label = locale === "ko" ? "EN" : "KO";
  const action = setLocale.bind(null, next);

  return (
    <form action={action}>
      <button
        type="submit"
        aria-label="Change language"
        className="flex h-9 min-w-9 items-center justify-center rounded-full border border-border px-2 text-xs font-semibold text-foreground hover:bg-surface"
      >
        {label}
      </button>
    </form>
  );
}

export function ThemeSwitcher({ theme }: { theme: Theme }) {
  const next: Theme = theme === "dark" ? "light" : "dark";
  const action = setTheme.bind(null, next);

  return (
    <form action={action}>
      <button
        type="submit"
        aria-label="Toggle color theme"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-sm hover:bg-surface"
      >
        {theme === "dark" ? "☀️" : "🌙"}
      </button>
    </form>
  );
}
