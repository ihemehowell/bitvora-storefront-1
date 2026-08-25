'use client'

import { useTransition } from 'react'
import { updateOrderStatus } from '../actions'

const STATUSES = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']

export function StatusSelector({
  orderId,
  storeId,
  currentStatus,
}: {
  orderId: string
  storeId: string
  currentStatus: string
}) {
  const [isPending, startTransition] = useTransition()

  function handleChange(status: string) {
    startTransition(() => {
      updateOrderStatus(orderId, storeId, status)
    })
  }

  return (
    <div className="flex flex-wrap gap-2">
      {STATUSES.map((status) => (
        <button
          key={status}
          onClick={() => handleChange(status)}
          disabled={isPending}
          className={`text-xs rounded-full px-3 py-1.5 font-medium capitalize border transition-colors disabled:opacity-50 ${
            currentStatus === status
              ? 'bg-indigo-600 text-white border-indigo-600'
              : 'border-sand-200 text-ink/60 hover:border-indigo-600'
          }`}
        >
          {status}
        </button>
      ))}
    </div>
  )
}