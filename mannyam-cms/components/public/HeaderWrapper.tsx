import React from "react";
import { Header } from "./Header";
import { getPublishedPages, getPublishedPackages } from "@/lib/data/public";
import type { Page, Package } from "@/lib/data/public";

// Helper to extract background image from a Page's blocks
function extractImageFromPage(page: Page): string {
  if (Array.isArray(page.content)) {
    const heroBlock = page.content.find((b: any) => b.type === "Hero") as any;
    if (heroBlock && heroBlock.data && heroBlock.data.backgroundImage) {
      return heroBlock.data.backgroundImage;
    }
  }
  return "";
}



export async function HeaderWrapper() {
  const [pages, packages] = await Promise.all([
    getPublishedPages('Category'),
    getPublishedPackages()
  ]);

  // Group pages
  const expPages = pages.filter(p => p.slug.startsWith('experience-'));
  const festPages = pages.filter(p => p.slug.startsWith('festival-'));
  const destPages = pages.filter(p => p.slug.startsWith('destination-'));

  // Build mega menu props
  const buildPageProps = (pageList: Page[], catKey: string, subtitlePrefix: string = "EXPLORE") => {
    return {
      items: pageList.slice(0, 8).map(p => ({
        title: p.title,
        desc: (p.seo_meta as any)?.description || "Discover more",
        href: `/${p.slug}`
      })),
      slides: pageList.filter(p => !!extractImageFromPage(p)).slice(0, 6).map((p) => ({
        image: extractImageFromPage(p),
        label: p.title,
        subtitle: subtitlePrefix,
        href: `/${p.slug}`
      }))
    };
  };

  const buildPackageProps = (pkgList: Package[]) => {
    return {
      items: pkgList.slice(0, 8).map(p => ({
        title: p.title,
        desc: `${p.type} Journey`,
        href: p.type === 'Festival' ? `/festivals/${p.slug}` : `/experiences/${p.slug}`
      })),
      slides: pkgList.filter(p => !!p.featured_image_url).slice(0, 6).map((p) => ({
        image: p.featured_image_url!,
        label: p.title,
        subtitle: (p.type || "JOURNEY").toUpperCase(),
        href: p.type === 'Festival' ? `/festivals/${p.slug}` : `/experiences/${p.slug}`
      }))
    };
  };

  const headerProps = {
    experiences: buildPageProps(expPages, "experiences", "EXPERIENCE"),
    festivals: buildPageProps(festPages, "festivals", "FESTIVAL"),
    destinations: buildPageProps(destPages, "destinations", "DESTINATION"),
    journeys: buildPackageProps(packages),
  };

  return <Header {...headerProps} />;
}
