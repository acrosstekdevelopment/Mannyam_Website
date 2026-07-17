import { requireRole } from "@/lib/rbac/requireRole";
import { createClient } from "@/lib/supabase/server";
import { AnalyticsSettingsClient } from "./AnalyticsSettingsClient";

export const dynamic = "force-dynamic";

export default async function AnalyticsSettingsPage() {
  await requireRole(["Admin", "Marketer"]);
  const supabase = await createClient();

  // Fetch current GA4 and GTM settings
  const { data: settings } = await supabase
    .from("site_settings")
    .select("key, value")
    .in("key", ["ga4_measurement_id", "gtm_container_id"]);

  const initialGa4Id = settings?.find((s) => s.key === "ga4_measurement_id")?.value || "";
  const initialGtmId = settings?.find((s) => s.key === "gtm_container_id")?.value || "";

  return (
    <AnalyticsSettingsClient
      initialGa4Id={initialGa4Id}
      initialGtmId={initialGtmId}
    />
  );
}
