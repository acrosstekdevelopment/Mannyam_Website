import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Fetch profile to verify role
  const { data: profile } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || !["Admin", "Content Manager"].includes(profile.role)) {
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  // 1. Fetch all internal links
  const { data: links, error: linksError } = await supabase
    .from("internal_links")
    .select("id, source_id, target_id, anchor_text");

  if (linksError) {
    return NextResponse.json({ error: linksError.message }, { status: 500 });
  }

  // 2. Fetch all pages, posts, and packages
  const [
    { data: pages },
    { data: posts },
    { data: packages }
  ] = await Promise.all([
    supabase.from("pages").select("id, title, slug, status"),
    supabase.from("posts").select("id, title, slug, status"),
    supabase.from("packages").select("id, title, slug")
  ]);

  const pageMap = new Map((pages || []).map(p => [p.id, p]));
  const postMap = new Map((posts || []).map(p => [p.id, p]));
  const pkgMap = new Map((packages || []).map(p => [p.id, p]));

  const broken: {
    id: string;
    sourceTitle: string;
    sourceId: string;
    sourceType: "Page" | "Post";
    targetId: string;
    anchorText: string;
    reason: string;
  }[] = [];
  
  let okCount = 0;

  // 3. Scan each link
  for (const link of (links || [])) {
    const srcPage = pageMap.get(link.source_id);
    const srcPost = postMap.get(link.source_id);
    const sourceTitle = srcPage ? srcPage.title : (srcPost ? srcPost.title : "Unknown Source");
    const sourceType = srcPage ? "Page" : "Post";

    const tgtPage = pageMap.get(link.target_id);
    const tgtPost = postMap.get(link.target_id);
    const tgtPkg = pkgMap.get(link.target_id);

    if (tgtPage) {
      if (tgtPage.status === "Draft") {
        broken.push({
          id: link.id,
          sourceTitle,
          sourceId: link.source_id,
          sourceType,
          targetId: link.target_id,
          anchorText: link.anchor_text,
          reason: "Target is not published"
        });
      } else {
        okCount++;
      }
    } else if (tgtPost) {
      if (tgtPost.status === "Draft") {
        broken.push({
          id: link.id,
          sourceTitle,
          sourceId: link.source_id,
          sourceType,
          targetId: link.target_id,
          anchorText: link.anchor_text,
          reason: "Target is not published"
        });
      } else {
        okCount++;
      }
    } else if (tgtPkg) {
      okCount++;
    } else {
      broken.push({
        id: link.id,
        sourceTitle,
        sourceId: link.source_id,
        sourceType,
        targetId: link.target_id,
        anchorText: link.anchor_text,
        reason: "Target page not found"
      });
    }
  }

  return NextResponse.json({
    scanned: (links || []).length,
    broken,
    ok: okCount
  });
}
