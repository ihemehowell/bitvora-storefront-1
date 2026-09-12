import { createClient } from '../../../lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { RevenueChart } from './RevenueChart'
import { OnboardingProgress } from './OnboardingProgress'
import { RecentOrders } from './RecentOrders'
import { TopProducts } from './TopProducts'
import { KpiCard } from '@bitvora/ui/src/KpiCard'
import { computeTrend } from './computeTrend'
import { Card } from '@bitvora/ui/src/Card'
import { Sparkline } from './Sparkline'

const STOREFRONT_URL = process.env.NEXT_PUBLIC_STOREFRONT_URL || 'http://localhost:3001'

export default async function StoreDashboardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: store, error } = await supabase.from('stores').select('*').eq('id', id).single()
  if (error || !store) notFound()

  const { count: productCount } = await supabase
    .from('products')
    .select('id', { count: 'exact', head: true })
    .eq('store_id', id)

  const { data: heroSection } = await supabase
    .from('sections')
    .select('id')
    .eq('store_id', id)
    .eq('type', 'hero')
    .maybeSingle()

  const { data: orders } = await supabase
    .from('orders')
    .select('id, customer_name, total, status, created_at')
    .eq('store_id', id)
    .order('created_at', { ascending: false })

  const { data: orderItems } = await supabase
    .from('order_items')
    .select('product_name, quantity, orders!inner(store_id)')
    .eq('orders.store_id', id)

  const allOrders = orders ?? []
  const activeOrders = allOrders.filter((o) => o.status !== 'cancelled')

  const now = new Date()
  const startOfToday = new Date(now)
  startOfToday.setHours(0, 0, 0, 0)
  const startOfYesterday = new Date(startOfToday.getTime() - 24 * 60 * 60 * 1000)
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  const fourteenDaysAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000)

  const ordersToday = allOrders.filter((o) => new Date(o.created_at) >= startOfToday).length
  const ordersYesterday = allOrders.filter((o) => {
    const t = new Date(o.created_at)
    return t >= startOfYesterday && t < startOfToday
  }).length

  const revenueThisWeek = activeOrders
    .filter((o) => new Date(o.created_at) >= sevenDaysAgo)
    .reduce((sum, o) => sum + Number(o.total), 0)
  const revenueLastWeek = activeOrders
    .filter((o) => {
      const t = new Date(o.created_at)
      return t >= fourteenDaysAgo && t < sevenDaysAgo
    })
    .reduce((sum, o) => sum + Number(o.total), 0)

  const pendingCount = allOrders.filter((o) => o.status === 'pending').length
  const avgOrderValue = activeOrders.length
    ? activeOrders.reduce((sum, o) => sum + Number(o.total), 0) / activeOrders.length
    : 0

  const ordersTrend = computeTrend(ordersToday, ordersYesterday, 'vs yesterday')
  const revenueTrend = computeTrend(revenueThisWeek, revenueLastWeek, 'vs last week')

  const productTotals = new Map<string, number>()
  for (const item of orderItems ?? []) {
    productTotals.set(item.product_name, (productTotals.get(item.product_name) ?? 0) + item.quantity)
  }
  const topProducts = [...productTotals.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([name, unitsSold]) => ({ name, unitsSold }))

    const dailyRevenue = Array.from({ length: 7 }).map((_, i) => {
  const dayStart = new Date(startOfToday.getTime() - (6 - i) * 24 * 60 * 60 * 1000)
  const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000)
  const total = activeOrders
    .filter((o) => {
      const t = new Date(o.created_at)
      return t >= dayStart && t < dayEnd
    })
    .reduce((sum, o) => sum + Number(o.total), 0)
  return { label: dayStart.toLocaleDateString('en-US', { weekday: 'short' }), total }
})

  const checklistItems = [
    { label: 'Set your brand color', done: !!store.palette?.primary, href: `/stores/${id}/customize` },
    { label: 'Add at least one product', done: (productCount ?? 0) > 0, href: `/stores/${id}/products/new` },
    { label: 'Set up your homepage hero', done: !!heroSection, href: `/stores/${id}/customize` },
    { label: 'Publish your store', done: store.is_published },
  ]

  return (
    <div className="max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-1">
        <h1 className="text-2xl font-display font-semibold">{store.name}</h1>
        <div className="flex flex-wrap items-center gap-2">
          <a
            href={`${STOREFRONT_URL}/${store.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm rounded-md px-3 py-1.5 font-medium bg-sand-100 text-ink/70 hover:bg-sand-200 transition-colors"
          >
            View store 
          </a>
          <Link
            href={`/stores/${store.id}/products/new`}
            className="text-sm rounded-md px-3 py-1.5 font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
          >
            Add product
          </Link>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <span className="text-xs font-mono text-ink/60 bg-sand-100 rounded-full px-2.5 py-1">/{store.slug}</span>
        <span className="text-xs font-medium text-ink/60 bg-sand-100 rounded-full px-2.5 py-1 capitalize">{store.industry}</span>
        {store.is_published && (
          <span className="flex items-center gap-1.5 text-xs font-medium text-palm-600">
            <span className="w-1.5 h-1.5 rounded-full bg-palm-600" /> Live
          </span>
        )}
      </div>

      <OnboardingProgress storeId={store.id} items={checklistItems} />
      

      <div className="mb-8">
  <Card className="p-5 mb-3">
    <p className="text-xs text-ink/50 font-medium mb-1">Revenue · this week</p>
    <p className="font-mono text-4xl font-semibold mb-3">₦{revenueThisWeek.toLocaleString()}</p>
    <Sparkline data={dailyRevenue.map((d) => d.total)} />
  </Card>
  <div className="grid grid-cols-3 divide-x divide-sand-200 border border-sand-200 rounded-[var(--radius-card)]">
    <div className="px-4 py-3">
      <p className="text-xs text-ink/50 mb-1">Orders today</p>
      <p className="font-mono text-lg font-semibold">{ordersToday}</p>
    </div>
    <div className="px-4 py-3">
      <p className="text-xs text-ink/50 mb-1">Pending</p>
      <p className="font-mono text-lg font-semibold">{pendingCount}</p>
    </div>
    <div className="px-4 py-3">
      <p className="text-xs text-ink/50 mb-1">Avg. order</p>
      <p className="font-mono text-lg font-semibold">₦{Math.round(avgOrderValue).toLocaleString()}</p>
    </div>
  </div>
</div>

      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6">
        <RecentOrders storeId={store.id} orders={allOrders.slice(0, 5)} />
        <TopProducts products={topProducts} />
      </div>
    </div>
  )
}