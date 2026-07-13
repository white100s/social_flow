import Link from "next/link";
import { getCurrentAdmin } from "@/lib/auth";
import { signOut } from "@/app/login/actions";

export default async function Nav() {
  const admin = await getCurrentAdmin();
  if (!admin) return null;

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur">
      <div className="flex items-center justify-between gap-2 px-4 py-3">
        <div className="flex items-center gap-4">
          <span className="text-lg font-bold">소셜 플로우 관리자</span>
          <nav className="flex items-center gap-1 text-sm">
            <Link href="/" className="rounded-full px-3 py-2 text-muted hover:bg-surface hover:text-foreground">
              대시보드
            </Link>
            <Link
              href="/users"
              className="rounded-full px-3 py-2 text-muted hover:bg-surface hover:text-foreground"
            >
              사용자
            </Link>
            <Link
              href="/posts"
              className="rounded-full px-3 py-2 text-muted hover:bg-surface hover:text-foreground"
            >
              게시물
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-muted">@{admin.profile.username}</span>
          <form action={signOut}>
            <button
              type="submit"
              className="rounded-full px-3 py-2 text-sm text-muted hover:bg-surface hover:text-foreground"
            >
              로그아웃
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
