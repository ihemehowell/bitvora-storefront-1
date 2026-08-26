import { notFound } from 'next/navigation'
import { Check } from 'switch-icons'
import Link from 'next/link'
import { createClient } from '../../../../lib/supabase/server';
import { PaymentProofUpload } from './PaymentProofUpload'

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ slug: string; orderId: string }>
}) {
  const { slug, orderId } = await params
  const supabase = await createClient()
  const { data: order } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .eq('id', orderId)
    .single()
  if (!order) notFound()
  return (
    <div className="max-w-lg mx-auto text-center py-10">
      <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
        <Check className="w-7 h-7 text-green-600" />
      </div>
      <h1 className="text-2xl font-semibold mb-2">Order placed!</h1>
      <p className="text-[#737373] mb-8">
        Thanks {order.customer_name.split(' ')[0]}, we've received your order.
        {order.payment_method === 'bank_transfer' && ' Please complete payment via bank transfer to confirm.'}
      </p>
      <div className="border border-[#e5e5e5] rounded-xl p-5 text-left space-y-2">
        {order.order_items.map((item: { id: string; product_name: string; quantity: number; unit_price: number }) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span className="text-[#525252]">{item.product_name} × {item.quantity}</span>
            <span className="font-mono">₦{(item.unit_price * item.quantity).toLocaleString()}</span>
          </div>
        ))}
        <div className="border-t border-[#e5e5e5] pt-2 mt-2 flex justify-between text-sm">
          <span className="text-[#737373]">Delivery</span>
          <span className="font-mono">₦{Number(order.delivery_fee).toLocaleString()}</span>
        </div>
        <div className="flex justify-between font-medium pt-1">
          <span>Total</span>
          <span className="font-mono">₦{Number(order.total).toLocaleString()}</span>
        </div>
      </div>

      {order.payment_method === 'bank_transfer' && (
        <div className="mt-6 text-left">
          <p className="text-sm font-medium mb-2">Upload payment proof</p>
          <PaymentProofUpload
            orderId={order.id}
            slug={slug}
            existingProofUrl={order.payment_proof_url}
          />
        </div>
      )}

      <p className="text-xs text-[#a3a3a3] mt-6">
        Order reference: <span className="font-mono">{order.id.slice(0, 8)}</span>
      </p>
      <Link href={`/${slug}`} className="inline-block text-sm underline mt-6">
        Continue shopping
      </Link>
    </div>
  )
}