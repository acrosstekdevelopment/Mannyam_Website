export function getSafeImageUrl(url: string | null | undefined): string {
  if (!url) return "";
  
  // If the URL is absolute and belongs to the Supabase instance, proxy it
  // This helps bypass localhost and tunnel issues on the client browser
  if (
    url.startsWith('http://127.0.0.1') || 
    url.startsWith('http://localhost') ||
    url.includes('trycloudflare.com') ||
    url.includes('supabase.co')
  ) {
    return `/api/proxy-image?url=${encodeURIComponent(url)}`;
  }
  
  return url;
}
