-- ═══════════════════════════════════════════════════════════════════════════
-- MANNYAM: Assign correct images to Packages and Pages
-- Mapped from the approved Manyam frontend.html design
-- Run this in the Supabase SQL Editor on the VPS (or via psql)
-- ═══════════════════════════════════════════════════════════════════════════

-- ─── PACKAGES: Set featured_image_url ────────────────────────────────────────

-- Palaces of the North → Taj Mahal
UPDATE public.packages SET featured_image_url = 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=75'
WHERE slug = 'palaces-of-the-north';

-- Green Kerala & the Ghats → Kerala backwaters
UPDATE public.packages SET featured_image_url = 'https://images.unsplash.com/photo-1593693411515-c20261bcad6e?auto=format&fit=crop&w=1200&q=75'
WHERE slug = 'green-kerala';

-- Ladakh & the High Passes → Snow mountains
UPDATE public.packages SET featured_image_url = 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=75'
WHERE slug = 'ladakh-high-passes';

-- The Ganges & Beyond → Yoga/spiritual (Varanasi vibe)
UPDATE public.packages SET featured_image_url = 'https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=1200&q=75'
WHERE slug = 'ganges-and-beyond';

-- Colours of Holi → Holi crowd colours
UPDATE public.packages SET featured_image_url = 'https://unsplash.com/photos/rFP3OzmYH6M/download?w=1200&fm=jpg&fit=crop'
WHERE slug = 'colours-of-holi';

-- Lights of Diwali → Palace (lit palace at night)
UPDATE public.packages SET featured_image_url = 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=75'
WHERE slug = 'lights-of-diwali';

-- Royal Dussehra of Mysuru → Fort
UPDATE public.packages SET featured_image_url = 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=75'
WHERE slug = 'royal-dussehra';


-- ─── PAGES: Set Hero block backgroundImage in content JSONB ──────────────────
-- Destinations (slug pattern: destination-*)

-- destination-rajasthan → Palace
UPDATE public.pages SET content = (
  SELECT jsonb_agg(
    CASE WHEN elem->>'type' = 'Hero'
      THEN jsonb_set(elem, '{data,backgroundImage}', '"https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=75"')
      ELSE elem END
  ) FROM jsonb_array_elements(content) elem
) WHERE slug = 'destination-rajasthan' AND content IS NOT NULL;

-- destination-kerala → Kerala backwaters
UPDATE public.pages SET content = (
  SELECT jsonb_agg(
    CASE WHEN elem->>'type' = 'Hero'
      THEN jsonb_set(elem, '{data,backgroundImage}', '"https://images.unsplash.com/photo-1593693411515-c20261bcad6e?auto=format&fit=crop&w=1200&q=75"')
      ELSE elem END
  ) FROM jsonb_array_elements(content) elem
) WHERE slug = 'destination-kerala' AND content IS NOT NULL;

-- destination-himalayas → Snow/mountains
UPDATE public.pages SET content = (
  SELECT jsonb_agg(
    CASE WHEN elem->>'type' = 'Hero'
      THEN jsonb_set(elem, '{data,backgroundImage}', '"https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=75"')
      ELSE elem END
  ) FROM jsonb_array_elements(content) elem
) WHERE slug = 'destination-himalayas' AND content IS NOT NULL;

-- destination-tamil-nadu → Gopuram (temple gateway)
UPDATE public.pages SET content = (
  SELECT jsonb_agg(
    CASE WHEN elem->>'type' = 'Hero'
      THEN jsonb_set(elem, '{data,backgroundImage}', '"https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=75"')
      ELSE elem END
  ) FROM jsonb_array_elements(content) elem
) WHERE slug = 'destination-tamil-nadu' AND content IS NOT NULL;

-- destination-varanasi → Yoga/spiritual
UPDATE public.pages SET content = (
  SELECT jsonb_agg(
    CASE WHEN elem->>'type' = 'Hero'
      THEN jsonb_set(elem, '{data,backgroundImage}', '"https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=1200&q=75"')
      ELSE elem END
  ) FROM jsonb_array_elements(content) elem
) WHERE slug = 'destination-varanasi' AND content IS NOT NULL;

-- destination-north-east → Kerala 2 (green/lush)
UPDATE public.pages SET content = (
  SELECT jsonb_agg(
    CASE WHEN elem->>'type' = 'Hero'
      THEN jsonb_set(elem, '{data,backgroundImage}', '"https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=75"')
      ELSE elem END
  ) FROM jsonb_array_elements(content) elem
) WHERE slug = 'destination-north-east' AND content IS NOT NULL;

-- destination-gujarat → Fort
UPDATE public.pages SET content = (
  SELECT jsonb_agg(
    CASE WHEN elem->>'type' = 'Hero'
      THEN jsonb_set(elem, '{data,backgroundImage}', '"https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=75"')
      ELSE elem END
  ) FROM jsonb_array_elements(content) elem
) WHERE slug = 'destination-gujarat' AND content IS NOT NULL;


-- ─── Experiences (slug pattern: experience-*)

-- experience-heritage → Fort
UPDATE public.pages SET content = (
  SELECT jsonb_agg(
    CASE WHEN elem->>'type' = 'Hero'
      THEN jsonb_set(elem, '{data,backgroundImage}', '"https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=75"')
      ELSE elem END
  ) FROM jsonb_array_elements(content) elem
) WHERE slug = 'experience-heritage' AND content IS NOT NULL;

-- experience-local-life → Palace
UPDATE public.pages SET content = (
  SELECT jsonb_agg(
    CASE WHEN elem->>'type' = 'Hero'
      THEN jsonb_set(elem, '{data,backgroundImage}', '"https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=75"')
      ELSE elem END
  ) FROM jsonb_array_elements(content) elem
) WHERE slug = 'experience-local-life' AND content IS NOT NULL;

-- experience-food → Curry/food
UPDATE public.pages SET content = (
  SELECT jsonb_agg(
    CASE WHEN elem->>'type' = 'Hero'
      THEN jsonb_set(elem, '{data,backgroundImage}', '"https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1200&q=75"')
      ELSE elem END
  ) FROM jsonb_array_elements(content) elem
) WHERE slug = 'experience-food' AND content IS NOT NULL;

-- experience-spiritual → Yoga
UPDATE public.pages SET content = (
  SELECT jsonb_agg(
    CASE WHEN elem->>'type' = 'Hero'
      THEN jsonb_set(elem, '{data,backgroundImage}', '"https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=1200&q=75"')
      ELSE elem END
  ) FROM jsonb_array_elements(content) elem
) WHERE slug = 'experience-spiritual' AND content IS NOT NULL;

-- experience-wildlife → Tiger
UPDATE public.pages SET content = (
  SELECT jsonb_agg(
    CASE WHEN elem->>'type' = 'Hero'
      THEN jsonb_set(elem, '{data,backgroundImage}', '"https://images.unsplash.com/photo-1615824996195-f780bba7cfab?auto=format&fit=crop&w=1200&q=75"')
      ELSE elem END
  ) FROM jsonb_array_elements(content) elem
) WHERE slug = 'experience-wildlife' AND content IS NOT NULL;

-- experience-royal → Taj Mahal
UPDATE public.pages SET content = (
  SELECT jsonb_agg(
    CASE WHEN elem->>'type' = 'Hero'
      THEN jsonb_set(elem, '{data,backgroundImage}', '"https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=75"')
      ELSE elem END
  ) FROM jsonb_array_elements(content) elem
) WHERE slug = 'experience-royal' AND content IS NOT NULL;

-- experience-arts → Gopuram
UPDATE public.pages SET content = (
  SELECT jsonb_agg(
    CASE WHEN elem->>'type' = 'Hero'
      THEN jsonb_set(elem, '{data,backgroundImage}', '"https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=75"')
      ELSE elem END
  ) FROM jsonb_array_elements(content) elem
) WHERE slug = 'experience-arts' AND content IS NOT NULL;

-- experience-slow → Kerala
UPDATE public.pages SET content = (
  SELECT jsonb_agg(
    CASE WHEN elem->>'type' = 'Hero'
      THEN jsonb_set(elem, '{data,backgroundImage}', '"https://images.unsplash.com/photo-1593693411515-c20261bcad6e?auto=format&fit=crop&w=1200&q=75"')
      ELSE elem END
  ) FROM jsonb_array_elements(content) elem
) WHERE slug = 'experience-slow' AND content IS NOT NULL;

-- experience-honeymoon → Bride
UPDATE public.pages SET content = (
  SELECT jsonb_agg(
    CASE WHEN elem->>'type' = 'Hero'
      THEN jsonb_set(elem, '{data,backgroundImage}', '"https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=75"')
      ELSE elem END
  ) FROM jsonb_array_elements(content) elem
) WHERE slug = 'experience-honeymoon' AND content IS NOT NULL;


-- ─── Festivals (slug pattern: festival-*)

-- festival-holi → Holi crowd colours
UPDATE public.pages SET content = (
  SELECT jsonb_agg(
    CASE WHEN elem->>'type' = 'Hero'
      THEN jsonb_set(elem, '{data,backgroundImage}', '"https://unsplash.com/photos/rFP3OzmYH6M/download?w=1200&fm=jpg&fit=crop"')
      ELSE elem END
  ) FROM jsonb_array_elements(content) elem
) WHERE slug = 'festival-holi' AND content IS NOT NULL;

-- festival-diwali → Palace
UPDATE public.pages SET content = (
  SELECT jsonb_agg(
    CASE WHEN elem->>'type' = 'Hero'
      THEN jsonb_set(elem, '{data,backgroundImage}', '"https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=75"')
      ELSE elem END
  ) FROM jsonb_array_elements(content) elem
) WHERE slug = 'festival-diwali' AND content IS NOT NULL;

-- festival-dussehra → Fort
UPDATE public.pages SET content = (
  SELECT jsonb_agg(
    CASE WHEN elem->>'type' = 'Hero'
      THEN jsonb_set(elem, '{data,backgroundImage}', '"https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=75"')
      ELSE elem END
  ) FROM jsonb_array_elements(content) elem
) WHERE slug = 'festival-dussehra' AND content IS NOT NULL;

-- festival-durga-puja → Gopuram
UPDATE public.pages SET content = (
  SELECT jsonb_agg(
    CASE WHEN elem->>'type' = 'Hero'
      THEN jsonb_set(elem, '{data,backgroundImage}', '"https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=75"')
      ELSE elem END
  ) FROM jsonb_array_elements(content) elem
) WHERE slug = 'festival-durga-puja' AND content IS NOT NULL;

-- festival-navratri → Bride (dance/colour)
UPDATE public.pages SET content = (
  SELECT jsonb_agg(
    CASE WHEN elem->>'type' = 'Hero'
      THEN jsonb_set(elem, '{data,backgroundImage}', '"https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=75"')
      ELSE elem END
  ) FROM jsonb_array_elements(content) elem
) WHERE slug = 'festival-navratri' AND content IS NOT NULL;

-- festival-ganesh-chaturthi → Stupa
UPDATE public.pages SET content = (
  SELECT jsonb_agg(
    CASE WHEN elem->>'type' = 'Hero'
      THEN jsonb_set(elem, '{data,backgroundImage}', '"https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=1200&q=75"')
      ELSE elem END
  ) FROM jsonb_array_elements(content) elem
) WHERE slug = 'festival-ganesh-chaturthi' AND content IS NOT NULL;

-- festival-harvest → Kerala 2 (harvest/lush)
UPDATE public.pages SET content = (
  SELECT jsonb_agg(
    CASE WHEN elem->>'type' = 'Hero'
      THEN jsonb_set(elem, '{data,backgroundImage}', '"https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=75"')
      ELSE elem END
  ) FROM jsonb_array_elements(content) elem
) WHERE slug = 'festival-harvest' AND content IS NOT NULL;

-- festival-celebration-shows → Fort
UPDATE public.pages SET content = (
  SELECT jsonb_agg(
    CASE WHEN elem->>'type' = 'Hero'
      THEN jsonb_set(elem, '{data,backgroundImage}', '"https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=75"')
      ELSE elem END
  ) FROM jsonb_array_elements(content) elem
) WHERE slug = 'festival-celebration-shows' AND content IS NOT NULL;


-- ═══════════════════════════════════════════════════════════════════════════
-- VERIFY
-- ═══════════════════════════════════════════════════════════════════════════

SELECT slug, featured_image_url FROM public.packages ORDER BY created_at;

SELECT slug, content->0->'data'->>'backgroundImage' AS hero_image
FROM public.pages
WHERE type = 'Category' AND status = 'Published'
ORDER BY slug;
