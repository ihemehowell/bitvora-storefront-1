import { createAdminClient } from '../../../lib/supabase/admin'
import { MerchantsTable } from './MerchantsTable'

export default async function OwnerMerchantsPage() {
  const admin = createAdminClient()
  const { data: merchants } = await admin
    .from('merchants')
    .select('id, full_name, business_name, phone, is_suspended, created_at')
    .order('created_at', { ascending: false })

  return <MerchantsTable merchants={merchants ?? []} />
}