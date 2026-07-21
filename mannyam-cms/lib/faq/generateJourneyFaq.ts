/**
 * Generates FAQ items for journey detail pages.
 * Mirrors the faqJourney() logic from Manyam frontend.html.
 */

interface PackageData {
  title: string;
  type: string;
  availability: unknown;
}

interface FaqItem {
  question: string;
  answer: string;
}

function parseAvailabilityMeta(availability: unknown): {
  tag: string;
  regions: string[];
  includes: string[];
} {
  // The availability field in seed data stores {tag, regions, includes}
  if (availability && typeof availability === "object" && !Array.isArray(availability)) {
    const meta = availability as Record<string, unknown>;
    return {
      tag: (meta.tag as string) || "",
      regions: (meta.regions as string[]) || [],
      includes: (meta.includes as string[]) || [],
    };
  }
  return { tag: "", regions: [], includes: [] };
}

export function generateJourneyFaq(pkg: PackageData): FaqItem[] {
  const { tag, regions, includes } = parseAvailabilityMeta(pkg.availability);
  const title = pkg.title;
  const len = tag.split(",")[0] || "several days";
  const reg = regions.join(", ") || "multiple regions across India";
  const isFestival = pkg.type === "Festival";

  const inclText =
    includes.length >= 3
      ? includes.slice(0, 3).map((x) => x.toLowerCase()).join(", ")
      : "private stays, a dedicated curator and expert local guides";

  return [
    {
      question: `How long is the ${title} journey?`,
      answer: `${title} is a ${len} private journey. The pace is unhurried by design, and we can shorten or extend it to suit your time in India.`,
    },
    {
      question: `Which places does ${title} cover?`,
      answer: `This journey travels through ${reg}. We plan every transfer between them, so your ${title} trip flows smoothly from one place to the next.`,
    },
    {
      question: `What is included in ${title}?`,
      answer: `Your ${title} itinerary includes ${inclText}, and more. Everything is private and handled for you from arrival to departure.`,
    },
    {
      question: `Can I customise the ${title} itinerary?`,
      answer: `Absolutely. Take ${title} as it is, or treat it as a starting point and reshape the route, pace and stays with your curator until it feels entirely your own.`,
    },
    {
      question: `When is the best time to take this journey?`,
      answer: isFestival
        ? `As a festival journey, ${title} is timed to the celebration itself, so the dates are set by the festival each year. We will confirm the right timing for your dates.`
        : `${title} is best enjoyed in the cooler, clearer months, though the ideal window depends on the regions involved. We will confirm the right timing for your dates.`,
    },
    {
      question: `How do I book the ${title} journey?`,
      answer: `Send us a note through the <a href="/enquire">enquiry form</a> or ask the concierge. A real curator replies within a day with a tailored outline and clear next steps. No obligation.`,
    },
  ];
}
