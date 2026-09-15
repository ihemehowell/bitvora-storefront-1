'use client'

import { useState, useTransition } from 'react'
import { Card } from '@bitvora/ui/src/Card'
import { IconSearch } from '@tabler/icons-react'
import { toggleMerchantSuspension } from '../action'
import Link from 'next/dist/client/link'

type Merchant = {
  id: string
  full_name: string | null
  business_name: string | null
  phone: string | null
  is_suspended: boolean
  created_at: string
}

export function MerchantsTable({ merchants }: { merchants: Merchant[] }) {
  const [search, setSearch] = useState('')
  const [isPending, startTransition] = useTransition()
  const [localMerchants, setLocalMerchants] = useState(merchants)

  const filtered = localMerchants.filter((m) =>
    (m.full_name ?? '').toLowerCase().includes(search.toLowerCase()) ||
    (m.business_name ?? '').toLowerCase().includes(search.toLowerCase())
  )

  function handleToggle(id: string, suspend: boolean) {
    setLocalMerchants((prev) => prev.map((m) => (m.id === id ? { ...m, is_suspended: suspend } : m)))
    startTransition(() => {
      toggleMerchantSuspension(id, suspend)
    })
  }

  return (
    <div>
      <div className="relative mb-4 max-w-xs">
        <IconSearch className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink/30" stroke={1.75} />
        <input
          type="text"
          placeholder="Search merchants…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-sand-200 bg-white focus:outline-none focus:border-indigo-600"
        />
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="hidden sm:grid grid-cols-[1fr_1fr_auto_auto] gap-4 px-4 py-2.5 bg-sand-100 text-xs font-semibold uppercase tracking-wide text-ink/50">
          <span>Name</span>
          <span>Business</span>
          <span>Phone</span>
          <span>Status</span>
        </div>
        {filtered.map((m, i) => (
          <Link
          href={`/owner/merchants/${m.id}`}
          key={m.id}
          className={`grid grid-cols-2 sm:grid-cols-[1fr_1fr_auto_auto] gap-3 items-center px-4 py-3 hover:bg-sand-100/60 transition-colors ${i !== filtered.length - 1 ? 'border-b border-sand-200' : ''}`}
        >
          <p className="text-sm font-medium truncate">{m.full_name || '—'}</p>
          <p className="text-sm text-ink/60 truncate">{m.business_name || '—'}</p>
          <p className="text-sm font-mono text-ink/60 hidden sm:block">{m.phone || '—'}</p>
          <button
            onClick={(e) => { e.preventDefault(); handleToggle(m.id, !m.is_suspended) }}
            disabled={isPending}
            className={`text-xs rounded-full px-3 py-1.5 font-medium ${m.is_suspended ? 'bg-pepper-50 text-pepper-600' : 'bg-palm-50 text-palm-600'}`}
          >
            {m.is_suspended ? 'Suspended' : 'Active'}
          </button>
        </Link>
        ))}
      </Card>
    </div>
  )
}