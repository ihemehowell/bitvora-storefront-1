'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogoutButton } from './LogoutButton'


export function Sidebar({ userEmail }: { userEmail: string | null }) {
  const pathname = usePathname()
  const storeMatch = pathname.match(/^\/stores\/([^/]+)/)
  const storeId = storeMatch && storeMatch[1] !== 'new' ? storeMatch[1] : null

  const isActive = (href: string) => pathname === href

  return (
    <aside className="w-60 shrink-0 border-r border-gray-200 bg-white flex flex-col h-screen sticky top-0">
      <div className="p-5 border-b border-gray-200">
        <p className="font-display text-lg text-ink">Bitvora Storefront</p>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        <Link
          href="/"
          className={`block rounded-md px-3 py-2 text-sm ${isActive('/') ? 'bg-brand-50 text-brand-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
        >
          Dashboard
        </Link>
        <Link
          href="/stores/new"
          className={`block rounded-md px-3 py-2 text-sm ${isActive('/stores/new') ? 'bg-brand-50 text-brand-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
        >
          + New store
        </Link>

        {storeId && (
          <div className="pt-4 mt-4 border-t border-gray-200">
            <p className="px-3 text-xs uppercase tracking-wide text-gray-400 mb-1">This store</p>
            <Link
              href={`/stores/${storeId}`}
              className={`block rounded-md px-3 py-2 text-sm ${isActive(`/stores/${storeId}`) ? 'bg-brand-50 text-brand-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              Overview
            </Link>
            <Link
              href={`/stores/${storeId}/products`}
              className={`block rounded-md px-3 py-2 text-sm ${isActive(`/stores/${storeId}/products`) ? 'bg-brand-50 text-brand-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              Products
            </Link>
          </div>
        )}
      </nav>

      <div className="p-3 border-t border-gray-200">
        {userEmail && <p className="px-3 text-xs text-gray-400 mb-2 truncate">{userEmail}</p>}
        <LogoutButton />
      </div>
    </aside>
  )
}