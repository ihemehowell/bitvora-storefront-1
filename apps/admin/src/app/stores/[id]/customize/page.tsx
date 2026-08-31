
import { createClient } from '../../../../lib/supabase/server'
import { notFound } from 'next/navigation'
import { BrandColorPicker } from '../BrandColorPicker'
import { StoreContentForm } from '../StoreContentForm'
import { BannerGridForm } from '../BannerGridForm'
import { CtaBannerForm } from '../CtaBannerForm'
import { Card } from '@bitvora/ui/src/Card'
import { PublishToggle } from '../PublishToggle'

export default async function CustomizePage({ params }: { params: Promise<{ id: string }> }) {
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

  const { data: bannerGridSection } = await supabase
    .from('sections')
    .select('config')
    .eq('store_id', id)
    .eq('type', 'banner_grid')
    .maybeSingle()

  const { data: ctaSection } = await supabase
    .from('sections')
    .select('config')
    .eq('store_id', id)
    .eq('type', 'cta_banner')
    .maybeSingle()

  const heroConfig = heroSection?.config as {
    heading?: string
    subheading?: string
    image_url?: string
    cta_text?: string
  } | undefined

  const bannerGridTiles = (bannerGridSection?.config as { tiles?: { heading: string; image_url: string; cta_text: string }[] })?.tiles || []

  const ctaConfig = ctaSection?.config as {
    heading?: string
    image_url?: string
    cta_text?: string
  } | undefined

  return (
    <div className="max-w-5xl">
      <div className='flex  justify-between items-center'>
      <div className="">
        <h1 className="text-2xl font-display font-semibold mb-1">Customize</h1>
      <p className="text-ink/50 text-sm mb-6">
        Brand color and homepage content for {store.name}.
      </p>
      </div>
      
      <PublishToggle storeId={store.id} isPublished={store.is_published} />
      </div>
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
    </div>
  )
}
