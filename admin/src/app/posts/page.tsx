import { createClient } from "@/lib/supabase/server";
import { deletePost } from "@/app/actions/moderation";

export default async function PostsPage() {
  const supabase = await createClient();

  const { data: posts, error } = await supabase
    .from("posts")
    .select(
      "id, content, created_at, author:profiles!posts_author_id_fkey(username), likes(count)",
    )
    .order("created_at", { ascending: false })
    .limit(200);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-xl font-bold">게시물</h1>

      {error && <p className="text-sm text-danger-fg">{error.message}</p>}

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border text-muted">
              <th className="px-4 py-3 font-medium">작성자</th>
              <th className="px-4 py-3 font-medium">내용</th>
              <th className="px-4 py-3 font-medium">좋아요</th>
              <th className="px-4 py-3 font-medium">작성일</th>
              <th className="px-4 py-3 font-medium">액션</th>
            </tr>
          </thead>
          <tbody>
            {(posts ?? []).map((post) => {
              const author = Array.isArray(post.author) ? post.author[0] : post.author;
              const likeCount = Array.isArray(post.likes) ? (post.likes[0]?.count ?? 0) : 0;
              return (
                <tr key={post.id} className="border-b border-border last:border-0 align-top">
                  <td className="px-4 py-3 whitespace-nowrap">@{author?.username}</td>
                  <td className="max-w-md px-4 py-3">
                    <p className="line-clamp-2 whitespace-pre-wrap break-words">
                      {post.content}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-muted">{likeCount}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-muted">
                    {new Date(post.created_at).toLocaleDateString("ko-KR")}
                  </td>
                  <td className="px-4 py-3">
                    <form action={deletePost.bind(null, post.id)}>
                      <button
                        type="submit"
                        className="rounded-full border border-danger-fg/40 px-3 py-1 text-xs text-danger-fg hover:bg-danger-bg"
                      >
                        삭제
                      </button>
                    </form>
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
