"use server";

import { requireRole } from "@/lib/rbac/requireRole";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

export async function updateUserRole(userId: string, newRole: string) {
  // Enforce strict Admin RBAC before updating roles
  await requireRole(["Admin"]);

  const validRoles = ["Admin", "Content Manager", "Customer"];
  if (!validRoles.includes(newRole)) {
    throw new Error("Invalid role specified.");
  }

  // Use the service role client (bypasses RLS) because ordinary Admins
  // can't directly update other users' roles without bypassing the default policy
  // depending on how RLS is strictly configured on the users table.
  const supabase = getSupabaseAdmin() as any;

  const { error } = await supabase
    .from("users")
    .update({ role: newRole })
    .eq("id", userId);

  if (error) {
    console.error("Failed to update user role:", error);
    throw new Error("Failed to update user role. Check logs for details.");
  }

  revalidatePath("/settings/users");
}
