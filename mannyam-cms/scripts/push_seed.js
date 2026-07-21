const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env.local');
let supabaseUrl = '';
let supabaseKey = '';

if (fs.existsSync(envPath)) {
  const envFile = fs.readFileSync(envPath, 'utf8');
  const urlMatch = envFile.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/);
  const keyMatch = envFile.match(/SUPABASE_SERVICE_ROLE_KEY=(.*)/);
  if (urlMatch) supabaseUrl = urlMatch[1].trim();
  if (keyMatch) supabaseKey = keyMatch[1].trim();
}

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const htmlPath = path.join(__dirname, '..', '..', 'Building Blocks', 'Manyam frontend.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

function extractArray(regex) {
  const match = htmlContent.match(regex);
  if (!match) return [];
  try { return new Function(`return ${match[1]};`)(); } catch (e) { return []; }
}

const EXPERIENCES = extractArray(/EXPERIENCES\s*=\s*(\[.*?\]);/s);
const FESTIVALS = extractArray(/FESTIVALS\s*=\s*(\[.*?\]);/s);
const DESTINATIONS = extractArray(/DESTINATIONS\s*=\s*(\[.*?\]);/s);

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

async function run() {
  const pagesToUpsert = [];

  EXPERIENCES.forEach((e, i) => {
    const blocks = [
      { id: `e${i+1}-hero`, type: "Hero", data: { headline: e.h, subheadline: e.lede, backgroundImage: "", ctaText: "Plan This Experience", ctaLink: "/enquire" } },
      { id: `e${i+1}-tiles`, type: "Tiles", data: { heading: "What you might do", tiles: e.moments.map(m => ({ title: m[0], description: m[1] })) } },
      { id: `e${i+1}-places`, type: "Place Chips", data: { heading: "Best enjoyed in", places: e.places.map(p => ({ name: p[0], region: p[1] })) } },
      { id: `e${i+1}-faq`, type: "FAQ", data: { heading: "Questions, answered simply", items: expFaqItems } },
      { id: `e${i+1}-cta`, type: "CTA Banner", data: { headline: "Make it yours", body: "Every experience is shaped around your pace and your people. Tell us what you have in mind.", buttonLabel: "Design this experience", buttonLink: "/enquire" } }
    ];
    pagesToUpsert.push({
      title: e.h,
      slug: `experience-${e.slug}`,
      type: 'Category',
      status: 'Published',
      content: blocks,
      seo_meta: { title: `${e.h} | MANNYAM`, description: e.lede, canonical_url: `https://mannyam.in/experience-${e.slug}` }
    });
  });

  FESTIVALS.forEach((f, i) => {
    const blocks = [
      { id: `f${i+1}-hero`, type: "Hero", data: { headline: f.h, subheadline: f.lede, backgroundImage: "", ctaText: "Plan My Journey", ctaLink: "/enquire" } },
      { id: `f${i+1}-facts`, type: "Fact Bar", data: { facts: [{ label: "When", value: f.when }, { label: "Where", value: f.where }] } },
      { id: `f${i+1}-tiles`, type: "Tiles", data: { heading: "How we celebrate it with you", tiles: f.moments.map(m => ({ title: m[0], description: m[1] })) } },
      { id: `f${i+1}-places`, type: "Place Chips", data: { heading: "Best cities", places: f.places.map(p => ({ name: p[0], region: p[1] })) } },
      { id: `f${i+1}-faq`, type: "FAQ", data: { heading: "Questions, answered simply", items: festFaqItems } },
      { id: `f${i+1}-cta`, type: "CTA Banner", data: { headline: "Join the celebration", body: "We arrange the timing and details. Tell us your travel window.", buttonLabel: "Plan my journey", buttonLink: "/enquire" } }
    ];
    pagesToUpsert.push({
      title: f.h,
      slug: `festival-${f.slug}`,
      type: 'Category',
      status: 'Published',
      content: blocks,
      seo_meta: { title: `${f.h} | MANNYAM`, description: f.lede, canonical_url: `https://mannyam.in/festival-${f.slug}` }
    });
  });

  DESTINATIONS.forEach((d, i) => {
    const blocks = [
      { id: `d${i+1}-hero`, type: "Hero", data: { headline: d.h, subheadline: d.lede, backgroundImage: "", ctaText: "Plan My Journey", ctaLink: "/enquire" } },
      { id: `d${i+1}-facts`, type: "Fact Bar", data: { facts: [{ label: "Best season", value: d.season }] } },
      { id: `d${i+1}-tiles`, type: "Tiles", data: { heading: "What you might do", tiles: d.moments.map(m => ({ title: m[0], description: m[1] })) } },
      { id: `d${i+1}-places`, type: "Place Chips", data: { heading: "Key places", places: d.places.map(p => ({ name: p[0], region: p[1] })) } },
      { id: `d${i+1}-faq`, type: "FAQ", data: { heading: "Questions, answered simply", items: destFaqItems } },
      { id: `d${i+1}-cta`, type: "CTA Banner", data: { headline: `Your ${d.h}, your way`, body: "Combine regions, or go deep into one.", buttonLabel: `Plan my ${d.h} journey`, buttonLink: "/enquire" } }
    ];
    pagesToUpsert.push({
      title: d.h,
      slug: `destination-${d.slug}`,
      type: 'Category',
      status: 'Published',
      content: blocks,
      seo_meta: { title: `${d.h} Travel | MANNYAM`, description: d.lede, canonical_url: `https://mannyam.in/destination-${d.slug}` }
    });
  });

  console.log(`Upserting ${pagesToUpsert.length} pages...`);
  const { data, error } = await supabase.from('pages').upsert(pagesToUpsert, { onConflict: 'slug' });
  if (error) {
    console.error("Error upserting pages:", error);
  } else {
    console.log("Successfully upserted all pages to Supabase directly!");
  }
}

run();
