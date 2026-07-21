const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', '..', 'Building Blocks', 'Manyam frontend.html');
const sqlPath = path.join(__dirname, '..', 'supabase', 'seed_content_2.sql');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

function extractArray(regex) {
  const match = htmlContent.match(regex);
  if (!match) return [];
  try { return new Function(`return ${match[1]};`)(); } catch (e) { return []; }
}

const EXPERIENCES = extractArray(/EXPERIENCES\s*=\s*(\[.*?\]);/s);
const FESTIVALS = extractArray(/FESTIVALS\s*=\s*(\[.*?\]);/s);
const DESTINATIONS = extractArray(/DESTINATIONS\s*=\s*(\[.*?\]);/s);
const JOURNEYS = extractArray(/JOURNEYS\s*=\s*(\[.*?\]);/s); // Journeys might not be mapped to pages in seed_content_2 though. Wait, let me check. 

// We only need to overwrite experiences, festivals, and destinations because seed_content_2.sql handles these three. Journeys are in packages! (seed_content.sql)
// But wait, the user asked for "all these pages". I will update FESTIVALS and DESTINATIONS in seed_content_2.sql to ensure exact formatting and FAQs are present.

let existingSql = fs.readFileSync(sqlPath, 'utf8');

// The FAQs from frontend HTML:
const expFaqItems = [
  { question: "What kinds of experiences can I have in India?", answer: "From culture and heritage to food, wildlife, spiritual travel, royal evenings and honeymoons, our India experiences let you travel by the feeling you are after. Each one is private and tailor-made." },
  { question: "Can I combine different experiences in one trip?", answer: "Yes, and most travellers do. We weave heritage, food, nature and quiet time into a single journey that flows at your pace, rather than a fixed package." },
  { question: "Can I customise a ready-made journey?", answer: "Yes. Every journey is a starting point. Adjust the route, pace, stays and experiences with your curator until it feels entirely your own." },
  { question: "Are flights and hotels included?", answer: "Journeys include carefully chosen stays, private transport, guides and the experiences described. We can also arrange internal flights and advise on international ones." }
];

const festFaqItems = [
  { question: "Are festivals in India safe for travellers?", answer: "Yes, when planned correctly. We ensure you experience the joy of the festival while staying comfortable, with vetted guides, private transport and carefully chosen viewing spots." },
  { question: "How far in advance should I plan a festival trip?", answer: "At least six to nine months. The best heritage stays and guides book out quickly around major festivals like Holi and Diwali." },
  { question: "Will it be too crowded?", answer: "Festivals are busy, but we balance the energy of the crowds with quiet retreats. You can join the heart of the action when you want, and step back when you need to." },
  { question: "Can I combine a festival with a longer journey?", answer: "Absolutely. A festival is often the focal point of a longer journey through India, giving you a balance of celebration and slow travel." }
];

const destFaqItems = [
  { question: "When is the best time to visit India?", answer: "Generally, October to March offers the most comfortable weather across the country. However, the Himalayas are best from May to September, and the monsoon (July-August) is beautiful in Kerala and Rajasthan." },
  { question: "How many destinations should I include?", answer: "We recommend spending at least three to four nights in each place to truly absorb it. A two-week journey comfortably covers three or four regions at a relaxed pace." },
  { question: "How do we travel between places?", answer: "A mix of private, chauffeur-driven cars for shorter distances and domestic flights for longer hops. We handle all the logistics seamlessly." }
];

// Re-generate EXPERIENCES
let expSql = `DELETE FROM public.pages WHERE slug LIKE 'experience-%';\n\n-- ─── EXPERIENCES ─────────────────────────────────────────────────────────────\n\nINSERT INTO public.pages (title, slug, type, status, content, seo_meta) VALUES\n`;
expSql += EXPERIENCES.map((e, i) => {
  const blocks = [
    { id: `e${i+1}-hero`, type: "Hero", data: { headline: e.h, subheadline: e.lede, backgroundImage: "", ctaText: "Plan This Experience", ctaLink: "/enquire" } },
    { id: `e${i+1}-tiles`, type: "Tiles", data: { heading: "What you might do", tiles: e.moments.map(m => ({ title: m[0], description: m[1] })) } },
    { id: `e${i+1}-places`, type: "Place Chips", data: { heading: "Best enjoyed in", places: e.places.map(p => ({ name: p[0], region: p[1] })) } },
    { id: `e${i+1}-faq`, type: "FAQ", data: { heading: "Questions, answered simply", items: expFaqItems } },
    { id: `e${i+1}-cta`, type: "CTA Banner", data: { headline: "Make it yours", body: "Every experience is shaped around your pace and your people. Tell us what you have in mind.", buttonLabel: "Design this experience", buttonLink: "/enquire" } }
  ];
  return `('${e.h.replace(/'/g, "''")}', 'experience-${e.slug}', 'Category', 'Published',\n$$${JSON.stringify(blocks)}$$::jsonb,\n$$${JSON.stringify({title: `${e.h} | MANNYAM`, description: e.lede, canonical_url: `https://mannyam.in/experience-${e.slug}`})}$\$::jsonb)`;
}).join(",\n\n") + ";\n\n";

// Re-generate FESTIVALS
let festSql = `DELETE FROM public.pages WHERE slug LIKE 'festival-%';\n\n-- ─── FESTIVALS ───────────────────────────────────────────────────────────────\n\nINSERT INTO public.pages (title, slug, type, status, content, seo_meta) VALUES\n`;
festSql += FESTIVALS.map((f, i) => {
  const blocks = [
    { id: `f${i+1}-hero`, type: "Hero", data: { headline: f.h, subheadline: f.lede, backgroundImage: "", ctaText: "Plan My Journey", ctaLink: "/enquire" } },
    { id: `f${i+1}-facts`, type: "Fact Bar", data: { facts: [{ label: "When", value: f.when }, { label: "Where", value: f.where }] } },
    { id: `f${i+1}-tiles`, type: "Tiles", data: { heading: "How we celebrate it with you", tiles: f.moments.map(m => ({ title: m[0], description: m[1] })) } },
    { id: `f${i+1}-places`, type: "Place Chips", data: { heading: "Best cities", places: f.places.map(p => ({ name: p[0], region: p[1] })) } },
    { id: `f${i+1}-faq`, type: "FAQ", data: { heading: "Questions, answered simply", items: festFaqItems } },
    { id: `f${i+1}-cta`, type: "CTA Banner", data: { headline: "Join the celebration", body: "We arrange the timing and details. Tell us your travel window.", buttonLabel: "Plan my journey", buttonLink: "/enquire" } }
  ];
  return `('${f.h.replace(/'/g, "''")}', 'festival-${f.slug}', 'Category', 'Published',\n$$${JSON.stringify(blocks)}$$::jsonb,\n$$${JSON.stringify({title: `${f.h} | MANNYAM`, description: f.lede, canonical_url: `https://mannyam.in/festival-${f.slug}`})}$\$::jsonb)`;
}).join(",\n\n") + ";\n\n";

// Re-generate DESTINATIONS
let destSql = `DELETE FROM public.pages WHERE slug LIKE 'destination-%';\n\n-- ─── DESTINATIONS ────────────────────────────────────────────────────────────\n\nINSERT INTO public.pages (title, slug, type, status, content, seo_meta) VALUES\n`;
destSql += DESTINATIONS.map((d, i) => {
  const blocks = [
    { id: `d${i+1}-hero`, type: "Hero", data: { headline: d.h, subheadline: d.lede, backgroundImage: "", ctaText: "Plan My Journey", ctaLink: "/enquire" } },
    { id: `d${i+1}-facts`, type: "Fact Bar", data: { facts: [{ label: "Best season", value: d.season }] } },
    { id: `d${i+1}-tiles`, type: "Tiles", data: { heading: "What you might do", tiles: d.moments.map(m => ({ title: m[0], description: m[1] })) } },
    { id: `d${i+1}-places`, type: "Place Chips", data: { heading: "Key places", places: d.places.map(p => ({ name: p[0], region: p[1] })) } },
    { id: `d${i+1}-faq`, type: "FAQ", data: { heading: "Questions, answered simply", items: destFaqItems } },
    { id: `d${i+1}-cta`, type: "CTA Banner", data: { headline: `Your ${d.h}, your way`, body: "Combine regions, or go deep into one.", buttonLabel: `Plan my ${d.h} journey`, buttonLink: "/enquire" } }
  ];
  return `('${d.h.replace(/'/g, "''")}', 'destination-${d.slug}', 'Category', 'Published',\n$$${JSON.stringify(blocks)}$$::jsonb,\n$$${JSON.stringify({title: `${d.h} Travel | MANNYAM`, description: d.lede, canonical_url: `https://mannyam.in/destination-${d.slug}`})}$\$::jsonb)`;
}).join(",\n\n") + ";\n\n";

// Replace entirely in seed_content_2.sql
const fullSql = `
-- ============================================================================
-- MANNYAM CMS - Content Seed Part 2 (with rich block types matching frontend.html)
-- Uses: Hero, Tiles, Fact Bar, Place Chips, CTA Banner, FAQ
-- Run AFTER seed_content.sql. Uses $$ dollar-quoting.
-- ============================================================================

` + expSql + festSql + destSql;

fs.writeFileSync(sqlPath, fullSql, 'utf8');
console.log("Successfully rebuilt seed_content_2.sql");
