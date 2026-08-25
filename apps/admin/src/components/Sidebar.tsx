'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Plus, Grid, PackageBox, Storefront, Receipt } from 'switch-icons'
import { LogoutButton } from './LogoutButton'

export function Sidebar({ userEmail }: { userEmail: string | null }) {
  const pathname = usePathname()
  const storeMatch = pathname.match(/^\/stores\/([^/]+)/)
  const storeId = storeMatch && storeMatch[1] !== 'new' ? storeMatch[1] : null

  const isActive = (href: string) => pathname === href

  const linkClass = (active: boolean) =>
    `flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
      active
        ? 'bg-white/10 text-white font-medium'
        : 'text-indigo-100/70 hover:bg-white/5 hover:text-white'
    }`

  return (
    <aside
      className="w-64 shrink-0 flex flex-col h-screen sticky top-0 relative overflow-hidden"
      style={{ backgroundColor: 'var(--color-indigo-900)' }}
    >
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '14px 14px',
        }}
      />

      <div className="relative p-6 border-b border-white/10 flex items-center gap-2.5">
        <Storefront className="w-5 h-5 text-marigold-500" />
        <div>
          <p className="font-display font-semibold text-lg text-white tracking-tight leading-none">
            Bitvora
          </p>
          <p className="font-display text-sm text-indigo-200/70 leading-none mt-0.5">Storefront</p>
        </div>
      </div>

      <nav className="relative flex-1 p-3 space-y-1">
        <Link href="/" className={linkClass(isActive('/'))}>
          <Home className="w-4 h-4 shrink-0" />
          Dashboard
        </Link>
        <Link href="/stores/new" className={linkClass(isActive('/stores/new'))}>
          <Plus className="w-4 h-4 shrink-0" />
          New store
        </Link>

        {storeId && (
          <div className="pt-4 mt-4 border-t border-white/10">
            <p className="px-3 text-xs uppercase tracking-wider text-indigo-300/60 mb-1 font-medium">
              This store
            </p>
            <Link href={`/stores/${storeId}`} className={linkClass(isActive(`/stores/${storeId}`))}>
              <Grid className="w-4 h-4 shrink-0" />
              Overview
            </Link>
            <Link
              href={`/stores/${storeId}/products`}
              className={linkClass(isActive(`/stores/${storeId}/products`))}
            >
              <PackageBox className="w-4 h-4 shrink-0" />
              Products
            </Link>
            <Link
            href={`/stores/${storeId}/orders`}
            className={linkClass(isActive(`/stores/${storeId}/orders`))}
          >
            <Receipt className="w-4 h-4 shrink-0" />
            Orders
          </Link>
          </div>
        )}
      </nav>

      <div className="relative p-3 border-t border-white/10">
        {userEmail && (
          <p className="px-3 text-xs text-indigo-300/60 mb-2 truncate">{userEmail}</p>
        )}
        <LogoutButton />
      </div>
    </aside>
  )
}