'use server'

import { createClient } from '../../../lib/supabase/server'

type CheckoutInput = {
  storeId: string
  storeSlug: string
  customerName: string
  customerPhone: string
  customerEmail?: string
  deliveryMethod: 'pickup' | 'delivery'
  deliveryArea?: string
  deliveryFee: number
  paymentMethod: 'bank_transfer' | 'pay_on_delivery'
  paymentProofUrl?: string
  items: { productId: string; name: string; price: number; quantity: number }[]
}

// Note: name/price in `items` are only used for optimistic UI on the client —
// the RPC below ignores them and recomputes everything from live product
// prices, so a tampered client payload can't change what gets charged.
export async function createOrder(input: CheckoutInput) {
  const supabase = await createClient()

  const { data, error } = await supabase.rpc('create_order', {
    p_store_id: input.storeId,
    p_customer_name: input.customerName,
    p_customer_phone: input.customerPhone,
    p_customer_email: input.customerEmail || null,
    p_delivery_method: input.deliveryMethod,
    p_delivery_area: input.deliveryArea || null,
    p_delivery_fee: input.deliveryFee,
    p_payment_method: input.paymentMethod,
    p_payment_proof_url: input.paymentProofUrl || null,
    p_items: input.items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
  })

  if (error || !data) {
    return { error: error?.message || 'Could not create order.' }
  }

  // No redirect() here — the caller (checkout page) clears the cart first,
  // then navigates. Redirecting inside the action would cut off the
  // client's code right after the await, before clear() ever runs.
  return { orderId: data.order_id as string }
}