-- Restrict anon's UPDATE privilege to only the payment_proof_url column,
-- so a crafted request can't rewrite price/status/etc.
revoke update on public.orders from anon;
grant update (payment_proof_url) on public.orders to anon;

create policy "Customers can upload payment proof on pending orders"
  on orders for update
  using (
    status = 'pending'
    and store_id in (select id from stores where is_published = true)
  )
  with check (
    status = 'pending'
    and store_id in (select id from stores where is_published = true)
  );