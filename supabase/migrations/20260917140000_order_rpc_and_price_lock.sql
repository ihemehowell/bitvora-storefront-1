-- ============================================
-- Close the client-trusted-total gap and fix anon read-back on checkout.
-- Order creation and confirmation reads now go through security definer
-- functions instead of direct table access, so:
--   1. totals are always recomputed from live products.price server-side
--   2. customers can read back only their own just-created order via id,
--      without needing a blanket anon SELECT policy on orders/order_items
-- ============================================

-- Direct anon inserts are no longer the path orders/order_items go through.
-- Removing them closes the price-tampering hole for good (a client could
-- previously insert order_items with any unit_price it liked).
drop policy if exists "Anyone can create an order on a published store" on orders;
drop policy if exists "Anyone can insert order items during checkout" on order_items;

-- ============================================
-- CREATE ORDER: recomputes subtotal/total from live product prices.
-- p_items shape: [{ "productId": "<uuid>", "quantity": 2 }, ...]
-- ============================================
create or replace function public.create_order(
  p_store_id uuid,
  p_customer_name text,
  p_customer_phone text,
  p_customer_email text,
  p_delivery_method text,
  p_delivery_area text,
  p_delivery_fee numeric,
  p_payment_method text,
  p_payment_proof_url text,
  p_items jsonb
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_subtotal numeric := 0;
  v_total numeric;
  v_order_id uuid;
  v_store_published boolean;
  v_item_count int;
  v_matched_count int;
begin
  select is_published into v_store_published from stores where id = p_store_id;
  if v_store_published is not true then
    raise exception 'Store is not available';
  end if;

  if p_items is null or jsonb_array_length(p_items) = 0 then
    raise exception 'Your cart is empty';
  end if;

  v_item_count := jsonb_array_length(p_items);

  select coalesce(sum(pr.price * (i->>'quantity')::int), 0), count(*)
  into v_subtotal, v_matched_count
  from jsonb_array_elements(p_items) as i
  join products pr
    on pr.id = (i->>'productId')::uuid
   and pr.store_id = p_store_id
   and pr.is_active = true;

  if v_matched_count < v_item_count then
    raise exception 'One or more items are no longer available';
  end if;

  v_total := v_subtotal + coalesce(p_delivery_fee, 0);

  insert into orders (
    store_id, customer_name, customer_phone, customer_email,
    delivery_method, delivery_area, delivery_fee, subtotal, total,
    payment_method, payment_proof_url, status
  ) values (
    p_store_id, p_customer_name, p_customer_phone, p_customer_email,
    p_delivery_method, p_delivery_area, coalesce(p_delivery_fee, 0), v_subtotal, v_total,
    p_payment_method, p_payment_proof_url, 'pending'
  ) returning id into v_order_id;

  insert into order_items (order_id, product_id, product_name, quantity, unit_price)
  select
    v_order_id,
    pr.id,
    pr.name,
    (i->>'quantity')::int,
    pr.price
  from jsonb_array_elements(p_items) as i
  join products pr
    on pr.id = (i->>'productId')::uuid
   and pr.store_id = p_store_id
   and pr.is_active = true;

  return jsonb_build_object('order_id', v_order_id, 'total', v_total);
end;
$$;

grant execute on function public.create_order(
  uuid, text, text, text, text, text, numeric, text, text, jsonb
) to anon, authenticated;

-- ============================================
-- GET ORDER CONFIRMATION: lets a customer read back one order by id
-- (needed right after checkout and for the payment-proof-upload screen)
-- without opening a blanket anon SELECT policy on the orders table.
-- ============================================
create or replace function public.get_order_confirmation(p_order_id uuid)
returns jsonb
language sql
security definer
set search_path = public
as $$
  select jsonb_build_object(
    'id', o.id,
    'customer_name', o.customer_name,
    'payment_method', o.payment_method,
    'payment_proof_url', o.payment_proof_url,
    'delivery_fee', o.delivery_fee,
    'total', o.total,
    'status', o.status,
    'order_items', coalesce(
      (select jsonb_agg(jsonb_build_object(
         'id', oi.id,
         'product_name', oi.product_name,
         'quantity', oi.quantity,
         'unit_price', oi.unit_price
       ))
       from order_items oi
       where oi.order_id = o.id),
      '[]'::jsonb
    )
  )
  from orders o
  where o.id = p_order_id;
$$;

grant execute on function public.get_order_confirmation(uuid) to anon, authenticated;
