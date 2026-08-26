'use server'


import { revalidatePath } from 'next/cache'
import { createClient } from '../../../../lib/supabase/server'

export async function savePaymentProof(orderId: string, slug: string, proofUrl: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('orders')
    .update({ payment_proof_url: proofUrl })
    .eq('id', orderId)

  if (error) return { error: error.message }
  revalidatePath(`/${slug}/order/${orderId}`)
}