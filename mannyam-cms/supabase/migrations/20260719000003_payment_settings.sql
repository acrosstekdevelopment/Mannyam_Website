-- Migration to add payment_settings table for storing Razorpay keys
CREATE TABLE IF NOT EXISTS public.payment_settings (
  key text PRIMARY KEY,
  value text NOT NULL,
  updated_at timestamptz DEFAULT now(),
  updated_by uuid REFERENCES public.users(id)
);

ALTER TABLE public.payment_settings ENABLE ROW LEVEL SECURITY;

-- Only Admins can read payment settings (contains secrets)
DROP POLICY IF EXISTS payment_settings_admin_read ON public.payment_settings;
CREATE POLICY payment_settings_admin_read ON public.payment_settings
  FOR SELECT TO authenticated
  USING (public.get_my_role() = 'Admin');

-- Only Admins can update payment settings
DROP POLICY IF EXISTS payment_settings_admin_write ON public.payment_settings;
CREATE POLICY payment_settings_admin_write ON public.payment_settings
  FOR ALL TO authenticated
  USING (public.get_my_role() = 'Admin')
  WITH CHECK (public.get_my_role() = 'Admin');
