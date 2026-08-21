-- ============================================
-- ENABLE RLS ON ALL TABLES
-- ============================================
alter table merchants enable row level security;
alter table stores enable row level security;
alter table sections enable row level security;
alter table products enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;

-- ============================================
-- MERCHANTS: only see/edit your own merchant row
-- ============================================
create policy "Merchants can view their own record"
  on merchants for select
  using (auth.uid() = user_id);

create policy "Merchants can update their own record"
  on merchants for update
  using (auth.uid() = user_id);

create policy "Merchants can insert their own record"
  on merchants for insert
  with check (auth.uid() = user_id);

-- ============================================
-- STORES: merchants manage their own stores.
-- Public can view PUBLISHED stores only.
-- ============================================
create policy "Merchants can view their own stores"
  on stores for select
  using (
    merchant_id in (select id from merchants where user_id = auth.uid())
  );

create policy "Public can view published stores"
  on stores for select
  using (is_published = true);

create policy "Merchants can insert their own stores"
  on stores for insert
  with check (
    merchant_id in (select id from merchants where user_id = auth.uid())
  );

create policy "Merchants can update their own stores"
  on stores for update
  using (
    merchant_id in (select id from merchants where user_id = auth.uid())
  );

create policy "Merchants can delete their own stores"
  on stores for delete
  using (
    merchant_id in (select id from merchants where user_id = auth.uid())
  );

-- ============================================
-- SECTIONS: tied to store ownership.
-- Public can view sections of published stores.
-- ============================================
create policy "Merchants can manage sections of their own stores"
  on sections for all
  using (
    store_id in (
      select s.id from stores s
      join merchants m on m.id = s.merchant_id
      where m.user_id = auth.uid()
    )
  );

create policy "Public can view sections of published stores"
  on sections for select
  using (
    store_id in (select id from stores where is_published = true)
    and is_visible = true
  );

-- ============================================
-- PRODUCTS: tied to store ownership.
-- Public can view active products of published stores.
-- ============================================
create policy "Merchants can manage products of their own stores"
  on products for all
  using (
    store_id in (
      select s.id from stores s
      join merchants m on m.id = s.merchant_id
      where m.user_id = auth.uid()
    )
  );

create policy "Public can view active products of published stores"
  on products for select
  using (
    store_id in (select id from stores where is_published = true)
    and is_active = true
  );

-- ============================================
-- ORDERS: only the merchant who owns the store sees orders.
-- Public (customers) can INSERT an order (checkout), but never read others' orders.
-- ============================================
create policy "Merchants can view orders on their own stores"
  on orders for select
  using (
    store_id in (
      select s.id from stores s
      join merchants m on m.id = s.merchant_id
      where m.user_id = auth.uid()
    )
  );

create policy "Merchants can update orders on their own stores"
  on orders for update
  using (
    store_id in (
      select s.id from stores s
      join merchants m on m.id = s.merchant_id
      where m.user_id = auth.uid()
    )
  );

create policy "Anyone can create an order on a published store"
  on orders for insert
  with check (
    store_id in (select id from stores where is_published = true)
  );

-- ============================================
-- ORDER ITEMS: same access pattern as orders (via join)
-- ============================================
create policy "Merchants can view order items for their own stores"
  on order_items for select
  using (
    order_id in (
      select o.id from orders o
      join stores s on s.id = o.store_id
      join merchants m on m.id = s.merchant_id
      where m.user_id = auth.uid()
    )
  );

create policy "Anyone can insert order items during checkout"
  on order_items for insert
  with check (
    order_id in (select id from orders where store_id in (select id from stores where is_published = true))
  );