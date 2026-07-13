import { createPost } from "./actions";

export default async function NewPostPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <h1 className="mb-6 text-xl font-bold">새 글 작성</h1>

      {error && (
        <p className="mb-4 rounded-lg bg-red-950 px-3 py-2 text-sm text-red-400">
          {error}
        </p>
      )}

      <form action={createPost} className="flex flex-col gap-3">
        <textarea
          name="content"
          required
          maxLength={500}
          rows={6}
          placeholder="무슨 일이 있었나요?"
          className="resize-none rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-3 text-sm outline-none focus:border-neutral-500"
        />
        <button
          type="submit"
          className="ml-auto rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-neutral-200"
        >
          게시
        </button>
      </form>
    </div>
  );
}
