"use server";

import { revalidatePath } from "next/cache";


import { requireRole } from "@/lib/rbac/requireRole";

/** Force-regenerate the sitemap by revalidating the cached route. */
export async function revalidateSitemap() {
  await requireRole(["Admin", "Content Manager", "Marketer"]);

  revalidatePath("/api/sitemap");
  return { success: true, revalidatedAt: new Date().toISOString() };
}
