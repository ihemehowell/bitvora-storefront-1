import { notFound } from 'next/navigation'
import { Storefront } from 'switch-icons'
import { createClient } from '../../lib/supabase/server'
import { CartIcon } from '../../components/CartIcon'
import { BrandIcon } from '../../components/BrandIcon'

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
    .select('id, name, slug, is_published, logo_url, palette, social_links')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (!store) notFound()

  const accent = store.palette?.primary || '#171717'
  const social = store.social_links as { whatsapp?: string; instagram?: string; facebook?: string; tiktok?: string } || {}
  const hasSocial = social.whatsapp || social.instagram || social.facebook || social.tiktok

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
        {hasSocial && (
          <div className="flex items-center justify-center gap-4 mb-3">
            {social.whatsapp && (
              <a href={`https://wa.me/${social.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">
                <BrandIcon icon="Whatsapp" className="w-4 h-4" />
              </a>
            )}
            {social.instagram && (
              <a href={`https://instagram.com/${social.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer">
                <BrandIcon icon="Instagram" className="w-4 h-4" />
              </a>
            )}
            {social.facebook && (
              <a href={social.facebook.startsWith('http') ? social.facebook : `https://${social.facebook}`} target="_blank" rel="noopener noreferrer">
                <BrandIcon icon="Facebook" className="w-4 h-4" />
              </a>
            )}
            {social.tiktok && (
              <a href={`https://tiktok.com/@${social.tiktok.replace('@', '')}`} target="_blank" rel="noopener noreferrer">
                <BrandIcon icon="Tiktok" className="w-4 h-4" />
              </a>
            )}
          </div>
        )}
        <p className="text-xs text-[#a3a3a3]">Powered by Bitvora Storefront</p>
      </footer>
    </div>
  )
}