import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { User } from "@supabase/supabase-js";
import { Role } from "./permissions";

/**
 * Validates the authenticated user session and enforces role-based access controls.
 * Redirects to /login if unauthenticated, or to the specified redirect path
 * (defaulting to /dashboard?error=access_denied) if unauthorized.
 */
export async function requireRole(
  allowedRoles: Role[],
  redirectTo = '/dashboard'
): Promise<{ user: User; role: Role }> {
  const supabase = await createClient();
  
  // 1. Get authenticated user
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    redirect("/login");
  }

  // 2. Fetch profile details
  const { data: profile, error: profileError } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) {
    redirect("/login");
  }

  const userRole = profile.role as Role;

  // 3. Enforce role membership
  if (!allowedRoles.includes(userRole)) {
    const targetUrl = redirectTo === '/dashboard' ? '/dashboard?error=access_denied' : redirectTo;
    redirect(targetUrl);
  }

  return { user, role: userRole };
}
