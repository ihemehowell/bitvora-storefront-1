'use client'

import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { toggleMerchantSuspension } from '../../action'

export function SuspendButton({
  merchantId,
  isSuspended,
}: {
  merchantId: string
  isSuspended: boolean
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  function handleToggle() {
    setError(null)
    startTransition(async () => {
      const result = await toggleMerchantSuspension(merchantId, !isSuspended)

      if (result?.error) {
        setError(result.error)
        return
      }

      router.refresh()
    })
  }

  return (
    <div className="w-full mt-5">
      <button
        type="button"
        onClick={handleToggle}
        disabled={isPending}
        className={`w-full rounded-lg px-3 py-2 text-sm font-medium transition-colors disabled:opacity-50 ${
          isSuspended
            ? 'bg-palm-50 text-palm-600 hover:bg-palm-100'
            : 'bg-pepper-50 text-pepper-600 hover:bg-pepper-100'
        }`}
      >
        {isPending ? 'Updating...' : isSuspended ? 'Unsuspend merchant' : 'Suspend merchant'}
      </button>
      {error && <p className="mt-2 text-xs text-pepper-600">{error}</p>}
    </div>
  )
}
