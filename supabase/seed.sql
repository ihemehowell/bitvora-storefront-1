-- ============================================
-- SEED DATA (local dev only)
-- Ran automatically on `supabase db reset` per supabase/config.toml
-- Creates one demo merchant + store so admin and storefront have
-- real data to work against without manual signup each time.
-- ============================================

-- ---------------------------------------------
-- 1. Demo auth user
-- The on_auth_user_created trigger will auto-insert the matching
-- `merchants` row, so we don't insert into merchants directly.
-- Login: demo@bitvora.test / password123
-- ---------------------------------------------
insert into auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at
) values (
  '00000000-0000-0000-0000-000000000000',
  '11111111-1111-1111-1111-111111111111',
  'authenticated',
  'authenticated',
  'demo@bitvora.test',
  crypt('password123', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Ada Demo"}',
  now(),
  now()
);

-- ---------------------------------------------
-- 2. Update the auto-created merchant with extra fields
-- (handle_new_user only sets user_id + full_name)
-- ---------------------------------------------
update merchants
set phone = '+2348012345678',
    business_name = 'Ada Crafts'
where user_id = '11111111-1111-1111-1111-111111111111';

-- ---------------------------------------------
-- 3. Demo store
-- ---------------------------------------------
insert into stores (id, merchant_id, name, slug, industry, palette, is_published)
select
  '22222222-2222-2222-2222-222222222222',
  m.id,
  'Ada Crafts',
  'ada-crafts',
  'fashion',
  '{"primary": "#B5495B"}'::jsonb,
  true
from merchants m
where m.user_id = '11111111-1111-1111-1111-111111111111';

-- ---------------------------------------------
-- 4. Hero section for the demo store
-- ---------------------------------------------
insert into sections (store_id, type, position, config, is_visible)
values (
  '22222222-2222-2222-2222-222222222222',
  'hero',
  0,
  '{
    "heading": "Fresh drops every Friday",
    "subheading": "Handmade jewelry, made in Lagos",
    "image_url": "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200",
    "cta_text": "Shop now",
    "cta_link": "/ada-crafts"
  }'::jsonb,
  true
);

-- ---------------------------------------------
-- 5. Demo products
-- ---------------------------------------------
insert into products (id, store_id, name, slug, description, price, compare_at_price, images, category, stock_quantity, is_active)
values
  (
    '33333333-3333-3333-3333-333333333331',
    '22222222-2222-2222-2222-222222222222',
    'Beaded Choker Necklace',
    'beaded-choker-necklace',
    'Hand-strung beaded choker in earth tones.',
    12000.00,
    15000.00,
    '["https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800"]'::jsonb,
    'jewelry',
    14,
    true
  ),
  (
    '33333333-3333-3333-3333-333333333332',
    '22222222-2222-2222-2222-222222222222',
    'Brass Hoop Earrings',
    'brass-hoop-earrings',
    'Lightweight brass hoops, hand-finished.',
    8500.00,
    null,
    '["https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800"]'::jsonb,
    'jewelry',
    22,
    true
  ),
  (
    '33333333-3333-3333-3333-333333333333',
    '22222222-2222-2222-2222-222222222222',
    'Woven Raffia Tote',
    'woven-raffia-tote',
    'Market tote, hand-woven raffia with leather trim.',
    22000.00,
    null,
    '["https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800"]'::jsonb,
    'bags',
    5,
    true
  ),
  (
    '33333333-3333-3333-3333-333333333334',
    '22222222-2222-2222-2222-222222222222',
    'Ankara Print Scrunchie Set',
    'ankara-scrunchie-set',
    'Set of 3 scrunchies in matching Ankara prints.',
    4000.00,
    null,
    '[]'::jsonb,
    'accessories',
    0,
    true
  );

-- ---------------------------------------------
-- 6. Sample order + order item, so the admin
-- orders list/detail pages have something to show
-- ---------------------------------------------
insert into orders (id, store_id, customer_name, customer_phone, customer_email, delivery_method, delivery_area, delivery_fee, subtotal, total, payment_method, status)
values (
  '44444444-4444-4444-4444-444444444444',
  '22222222-2222-2222-2222-222222222222',
  'Chiamaka Obi',
  '+2348098765432',
  'chiamaka@example.com',
  'delivery',
  'Lekki, Lagos',
  1500.00,
  20500.00,
  22000.00,
  'bank_transfer',
  'pending'
);

insert into order_items (order_id, product_id, product_name, quantity, unit_price)
values
  ('44444444-4444-4444-4444-444444444444', '33333333-3333-3333-3333-333333333331', 'Beaded Choker Necklace', 1, 12000.00),
  ('44444444-4444-4444-4444-444444444444', '33333333-3333-3333-3333-333333333332', 'Brass Hoop Earrings', 1, 8500.00);
