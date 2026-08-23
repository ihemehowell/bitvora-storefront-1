
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '../../../lib/supabase/server'

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug')
  if (!slug) return NextResponse.json({ error: 'Missing slug' }, { status: 400 })

  const supabase = await createClient()
  const { data: store } = await supabase
    .from('stores')
    .select('id')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (!store) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  return NextResponse.json({ id: store.id })
}