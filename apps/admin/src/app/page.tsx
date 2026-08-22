
import Link from 'next/link'
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
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display">
          {merchant?.full_name ? `Welcome back, ${merchant.full_name}` : 'Your stores'}
        </h1>
        <Link href="/stores/new" className="bg-brand-600 text-white rounded-md px-4 py-2 text-sm">
          + New store
        </Link>
      </div>

      {(!stores || stores.length === 0) ? (
        <div className="border border-dashed rounded-lg p-10 text-center text-gray-500">
          <p className="mb-3">You haven&apos;t created a store yet.</p>
          <Link href="/stores/new" className="text-brand-600 font-medium">
            Create your first store →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stores.map((store) => (
            <Link
              key={store.id}
              href={`/stores/${store.id}`}
              className="border rounded-lg p-4 hover:border-brand-500 transition-colors"
            >
              <p className="font-medium">{store.name}</p>
              <p className="text-sm text-gray-500">/{store.slug} · {store.industry}</p>
              <p className="text-xs mt-2 inline-block rounded-full px-2 py-0.5 bg-gray-100 text-gray-500">
                {store.is_published ? 'Published' : 'Draft'}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}