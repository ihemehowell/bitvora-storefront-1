import Link from 'next/link'
import { Card } from '@bitvora/ui/src/Card'
import { StatusBadge } from './orders/StatusBadge'
import { Receipt } from 'switch-icons'

type Order = {
  id: string
  customer_name: string
  total: number
  status: string
}

export function RecentOrders({ storeId, orders }: { storeId: string; orders: Order[] }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-display text-sm font-semibold">Recent orders</h2>
        <Link href={`/stores/${storeId}/orders`} className="text-xs font-medium text-indigo-600">
          View all →
        </Link>
      </div>

      {orders.length === 0 ? (
        <Card className="text-center py-10">
          <Receipt className="w-7 h-7 text-ink/20 mx-auto mb-2" />
          <p className="text-sm text-ink/50">No orders yet.</p>
        </Card>
      ) : (
        <Card className="p-0 overflow-hidden">
          {orders.map((order, i) => (
            <Link
              key={order.id}
              href={`/stores/${storeId}/orders/${order.id}`}
              className={`flex items-center justify-between px-4 py-3 hover:bg-sand-100/60 transition-colors ${
                i !== orders.length - 1 ? 'border-b border-sand-200' : ''
              }`}
            >
              <p className="text-sm font-medium">{order.customer_name}</p>
              <div className="flex items-center gap-3">
                <p className="font-mono text-sm">₦{Number(order.total).toLocaleString()}</p>
                <StatusBadge status={order.status} />
              </div>
            </Link>
          ))}
        </Card>
      )}
    </div>
  )
}
