import Link from "next/link";
import { signup } from "./actions";
import { getLocale } from "@/lib/i18n/locale";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const t = getDictionary(await getLocale()).signup;

  return (
    <div className="flex min-h-dvh items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm">
        <h1 className="mb-8 text-center text-2xl font-bold">{t.title}</h1>

        {error && (
          <p className="mb-4 rounded-lg bg-danger-bg px-3 py-2 text-sm text-danger-fg">
            {error}
          </p>
        )}

        <form action={signup} className="flex flex-col gap-3">
          <input
            type="email"
            name="email"
            placeholder={t.email}
            required
            className="min-h-12 rounded-xl border border-border bg-surface px-4 py-3 text-base outline-none focus:border-muted"
          />
          <input
            type="password"
            name="password"
            placeholder={t.password}
            required
            minLength={6}
            className="min-h-12 rounded-xl border border-border bg-surface px-4 py-3 text-base outline-none focus:border-muted"
          />
          <button
            type="submit"
            className="mt-2 min-h-12 rounded-xl bg-foreground px-4 py-3 text-sm font-semibold text-background transition hover:opacity-90"
          >
            {t.submit}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          {t.haveAccount}{" "}
          <Link href="/login" className="font-semibold text-foreground">
            {t.loginLink}
          </Link>
        </p>
      </div>
    </div>
  );
}
