
import { createClient } from '../../lib/supabase/server'
import { PackageBox } from 'switch-icons'
import { ProductCard } from './ProductCard'

export default async function StorePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: store } = await supabase
    .from('stores')
    .select('id, name, industry, palette')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (!store) return null

  const { data: heroSection } = await supabase
    .from('sections')
    .select('config')
    .eq('store_id', store.id)
    .eq('type', 'hero')
    .eq('is_visible', true)
    .maybeSingle()

  const hero = heroSection?.config as {
    heading?: string
    subheading?: string
    image_url?: string
    cta_text?: string
  } | undefined

  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('store_id', store.id)
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  const accent = store.palette?.primary || '#171717'

  return (
    <div>
      {/* Full-bleed hero */}
      <div className="relative -mx-6 sm:-mx-6 mb-16 h-[420px] sm:h-[520px] overflow-hidden">
        {hero?.image_url ? (
          <img src={hero.image_url} alt="" className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ backgroundColor: accent }} />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
        <div className="relative h-full flex flex-col justify-center px-8 sm:px-16 max-w-xl">
          <h1
            className="text-4xl sm:text-6xl text-white leading-[1.05] mb-4"
            style={{ fontFamily: 'var(--font-storefront-display)', fontWeight: 600 }}
          >
            {hero?.heading || store.name}
          </h1>
          {(hero?.subheading || !hero?.heading) && (
            <p className="text-white/80 text-base sm:text-lg mb-6 max-w-md">
              {hero?.subheading || `Shop ${store.name}'s ${store.industry} collection.`}
            </p>
          )}
          <a
            href="#products"
            className="inline-block w-fit rounded-full px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: accent }}
          >
            {hero?.cta_text || 'Shop now'}
          </a>
        </div>
      </div>

      {/* Section header */}
      <div id="products" className="text-center mb-10 scroll-mt-20">
        <h2
          className="text-2xl sm:text-3xl mb-2"
          style={{ fontFamily: 'var(--font-storefront-display)', fontWeight: 600 }}
        >
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

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} storeSlug={slug} accent={accent} />
        ))}
      </div>
    </div>
  )
}