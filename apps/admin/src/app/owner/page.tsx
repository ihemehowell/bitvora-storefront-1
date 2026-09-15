
import { Card } from '@bitvora/ui/src/Card'
import { PackageBox, Storefront, Receipt, Users } from 'switch-icons'
import { createAdminClient } from '../../lib/supabase/admin';
import { Sparkline } from './SparkLine';


function bucketByDay(rows: { total: number; created_at: string }[], days: number) {
  const startOfToday = new Date()
  startOfToday.setHours(0, 0, 0, 0)
  return Array.from({ length: days }).map((_, i) => {
    const dayStart = new Date(startOfToday.getTime() - (days - 1 - i) * 24 * 60 * 60 * 1000)
    const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000)
    return rows.filter((r) => {
      const t = new Date(r.created_at)
      return t >= dayStart && t < dayEnd
    }).length
  })
}

export default async function OwnerOverviewPage() {
  const admin = createAdminClient()

  const { data: merchants } = await admin.from('merchants').select('id, created_at')
  const { data: stores } = await admin.from('stores').select('id, is_published, created_at, merchants!inner(is_owner)')
  const { data: allOrders } = await admin.from('orders').select('id, total, status, created_at')

  const merchantRows = merchants ?? []
  const storeRows = stores ?? []
  const orders = allOrders ?? []

  const activeOrders = orders.filter((o) => o.status !== 'cancelled')
  const totalGMV = activeOrders.reduce((sum, o) => sum + Number(o.total), 0)
  const pendingCount = orders.filter((o) => o.status === 'pending').length
  const publishedCount = storeRows.filter((s) => s.is_published).length

  const merchantsSpark = bucketByDay(merchantRows.map((m) => ({ total: 1, created_at: m.created_at })), 14)
  const storesSpark = bucketByDay(storeRows.map((s) => ({ total: 1, created_at: s.created_at })), 14)
  const ordersSpark = bucketByDay(orders.map((o) => ({ total: 1, created_at: o.created_at })), 14)
  const gmvSpark = (() => {
    const startOfToday = new Date()
    startOfToday.setHours(0, 0, 0, 0)
    return Array.from({ length: 14 }).map((_, i) => {
      const dayStart = new Date(startOfToday.getTime() - (13 - i) * 24 * 60 * 60 * 1000)
      const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000)
      return activeOrders
        .filter((o) => { const t = new Date(o.created_at); return t >= dayStart && t < dayEnd })
        .reduce((sum, o) => sum + Number(o.total), 0)
    })
  })()

  const { data: recentStores } = await admin
    .from('stores')
    .select('id, name, slug, industry, is_published, created_at, merchants!inner(is_owner)')
    .order('created_at', { ascending: false })
    .limit(6)

  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        <Card className="p-4.5">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-4 h-4 text-indigo-600" />
            <Sparkline data={merchantsSpark} />
          </div>
          <p className="text-xs text-ink/50 font-medium mb-1">Merchants</p>
          <p className="font-display text-2xl font-semibold">{merchantRows.length}</p>
        </Card>
        <Card className="p-4.5">
          <div className="flex items-center justify-between mb-2">
            <Storefront className="w-4 h-4 text-indigo-600" />
            <Sparkline data={storesSpark} />
          </div>
          <p className="text-xs text-ink/50 font-medium mb-1">Stores ({publishedCount} live)</p>
          <p className="font-display text-2xl font-semibold">{storeRows.length}</p>
        </Card>
        <Card className="p-4.5">
          <div className="flex items-center justify-between mb-2">
            <Receipt className="w-4 h-4 text-indigo-600" />
            <Sparkline data={ordersSpark} />
          </div>
          <p className="text-xs text-ink/50 font-medium mb-1">Orders ({pendingCount} pending)</p>
          <p className="font-display text-2xl font-semibold">{orders.length}</p>
        </Card>
        <Card className="p-4.5">
          <div className="flex items-center justify-between mb-2">
            <PackageBox className="w-4 h-4 text-indigo-600" />
            <Sparkline data={gmvSpark} color="var(--color-marigold-500)" />
          </div>
          <p className="text-xs text-ink/50 font-medium mb-1">Total GMV</p>
          <p className="font-display text-2xl font-semibold">₦{totalGMV.toLocaleString()}</p>
        </Card>
      </div>

      <div>
        <h2 className="font-display text-sm font-semibold mb-3">Recent stores</h2>
        <Card className="p-0 overflow-hidden">
          {(recentStores ?? []).map((store, i) => {
            const isInternal = (store.merchants as unknown as { is_owner: boolean }).is_owner
            return (
              <div key={store.id} className={`flex items-center justify-between px-4 py-3 ${i !== (recentStores?.length ?? 0) - 1 ? 'border-b border-sand-200' : ''}`}>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{store.name}</p>
                    {isInternal && <span className="text-[10px] font-medium rounded-full px-2 py-0.5 bg-indigo-50 text-indigo-600">Internal</span>}
                  </div>
                  <p className="text-xs text-ink/50 font-mono">/{store.slug}</p>
                </div>
                <span className={`text-[11px] font-medium rounded-full px-2 py-0.5 ${store.is_published ? 'bg-palm-50 text-palm-600' : 'bg-sand-100 text-ink/50'}`}>
                  {store.is_published ? 'Live' : 'Draft'}
                </span>
              </div>
            )
          })}
        </Card>
      </div>
    </div>
  )
}