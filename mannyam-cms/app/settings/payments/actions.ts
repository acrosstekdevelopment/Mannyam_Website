"use server";

import { requireRole } from "@/lib/rbac/requireRole";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

export async function savePaymentSettings(formData: FormData) {
  // Ensure the user is an Admin
  await requireRole(["Admin"]);

  const keyId = formData.get("razorpayKeyId")?.toString();
  const keySecret = formData.get("razorpayKeySecret")?.toString();
  const webhookSecret = formData.get("razorpayWebhookSecret")?.toString();

  const supabase = getSupabaseAdmin() as any;

  if (keyId !== undefined) {
    await supabase.from("payment_settings").upsert({ key: "RAZORPAY_KEY_ID", value: keyId });
  }

  // Only update secret fields if they aren't masked
  if (keySecret !== undefined && !keySecret.includes("••••")) {
    await supabase.from("payment_settings").upsert({ key: "RAZORPAY_KEY_SECRET", value: keySecret });
  }

  if (webhookSecret !== undefined && !webhookSecret.includes("••••")) {
    await supabase.from("payment_settings").upsert({ key: "RAZORPAY_WEBHOOK_SECRET", value: webhookSecret });
  }

  revalidatePath("/settings/payments");
  revalidatePath("/checkout"); // Clear cache so checkout gets new keys if needed
}
