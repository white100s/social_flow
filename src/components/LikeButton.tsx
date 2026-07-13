import { toggleLike } from "@/app/actions/likes";

export default function LikeButton({
  postId,
  liked,
  count,
  disabled,
}: {
  postId: string;
  liked: boolean;
  count: number;
  disabled?: boolean;
}) {
  const action = toggleLike.bind(null, postId);

  return (
    <form action={disabled ? undefined : action}>
      <button
        type="submit"
        disabled={disabled}
        aria-pressed={liked}
        className={`-ml-2 flex min-h-11 items-center gap-1.5 rounded-full px-2 text-sm transition ${
          liked ? "text-red-500" : "text-muted hover:text-foreground"
        } ${disabled ? "cursor-not-allowed opacity-60" : ""}`}
      >
        <span className="text-lg leading-none">{liked ? "♥" : "♡"}</span>
        <span>{count}</span>
      </button>
    </form>
  );
}
