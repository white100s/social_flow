import { createClient } from "@/lib/supabase/server";
import PostCard, { type PostCardData } from "@/components/PostCard";

export default async function FeedPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: posts, error } = await supabase
    .from("posts")
    .select(
      "id, content, created_at, author:profiles!posts_author_id_fkey(username, display_name, avatar_url), likes(count)",
    )
    .is("reply_to_id", null)
    .order("created_at", { ascending: false })
    .limit(50);

  let likedPostIds = new Set<string>();
  if (user && posts?.length) {
    const { data: myLikes } = await supabase
      .from("likes")
      .select("post_id")
      .eq("user_id", user.id)
      .in(
        "post_id",
        posts.map((p) => p.id),
      );
    likedPostIds = new Set((myLikes ?? []).map((l) => l.post_id));
  }

  const items: PostCardData[] = (posts ?? []).map((p) => ({
    id: p.id,
    content: p.content,
    created_at: p.created_at,
    author: Array.isArray(p.author) ? p.author[0] : p.author,
    likeCount: Array.isArray(p.likes) ? (p.likes[0]?.count ?? 0) : 0,
    liked: likedPostIds.has(p.id),
  }));

  return (
    <div className="mx-auto max-w-xl">
      {error && (
        <p className="px-4 py-6 text-sm text-red-400">
          피드를 불러오지 못했어요: {error.message}
        </p>
      )}

      {!error && items.length === 0 && (
        <p className="px-4 py-10 text-center text-sm text-neutral-500">
          아직 게시물이 없어요. 첫 글을 남겨보세요!
        </p>
      )}

      {items.map((post) => (
        <PostCard key={post.id} post={post} canLike={!!user} />
      ))}
    </div>
  );
}
