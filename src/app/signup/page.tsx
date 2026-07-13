import Link from "next/link";
import { signup } from "./actions";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="flex min-h-dvh items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="mb-8 text-center text-2xl font-bold">계정 만들기</h1>

        {error && (
          <p className="mb-4 rounded-lg bg-red-950 px-3 py-2 text-sm text-red-400">
            {error}
          </p>
        )}

        <form action={signup} className="flex flex-col gap-3">
          <input
            type="text"
            name="username"
            placeholder="아이디 (영문 소문자, 숫자, _)"
            required
            pattern="[a-z0-9_]{3,20}"
            className="rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-3 text-sm outline-none focus:border-neutral-500"
          />
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
            placeholder="비밀번호 (6자 이상)"
            required
            minLength={6}
            className="rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-3 text-sm outline-none focus:border-neutral-500"
          />
          <button
            type="submit"
            className="mt-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-neutral-200"
          >
            가입하기
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-400">
          이미 계정이 있으신가요?{" "}
          <Link href="/login" className="font-semibold text-white">
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
}
