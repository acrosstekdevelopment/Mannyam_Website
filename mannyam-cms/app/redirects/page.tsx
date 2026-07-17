import { requireRole } from "@/lib/rbac/requireRole";
import { createClient } from "@/lib/supabase/server";
import { RedirectsClient } from "./RedirectsClient";

export const dynamic = "force-dynamic";

export default async function RedirectsPage() {
  const { role } = await requireRole(["Admin", "Marketer"]);
  const supabase = await createClient();

  const { data: redirects } = await supabase
    .from("redirects")
    .select("*")
    .order("created_at", { ascending: false });

  const canWrite = ["Admin", "Marketer"].includes(role);

  return (
    <RedirectsClient
      initialRedirects={redirects ?? []}
      canWrite={canWrite}
    />
  );
}
