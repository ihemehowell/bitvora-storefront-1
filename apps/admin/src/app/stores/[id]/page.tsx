
import { createClient } from '../../../lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PublishToggle } from './PublishToggle'
import { BrandColorPicker } from './BrandColorPicker'
import { StoreContentForm } from './StoreContentForm'
import { Card } from '@bitvora/ui/src/Card'
import { PackageBox } from 'switch-icons'
import { CtaBannerForm } from './CtaBannerForm'
import { BannerGridForm } from './BannerGridForm'

export default async function StoreDashboardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: store, error } = await supabase.from('stores').select('*').eq('id', id).single()
  if (error || !store) notFound()

  const { data: heroSection } = await supabase
    .from('sections')
    .select('config')
    .eq('store_id', id)
    .eq('type', 'hero')
    .maybeSingle()

    

  const heroConfig = heroSection?.config as {
    heading?: string
    subheading?: string
    image_url?: string
    cta_text?: string
  } | undefined


  const { data: ctaSection } = await supabase
  .from('sections')
  .select('config')
  .eq('store_id', id)
  .eq('type', 'cta_banner')
  .maybeSingle()

const ctaConfig = ctaSection?.config as {
  heading?: string
  image_url?: string
  cta_text?: string
} | undefined

const { data: bannerGridSection } = await supabase
  .from('sections')
  .select('config')
  .eq('store_id', id)
  .eq('type', 'banner_grid')
  .maybeSingle()

const bannerGridTiles = (bannerGridSection?.config as { tiles?: { heading: string; image_url: string; cta_text: string }[] })?.tiles || []

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

      <Card className="mb-4">
        <p className="text-sm font-medium mb-3">Homepage hero</p>
        <StoreContentForm
          storeId={store.id}
          initialHeading={heroConfig?.heading || ''}
          initialSubheading={heroConfig?.subheading || ''}
          initialImageUrl={heroConfig?.image_url || ''}
          initialCtaText={heroConfig?.cta_text || ''}
        />
      </Card>

      <Card className="mb-4">
      <p className="text-sm font-medium mb-3">Featured collections (3 tiles)</p>
      <BannerGridForm storeId={store.id} initialTiles={bannerGridTiles} />
    </Card>

      <Card className="mb-4">
      <p className="text-sm font-medium mb-3">Closing banner</p>
      <CtaBannerForm
        storeId={store.id}
        initialHeading={ctaConfig?.heading || ''}
        initialImageUrl={ctaConfig?.image_url || ''}
        initialCtaText={ctaConfig?.cta_text || ''}
      />
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