
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
      <div className="mb-8">
        <h1 className="text-3xl font-display font-semibold">{store.name}</h1>
        <p className="text-ink/50 capitalize mt-1">{store.industry}</p>
      </div>

      {(!products || products.length === 0) && (
        <div className="text-center py-20">
          <PackageBox className="w-8 h-8 text-ink/20 mx-auto mb-3" />
          <p className="text-ink/50">No products available yet. Check back soon.</p>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
        {products?.map((product) => (
          <Link
            key={product.id}
            href={`/${slug}/products/${product.slug}`}
            className="group"
          >
            <div className="aspect-square rounded-xl overflow-hidden bg-sand-100 mb-2">
              {product.images?.[0] ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <PackageBox className="w-8 h-8 text-ink/20" />
                </div>
              )}
            </div>
            <p className="font-medium text-sm">{product.name}</p>
            <p className="text-sm text-ink/60 font-mono">
              ₦{Number(product.price).toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}