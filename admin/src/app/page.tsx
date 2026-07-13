import { createClient } from "@/lib/supabase/server";

async function count(
  supabase: Awaited<ReturnType<typeof createClient>>,
  table: "profiles" | "posts" | "likes" | "follows",
) {
  const { count } = await supabase.from(table).select("*", { count: "exact", head: true });
  return count ?? 0;
}

export default async function DashboardPage() {
  const supabase = await createClient();

  const [users, posts, likes, follows, bannedUsers] = await Promise.all([
    count(supabase, "profiles"),
    count(supabase, "posts"),
    count(supabase, "likes"),
    count(supabase, "follows"),
    supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .eq("is_banned", true)
      .then((r) => r.count ?? 0),
  ]);

  const stats = [
    { label: "가입자", value: users },
    { label: "게시물", value: posts },
    { label: "좋아요", value: likes },
    { label: "팔로우 관계", value: follows },
    { label: "정지된 계정", value: bannedUsers },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-xl font-bold">대시보드</h1>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-surface p-4">
            <p className="text-sm text-muted">{s.label}</p>
            <p className="mt-1 text-2xl font-bold">{s.value.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
