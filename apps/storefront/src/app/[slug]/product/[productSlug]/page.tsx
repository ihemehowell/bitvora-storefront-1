

import { createClient } from '../../../../lib/supabase/server';
import { notFound } from 'next/navigation'
import { PackageBox, MessageCircle, ArrowLeft } from 'switch-icons'
import Link from 'next/link'

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string; productSlug: string }>
}) {
  const { slug, productSlug } = await params
  const supabase = await createClient()

  const { data: store } = await supabase
    .from('stores')
    .select('id, name, palette')
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
    <div>
      <Link href={`/${slug}`} className="flex items-center gap-1.5 text-sm text-[#737373] hover:text-[#171717] mb-6">
        <ArrowLeft className="w-4 h-4" />
        Back to store
      </Link>

      <div className="grid sm:grid-cols-2 gap-10">
        <div>
          <div className="aspect-square rounded-xl overflow-hidden bg-[#fafafa]">
            {product.images?.[0] ? (
              <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <PackageBox className="w-10 h-10 text-[#d4d4d4]" />
              </div>
            )}
          </div>
          {product.images?.length > 1 && (
            <div className="grid grid-cols-4 gap-2 mt-2">
              {product.images.slice(1).map((img: string) => (
                <div key={img} className="aspect-square rounded-lg overflow-hidden bg-[#fafafa]">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h1 className="text-2xl font-semibold mb-1">{product.name}</h1>
          <p className="text-xl font-mono text-[#404040] mb-4">
            ₦{Number(product.price).toLocaleString()}
          </p>
          {product.description && (
            <p className="text-[#525252] mb-6 whitespace-pre-line leading-relaxed">{product.description}</p>
          )}

          <div className="mb-6">
            {product.stock_quantity > 0 ? (
              <span className="inline-flex items-center gap-1.5 text-sm text-green-700 bg-green-50 rounded-full px-3 py-1">
                In stock
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-sm text-red-700 bg-red-50 rounded-full px-3 py-1">
                Out of stock
              </span>
            )}
          </div>

          <a
            href={`https://wa.me/?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full rounded-lg px-4 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: store.palette?.primary || '#171717' }}
          >
            <MessageCircle className="w-4 h-4" />
            Order via WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}