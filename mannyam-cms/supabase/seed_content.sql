-- ============================================================================
-- MANNYAM CMS - Content Seed Part 1
-- Uses dollar-quoting ($$) to avoid apostrophe escaping issues in SQL Editor
-- ============================================================================

-- CATEGORIES
INSERT INTO public.categories (name, slug) VALUES
  ('Festivals', 'festivals'),
  ('Slow Travel', 'slow-travel'),
  ('Destinations', 'destinations'),
  ('Experiences', 'experiences')
ON CONFLICT (slug) DO NOTHING;

-- TAGS
INSERT INTO public.tags (name, slug) VALUES
  ('Holi', 'holi'),
  ('Diwali', 'diwali'),
  ('Varanasi', 'varanasi'),
  ('Rajasthan', 'rajasthan'),
  ('Kerala', 'kerala'),
  ('Himalayas', 'himalayas'),
  ('Spiti', 'spiti'),
  ('Honeymoon', 'honeymoon'),
  ('Wildlife', 'wildlife'),
  ('Culture', 'culture'),
  ('Food', 'food'),
  ('Romance', 'romance')
ON CONFLICT (slug) DO NOTHING;

-- PAGES
INSERT INTO public.pages (title, slug, type, status, content, seo_meta) VALUES
(
  'Our Story',
  'about',
  'Standard',
  'Published',
  $$[{"id":"about-hero","type":"Hero","data":{"headline":"The Story Behind MANNYAM","subheadline":"Private, thoughtfully planned journeys that reveal the real spirit of India through its festivals, living traditions and the people who make them unforgettable.","backgroundImage":"/images/about-hero.png","ctaText":"Plan Your Journey","ctaLink":"/enquire"}},{"id":"about-text","type":"Text Block","data":{"content":"<h2>Who we are</h2><p>MANNYAM designs bespoke travel journeys across the Indian subcontinent. We craft stories of heritage, culture, and nature for the discerning traveller.</p><p>Every journey is private, tailor-made and planned end to end by a dedicated curator who stays reachable throughout your trip.</p><h2>What sets us apart</h2><p>A curator, not a call centre. Real access, not a script. Private temple openings, festival vantage points and dinners in family homes, built on years of trust. Vetted drivers, support around the clock and every transfer handled.</p><h2>Our promise</h2><p>We ask only for what we need, protect it carefully, and never sell your details. Your journey is yours alone.</p>"}}]$$::jsonb,
  $${"title":"Our Story | MANNYAM","description":"MANNYAM designs bespoke travel journeys across the Indian subcontinent.","canonical_url":"https://mannyam.in/about","og_title":"Our Story | MANNYAM","og_description":"Private, thoughtfully planned journeys that reveal the real spirit of India.","og_image":""}$$::jsonb
),
(
  'Privacy and Security',
  'privacy',
  'Legal',
  'Published',
  $$[{"id":"priv-hero","type":"Hero","data":{"headline":"Privacy and Security","subheadline":"Your details are yours. We treat them that way."}},{"id":"priv-text","type":"Text Block","data":{"content":"<h2>What we collect</h2><p>We collect only the minimum needed to plan and run your journey: your name, email, travel dates, preferences and any details you share with us voluntarily.</p><h2>How we protect it</h2><p>Everything you share is encrypted in transit and held securely.</p><h2>What we never do</h2><p>Your information is never sold, rented or shared with third parties for marketing. You may ask us to delete your data at any time.</p><h2>Cookies</h2><p>We use essential cookies only to keep your session active. No tracking cookies without your consent.</p>"}}]$$::jsonb,
  $${"title":"Privacy and Security | MANNYAM","description":"Your details are yours. We ask only for what we need, protect it carefully, and never sell it.","canonical_url":"https://mannyam.in/privacy","og_title":"Privacy and Security | MANNYAM","og_description":"How MANNYAM protects your personal information.","og_image":""}$$::jsonb
),
(
  'Terms of Service',
  'terms',
  'Legal',
  'Published',
  $$[{"id":"terms-text","type":"Text Block","data":{"content":"<h2>Terms of Service</h2><p>By using mannyam.in you agree to these terms. MANNYAM Studio plans and arranges private travel journeys across India. All journeys are subject to availability and confirmation by our curation team.</p><p>Bookings are confirmed upon receipt of the agreed deposit. Cancellation terms are shared with your booking confirmation.</p><p>MANNYAM acts as a travel design and arrangement service. We select partners carefully but are not liable for third-party service failures beyond our control.</p><p>These terms are governed by the laws of India. For questions, contact journeys@mannyam.in.</p>"}}]$$::jsonb,
  $${"title":"Terms of Service | MANNYAM","description":"Terms governing the use of mannyam.in and MANNYAM travel services.","canonical_url":"https://mannyam.in/terms","og_title":"Terms of Service | MANNYAM","og_description":"","og_image":""}$$::jsonb
)
ON CONFLICT (slug) DO NOTHING;

-- PACKAGES
INSERT INTO public.packages (title, slug, type, description, itinerary, availability, featured_image_url) VALUES
(
  'Palaces of the North',
  'palaces-of-the-north',
  'Destination',
  'A slow, comfortable arc across Rajasthan and the golden triangle. 12 days through Delhi, Agra, Jaipur, Jodhpur and Udaipur.',
  $$[{"dayNumber":1,"title":"Arrival in Delhi","description":"Met at the airport and settled into a quiet heritage hotel."},{"dayNumber":2,"title":"Old and New Delhi","description":"A gentle walk through the lanes and Humayun's Tomb."},{"dayNumber":3,"title":"Agra and the Taj","description":"Sunrise at the Taj Mahal before the crowds."},{"dayNumber":4,"title":"On to Jaipur","description":"A scenic drive with a stop at Fatehpur Sikri."},{"dayNumber":5,"title":"Jaipur in depth","description":"Amber Fort early, then artisans at work."},{"dayNumber":6,"title":"Towards Jodhpur","description":"Into the desert, with a rural lunch on the way."},{"dayNumber":7,"title":"The blue city","description":"Mehrangarh Fort at opening time, then a rooftop dinner."},{"dayNumber":8,"title":"Into the Aravallis","description":"A drive to Udaipur via the marble temples of Ranakpur."},{"dayNumber":9,"title":"Udaipur on the water","description":"The City Palace and a private boat at golden hour."},{"dayNumber":10,"title":"A slower day","description":"Time to wander, shop or simply rest by the lake."},{"dayNumber":11,"title":"Craft and countryside","description":"Artisans in the morning, villages in the afternoon."},{"dayNumber":12,"title":"Homeward","description":"A relaxed transfer for your onward flight."}]$$::jsonb,
  '[]'::jsonb, NULL
),
(
  'Green Kerala and the Ghats',
  'green-kerala',
  'Destination',
  'A gentle journey through the south with Ayurveda. 9 days through Kochi, Munnar, Backwaters and Kovalam.',
  $$[{"dayNumber":1,"title":"Arrival in Kochi","description":"Settle into a heritage home in old Fort Kochi."},{"dayNumber":2,"title":"Old Kochi","description":"The spice quarter, the synagogue and a Kathakali performance."},{"dayNumber":3,"title":"Into the hills","description":"A scenic drive up through the tea estates of Munnar."},{"dayNumber":4,"title":"Tea and spice","description":"A plantation walk with a grower."},{"dayNumber":5,"title":"Down to the water","description":"Onto your private houseboat for the night."},{"dayNumber":6,"title":"Backwater day","description":"Drifting past village life, with your own cook."},{"dayNumber":7,"title":"Rest and restore","description":"A coastal Ayurvedic retreat and your first treatment."},{"dayNumber":8,"title":"A healing day","description":"Daily treatments, gentle yoga and quiet by the sea."},{"dayNumber":9,"title":"Homeward","description":"A final morning by the water before your transfer."}]$$::jsonb,
  '[]'::jsonb, NULL
),
(
  'Ladakh and the High Passes',
  'ladakh-high-passes',
  'Destination',
  'A carefully paced mountain journey through Ladakh. 10 days through Leh, Nubra, Pangong and Monasteries.',
  $$[{"dayNumber":1,"title":"Arrival in Leh","description":"A flight into the mountains and a full day of rest."},{"dayNumber":2,"title":"Easing in","description":"A gentle day among Leh's old town and nearby monasteries."},{"dayNumber":3,"title":"Monastery circuit","description":"Thiksey at dawn, then Hemis and Shey."},{"dayNumber":4,"title":"Over to Nubra","description":"A drive over one of the world's highest roads."},{"dayNumber":5,"title":"Sand and silence","description":"The dunes of Nubra and a night under the stars."},{"dayNumber":6,"title":"To Pangong","description":"A long, beautiful drive to the impossibly blue lake."},{"dayNumber":7,"title":"Lakeside morning","description":"Sunrise at the lake before returning towards Leh."},{"dayNumber":8,"title":"A free day","description":"Rest, walk or shop in Leh."},{"dayNumber":9,"title":"Indus valley","description":"The temples and villages along the river."},{"dayNumber":10,"title":"Homeward","description":"An early flight out of the mountains."}]$$::jsonb,
  '[]'::jsonb, NULL
),
(
  'The Ganges and Beyond',
  'ganges-and-beyond',
  'Wellness',
  'A short, moving journey along India''s sacred river. 7 days through Varanasi, Rishikesh and the Foothills.',
  $$[{"dayNumber":1,"title":"Arrival in Varanasi","description":"Settle into a riverside stay."},{"dayNumber":2,"title":"River and fire","description":"A sunrise boat and, at dusk, the Aarti fire ceremony."},{"dayNumber":3,"title":"Lanes and Sarnath","description":"The old city, then the calm of Sarnath."},{"dayNumber":4,"title":"To the foothills","description":"A flight and drive towards Rishikesh."},{"dayNumber":5,"title":"Yoga by the river","description":"Morning yoga above the Ganges."},{"dayNumber":6,"title":"A day to breathe","description":"Treatments, reading or a gentle hike."},{"dayNumber":7,"title":"Homeward","description":"A final riverside morning before your transfer."}]$$::jsonb,
  '[]'::jsonb, NULL
),
(
  'Colours of Holi',
  'colours-of-holi',
  'Festival',
  'Time your journey to the festival of colour. 8 days through Delhi, Mathura, Vrindavan and Jaipur.',
  $$[{"dayNumber":1,"title":"Arrival in Delhi","description":"Settle in and rest before the celebrations."},{"dayNumber":2,"title":"Old Delhi","description":"A gentle walk through the lanes and bazaars."},{"dayNumber":3,"title":"To Mathura","description":"Into the heartland of Holi, with a local host."},{"dayNumber":4,"title":"Holi morning","description":"Join the colour, or watch from a calm rooftop, as you wish."},{"dayNumber":5,"title":"Vrindavan and Barsana","description":"The temple towns and their famous traditions."},{"dayNumber":6,"title":"On to Jaipur","description":"A scenic drive into palace Rajasthan."},{"dayNumber":7,"title":"Jaipur in colour","description":"Amber Fort and the pink city, post festival calm."},{"dayNumber":8,"title":"Homeward","description":"A relaxed transfer for your onward flight."}]$$::jsonb,
  '[]'::jsonb, NULL
),
(
  'Lights of Diwali',
  'lights-of-diwali',
  'Festival',
  'Follow the festival of lights from Rajasthan to Varanasi. 9 days through Jaipur, Udaipur and Varanasi.',
  $$[{"dayNumber":1,"title":"Arrival in Jaipur","description":"Settle into the pink city as it dresses for Diwali."},{"dayNumber":2,"title":"Jaipur aglow","description":"Markets, lights and a family celebration."},{"dayNumber":3,"title":"To Udaipur","description":"The lake city, lit and reflected on the water."},{"dayNumber":4,"title":"Udaipur Diwali","description":"Lamps, sweets and a private boat at dusk."},{"dayNumber":5,"title":"To Varanasi","description":"A flight east to the sacred river."},{"dayNumber":6,"title":"Dev Deepawali","description":"Thousands of lamps along the ghats at night."},{"dayNumber":7,"title":"River and lanes","description":"A sunrise boat and the old city by day."},{"dayNumber":8,"title":"Sarnath calm","description":"A quiet morning where the Buddha first taught."},{"dayNumber":9,"title":"Homeward","description":"A final morning before your transfer."}]$$::jsonb,
  '[]'::jsonb, NULL
),
(
  'Royal Dussehra of Mysuru',
  'royal-dussehra',
  'Festival',
  'Witness one of India''s grandest royal celebrations. 6 days through Bengaluru and Mysuru.',
  $$[{"dayNumber":1,"title":"Arrival in Bengaluru","description":"Settle into the garden city."},{"dayNumber":2,"title":"To Mysuru","description":"A drive to the palace city as it prepares."},{"dayNumber":3,"title":"The lit palace","description":"Mysuru Palace glowing with thousands of bulbs."},{"dayNumber":4,"title":"Procession day","description":"Elephants, music and the grand Jamboo Savari."},{"dayNumber":5,"title":"Around Mysuru","description":"Silk, sandalwood and the royal heritage."},{"dayNumber":6,"title":"Homeward","description":"A transfer to Bengaluru for your onward flight."}]$$::jsonb,
  '[]'::jsonb, NULL
)
ON CONFLICT (slug) DO NOTHING;

-- JOURNAL POSTS
INSERT INTO public.posts (title, slug, category_id, status, content, seo_meta, published_at) VALUES
(
  'How to do Holi without the overwhelm',
  'holi-mathura',
  (SELECT id FROM public.categories WHERE slug = 'festivals'),
  'Published',
  $$<p>Holi in the towns near Mathura is unforgettable, and it can also be a lot. The trick is a trusted local host and a calm vantage point, so you can step into the colour when you want to and step back when you need to.</p><p>We arrange the white clothing, the safe rooftop and the timing, so the morning stays pure joy.</p>$$,
  $${"title":"How to do Holi without the overwhelm | MANNYAM Journal","description":"Where to stand, what to wear and how to feel the joy on your own terms.","canonical_url":"https://mannyam.in/journal/holi-mathura","og_title":"How to do Holi without the overwhelm","og_description":"A guide to celebrating Holi near Mathura.","og_image":""}$$::jsonb,
  NOW()
),
(
  'The night the river turns to light',
  'diwali-varanasi',
  (SELECT id FROM public.categories WHERE slug = 'festivals'),
  'Published',
  $$<p>A few nights after Diwali, Varanasi lights every step of every ghat with small oil lamps. From a quiet boat on the water the whole city seems to glow.</p><p>It is one of the most beautiful sights in India, and one of the busiest, which is exactly why a reserved boat and the right timing matter so much.</p>$$,
  $${"title":"The night the river turns to light | MANNYAM Journal","description":"Dev Deepawali in Varanasi, when thousands of lamps line the ghats.","canonical_url":"https://mannyam.in/journal/diwali-varanasi","og_title":"The night the river turns to light","og_description":"Dev Deepawali in Varanasi.","og_image":""}$$::jsonb,
  NOW()
),
(
  'A week with no plan in Spiti',
  'slow-spiti',
  (SELECT id FROM public.categories WHERE slug = 'slow-travel'),
  'Published',
  $$<p>We sent a couple from Switzerland into Spiti with almost nothing fixed, just a trusted driver and a few homestays. They came back changed.</p><p>The valley is high, bare and almost empty, and that emptiness turned out to be the point. Sometimes the richest journey is the one with the most space left in it.</p>$$,
  $${"title":"A week with no plan in Spiti | MANNYAM Journal","description":"Why the emptiest valley left the deepest mark.","canonical_url":"https://mannyam.in/journal/slow-spiti","og_title":"A week with no plan in Spiti","og_description":"Why the emptiest valley left the deepest mark.","og_image":""}$$::jsonb,
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- TAG ASSOCIATIONS
INSERT INTO public.post_tags (post_id, tag_id)
SELECT p.id, t.id FROM public.posts p, public.tags t
WHERE p.slug = 'holi-mathura' AND t.slug IN ('holi', 'rajasthan', 'culture')
ON CONFLICT DO NOTHING;

INSERT INTO public.post_tags (post_id, tag_id)
SELECT p.id, t.id FROM public.posts p, public.tags t
WHERE p.slug = 'diwali-varanasi' AND t.slug IN ('diwali', 'varanasi', 'culture')
ON CONFLICT DO NOTHING;

INSERT INTO public.post_tags (post_id, tag_id)
SELECT p.id, t.id FROM public.posts p, public.tags t
WHERE p.slug = 'slow-spiti' AND t.slug IN ('himalayas', 'spiti')
ON CONFLICT DO NOTHING;

-- DONE: 4 categories, 12 tags, 3 pages, 7 packages, 3 posts with tags
