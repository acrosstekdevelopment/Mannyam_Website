import React from "react";
import { requireRole } from "@/lib/rbac/requireRole";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { savePaymentSettings } from "./actions";

export const dynamic = "force-dynamic";

export default async function PaymentSettingsPage() {
  await requireRole(["Admin"]);

  const supabase = getSupabaseAdmin() as any;
  const { data: settings } = await supabase.from("payment_settings").select("*");

  const getValue = (key: string) => settings?.find((s: any) => s.key === key)?.value || "";
  
  const keyId = getValue("RAZORPAY_KEY_ID") || process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "";
  
  // Mask secrets for display
  const rawKeySecret = getValue("RAZORPAY_KEY_SECRET") || process.env.RAZORPAY_KEY_SECRET || "";
  const keySecret = rawKeySecret ? "••••••••••••" + rawKeySecret.slice(-4) : "";

  const rawWebhookSecret = getValue("RAZORPAY_WEBHOOK_SECRET") || process.env.RAZORPAY_WEBHOOK_SECRET || "";
  const webhookSecret = rawWebhookSecret ? "••••••••••••" + rawWebhookSecret.slice(-4) : "";

  return (
    <div className="space-y-6 font-sans max-w-4xl">
      <div className="border-b border-olive/10 pb-4">
        <h1 className="font-display text-3xl font-semibold text-olive">Payment Gateways</h1>
        <p className="mt-1 text-sm text-olive/70">
          Configure Razorpay API Keys to enable live checkouts.
        </p>
      </div>

      <div className="bg-paper border border-olive/10 p-6 rounded-sm shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-olive/5 pb-4">
          <div>
            <h2 className="font-display text-xl font-bold text-olive">Razorpay Integration</h2>
            <p className="text-xs text-olive/60 mt-1">
              Used for secure credit card and UPI processing during checkout.
            </p>
          </div>
          <span className="px-3 py-1 bg-olive/10 text-olive text-[10px] font-bold uppercase tracking-wider rounded-sm border border-olive/20">
            Active
          </span>
        </div>

        <form action={savePaymentSettings} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-olive">
                Razorpay Key ID
              </label>
              <input
                type="text"
                name="razorpayKeyId"
                defaultValue={keyId}
                placeholder="rzp_live_..."
                className="w-full bg-cream border border-olive/10 rounded-sm px-4 py-2.5 text-sm font-sans text-olive focus:outline-none focus:border-gold transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-olive block">
                Razorpay Key Secret
              </label>
              <p className="text-[10px] text-olive/50 mb-2">Leave unchanged to keep the current secret.</p>
              <input
                type="text"
                name="razorpayKeySecret"
                defaultValue={keySecret}
                placeholder="Enter new secret to update..."
                className="w-full bg-cream border border-olive/10 rounded-sm px-4 py-2.5 text-sm font-sans text-olive focus:outline-none focus:border-gold transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-olive block">
                Webhook Secret
              </label>
              <p className="text-[10px] text-olive/50 mb-2">Used to verify payment success notifications.</p>
              <input
                type="text"
                name="razorpayWebhookSecret"
                defaultValue={webhookSecret}
                placeholder="Enter new webhook secret..."
                className="w-full bg-cream border border-olive/10 rounded-sm px-4 py-2.5 text-sm font-sans text-olive focus:outline-none focus:border-gold transition-colors"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-olive/5 flex justify-end">
            <button
              type="submit"
              className="font-sans text-[11px] font-bold uppercase tracking-widest text-cream bg-olive hover:bg-olive/90 px-6 py-3 rounded-sm transition-all"
            >
              Save Payment Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
