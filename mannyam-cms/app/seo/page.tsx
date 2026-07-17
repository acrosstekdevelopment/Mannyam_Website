import { requireRole } from "@/lib/rbac/requireRole";
import { createClient } from "@/lib/supabase/server";
import { SeoOverviewClient } from "./SeoOverviewClient";
import { type SeoMetaValue } from "@/lib/seo/utils";

export const dynamic = "force-dynamic";

type SeoItem = {
  id: string;
  title: string;
  slug: string;
  seo_meta: SeoMetaValue | null;
};

export default async function SeoOverviewPage() {
  const { role } = await requireRole(["Admin", "Content Manager", "Marketer"]);
  const supabase = await createClient();

  // Fetch Pages & Posts
  const [pagesResult, postsResult] = await Promise.all([
    supabase
      .from("pages")
      .select("id, title, slug, seo_meta")
      .order("created_at", { ascending: false }),
    supabase
      .from("posts")
      .select("id, title, slug, seo_meta")
      .order("created_at", { ascending: false }),
  ]);

  // Fetch Packages with fallback handling in case seo_meta column is missing
  let packages: SeoItem[] = [];
  const { data: pkgsData, error: pkgsError } = await supabase
    .from("packages")
    .select("id, title, slug, seo_meta")
    .order("created_at", { ascending: false });

  if (pkgsError && pkgsError.code === "42703") {
    // column packages.seo_meta does not exist error
    const { data: fallbackData } = await supabase
      .from("packages")
      .select("id, title, slug")
      .order("created_at", { ascending: false });
    packages = (fallbackData ?? []).map((item) => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      seo_meta: {},
    }));
  } else {
    packages = (pkgsData ?? []).map((item) => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      seo_meta: item.seo_meta as SeoMetaValue | null,
    }));
  }

  const pages = (pagesResult.data ?? []).map((item) => ({
    id: item.id,
    title: item.title,
    slug: item.slug,
    seo_meta: item.seo_meta as SeoMetaValue | null,
  }));

  const posts = (postsResult.data ?? []).map((item) => ({
    id: item.id,
    title: item.title,
    slug: item.slug,
    seo_meta: item.seo_meta as SeoMetaValue | null,
  }));

  return (
    <SeoOverviewClient
      initialPages={pages}
      initialPosts={posts}
      initialPackages={packages}
      userRole={role}
    />
  );
}
