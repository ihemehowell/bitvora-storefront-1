'use server'


import { redirect } from 'next/navigation'
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
  items: { productId: string; name: string; price: number; quantity: number }[]
}

export async function createOrder(input: CheckoutInput) {
  const supabase = await createClient()

  const subtotal = input.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const total = subtotal + input.deliveryFee

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      store_id: input.storeId,
      customer_name: input.customerName,
      customer_phone: input.customerPhone,
      customer_email: input.customerEmail || null,
      delivery_method: input.deliveryMethod,
      delivery_area: input.deliveryArea || null,
      delivery_fee: input.deliveryFee,
      subtotal,
      total,
      payment_method: input.paymentMethod,
      status: 'pending',
    })
    .select()
    .single()

  if (orderError || !order) {
    return { error: orderError?.message || 'Could not create order.' }
  }

  const orderItems = input.items.map((item) => ({
    order_id: order.id,
    product_id: item.productId,
    product_name: item.name,
    quantity: item.quantity,
    unit_price: item.price,
  }))

  const { error: itemsError } = await supabase.from('order_items').insert(orderItems)

  if (itemsError) {
    return { error: itemsError.message }
  }

  redirect(`/${input.storeSlug}/order/${order.id}`)
}