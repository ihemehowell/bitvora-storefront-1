import { Card } from '@bitvora/ui/src/Card'
import { createAdminClient } from '../../../lib/supabase/admin'

export default async function OwnerRevenuePage() {
  const admin = createAdminClient()
  const { data: orders } = await admin.from('orders').select('total, status, created_at')

  const activeOrders = (orders ?? []).filter((o) => o.status !== 'cancelled')

  const startOfToday = new Date()
  startOfToday.setHours(0, 0, 0, 0)

  const dailyRevenue = Array.from({ length: 30 }).map((_, i) => {
    const dayStart = new Date(startOfToday.getTime() - (29 - i) * 24 * 60 * 60 * 1000)
    const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000)
    const total = activeOrders
      .filter((o) => {
        const t = new Date(o.created_at)
        return t >= dayStart && t < dayEnd
      })
      .reduce((sum, o) => sum + Number(o.total), 0)
    return { label: dayStart.getDate(), total }
  })

  const max = Math.max(...dailyRevenue.map((d) => d.total), 1)
  const totalRevenue30d = dailyRevenue.reduce((sum, d) => sum + d.total, 0)

  return (
    <Card>
      <p className="text-xs text-ink/50 font-medium mb-1">Platform revenue · last 30 days</p>
      <p className="font-mono text-3xl font-semibold mb-5">₦{totalRevenue30d.toLocaleString()}</p>
      <div className="flex items-end justify-between gap-1 h-32">
        {dailyRevenue.map((d, i) => (
          <div key={i} className="flex-1 flex items-end h-28" title={`Day ${d.label}: ₦${d.total.toLocaleString()}`}>
            <div
              className="w-full rounded-t-sm bg-indigo-600"
              style={{ height: `${Math.max((d.total / max) * 100, d.total > 0 ? 4 : 1)}%` }}
            />
          </div>
        ))}
      </div>
    </Card>
  )
}