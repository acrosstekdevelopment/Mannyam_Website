import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database.types";

export type Page = Database["public"]["Tables"]["pages"]["Row"];
export type Post = Database["public"]["Tables"]["posts"]["Row"];
export type Package = Database["public"]["Tables"]["packages"]["Row"];

export async function getPublishedPages(type?: 'Landing' | 'Category' | 'Standard' | 'Form' | 'Legal') {
  const supabase = await createClient();
  let query = supabase
    .from("pages")
    .select("*")
    .eq("status", "Published");
  
  if (type) {
    query = query.eq("type", type);
  }
  
  const { data, error } = await query.order("created_at", { ascending: false });
  if (error) {
    console.error("Error fetching published pages:", error);
  }
  return data || [];
}

export async function getPublishedPosts(limit?: number, categorySlug?: string) {
  const supabase = await createClient();
  
  let query;
  if (categorySlug) {
    query = supabase
      .from("posts")
      .select("*, categories!inner(*)")
      .eq("status", "Published")
      .eq("categories.slug", categorySlug);
  } else {
    query = supabase
      .from("posts")
      .select("*, categories(*)")
      .eq("status", "Published");
  }
  
  query = query.order("published_at", { ascending: false });
  
  if (limit) {
    query = query.limit(limit);
  }
  
  const { data, error } = await query;
  if (error) {
    console.error("Error fetching published posts:", error);
  }
  return data || [];
}

export async function getPublishedPackages(
  type?: 'Festival' | 'Destination' | 'Honeymoon' | 'Wildlife' | 'Wellness',
  limit?: number
) {
  const supabase = await createClient();
  let query = supabase
    .from("packages")
    .select("*");
  
  if (type) {
    query = query.eq("type", type);
  }
  
  query = query.order("created_at", { ascending: false });
  
  if (limit) {
    query = query.limit(limit);
  }
  
  const { data, error } = await query;
  if (error) {
    console.error("Error fetching published packages:", error);
  }
  return data || [];
}

export async function getPackageBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("packages")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  
  if (error) {
    console.error(`Error fetching package by slug ${slug}:`, error);
  }
  return data || null;
}

export async function getPostBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*, categories(*)")
    .eq("slug", slug)
    .eq("status", "Published")
    .maybeSingle();
  
  if (error) {
    console.error(`Error fetching post by slug ${slug}:`, error);
  }
  return data || null;
}

export async function getPageBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("pages")
    .select("*")
    .eq("slug", slug)
    .eq("status", "Published")
    .maybeSingle();
  
  if (error) {
    console.error(`Error fetching page by slug ${slug}:`, error);
  }
  return data || null;
}
