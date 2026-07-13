import Link from "next/link";
import { login } from "./actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string; confirm?: string }>;
}) {
  const { error, next, confirm } = await searchParams;

  return (
    <div className="flex min-h-dvh items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="mb-8 text-center text-2xl font-bold">로그인</h1>

        {confirm && (
          <p className="mb-4 rounded-lg bg-neutral-900 px-3 py-2 text-sm text-neutral-300">
            가입 확인 이메일을 보냈어요. 메일함을 확인해주세요.
          </p>
        )}
        {error && (
          <p className="mb-4 rounded-lg bg-red-950 px-3 py-2 text-sm text-red-400">
            {error}
          </p>
        )}

        <form action={login} className="flex flex-col gap-3">
          <input type="hidden" name="next" value={next ?? "/"} />
          <input
            type="email"
            name="email"
            placeholder="이메일"
            required
            className="rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-3 text-sm outline-none focus:border-neutral-500"
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            required
            minLength={6}
            className="rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-3 text-sm outline-none focus:border-neutral-500"
          />
          <button
            type="submit"
            className="mt-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-neutral-200"
          >
            로그인
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-400">
          계정이 없으신가요?{" "}
          <Link href="/signup" className="font-semibold text-white">
            가입하기
          </Link>
        </p>
      </div>
    </div>
  );
}
