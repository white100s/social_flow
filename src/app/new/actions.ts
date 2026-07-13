"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function createPost(formData: FormData) {
  const content = String(formData.get("content") ?? "").trim();

  if (!content || content.length > 500) {
    redirect(`/new?error=${encodeURIComponent("1~500자로 작성해주세요")}`);
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
