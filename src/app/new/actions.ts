"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getLocale } from "@/lib/i18n/locale";
import { getDictionary } from "@/lib/i18n/dictionaries";

export async function createPost(formData: FormData) {
  const content = String(formData.get("content") ?? "").trim();

  if (!content || content.length > 500) {
    const t = getDictionary(await getLocale()).newPost;
    redirect(`/new?error=${encodeURIComponent(t.lengthError)}`);
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/new");
  }

  const { error } = await supabase.from("posts").insert({
    author_id: user.id,
    content,
  });

  if (error) {
    redirect(`/new?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/");
  redirect("/");
}
