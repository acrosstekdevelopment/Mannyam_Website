import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// This page exists only to redirect the /admin shortcut to the dashboard.
// The public homepage is served by app/(public)/page.tsx at /.
export default async function AdminRedirectPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  redirect(user ? "/dashboard" : "/login");
}
