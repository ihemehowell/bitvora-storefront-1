import Link from 'next/link'
import { Card } from '@bitvora/ui/src/Card'
import { Button } from '@bitvora/ui/src/Button'
import { createClient } from '../lib/supabase/server'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: merchant } = await supabase
    .from('merchants')
    .select('id, full_name')
    .eq('user_id', user?.id)
    .single()

  const { data: stores } = await supabase
    .from('stores')
    .select('*')
    .eq('merchant_id', merchant?.id)
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-display font-semibold tracking-tight">
          {merchant?.full_name ? `Welcome back, ${merchant.full_name.split(' ')[0]}` : 'Your stores'}
        </h1>
        <Link href="/stores/new">
          <Button>+ New store</Button>
        </Link>
      </div>

      {(!stores || stores.length === 0) ? (
        <Card className="text-center py-14 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, var(--color-indigo-900) 1px, transparent 1px)',
              backgroundSize: '16px 16px',
            }}
          />
          <p className="relative text-ink/60 mb-3">You haven&apos;t created a store yet.</p>
          <Link href="/stores/new" className="relative text-indigo-600 font-medium">
            Create your first store →
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stores.map((store) => (
            <Link key={store.id} href={`/stores/${store.id}`}>
              <Card className="hover:border-indigo-600 transition-colors h-full">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-display font-medium text-lg">{store.name}</p>
                    <p className="text-sm text-ink/50 font-mono">/{store.slug}</p>
                  </div>
                  <span
                    className={`text-xs rounded-full px-2.5 py-1 font-medium ${
                      store.is_published
                        ? 'bg-palm-50 text-palm-600'
                        : 'bg-sand-100 text-ink/50'
                    }`}
                  >
                    {store.is_published ? 'Published' : 'Draft'}
                  </span>
                </div>
                <p className="text-sm text-ink/50 mt-2 capitalize">{store.industry}</p>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}