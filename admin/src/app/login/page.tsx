import { login, signOut } from "./actions";

const ERROR_MESSAGES: Record<string, string> = {
  not_admin: "관리자 권한이 있는 계정으로 로그인해주세요.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const message = error ? (ERROR_MESSAGES[error] ?? error) : null;
  const isNotAdmin = error === "not_admin";

  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4 text-foreground">
      <div className="w-full max-w-sm">
        <h1 className="mb-8 text-center text-2xl font-bold">소셜 플로우 관리자</h1>

        {message && (
          <div className="mb-4 rounded-lg bg-danger-bg px-3 py-2 text-sm text-danger-fg">
            <p>{message}</p>
            {isNotAdmin && (
              <form action={signOut} className="mt-2">
                <button type="submit" className="underline">
                  다른 계정으로 로그인
                </button>
              </form>
            )}
          </div>
        )}

        <form action={login} className="flex flex-col gap-3">
          <input
            type="email"
            name="email"
            placeholder="이메일"
            required
            className="min-h-12 rounded-xl border border-border bg-surface px-4 py-3 text-base outline-none focus:border-muted"
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            required
            className="min-h-12 rounded-xl border border-border bg-surface px-4 py-3 text-base outline-none focus:border-muted"
          />
          <button
            type="submit"
            className="mt-2 min-h-12 rounded-xl bg-foreground px-4 py-3 text-sm font-semibold text-background transition hover:opacity-90"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}
