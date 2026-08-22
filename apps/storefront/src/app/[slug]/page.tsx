
import Link from 'next/link'
import { PackageBox } from 'switch-icons'
import { createClient } from '../../lib/supabase/server'

export default async function StorePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: store } = await supabase
    .from('stores')
    .select('id, name, industry')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (!store) return null

  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('store_id', store.id)
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">{store.name}</h1>
        <p className="text-[#737373] capitalize mt-1">{store.industry}</p>
      </div>

      {(!products || products.length === 0) && (
        <div className="text-center py-20">
          <PackageBox className="w-8 h-8 text-[#d4d4d4] mx-auto mb-3" />
          <p className="text-[#737373]">No products available yet. Check back soon.</p>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
        {products?.map((product) => (
          <Link key={product.id} href={`/${slug}/product/${product.slug}`} className="group">
            <div className="aspect-square rounded-xl overflow-hidden bg-[#fafafa] mb-2.5 relative">
              {product.images?.[0] ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <PackageBox className="w-8 h-8 text-[#d4d4d4]" />
                </div>
              )}
              {product.stock_quantity === 0 && (
                <span className="absolute top-2 left-2 bg-white/90 text-red-600 text-xs font-medium rounded-full px-2 py-1">
                  Out of stock
                </span>
              )}
            </div>
            <p className="font-medium text-sm leading-tight">{product.name}</p>
            <p className="text-sm text-[#525252] font-mono mt-0.5">
              ₦{Number(product.price).toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}