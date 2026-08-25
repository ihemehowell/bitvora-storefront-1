'use server'


import { revalidatePath } from 'next/cache'
import { createClient } from '../../../../lib/supabase/server'

const VALID_STATUSES = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'] as const

export async function updateOrderStatus(orderId: string, storeId: string, status: string) {
  if (!VALID_STATUSES.includes(status as typeof VALID_STATUSES[number])) {
    return { error: 'Invalid status' }
  }

  const supabase = await createClient()
  const { error } = await supabase.from('orders').update({ status }).eq('id', orderId)

  if (error) {
    return { error: error.message }
  }

  revalidatePath(`/stores/${storeId}/orders`)
  revalidatePath(`/stores/${storeId}/orders/${orderId}`)
}