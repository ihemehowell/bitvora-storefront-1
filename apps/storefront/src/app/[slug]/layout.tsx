
import { notFound } from 'next/navigation'
import { createClient } from '../../lib/supabase/server'

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
    .select('id, name, slug, is_published, logo_url')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (!store) notFound()

  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="border-b border-sand-200 bg-white">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href={`/${slug}`} className="font-display font-semibold text-lg">
            {store.name}
          </a>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-6 py-10">{children}</main>
    </div>
  )
}