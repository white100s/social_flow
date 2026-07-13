"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function setUserBanned(userId: string, banned: boolean) {
  const supabase = await createClient();
  await supabase.from("profiles").update({ is_banned: banned }).eq("id", userId);
  revalidatePath("/users");
}

export async function setUserAdmin(userId: string, isAdmin: boolean) {
  const supabase = await createClient();
  await supabase.from("profiles").update({ is_admin: isAdmin }).eq("id", userId);
  revalidatePath("/users");
}

export async function deletePost(postId: string) {
  const supabase = await createClient();
  await supabase.from("posts").delete().eq("id", postId);
  revalidatePath("/posts");
  revalidatePath("/");
}
