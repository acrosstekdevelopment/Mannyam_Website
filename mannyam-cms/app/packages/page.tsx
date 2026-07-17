import { requireRole } from "@/lib/rbac/requireRole";
import { createClient } from "@/lib/supabase/server";
import { PackagesTable } from "@/components/packages/PackagesTable";

export default async function PackagesCmsPage() {
  const { role } = await requireRole(["Admin", "Content Manager"]);
  const supabase = await createClient();

  const [{ data: packages, error }] = await Promise.all([
    supabase
      .from("packages")
      .select("id,title,slug,type,featured_image_url,created_at")
      .order("created_at", { ascending: false }),
  ]);

  if (error) {
    return (
      <section className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-800 font-sans">
        <h1 className="font-display text-3xl">Packages unavailable</h1>
        <p className="mt-2 font-sans">The holiday packages list could not be loaded. Please try again.</p>
      </section>
    );
  }

  const rows = (packages ?? []).map((pkg) => ({
    ...pkg,
    type: pkg.type as "Festival" | "Destination" | "Honeymoon" | "Wildlife" | "Wellness",
    created_at: pkg.created_at ?? new Date(0).toISOString(),
  }));

  return <PackagesTable packages={rows} role={role} />;
}
