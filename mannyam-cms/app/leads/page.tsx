import { requireRole } from "@/lib/rbac/requireRole";
import { createClient } from "@/lib/supabase/server";
import { LeadsClient } from "./LeadsClient";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  const supabase = await createClient();

  // 1. Enforce RBAC
  await requireRole(["Admin", "Marketer"]);

  // 3. Fetch all leads
  const { data: leads } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  // 4. Fetch all lead notes, including the creator user's name
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: notes } = await (supabase as any).from("lead_notes")
    .select(`
      id,
      lead_id,
      note,
      created_at,
      created_by,
      users (
        name
      )
    `)
    .order("created_at", { ascending: false });

  // 5. Fetch all lead status changes from the audit log
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: auditLogs } = await (supabase as any).from("lead_audit_log")
    .select("*")
    .order("changed_at", { ascending: false });

  return (
    <LeadsClient
      initialLeads={leads || []}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      initialNotes={(notes as any) || []}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      initialAuditLogs={(auditLogs as any) || []}
    />
  );
}
