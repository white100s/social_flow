import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { signOut } from "@/app/login/actions";
import { getLocale } from "@/lib/i18n/locale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getTheme } from "@/lib/theme";
import { LanguageSwitcher, ThemeSwitcher } from "@/components/PreferenceSwitchers";

export default async function Header() {
  const [user, locale, theme] = await Promise.all([
    getCurrentUser(),
    getLocale(),
    getTheme(),
  ]);
  const t = getDictionary(locale);

  return (
    <>
      <header
        className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="flex items-center justify-between gap-2 px-4 py-3">
          <Link href="/" className="shrink-0 text-lg font-bold">
            {t.brand}
          </Link>

          <nav className="flex min-w-0 items-center gap-1 text-sm">
            {user ? (
              <>
                <Link
                  href="/new"
                  className="hidden shrink-0 rounded-full px-3 py-2 text-muted hover:bg-surface hover:text-foreground sm:inline-block"
                >
                  {t.nav.newPost}
                </Link>
                <Link
                  href={`/profile/${user.profile.username}`}
                  className="min-w-0 shrink truncate rounded-full px-2 py-2 text-muted hover:bg-surface hover:text-foreground"
                >
                  @{user.profile.username}
                </Link>
                <form action={signOut} className="shrink-0">
                  <button
                    type="submit"
                    className="rounded-full px-2 py-2 text-muted hover:bg-surface hover:text-foreground"
                  >
                    {t.nav.logout}
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="shrink-0 rounded-full px-3 py-2 text-muted hover:bg-surface hover:text-foreground"
                >
                  {t.nav.login}
                </Link>
                <Link
                  href="/signup"
                  className="shrink-0 rounded-full bg-foreground px-3 py-2 font-semibold text-background hover:opacity-90"
                >
                  {t.nav.signup}
                </Link>
              </>
            )}

            <span className="mx-1 h-5 w-px shrink-0 bg-border" />

            <ThemeSwitcher theme={theme} />
            <LanguageSwitcher locale={locale} />
          </nav>
        </div>
      </header>

      {user && (
        <Link
          href="/new"
          aria-label={t.nav.newPost}
          className="fixed right-4 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-foreground text-2xl font-semibold text-background shadow-lg sm:hidden"
          style={{ bottom: "calc(env(safe-area-inset-bottom) + 1rem)" }}
        >
          +
        </Link>
      )}
    </>
  );
}
