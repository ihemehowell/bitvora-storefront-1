
import { notFound } from 'next/navigation'
import Link from 'next/link'
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
      <p className="text-gray-500">/{store.slug} · {store.industry}</p>

      <div className="mt-6">
        <Link
          href={`/stores/${store.id}/products`}
          className="inline-block bg-brand-600 text-white rounded-md px-4 py-2 text-sm"
        >
          Manage products
        </Link>
      </div>
    </div>
  )
}