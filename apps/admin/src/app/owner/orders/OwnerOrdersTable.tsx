'use client'

import { useMemo, useState } from 'react'
import { Card } from '@bitvora/ui/src/Card'

type Order = { id: string; customer_name: string; customer_phone: string; total: number; status: string; created_at: string }

const STATUSES = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']
const STATUS_STYLES: Record<string, string> = {
  pending: 'bg-sand-100 text-ink/60',
  confirmed: 'bg-indigo-50 text-indigo-600',
  shipped: 'bg-marigold-50 text-marigold-500',
  delivered: 'bg-palm-50 text-palm-600',
  cancelled: 'bg-pepper-50 text-pepper-600',
}

export function OwnerOrdersTable({ orders }: { orders: Order[] }) {
  const [statusFilter, setStatusFilter] = useState('all')

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: orders.length }
    for (const s of STATUSES) c[s] = orders.filter((o) => o.status === s).length
    return c
  }, [orders])

  const filtered = statusFilter === 'all' ? orders : orders.filter((o) => o.status === statusFilter)

  return (
    <div>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {['all', ...STATUSES].map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`text-xs rounded-full px-3 py-1.5 font-medium capitalize border transition-colors ${
              statusFilter === s ? 'bg-indigo-600 text-white border-indigo-600' : 'border-sand-200 text-ink/60 hover:border-indigo-600'
            }`}
          >
            {s === 'all' ? 'All' : s} <span className="opacity-60">{counts[s] ?? 0}</span>
          </button>
        ))}
      </div>

      <Card className="p-0 overflow-hidden">
        {filtered.map((order, i) => (
          <div
            key={order.id}
            className={`flex items-center justify-between px-4 py-3 ${i !== filtered.length - 1 ? 'border-b border-sand-200' : ''}`}
          >
            <div>
              <p className="text-sm font-medium">{order.customer_name}</p>
              <p className="text-xs text-ink/50 font-mono">{order.customer_phone}</p>
            </div>
            <div className="flex items-center gap-3">
              <p className="font-mono text-sm">₦{Number(order.total).toLocaleString()}</p>
              <span className={`text-[11px] font-medium rounded-full px-2 py-0.5 capitalize ${STATUS_STYLES[order.status]}`}>
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </Card>
    </div>
  )
}