'use client'

import { use, useEffect, useState } from 'react'
import Link from 'next/link'
import { PackageBox, ArrowLeft } from 'switch-icons'
import { IconMinus, IconPlus, IconTrash } from '@tabler/icons-react'
import { useCartStore } from '../../../lib/cart-store'

export default function CartPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const items = useCartStore((s) => s.items)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const removeItem = useCartStore((s) => s.removeItem)
  const total = useCartStore((s) => s.total())
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div>
      <Link href={`/${slug}`} className="flex items-center gap-1.5 text-sm text-[#737373] hover:text-[#171717] mb-6">
        <ArrowLeft className="w-4 h-4" />
        Continue shopping
      </Link>

      <h1 className="text-2xl font-semibold mb-6">Your cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <PackageBox className="w-8 h-8 text-[#d4d4d4] mx-auto mb-3" />
          <p className="text-[#737373]">Your cart is empty.</p>
          <Link href={`/${slug}`} className="text-sm mt-2 inline-block underline">
            Browse products
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-3 gap-8">
          <div className="sm:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.productId} className="flex items-center gap-4 border-b border-[#e5e5e5] pb-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-[#fafafa] shrink-0">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <PackageBox className="w-6 h-6 text-[#d4d4d4]" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-sm text-[#737373] font-mono">₦{item.price.toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-2 border border-[#e5e5e5] rounded-lg px-2 py-1">
                  <button onClick={() => updateQuantity(item.productId, item.quantity - 1)}>
                    <IconMinus className="w-3.5 h-3.5" stroke={1.75} />
                  </button>
                  <span className="text-sm font-mono w-4 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.productId, item.quantity + 1)}>
                    <IconPlus className="w-3.5 h-3.5" stroke={1.75} />
                  </button>
                </div>
                <button onClick={() => removeItem(item.productId)} className="text-[#a3a3a3] hover:text-red-600">
                  <IconTrash className="w-4 h-4" stroke={1.75} />
                </button>
              </div>
            ))}
          </div>

          <div>
            <div className="border border-[#e5e5e5] rounded-xl p-5">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#737373]">Subtotal</span>
                <span className="font-mono">₦{total.toLocaleString()}</span>
              </div>
              <p className="text-xs text-[#a3a3a3] mb-4">Delivery calculated at checkout</p>
              <Link
                href={`/${slug}/checkout`}
                className="flex items-center justify-center w-full rounded-lg px-4 py-3 text-sm font-medium bg-[#171717] text-white hover:opacity-90 transition-opacity"
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}