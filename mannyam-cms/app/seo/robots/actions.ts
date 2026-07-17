"use server";

import { revalidatePath } from "next/cache";

import { supabaseAdmin } from "@/lib/supabase/admin";

import { requireRole } from "@/lib/rbac/requireRole";

async function requireAdmin() {
  const { user } = await requireRole(["Admin", "Content Manager", "Marketer"]);
  return { user };
}

export async function saveRobotsTxt(content: string) {
  const { user } = await requireAdmin();

  const { error } = await supabaseAdmin
    .from("site_settings")
    .upsert({
      key: "robots_txt",
      value: content,
      updated_at: new Date().toISOString(),
      updated_by: user.id
    });

  if (error) throw new Error(error.message);
  revalidatePath("/api/robots");
  return { success: true };
}

export async function resetRobotsTxt() {
  await requireAdmin();

  const { error } = await supabaseAdmin
    .from("site_settings")
    .delete()
    .eq("key", "robots_txt");

  if (error) throw new Error(error.message);
  revalidatePath("/api/robots");
  return { success: true };
}
