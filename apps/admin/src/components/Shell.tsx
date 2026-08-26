'use client'

import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Sidebar } from './Sidebar'
import { Storefront } from 'switch-icons'
import { IconMenu2 } from '@tabler/icons-react'

export function Shell({ children, userEmail }: { children: React.ReactNode; userEmail: string | null }) {
  const pathname = usePathname()
  const isAuthPage = pathname === '/login' || pathname === '/signup'
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (isAuthPage) {
    return <>{children}</>
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar userEmail={userEmail} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile-only top bar */}
        <div className="lg:hidden flex items-center gap-3 border-b border-sand-200 bg-white px-4 py-3 sticky top-0 z-20">
          <button onClick={() => setSidebarOpen(true)} className="p-1.5 -ml-1.5 text-ink/70">
            <IconMenu2 className="w-5 h-5" stroke={1.75} />
          </button>
          <div className="flex items-center gap-1.5">
            <Storefront className="w-4 h-4 text-marigold-500" />
            <p className="font-display font-semibold text-sm">Bitvora Storefront</p>
          </div>
        </div>

        <main className="flex-1 p-4 sm:p-8">{children}</main>
      </div>
    </div>
  )
}