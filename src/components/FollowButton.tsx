import { toggleFollow } from "@/app/actions/follows";

export default function FollowButton({
  targetUserId,
  username,
  following,
  labels,
}: {
  targetUserId: string;
  username: string;
  following: boolean;
  labels: { follow: string; following: string };
}) {
  const action = toggleFollow.bind(null, targetUserId, username);

  return (
    <form action={action}>
      <button
        type="submit"
        className={`min-h-11 rounded-full px-4 text-sm font-semibold transition ${
          following
            ? "border border-border text-foreground hover:bg-surface"
            : "bg-foreground text-background hover:opacity-90"
        }`}
      >
        {following ? labels.following : labels.follow}
      </button>
    </form>
  );
}
