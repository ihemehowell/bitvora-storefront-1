
import { notFound } from 'next/navigation'
import { createClient } from '../../../lib/supabase/server'

export default async function StoreDashboardPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: store, error } = await supabase
    .from('stores')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !store) {
    notFound()
  }

  return (
    <div className="max-w-2xl mx-auto mt-20">
      <h1 className="text-2xl font-display">{store.name}</h1>
      <p className="text-gray-500">
        /{store.slug} · {store.industry}
      </p>
      <p className="mt-4 text-sm text-gray-400">
        Products and homepage builder coming next.
      </p>
    </div>
  )
}