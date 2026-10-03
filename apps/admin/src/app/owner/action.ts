'use server'

import { revalidatePath } from 'next/cache'
import { createAdminClient } from '../../lib/supabase/admin'
import { createClient } from '../../lib/supabase/server'

async function requireOwner() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  const { data: m } = await supabase.from('merchants').select('is_owner').eq('user_id', user.id).single()
  if (!m?.is_owner) throw new Error('Forbidden')
}

export async function toggleMerchantSuspension(merchantId: string, suspend: boolean) {
  await requireOwner()
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