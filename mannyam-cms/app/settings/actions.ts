"use server";


import { supabaseAdmin } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

import { requireRole } from "@/lib/rbac/requireRole";

export async function saveSiteSetting(key: string, value: string) {
  const { user } = await requireRole(["Admin", "Marketer"]);


  const trimmedValue = value.trim();

  // Validate format
  if (key === "ga4_measurement_id") {
    if (trimmedValue !== "" && !/^G-[A-Z0-9]{10}$/.test(trimmedValue)) {
      throw new Error("Invalid GA4 Measurement ID format. Must match 'G-XXXXXXXXXX'.");
    }
  } else if (key === "gtm_container_id") {
    if (trimmedValue !== "" && !/^GTM-[A-Z0-9]+$/.test(trimmedValue)) {
      throw new Error("Invalid GTM Container ID format. Must match 'GTM-XXXXXXX'.");
    }
  } else {
    throw new Error("Invalid setting key.");
  }

  // Store in database using service role (bypasses RLS settings)
  const { error } = await supabaseAdmin
    .from("site_settings")
    .upsert({
      key,
      value: trimmedValue,
      updated_at: new Date().toISOString(),
      updated_by: user.id
    }, { onConflict: "key" });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/settings/analytics");
}
