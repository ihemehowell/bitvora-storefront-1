-- ============================================
-- MERCHANTS
-- ============================================
create table merchants (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  full_name text not null,
  phone text,
  business_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index merchants_user_id_idx on merchants(user_id);

-- ============================================
-- STORES
-- ============================================
create table stores (
  id uuid primary key default gen_random_uuid(),
  merchant_id uuid not null references merchants(id) on delete cascade,
  name text not null,
  slug text not null unique,
  industry text, -- e.g. 'fashion', 'food', 'electronics'
  logo_url text,
  palette jsonb default '{}'::jsonb, -- brand colors
  custom_domain text unique,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index stores_merchant_id_idx on stores(merchant_id);
create index stores_slug_idx on stores(slug);

-- ============================================
-- SECTIONS (homepage builder config, per store)
-- ============================================
create table sections (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null references stores(id) on delete cascade,
  type text not null, -- 'hero', 'featured_products', 'testimonials', etc.
  position int not null default 0,
  config jsonb not null default '{}'::jsonb, -- section-specific content
  is_visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index sections_store_id_idx on sections(store_id);

-- ============================================
-- PRODUCTS
-- ============================================
create table products (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null references stores(id) on delete cascade,
  name text not null,
  slug text not null,
  description text,
  price numeric(12,2) not null,
  compare_at_price numeric(12,2), -- for showing discounts
  images jsonb default '[]'::jsonb, -- array of Cloudinary URLs
  category text,
  stock_quantity int default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(store_id, slug)
);

create index products_store_id_idx on products(store_id);

-- ============================================
-- ORDERS
-- ============================================
create table orders (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null references stores(id) on delete cascade,
  customer_name text not null,
  customer_phone text not null,
  customer_email text,
  delivery_method text not null default 'pickup', -- 'pickup' | 'delivery'
  delivery_area text,
  delivery_fee numeric(12,2) default 0,
  subtotal numeric(12,2) not null,
  total numeric(12,2) not null,
  payment_method text not null default 'bank_transfer', -- 'bank_transfer' | 'paystack' | 'pay_on_delivery'
  payment_proof_url text, -- for manual bank transfer proof upload
  status text not null default 'pending', -- 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index orders_store_id_idx on orders(store_id);
create index orders_status_idx on orders(status);

-- ============================================
-- ORDER ITEMS
-- ============================================
create table order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  product_id uuid references products(id) on delete set null,
  product_name text not null, -- snapshot at time of order
  quantity int not null default 1,
  unit_price numeric(12,2) not null,
  created_at timestamptz not null default now()
);

create index order_items_order_id_idx on order_items(order_id);

-- ============================================
-- UPDATED_AT TRIGGER (reused across tables)
-- ============================================
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at_merchants before update on merchants
  for each row execute function set_updated_at();
create trigger set_updated_at_stores before update on stores
  for each row execute function set_updated_at();
create trigger set_updated_at_sections before update on sections
  for each row execute function set_updated_at();
create trigger set_updated_at_products before update on products
  for each row execute function set_updated_at();
create trigger set_updated_at_orders before update on orders
  for each row execute function set_updated_at();