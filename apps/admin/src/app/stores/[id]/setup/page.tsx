
import { notFound } from 'next/navigation'
import { SetupWizard } from './SetupWizard'
import { createClient } from '../../../../lib/supabase/server'

export default async function StoreSetupPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: store } = await supabase.from('stores').select('*').eq('id', id).single()
  if (!store) notFound()

  return (
    <SetupWizard
      storeId={store.id}
      storeName={store.name}
      initialColor={store.palette?.primary || '#171717'}
    />
  )
}