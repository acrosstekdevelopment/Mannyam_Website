import { requireRole } from "@/lib/rbac/requireRole";
import { createClient } from "@/lib/supabase/server";
import { JournalTable } from "@/components/journal/JournalTable";

export default async function JournalPage() {
  await requireRole(["Admin", "Content Manager"]);
  const supabase = await createClient();

  const [{ data: posts, error }, { data: categories }] = await Promise.all([
    supabase
      .from("posts")
      .select("id,title,category_id,status,scheduled_at,published_at,created_at,categories(name)")
      .order("created_at", { ascending: false }),
    supabase.from("categories").select("id,name").order("name"),
  ]);

  if (error) {
    return (
      <section className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-800">
        <h1 className="font-display text-3xl">Journal unavailable</h1>
        <p className="mt-2">The journal entries could not be loaded. Please try again.</p>
      </section>
    );
  }

  const rows = (posts ?? []).map((post) => ({
    ...post,
    created_at: post.created_at ?? new Date(0).toISOString(),
    categoryName: Array.isArray(post.categories)
      ? post.categories[0]?.name ?? null
      : post.categories?.name ?? null,
  }));

  return <JournalTable posts={rows} categories={categories ?? []} />;
}
