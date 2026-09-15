import { createAdminClient } from '../../../lib/supabase/admin'
import { OwnerStoresTable } from './OwnerStoresTable'

export default async function OwnerStoresPage() {
  const admin = createAdminClient()
  const { data: stores } = await admin
    .from('stores')
    .select('id, name, slug, industry, is_published, created_at')
    .order('created_at', { ascending: false })

  return <OwnerStoresTable stores={stores ?? []} />
}