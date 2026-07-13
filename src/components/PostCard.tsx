import Link from "next/link";
import { timeAgo } from "@/lib/format";
import LikeButton from "@/components/LikeButton";

export type PostCardData = {
  id: string;
  content: string;
  created_at: string;
  author: {
    username: string;
    display_name: string | null;
    avatar_url: string | null;
  };
  likeCount: number;
  liked: boolean;
};

export default function PostCard({
  post,
  canLike,
}: {
  post: PostCardData;
  canLike: boolean;
}) {
  return (
    <article className="flex gap-3 border-b border-neutral-900 px-4 py-4">
      <Link href={`/profile/${post.author.username}`} className="shrink-0">
        <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-neutral-800 text-sm font-semibold">
          {post.author.avatar_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.author.avatar_url}
              alt={post.author.username}
              className="h-full w-full object-cover"
            />
          ) : (
            post.author.username.slice(0, 1).toUpperCase()
          )}
        </div>
      </Link>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 text-sm">
          <Link
            href={`/profile/${post.author.username}`}
            className="font-semibold hover:underline"
          >
            {post.author.display_name || post.author.username}
          </Link>
          <span className="text-neutral-500">@{post.author.username}</span>
          <span className="text-neutral-600">·</span>
          <span className="text-neutral-500">{timeAgo(post.created_at)}</span>
        </div>

        <p className="mt-1 whitespace-pre-wrap break-words text-[15px] leading-snug">
          {post.content}
        </p>

        <div className="mt-2">
          <LikeButton
            postId={post.id}
            liked={post.liked}
            count={post.likeCount}
            disabled={!canLike}
          />
        </div>
      </div>
    </article>
  );
}
