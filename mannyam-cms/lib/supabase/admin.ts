import "server-only";

// WARNING: NEVER import this client in client components!
// This client uses the SUPABASE_SERVICE_ROLE_KEY which bypasses Row Level Security (RLS).
// It must only be used in trusted server-side operations (Server Actions, Route Handlers).

import { createClient, SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database.types";

let _supabaseAdmin: SupabaseClient<Database> | null = null;

export function getSupabaseAdmin(): SupabaseClient<Database> {
  if (_supabaseAdmin) return _supabaseAdmin;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. " +
      "Ensure .env.local exists in the project root with both values set."
    );
  }

  _supabaseAdmin = createClient<Database>(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  return _supabaseAdmin;
}

// Lazy proxy: defers client creation until first property access at runtime,
// so `next build` static analysis does not crash when env vars are absent.
// Methods are bound to the real client to preserve correct `this`.
export const supabaseAdmin: SupabaseClient<Database> = new Proxy(
  {} as SupabaseClient<Database>,
  {
    get(_target, prop) {
      const client = getSupabaseAdmin();
      const value = Reflect.get(client, prop, client);
      return typeof value === "function" ? value.bind(client) : value;
    },
  }
);
