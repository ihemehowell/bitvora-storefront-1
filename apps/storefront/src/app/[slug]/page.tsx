import { createClient } from '../../lib/supabase/server'
import { PackageBox } from 'switch-icons'
import { ProductCard } from './ProductCard'
import { DISPLAY_FONTS, SCALE_CLASSES } from '../../lib/font-pairings'

export default async function StorePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()

   const { data: store } = await supabase
    .from('stores')
    .select('id, name, industry, palette, typography, grid_density')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (!store) return null

  const currentStore = store
  
  const { data: allSections } = await supabase
  .from('sections')
  .select('type, config, position')
  .eq('store_id', store.id)
  .eq('is_visible', true)
  .order('position')

  const heroSection = allSections?.find((s) => s.type === 'hero')
  const bannerGridSection = allSections?.find((s) => s.type === 'banner_grid')
  const ctaSection = allSections?.find((s) => s.type === 'cta_banner')
  const aboutSection = allSections?.find((s) => s.type === 'about')

  const hero = heroSection?.config as {
    heading?: string
    subheading?: string
    image_url?: string
    cta_text?: string
  } | undefined

  const bannerGrid = (bannerGridSection?.config as { tiles?: { heading: string; image_url: string; cta_text: string }[] })?.tiles?.filter((t) => t.heading) || []

  const ctaBanner = ctaSection?.config as {
    heading?: string
    image_url?: string
    cta_text?: string
  } | undefined

  const about = aboutSection?.config as { heading?: string; body?: string } | undefined

  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('store_id', store.id)
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  const accent = store.palette?.primary || '#171717'
  const typography = store.typography || { pairing: 'editorial', scale: 'standard' }
  const displayFont = DISPLAY_FONTS[typography.pairing] || 'Fraunces'
  const scale = SCALE_CLASSES[typography.scale] || SCALE_CLASSES.standard
  const gridCols = store.grid_density === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-3'
  const beforeProducts = (allSections || []).filter((s) => s.position < 5 && (s.type === 'hero' || s.type === 'banner_grid'))
  const afterProducts = (allSections || []).filter((s) => s.position >= 5)

function renderSection(section: { type: string; config: unknown }) {
  if (section.type === 'hero') {
    const h = section.config as { heading?: string; subheading?: string; image_url?: string; cta_text?: string }
    return (
      <div key="hero" className="relative -mx-6 sm:-mx-6 mb-16 h-[420px] sm:h-[520px] overflow-hidden">
        {h.image_url ? (
          <img src={h.image_url} alt="" className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ backgroundColor: accent }} />
        )}
        <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/20 to-transparent" />
        <div className="relative h-full flex flex-col justify-center px-8 sm:px-16 max-w-xl">
          <h1 className={`${scale.hero} text-white leading-[1.05] mb-4`} style={{ fontFamily: displayFont, fontWeight: 600 }}>
            {h.heading || currentStore.name}
          </h1>
          {(h.subheading || !h.heading) && (
            <p className="text-white/80 text-base sm:text-lg mb-6 max-w-md">
              {h.subheading || `Shop ${currentStore.name}'s ${currentStore.industry} collection.`}
            </p>
          )}
          <a href="#products" className="inline-block w-fit rounded-full px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90" style={{ backgroundColor: accent }}>
            {h.cta_text || 'Shop now'}
          </a>
        </div>
      </div>
    )
  }

  if (section.type === 'banner_grid') {
    const tiles = ((section.config as { tiles?: { heading: string; image_url: string; cta_text: string }[] })?.tiles || []).filter((t) => t.heading)
    if (tiles.length === 0) return null
    return (
      <div key="banner_grid" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
        {tiles.map((tile, i) => (
          <div key={i} className="relative h-[280px] rounded-2xl overflow-hidden">
            {tile.image_url ? (
              <img src={tile.image_url} alt="" className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <div className="absolute inset-0" style={{ backgroundColor: accent }} />
            )}
            <div className="absolute inset-0 bg-black/35" />
            <div className="relative h-full flex flex-col justify-end p-5">
              <p className={`${scale.tile} text-white mb-3 leading-tight`} style={{ fontFamily: displayFont, fontWeight: 600 }}>
                {tile.heading}
              </p>
              <a href="#products" className="inline-block w-fit rounded-full bg-white text-[#171717] px-4 py-2 text-xs font-medium hover:opacity-90 transition-opacity">
                {tile.cta_text || 'Shop now'}
              </a>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (section.type === 'about') {
    const a = section.config as { heading?: string; body?: string }
    if (!a.heading) return null
    return (
      <div key="about" className="mb-16 max-w-2xl">
        <h2 className={`${scale.section} mb-3`} style={{ fontFamily: displayFont, fontWeight: 600 }}>{a.heading}</h2>
        <p className="text-[#525252] leading-relaxed whitespace-pre-line">{a.body}</p>
      </div>
    )
  }

  if (section.type === 'cta_banner') {
    const c = section.config as { heading?: string; image_url?: string; cta_text?: string }
    if (!c.heading) return null
    return (
      <div key="cta_banner" className="relative -mx-6 mt-16 h-[280px] sm:h-[340px] overflow-hidden">
        {c.image_url ? (
          <img src={c.image_url} alt="" className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ backgroundColor: accent }} />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-8">
          <h2 className={`${scale.cta} text-white capitalize leading-snug mb-6 max-w-4xl font-bold`} style={{ fontFamily: displayFont }}>
            {c.heading}
          </h2>
          <a href="#products" className="inline-block rounded-full px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90" style={{ backgroundColor: accent }}>
            {c.cta_text || 'Shop now'}
          </a>
        </div>
      </div>
    )
  }

  return null
}

return (
  <div>
    {beforeProducts.map(renderSection)}

    <div id="products" className="text-center mb-10 scroll-mt-20">
      <h2 className={`${scale.section} mb-2`} style={{ fontFamily: displayFont, fontWeight: 600 }}>
        Shop the collection
      </h2>
      <p className="text-[#737373] text-sm">Handpicked pieces, made with care.</p>
    </div>

    {(!products || products.length === 0) && (
      <div className="text-center py-20">
        <PackageBox className="w-8 h-8 text-[#d4d4d4] mx-auto mb-3" />
        <p className="text-[#737373]">No products available yet. Check back soon.</p>
      </div>
    )}

    <div className={`grid grid-cols-2 ${gridCols} gap-5`}>
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} storeSlug={slug} accent={accent} />
      ))}
    </div>

    {afterProducts.map(renderSection)}
  </div>
)
}