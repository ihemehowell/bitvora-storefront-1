'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@bitvora/ui/src/Button'
import { Input } from '@bitvora/ui/src/Input'
import { Label } from '@bitvora/ui/src/Label'
import { AlertTriangle } from 'switch-icons'
import Link from 'next/link'
import { createClient } from '../../lib/supabase/client'
import { AuthLayout } from '../../components/AuthLayout'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const supabase = createClient()

    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    router.push('/')
    router.refresh()
  }

  return (
    <AuthLayout>
      <h1 className="text-2xl font-display font-semibold mb-1">Log in</h1>
      <p className="text-sm text-ink/50 mb-8">Welcome back — manage your store.</p>

      {error && (
        <div className="flex items-start gap-2 bg-pepper-50 text-pepper-600 text-sm rounded-lg px-3 py-2 mb-4">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required  className="px-2 py-3"/>
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="px-2 py-3"/>
        </div>
        <Button type="submit" disabled={loading} className="w-full bg-ink">
          {loading ? 'Logging in...' : 'Log in'}
        </Button>
      </form>

      <p className="text-sm text-ink/50 mt-6 text-center">
        Don&apos;t have an account?{' '}
        <Link href="/signup" className="text-indigo-600 font-medium">Sign up</Link>
      </p>
    </AuthLayout>
  )
}