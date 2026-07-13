import { createPost } from "./actions";
import { getLocale } from "@/lib/i18n/locale";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default async function NewPostPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const t = getDictionary(await getLocale()).newPost;

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <h1 className="mb-6 text-xl font-bold">{t.title}</h1>

      {error && (
        <p className="mb-4 rounded-lg bg-danger-bg px-3 py-2 text-sm text-danger-fg">
          {error}
        </p>
      )}

      <form action={createPost} className="flex flex-col gap-3">
        <textarea
          name="content"
          required
          maxLength={500}
          rows={6}
          placeholder={t.placeholder}
          className="resize-none rounded-xl border border-border bg-surface px-4 py-3 text-base outline-none focus:border-muted"
        />
        <button
          type="submit"
          className="ml-auto min-h-12 rounded-full bg-foreground px-5 py-2 text-sm font-semibold text-background transition hover:opacity-90"
        >
          {t.submit}
        </button>
      </form>
    </div>
  );
}
