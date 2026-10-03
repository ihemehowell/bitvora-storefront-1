
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '../../../lib/supabase/server'
import { rateLimit } from '../../../lib/rate-limit'

export async function GET(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  const rl = await rateLimit('store-id', ip, 60, '1 m')
  if (!rl.ok) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfter) } }
    )
  }
  const slug = req.nextUrl.searchParams.get('slug')
  if (!slug) return NextResponse.json({ error: 'Missing slug' }, { status: 400 })

  const supabase = await createClient()
   const { data: store } = await supabase
    .from('stores')
    .select('id, bank_name, account_number, account_name')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (!store) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  return NextResponse.json(store)
}