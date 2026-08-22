'use client'

import { usePathname } from 'next/navigation'
import { Sidebar } from './Sidebar';


export function Shell({ children, userEmail }: { children: React.ReactNode; userEmail: string | null }) {
  const pathname = usePathname()
  const isAuthPage = pathname === '/login' || pathname === '/signup'

  if (isAuthPage) {
    return <>{children}</>
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar userEmail={userEmail} />
      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}