import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  await supabase.auth.signOut();

  const headers = request.headers;
  const forwardedHost = headers.get('x-forwarded-host');
  const forwardedProto = headers.get('x-forwarded-proto') || 'https';
  const origin = forwardedHost
    ? `${forwardedProto}://${forwardedHost}`
    : (process.env.NEXT_PUBLIC_SITE_URL || 'https://mannyam.in');

  // Clear the cookies and redirect to the login page
  const response = NextResponse.redirect(`${origin}/login`, {
    status: 303, // See Other (forces a GET request to /login)
  });

  return response;
}
