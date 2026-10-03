'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '../../../../lib/supabase/server'
import { getClientIp, rateLimit } from '../../../../lib/rate-limit'

export async function savePaymentProof(orderId: string, slug: string, proofUrl: string) {
  const rl = await rateLimit('proof', await getClientIp(), 10, '10 m')
  if (!rl.ok) return { error: 'Too many attempts. Try again in a few minutes.' }

    if (!proofUrl.startsWith('https://res.cloudinary.com/')) {
    return { error: 'Invalid upload.' }
  }

  const supabase = await createClient()

  const { error } = await supabase
    .from('orders')
    .update({ payment_proof_url: proofUrl })
    .eq('id', orderId)

  if (error) return { error: error.message }
  revalidatePath(`/${slug}/order/${orderId}`)
}