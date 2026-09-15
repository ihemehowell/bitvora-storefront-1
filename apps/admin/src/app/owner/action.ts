'use server'

import { revalidatePath } from 'next/cache'
import { createAdminClient } from '../../lib/supabase/admin'

export async function toggleMerchantSuspension(merchantId: string, suspend: boolean) {
  const admin = createAdminClient()
  const { error } = await admin.from('merchants').update({ is_suspended: suspend }).eq('id', merchantId)
  if (error) return { error: error.message }
  revalidatePath('/owner/merchants')
}

export async function unpublishStore(storeId: string) {
  const admin = createAdminClient()
  const { error } = await admin.from('stores').update({ is_published: false }).eq('id', storeId)
  if (error) return { error: error.message }
  revalidatePath('/owner/stores')
}