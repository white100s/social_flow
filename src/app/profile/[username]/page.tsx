import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PostCard, { type PostCardData } from "@/components/PostCard";
import FollowButton from "@/components/FollowButton";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, username, display_name, avatar_url, bio, created_at")
    .eq("username", username)
    .maybeSingle();

  if (!profile) notFound();

  const [{ count: followerCount }, { count: followingCount }, { data: posts }] =
    await Promise.all([
      supabase
        .from("follows")
        .select("*", { count: "exact", head: true })
        .eq("following_id", profile.id),
      supabase
        .from("follows")
        .select("*", { count: "exact", head: true })
        .eq("follower_id", profile.id),
      supabase
        .from("posts")
        .select("id, content, created_at, likes(count)")
        .eq("author_id", profile.id)
        .is("reply_to_id", null)
        .order("created_at", { ascending: false }),
    ]);

  let isFollowing = false;
  let likedPostIds = new Set<string>();

  if (user) {
    const [{ data: followRow }, { data: myLikes }] = await Promise.all([
      user.id === profile.id
        ? Promise.resolve({ data: null })
        : supabase
            .from("follows")
            .select("follower_id")
            .eq("follower_id", user.id)
            .eq("following_id", profile.id)
            .maybeSingle(),
      posts?.length
        ? supabase
            .from("likes")
            .select("post_id")
            .eq("user_id", user.id)
            .in(
              "post_id",
              posts.map((p) => p.id),
            )
        : Promise.resolve({ data: [] }),
    ]);
    isFollowing = !!followRow;
    likedPostIds = new Set((myLikes ?? []).map((l) => l.post_id));
  }

  const items: PostCardData[] = (posts ?? []).map((p) => ({
    id: p.id,
    content: p.content,
    created_at: p.created_at,
    author: {
      username: profile.username,
      display_name: profile.display_name,
      avatar_url: profile.avatar_url,
    },
    likeCount: Array.isArray(p.likes) ? (p.likes[0]?.count ?? 0) : 0,
    liked: likedPostIds.has(p.id),
  }));

  const isOwnProfile = user?.id === profile.id;

  return (
    <div className="mx-auto max-w-xl">
      <div className="flex items-start justify-between gap-4 border-b border-neutral-900 px-4 py-6">
        <div className="min-w-0">
          <h1 className="text-xl font-bold">
            {profile.display_name || profile.username}
          </h1>
          <p className="text-sm text-neutral-500">@{profile.username}</p>
          {profile.bio && <p className="mt-3 text-sm">{profile.bio}</p>}
          <div className="mt-3 flex gap-4 text-sm text-neutral-400">
            <span>
              <strong className="text-white">{followerCount ?? 0}</strong> 팔로워
            </span>
            <span>
              <strong className="text-white">{followingCount ?? 0}</strong> 팔로잉
            </span>
          </div>
        </div>

        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-neutral-800 text-xl font-semibold">
          {profile.avatar_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={profile.avatar_url}
              alt={profile.username}
              className="h-full w-full object-cover"
            />
          ) : (
            profile.username.slice(0, 1).toUpperCase()
          )}
        </div>
      </div>

      {!isOwnProfile && user && (
        <div className="px-4 py-3">
          <FollowButton
            targetUserId={profile.id}
            username={profile.username}
            following={isFollowing}
          />
        </div>
      )}

      {items.length === 0 ? (
        <p className="px-4 py-10 text-center text-sm text-neutral-500">
          아직 게시물이 없어요.
        </p>
      ) : (
        items.map((post) => (
          <PostCard key={post.id} post={post} canLike={!!user} />
        ))
      )}
    </div>
  );
}
