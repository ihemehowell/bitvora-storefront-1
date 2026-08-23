
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PublishToggle } from './PublishToggle'
import { BrandColorPicker } from './BrandColorPicker'
import { Card } from '@bitvora/ui/src/Card'
import { PackageBox } from 'switch-icons'
import { createClient } from '../../../lib/supabase/server'

export default async function StoreDashboardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: store, error } = await supabase.from('stores').select('*').eq('id', id).single()

  if (error || !store) notFound()

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-2xl font-display font-semibold">{store.name}</h1>
        <PublishToggle storeId={store.id} isPublished={store.is_published} />
      </div>
      <p className="text-ink/50 font-mono text-sm mb-6">/{store.slug} · {store.industry}</p>

      <Card className={`mb-4 ${store.is_published ? 'bg-palm-50 border-palm-600/20' : ''}`}>
        <p className={`text-sm ${store.is_published ? 'text-palm-600' : 'text-ink/60'}`}>
          {store.is_published
            ? 'Your store is live and visible to customers.'
            : 'Your store is a draft. Publish it once you have added products.'}
        </p>
      </Card>

      <Card className="mb-4">
        <BrandColorPicker storeId={store.id} initialColor={store.palette?.primary || '#171717'} />
      </Card>

      <Link href={`/stores/${store.id}/products`}>
        <Card className="hover:border-indigo-600 transition-colors flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
            <PackageBox className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <p className="font-medium">Manage products</p>
            <p className="text-sm text-ink/50">Add, edit, and organize what you sell</p>
          </div>
        </Card>
      </Link>
    </div>
  )
}