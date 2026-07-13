import { createClient } from "@/lib/supabase/server";
import { getCurrentAdmin } from "@/lib/auth";
import { setUserBanned, setUserAdmin } from "@/app/actions/moderation";

export default async function UsersPage() {
  const supabase = await createClient();
  const admin = await getCurrentAdmin();

  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("id, username, display_name, created_at, is_admin, is_banned")
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-xl font-bold">사용자</h1>

      {error && <p className="text-sm text-danger-fg">{error.message}</p>}

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border text-muted">
              <th className="px-4 py-3 font-medium">아이디</th>
              <th className="px-4 py-3 font-medium">이름</th>
              <th className="px-4 py-3 font-medium">가입일</th>
              <th className="px-4 py-3 font-medium">상태</th>
              <th className="px-4 py-3 font-medium">액션</th>
            </tr>
          </thead>
          <tbody>
            {(profiles ?? []).map((p) => {
              const isSelf = p.id === admin?.id;
              return (
                <tr key={p.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3">@{p.username}</td>
                  <td className="px-4 py-3 text-muted">{p.display_name ?? "-"}</td>
                  <td className="px-4 py-3 text-muted">
                    {new Date(p.created_at).toLocaleDateString("ko-KR")}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      {p.is_admin && (
                        <span className="rounded-full bg-accent-bg px-2 py-0.5 text-xs text-accent-fg">
                          관리자
                        </span>
                      )}
                      {p.is_banned && (
                        <span className="rounded-full bg-danger-bg px-2 py-0.5 text-xs text-danger-fg">
                          정지됨
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <form action={setUserBanned.bind(null, p.id, !p.is_banned)}>
                        <button
                          type="submit"
                          disabled={isSelf}
                          className="rounded-full border border-border px-3 py-1 text-xs hover:bg-surface disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          {p.is_banned ? "정지 해제" : "정지"}
                        </button>
                      </form>
                      <form action={setUserAdmin.bind(null, p.id, !p.is_admin)}>
                        <button
                          type="submit"
                          disabled={isSelf}
                          className="rounded-full border border-border px-3 py-1 text-xs hover:bg-surface disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          {p.is_admin ? "관리자 해제" : "관리자 지정"}
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
