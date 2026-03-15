-- ============================================================
-- YAKUZAZ — Products Seed Data
-- Run AFTER schema.sql in Supabase SQL Editor
-- ============================================================

-- ── LEAFY VEGETABLES ─────────────────────────────────────
insert into public.products (slug, name, aka, emoji, category_slug, farm_id, tagline, description, freshness_score, status, is_seasonal, is_available, price_per_kg) values
  ('spinach',    'Spinach',    'Palak',       '🥬', 'leafy', 1, 'Iron-rich leaves, harvested at dawn', 'Our Palak comes from Sharma Greens — high-iron, non-bitter, and cut within 6 hours of your delivery. Grown in loamy Sonipat soil with zero pesticide use.', 9.4, 'Fresh', false, true, 35),
  ('coriander',  'Coriander',  'Dhaniya',     '🌿', 'leafy', 1, 'The fragrance of a real kitchen', 'Aromatic, dark green, and bursting with freshness. Bunched by hand, never machine-packed. Sourced same-morning from Sharma Greens.', 9.5, 'Fresh', false, true, 80),
  ('fenugreek',  'Fenugreek',  'Methi',       '🌱', 'leafy', 2, 'Bitter is better', 'True bitter-sweet Methi from Patel Organics. Rich in folic acid. Harvested in the early morning when the dew is still on the leaves.', 9.3, 'Fresh', true,  true, 40),
  ('mint',       'Mint',       'Pudina',      '🍃', 'leafy', 1, 'Cold as a mountain stream', 'Grown in raised beds under shade nets. Our Pudina stays crisp for 5+ days — try that with mandi mint.', 9.2, 'Fresh', false, true, 90),
  ('lettuce',    'Lettuce',    'Salad Patta', '🥬', 'leafy', 2, 'Chef-grade heads, every batch', 'Iceberg and romaine varieties from Patel Organics'' polyhouse. Grown hydroponically — zero soil contamination. Washed and packed cold.', 9.6, 'Fresh', false, true, 120)
on conflict (slug) do nothing;

-- ── ROOT VEGETABLES ───────────────────────────────────────
insert into public.products (slug, name, aka, emoji, category_slug, farm_id, tagline, description, freshness_score, status, is_seasonal, is_available, price_per_kg) values
  ('carrot',     'Carrot',     'Gajar',      '🥕', 'root', 4, 'Naturally sweet, not chemically ripened', 'Ramesh Farm''s Gajar is dug on your order day. Their deep red variety hits 9–12% sugar content naturally. Cold-stored immediately after harvest.', 9.1, 'Fresh', false, true, 45),
  ('radish',     'Radish',     'Mooli',      '🫚', 'root', 5, 'Crisp, peppery, honest', 'Japanese white radish from Gupta Roots — firm, non-pithy, and harvested at exactly the right size. Not the oversized woody stuff from the mandi.', 8.9, 'Fresh', true,  true, 30),
  ('beetroot',   'Beetroot',   'Chukandar',  '🫀', 'root', 4, 'Deep red, deep nutrition', 'Earth-cultivated beets from Ramesh Farm. Deep colour means they''re not stressed. Boil them and the colour stays — that''s how you know they''re good.', 9.0, 'Fresh', false, true, 55)
on conflict (slug) do nothing;

-- ── TUBER VEGETABLES ──────────────────────────────────────
insert into public.products (slug, name, aka, emoji, category_slug, farm_id, tagline, description, freshness_score, status, is_seasonal, is_available, price_per_kg) values
  ('potato',       'Potato',       'Aloo',        '🥔', 'tuber', 7, 'The backbone of every meal', 'Yadav Tubers'' Agra potato — dry, starchy, perfect for dum aloo or sabzi. Cured and stored correctly so they last 2 weeks without sprouting.', 9.0, 'Fresh', false, true, 28),
  ('sweet-potato', 'Sweet Potato', 'Shakarkandi', '🍠', 'tuber', 7, 'The winter runner''s fuel', 'Naturally sweet and dense with complex carbs. Our shakarkandi is sourced from Yadav Tubers'' red clay fields — high carotene, no soaking required.', 9.1, 'Fresh', true,  true, 50)
on conflict (slug) do nothing;

-- ── FRUITING VEGETABLES ───────────────────────────────────
insert into public.products (slug, name, aka, emoji, category_slug, farm_id, tagline, description, freshness_score, status, is_seasonal, is_available, price_per_kg) values
  ('tomato',    'Tomato',       'Tamatar',    '🍅', 'fruiting', 9,  'Vine-ripened. Never cold-stored.', 'Joshi Polyhouse''s hybrid tomatoes hit the shelf within 8 hours of picking. Bright red, medium acid, and firm enough to slice clean. Zero ethylene ripening.', 9.2, 'Fresh', false, true, 40),
  ('capsicum',  'Capsicum',     'Shimla Mirch','🫑', 'fruiting', 9,  'Three colours, one standard', 'Red, yellow, and green capsicum from Joshi''s polyhouse in Alwar. Sweet-walled, thick, and never hollow. A Michelin-grade product at your doorstep.', 9.4, 'Fresh', false, true, 90),
  ('brinjal',   'Brinjal',     'Baingan',    '🍆', 'fruiting', 10, 'The purple powerhouse', 'Khatri Gardens'' long baingan — smooth skin, minimal seeds, properly bitter when cooked. Not the pale mushy variety you''re used to.', 8.8, 'Fresh', false, true, 45),
  ('chilly',    'Green Chilly', 'Hari Mirch',  '🌶️','fruiting', 9,  'The real heat check', 'Medium-hot variety sourced from Joshi Polyhouse. Consistent heat level — no surprises. Stems on, stored whole so they last.', 9.0, 'Fresh', false, true, 60),
  ('bitter-gourd','Bitter Gourd','Karela',    '🥒', 'fruiting', 10, 'The detox king. Not for the faint-hearted.', 'Deep green, ribbed properly, not the pale yellow kind. Khatri Gardens'' Karela is tender enough that it cooks in 12 minutes flat.', 8.7, 'Fresh', true,  true, 55)
on conflict (slug) do nothing;

-- ── FRUITS ────────────────────────────────────────────────
insert into public.products (slug, name, aka, emoji, category_slug, farm_id, tagline, description, freshness_score, status, is_seasonal, is_available, price_per_kg) values
  ('banana',      'Banana',      'Kela',      '🍌', 'fruits', 14, 'Ripened naturally, not in a carbide chamber', 'Coorg Estates'' Robusta banana — short, fat, intensely sweet. Naturally ripened without carbide gas. You can taste the difference immediately.', 9.1, 'Fresh', false, true, 35),
  ('guava',       'Guava',       'Amrood',    '🍐', 'fruits', 13, 'Crunchy, dense, deeply fragrant', 'Allahabad Safeda variety from Mathur Harvest — white flesh, low seed count, aromatic skin. Winter exclusive.', 9.3, 'Fresh', true,  true, 60),
  ('pomegranate', 'Pomegranate', 'Anar',      '🔴', 'fruits', 11, 'Ruby arils. 500+ per fruit.', 'Nashik Orchards'' Bhagwa pomegranate — deep red arils, low tannin, high sweetness. The benchmark variety for everything pomegranate.', 9.5, 'Fresh', true,  true, 140)
on conflict (slug) do nothing;

-- ── DEMO BATCHES (for QR trace testing) ──────────────────
insert into public.batches (product_id, batch_code, harvested_at, farm_id, transit_text, arrived_at, storage_conditions, qty_kg, freshness_score, is_active, notes)
select p.id, 'YKZ-20250315-001', '2025-03-15 03:14:00', p.farm_id,
  'Refrigerated van · 2h 40min', '2025-03-15 06:00:00',
  '12°C · 72% Humidity', 45, 9.4, true,
  'Night harvest. Dew conditions optimal. No bruising observed.'
from public.products p where p.slug = 'spinach'
on conflict do nothing;

insert into public.batches (product_id, batch_code, harvested_at, farm_id, transit_text, arrived_at, storage_conditions, qty_kg, freshness_score, is_active, notes)
select p.id, 'YKZ-20250315-002', '2025-03-15 04:30:00', p.farm_id,
  'Direct farm run · 1h 55min', '2025-03-15 06:30:00',
  '14°C · 68% Humidity', 80, 9.2, true,
  'Good vine colour. Graded A. Zero rejects in batch.'
from public.products p where p.slug = 'tomato'
on conflict do nothing;

insert into public.batches (product_id, batch_code, harvested_at, farm_id, transit_text, arrived_at, storage_conditions, qty_kg, freshness_score, is_active, notes)
select p.id, 'YKZ-20250315-003', '2025-03-14 22:00:00', p.farm_id,
  'Cold chain truck · 3h 10min', '2025-03-15 01:15:00',
  '10°C · 75% Humidity', 120, 9.1, true,
  'Agra harvest. Dry-cured 48h before dispatch.'
from public.products p where p.slug = 'potato'
on conflict do nothing;
