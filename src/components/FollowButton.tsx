import { toggleFollow } from "@/app/actions/follows";

export default function FollowButton({
  targetUserId,
  username,
  following,
}: {
  targetUserId: string;
  username: string;
  following: boolean;
}) {
  const action = toggleFollow.bind(null, targetUserId, username);

  return (
    <form action={action}>
      <button
        type="submit"
        className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
          following
            ? "border border-neutral-700 text-white hover:bg-neutral-900"
            : "bg-white text-black hover:bg-neutral-200"
        }`}
      >
        {following ? "팔로잉" : "팔로우"}
      </button>
    </form>
  );
}
