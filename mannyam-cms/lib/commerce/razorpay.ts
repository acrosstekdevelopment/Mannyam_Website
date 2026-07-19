import Razorpay from "razorpay";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export async function getRazorpayCredentials() {
  const supabase = getSupabaseAdmin() as any;
  
  const [keyIdRes, keySecretRes, webhookSecretRes] = await Promise.all([
    supabase.from("payment_settings").select("value").eq("key", "RAZORPAY_KEY_ID").maybeSingle(),
    supabase.from("payment_settings").select("value").eq("key", "RAZORPAY_KEY_SECRET").maybeSingle(),
    supabase.from("payment_settings").select("value").eq("key", "RAZORPAY_WEBHOOK_SECRET").maybeSingle()
  ]);

  const keyId = keyIdRes.data?.value || process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const keySecret = keySecretRes.data?.value || process.env.RAZORPAY_KEY_SECRET;
  const webhookSecret = webhookSecretRes.data?.value || process.env.RAZORPAY_WEBHOOK_SECRET;

  return { keyId, keySecret, webhookSecret };
}

export async function getRazorpayClient() {
  const { keyId, keySecret } = await getRazorpayCredentials();

  if (!keyId || !keySecret) {
    console.warn("Razorpay credentials are missing. Checkout will not function.");
  }

  return new Razorpay({
    key_id: keyId || "rzp_test_placeholder",
    key_secret: keySecret || "placeholder",
  });
}
