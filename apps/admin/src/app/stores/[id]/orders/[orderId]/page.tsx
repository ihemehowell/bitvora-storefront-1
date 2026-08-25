
import { notFound } from 'next/navigation'
import { Card } from '@bitvora/ui/src/Card'
import Link from 'next/link'
import { ArrowLeft } from 'switch-icons'
import { StatusBadge } from '../StatusBadge'
import { createClient } from '../../../../../lib/supabase/server'
import { StatusSelector } from './StatusSelector'

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string; orderId: string }>
}) {
  const { id: storeId, orderId } = await params
  const supabase = await createClient()

  const { data: order } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .eq('id', orderId)
    .single()

  if (!order) notFound()

  return (
    <div className="max-w-2xl">
      <Link href={`/stores/${storeId}/orders`} className="flex items-center gap-1.5 text-sm text-ink/50 hover:text-ink mb-4">
        <ArrowLeft className="w-4 h-4" />
        Back to orders
      </Link>

      <div className="flex items-center justify-between mb-1">
        <h1 className="text-2xl font-display font-semibold">{order.customer_name}</h1>
        <StatusBadge status={order.status} />
      </div>
      <p className="text-ink/50 font-mono text-sm mb-6">
        {order.customer_phone}{order.customer_email ? ` · ${order.customer_email}` : ''}
      </p>

      <Card className="mb-4">
        <p className="text-sm font-medium mb-3">Update status</p>
        <StatusSelector orderId={order.id} storeId={storeId} currentStatus={order.status} />
      </Card>

      <Card className="mb-4">
        <p className="text-sm font-medium mb-3">Delivery</p>
        <p className="text-sm text-ink/70 capitalize">
          {order.delivery_method}
          {order.delivery_area && ` · ${order.delivery_area}`}
        </p>
        <p className="text-sm text-ink/50 mt-1 capitalize">
          Payment: {order.payment_method.replace('_', ' ')}
        </p>
        {order.payment_proof_url && (
          <a href={order.payment_proof_url} target="_blank" rel="noopener noreferrer" className="text-sm text-indigo-600 mt-2 inline-block">
            View payment proof →
          </a>
        )}
      </Card>

      <Card>
        <p className="text-sm font-medium mb-3">Items</p>
        <div className="space-y-2">
          {order.order_items.map((item: { id: string; product_name: string; quantity: number; unit_price: number }) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-ink/70">{item.product_name} × {item.quantity}</span>
              <span className="font-mono">₦{(item.unit_price * item.quantity).toLocaleString()}</span>
            </div>
          ))}
          <div className="border-t border-sand-200 pt-2 mt-2 flex justify-between text-sm">
            <span className="text-ink/50">Delivery</span>
            <span className="font-mono">₦{Number(order.delivery_fee).toLocaleString()}</span>
          </div>
          <div className="flex justify-between font-medium pt-1">
            <span>Total</span>
            <span className="font-mono">₦{Number(order.total).toLocaleString()}</span>
          </div>
        </div>
      </Card>
    </div>
  )
}