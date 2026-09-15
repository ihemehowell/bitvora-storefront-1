'use client'

import { useState, useTransition } from 'react'
import { Card } from '@bitvora/ui/src/Card'

import { IconSearch } from '@tabler/icons-react'
import { unpublishStore } from '../action'

type Store = { id: string; name: string; slug: string; industry: string | null; is_published: boolean; isInternal?: boolean }

export function OwnerStoresTable({ stores }: { stores: Store[] }) {
  const [search, setSearch] = useState('')
  const [isPending, startTransition] = useTransition()
  const [localStores, setLocalStores] = useState(stores)

  const filtered = localStores.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()))

  function handleUnpublish(id: string) {
    setLocalStores((prev) => prev.map((s) => (s.id === id ? { ...s, is_published: false } : s)))
    startTransition(() => {
      unpublishStore(id)
    })
  }

  return (
    <div>
      <div className="relative mb-4 max-w-xs">
        <IconSearch className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink/30" stroke={1.75} />
        <input
          type="text"
          placeholder="Search stores…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-sand-200 bg-white focus:outline-none focus:border-indigo-600"
        />
      </div>

      <Card className="p-0 overflow-hidden">
        {filtered.map((store, i) => (
          <div
            key={store.id}
            className={`flex items-center justify-between px-4 py-3 ${i !== filtered.length - 1 ? 'border-b border-sand-200' : ''}`}
          >
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium">{store.name}</p>
                {store.isInternal && (
                  <span className="text-[10px] font-medium rounded-full px-2 py-0.5 bg-indigo-50 text-indigo-600">
                    Internal
                  </span>
                )}
              </div>
              <p className="text-xs text-ink/50 font-mono">/{store.slug} · {store.industry}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-[11px] font-medium rounded-full px-2 py-0.5 ${store.is_published ? 'bg-palm-50 text-palm-600' : 'bg-sand-100 text-ink/50'}`}>
                {store.is_published ? 'Live' : 'Draft'}
              </span>
              {store.is_published && (
                <button
                  onClick={() => handleUnpublish(store.id)}
                  disabled={isPending}
                  className="text-xs text-pepper-600 hover:underline"
                >
                  Unpublish
                </button>
              )}
            </div>
          </div>
        ))}
      </Card>
    </div>
  )
}