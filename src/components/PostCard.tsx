import Link from "next/link";
import { timeAgo } from "@/lib/format";
import LikeButton from "@/components/LikeButton";
import type { Locale } from "@/lib/i18n/dictionaries";

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
  locale,
}: {
  post: PostCardData;
  canLike: boolean;
  locale: Locale;
}) {
  return (
    <article className="flex gap-3 border-b border-border px-4 py-4">
      <Link href={`/profile/${post.author.username}`} className="shrink-0">
        <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-surface text-sm font-semibold">
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
        <div className="flex min-w-0 items-baseline gap-1.5 text-sm">
          <Link
            href={`/profile/${post.author.username}`}
            className="truncate font-semibold hover:underline"
          >
            {post.author.display_name || post.author.username}
          </Link>
          <span className="shrink-0 text-muted">
            @{post.author.username} · {timeAgo(locale, post.created_at)}
          </span>
        </div>

        <p className="mt-1 whitespace-pre-wrap break-words text-[15px] leading-snug">
          {post.content}
        </p>

        <div className="mt-1">
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
