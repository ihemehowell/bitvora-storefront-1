'use client'

import { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createOrder } from './actions'
import { ArrowLeft, AlertTriangle } from 'switch-icons'
import Link from 'next/link'
import { DELIVERY_ZONES } from '../../../lib/delivery-zones'
import { useCartStore } from '../../../lib/cart-store'

export default function CheckoutPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const items = useCartStore((s) => s.items)
  const total = useCartStore((s) => s.total())
  const clear = useCartStore((s) => s.clear)
  const router = useRouter()

  const [mounted, setMounted] = useState(false)
  const [storeId, setStoreId] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'delivery'>('delivery')
  const [area, setArea] = useState(DELIVERY_ZONES[0].area)
  const [paymentMethod, setPaymentMethod] = useState<'bank_transfer' | 'pay_on_delivery'>('bank_transfer')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
    // Fetch store id by slug client-side (simple approach for now)
    fetch(`/api/store-id?slug=${slug}`)
      .then((r) => r.json())
      .then((d) => setStoreId(d.id))
  }, [slug])

  const deliveryFee = deliveryMethod === 'delivery'
    ? DELIVERY_ZONES.find((z) => z.area === area)?.fee ?? 0
    : 0

  const grandTotal = total + deliveryFee

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!storeId) return
    setLoading(true)
    setError(null)

    const result = await createOrder({
      storeId,
      storeSlug: slug,
      customerName: name,
      customerPhone: phone,
      customerEmail: email,
      deliveryMethod,
      deliveryArea: deliveryMethod === 'delivery' ? area : undefined,
      deliveryFee,
      paymentMethod,
      items: items.map((i) => ({ productId: i.productId, name: i.name, price: i.price, quantity: i.quantity })),
    })

    if (result?.error) {
      setError(result.error)
      setLoading(false)
      return
    }

    clear()
  }

  if (!mounted) return null

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-[#737373]">Your cart is empty.</p>
        <Link href={`/${slug}`} className="text-sm mt-2 inline-block underline">Browse products</Link>
      </div>
    )
  }

  return (
    <div>
      <Link href={`/${slug}/cart`} className="flex items-center gap-1.5 text-sm text-[#737373] hover:text-[#171717] mb-6">
        <ArrowLeft className="w-4 h-4" />
        Back to cart
      </Link>

      <h1 className="text-2xl font-semibold mb-6">Checkout</h1>

      <div className="grid sm:grid-cols-3 gap-8">
        <form onSubmit={handleSubmit} className="sm:col-span-2 space-y-5">
          {error && (
            <div className="flex items-start gap-2 bg-red-50 text-red-700 text-sm rounded-lg px-3 py-2">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1.5">Full name</label>
            <input required value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg border border-[#e5e5e5] px-3 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[#171717]" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Phone number</label>
            <input required value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full rounded-lg border border-[#e5e5e5] px-3 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[#171717]" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Email (optional)</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-lg border border-[#e5e5e5] px-3 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[#171717]" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Delivery method</label>
            <div className="grid grid-cols-2 gap-2">
              {(['delivery', 'pickup'] as const).map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setDeliveryMethod(method)}
                  className={`rounded-lg border px-3 py-2.5 text-sm capitalize ${
                    deliveryMethod === method ? 'border-[#171717] bg-[#fafafa]' : 'border-[#e5e5e5]'
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>

          {deliveryMethod === 'delivery' && (
            <div>
              <label className="block text-sm font-medium mb-1.5">Delivery area</label>
              <select value={area} onChange={(e) => setArea(e.target.value)} className="w-full rounded-lg border border-[#e5e5e5] px-3 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[#171717]">
                {DELIVERY_ZONES.map((z) => (
                  <option key={z.area} value={z.area}>{z.area} — ₦{z.fee.toLocaleString()}</option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">Payment method</label>
            <div className="grid grid-cols-2 gap-2">
              {([
                { value: 'bank_transfer', label: 'Bank Transfer' },
                { value: 'pay_on_delivery', label: 'Pay on Delivery' },
              ] as const).map((pm) => (
                <button
                  key={pm.value}
                  type="button"
                  onClick={() => setPaymentMethod(pm.value)}
                  className={`rounded-lg border px-3 py-2.5 text-sm ${
                    paymentMethod === pm.value ? 'border-[#171717] bg-[#fafafa]' : 'border-[#e5e5e5]'
                  }`}
                >
                  {pm.label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !storeId}
            className="w-full rounded-lg px-4 py-3.5 text-sm font-medium bg-[#171717] text-white hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? 'Placing order...' : 'Place order'}
          </button>
        </form>

        <div>
          <div className="border border-[#e5e5e5] rounded-xl p-5 space-y-2">
            {items.map((item) => (
              <div key={item.productId} className="flex justify-between text-sm">
                <span className="text-[#525252]">{item.name} × {item.quantity}</span>
                <span className="font-mono">₦{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
            <div className="border-t border-[#e5e5e5] pt-2 mt-2 flex justify-between text-sm">
              <span className="text-[#737373]">Delivery</span>
              <span className="font-mono">₦{deliveryFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-medium pt-1">
              <span>Total</span>
              <span className="font-mono">₦{grandTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}