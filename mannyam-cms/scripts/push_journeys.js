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
  console.error("Missing Supabase credentials");
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

const JOURNEYS = extractArray(/JOURNEYS\s*=\s*(\[.*?\]);/s);

async function run() {
  for (const j of JOURNEYS) {
    // Map the type to one of the allowed enums. 
    // Fallback to 'Destination' if we can't determine.
    let mappedType = 'Destination';
    if (j.type === 'festival' || j.slug.includes('holi') || j.slug.includes('diwali') || j.slug.includes('dussehra')) mappedType = 'Festival';
    
    // Availability / Extra info
    const availability = {
      tag: j.tag,
      regions: j.regions,
      includes: j.incl
    };
    
    // Itinerary formatting
    const itinerary = j.days.map((d, index) => ({
      day: index + 1,
      title: d[0],
      description: d[1]
    }));

    const pkg = {
      title: j.h,
      slug: j.slug,
      type: mappedType,
      description: j.intro,
      itinerary: itinerary,
      availability: availability,
      seo_meta: { title: `${j.h} | MANNYAM Journey`, description: j.intro }
    };

    const { data, error } = await supabase
      .from('packages')
      .upsert(pkg, { onConflict: 'slug' });
      
    if (error) {
      console.error(`Error inserting ${j.slug}:`, error);
    } else {
      console.log(`Successfully inserted journey: ${j.slug}`);
    }
  }
}

run();
