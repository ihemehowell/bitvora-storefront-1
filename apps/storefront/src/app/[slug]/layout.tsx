
import { notFound } from 'next/navigation'
import { Storefront } from 'switch-icons'
import { createClient } from '../../lib/supabase/server'
import { CartIcon } from '../../components/CartIcon'


export default async function StoreLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: store } = await supabase
    .from('stores')
    .select('id, name, slug, is_published, logo_url, palette')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (!store) notFound()

  const accent = store.palette?.primary || '#171717'

  return (
    <div className="min-h-screen bg-white text-[#171717]" style={{ '--accent': accent } as React.CSSProperties}>
      <header className="border-b border-[#e5e5e5] bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href={`/${slug}`} className="flex items-center gap-2 font-semibold text-lg">
            {store.logo_url ? (
              <img src={store.logo_url} alt="" className="w-7 h-7 rounded-md object-cover" />
            ) : (
              <Storefront className="w-5 h-5" style={{ color: accent }} />
            )}
            {store.name}
          </a>
          <CartIcon slug={slug} />
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-6 py-10">{children}</main>
      <footer className="max-w-5xl mx-auto px-6 py-8 text-center">
        <p className="text-xs text-[#a3a3a3]">Powered by Bitvora Storefront</p>
      </footer>
    </div>
  )
}