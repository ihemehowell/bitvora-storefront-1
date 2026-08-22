'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '../lib/supabase/client'


export function LogoutButton() {
  const router = useRouter()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      className="w-full text-left rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
    >
      Log out
    </button>
  )
}