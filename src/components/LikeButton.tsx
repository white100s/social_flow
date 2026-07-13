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
        className={`flex items-center gap-1.5 text-sm transition ${
          liked ? "text-red-500" : "text-neutral-400 hover:text-neutral-200"
        } ${disabled ? "cursor-not-allowed opacity-60" : ""}`}
      >
        <span>{liked ? "♥" : "♡"}</span>
        <span>{count}</span>
      </button>
    </form>
  );
}
