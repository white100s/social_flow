import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { signOut } from "@/app/login/actions";

export default async function Header() {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b border-neutral-800 bg-black/80 px-4 py-3 backdrop-blur">
      <Link href="/" className="text-lg font-bold">
        Threads Clone
      </Link>

      <nav className="flex items-center gap-4 text-sm">
        {user ? (
          <>
            <Link href="/new" className="text-neutral-300 hover:text-white">
              새 글
            </Link>
            <Link
              href={`/profile/${user.profile.username}`}
              className="text-neutral-300 hover:text-white"
            >
              @{user.profile.username}
            </Link>
            <form action={signOut}>
              <button type="submit" className="text-neutral-300 hover:text-white">
                로그아웃
              </button>
            </form>
          </>
        ) : (
          <>
            <Link href="/login" className="text-neutral-300 hover:text-white">
              로그인
            </Link>
            <Link
              href="/signup"
              className="rounded-full bg-white px-3 py-1.5 font-semibold text-black hover:bg-neutral-200"
            >
              가입하기
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
