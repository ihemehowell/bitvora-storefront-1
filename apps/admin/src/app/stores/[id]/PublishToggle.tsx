'use client'

import { useTransition } from 'react'
import { toggleStorePublish } from './action';


export function PublishToggle({ storeId, isPublished }: { storeId: string; isPublished: boolean }) {
  const [isPending, startTransition] = useTransition()

  function handleToggle() {
    startTransition(() => {
      toggleStorePublish(storeId, isPublished)
    })
  }

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className={`text-sm rounded-md px-3 py-1.5 font-medium transition-colors ${
        isPublished
          ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          : 'bg-brand-600 text-white hover:bg-brand-700'
      } disabled:opacity-50`}
    >
      {isPending ? 'Updating...' : isPublished ? 'Unpublish' : 'Publish store'}
    </button>
  )
}