'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { Card } from '@bitvora/ui/src/Card'
import { Button } from '@bitvora/ui/src/Button'
import { Input } from '@bitvora/ui/src/Input'
import { Label } from '@bitvora/ui/src/Label'
import { Storefront, AlertTriangle } from 'switch-icons'
import Link from 'next/link'
import { createClient } from '../../lib/supabase/client'

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
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ backgroundColor: 'var(--color-indigo-900)' }}
    >
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }}
      />

      <Card className="w-full max-w-sm relative">
        <div className="flex items-center gap-2 mb-6">
          <Storefront className="w-5 h-5 text-marigold-500" />
          <p className="font-display font-semibold text-lg">Bitvora Storefront</p>
        </div>

        <h1 className="text-xl font-display font-medium mb-1">Log in</h1>
        <p className="text-sm text-ink/50 mb-6">Welcome back — manage your store.</p>

        {error && (
          <div className="flex items-start gap-2 bg-pepper-50 text-pepper-600 text-sm rounded-lg px-3 py-2 mb-4">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Logging in...' : 'Log in'}
          </Button>
        </form>

        <p className="text-sm text-ink/50 mt-5 text-center">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-indigo-600 font-medium">Sign up</Link>
        </p>
      </Card>
    </div>
  )
}