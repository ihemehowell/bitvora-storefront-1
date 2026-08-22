
import { notFound } from 'next/navigation'
import { PackageBox } from 'switch-icons'
import { createClient } from '../../../../lib/supabase/server';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string; productSlug: string }>
}) {
  const { slug, productSlug } = await params
  const supabase = await createClient()

  const { data: store } = await supabase
    .from('stores')
    .select('id, name')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (!store) notFound()

  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('store_id', store.id)
    .eq('slug', productSlug)
    .eq('is_active', true)
    .single()

  if (!product) notFound()

  const whatsappMessage = encodeURIComponent(
    `Hi ${store.name} 👋\nI'd like to order:\n\n*${product.name}* — ₦${Number(product.price).toLocaleString()}\n\nQuantity: 1`
  )

  return (
    <div className="grid sm:grid-cols-2 gap-10">
      <div>
        <div className="aspect-square rounded-xl overflow-hidden bg-sand-100">
          {product.images?.[0] ? (
            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <PackageBox className="w-10 h-10 text-ink/20" />
            </div>
          )}
        </div>
        {product.images?.length > 1 && (
          <div className="grid grid-cols-4 gap-2 mt-2">
            {product.images.slice(1).map((img: string) => (
              <div key={img} className="aspect-square rounded-lg overflow-hidden bg-sand-100">
                <img src={img} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h1 className="text-2xl font-display font-semibold mb-1">{product.name}</h1>
        <p className="text-xl font-mono text-ink/80 mb-4">
          ₦{Number(product.price).toLocaleString()}
        </p>
        {product.description && (
          <p className="text-ink/60 mb-6 whitespace-pre-line">{product.description}</p>
        )}

        {product.stock_quantity > 0 ? (
          <p className="text-sm text-palm-600 mb-4">In stock</p>
        ) : (
          <p className="text-sm text-pepper-600 mb-4">Out of stock</p>
        )}

        <a
          href={`https://wa.me/?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-full rounded-lg px-4 py-3 text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
        >
          Order via WhatsApp
        </a>
      </div>
    </div>
  )
}