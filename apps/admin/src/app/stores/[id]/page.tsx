import { createClient } from '../../../lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PublishToggle } from './PublishToggle'

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
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-2xl font-display">{store.name}</h1>
        <PublishToggle storeId={store.id} isPublished={store.is_published} />
      </div>
      <p className="text-gray-500 mb-6">/{store.slug} · {store.industry}</p>

      <div className={`text-sm rounded-md px-3 py-2 mb-6 ${store.is_published ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-500'}`}>
        {store.is_published
          ? 'Your store is live and visible to customers.'
          : 'Your store is a draft. Publish it once you have added products.'}
      </div>

      <Link
        href={`/stores/${store.id}/products`}
        className="inline-block bg-brand-600 text-white rounded-md px-4 py-2 text-sm"
      >
        Manage products
      </Link>
    </div>
  )
}