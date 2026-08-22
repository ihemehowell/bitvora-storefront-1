'use server'


import { revalidatePath } from 'next/cache'
import { createClient } from '../../../lib/supabase/server'

export async function toggleStorePublish(storeId: string, currentState: boolean) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('stores')
    .update({ is_published: !currentState })
    .eq('id', storeId)

  if (error) {
    return { error: error.message }
  }

  revalidatePath(`/stores/${storeId}`)
  revalidatePath('/')
}