import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST() {
  const supabase = await createClient();
  await supabase.auth.signOut();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mannyam.in';

  const response = NextResponse.redirect(`${siteUrl}/login`, {
    status: 303,
  });

  return response;
}
