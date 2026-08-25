
import Link from 'next/link'
import { Card } from '@bitvora/ui/src/Card'
import { Receipt } from 'switch-icons'
import { StatusBadge } from './StatusBadge'
import { createClient } from '../../../../lib/supabase/server'

export default async function OrdersPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: storeId } = await params
  const supabase = await createClient()

  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .eq('store_id', storeId)
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-display font-semibold mb-1">Orders</h1>
      <p className="text-ink/50 text-sm mb-6">
        {orders?.length ?? 0} order{orders?.length === 1 ? '' : 's'}
      </p>

      {(!orders || orders.length === 0) && (
        <Card className="text-center py-14">
          <Receipt className="w-8 h-8 text-ink/20 mx-auto mb-3" />
          <p className="text-ink/50">No orders yet.</p>
        </Card>
      )}

      <div className="space-y-3">
        {orders?.map((order) => (
          <Link key={order.id} href={`/stores/${storeId}/orders/${order.id}`}>
            <Card className="hover:border-indigo-600 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{order.customer_name}</p>
                  <p className="text-sm text-ink/50 font-mono">{order.customer_phone}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono font-medium">₦{Number(order.total).toLocaleString()}</p>
                  <StatusBadge status={order.status} />
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}