"use server";

import { requireRole } from "@/lib/rbac/requireRole";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

export async function updateUserRole(userId: string, newRole: string) {
  await requireRole(["Admin"]);

  const validRoles = ["Admin", "Content Manager", "Marketer", "Customer"];
  if (!validRoles.includes(newRole)) {
    throw new Error("Invalid role specified.");
  }

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

export async function inviteUser(formData: FormData) {
  await requireRole(["Admin"]);

  const email = formData.get("email")?.toString()?.trim();
  const name = formData.get("name")?.toString()?.trim();
  const role = formData.get("role")?.toString() || "Content Manager";

  if (!email) throw new Error("Email is required.");
  if (!name) throw new Error("Name is required.");

  const validRoles = ["Admin", "Content Manager", "Marketer"];
  if (!validRoles.includes(role)) {
    throw new Error("Invalid role specified.");
  }

  const supabase = getSupabaseAdmin() as any;

  // Create auth user with a temporary password (they can reset later)
  const tempPassword = `Mannyam_${Date.now().toString(36)}!`;
  const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
    email,
    password: tempPassword,
    email_confirm: true,
  });

  if (authError) {
    console.error("Failed to create auth user:", authError);
    throw new Error(`Failed to invite user: ${authError.message}`);
  }

  // Insert into public.users table
  const { error: insertError } = await supabase
    .from("users")
    .upsert({
      id: authUser.user.id,
      email,
      name,
      role,
    });

  if (insertError) {
    console.error("Failed to insert user record:", insertError);
    throw new Error(`User created in auth but failed to save profile: ${insertError.message}`);
  }

  revalidatePath("/settings/users");
}

export async function removeUser(userId: string) {
  await requireRole(["Admin"]);

  const supabase = getSupabaseAdmin() as any;

  // Delete from public.users first
  const { error: deleteError } = await supabase
    .from("users")
    .delete()
    .eq("id", userId);

  if (deleteError) {
    console.error("Failed to delete user record:", deleteError);
    throw new Error("Failed to remove user profile.");
  }

  // Delete from auth.users
  const { error: authError } = await supabase.auth.admin.deleteUser(userId);

  if (authError) {
    console.error("Failed to delete auth user:", authError);
    // Profile already deleted, log but don't throw
  }

  revalidatePath("/settings/users");
}
