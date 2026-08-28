'use server'


import { redirect } from 'next/navigation'
import { createClient } from '../../../lib/supabase/server'

function slugify(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export async function createStore(prevState: { error?: string } | undefined, formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }

  const { data: merchant, error: merchantError } = await supabase
    .from('merchants')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (merchantError || !merchant) {
    return { error: 'Could not find your merchant profile. Try logging in again.' }
  }

  const name = formData.get('name') as string
  const industry = formData.get('industry') as string

  if (!name || name.trim().length < 2) {
    return { error: 'Store name is required.' }
  }

  const baseSlug = slugify(name)
  let slug = baseSlug
  let attempt = 0

  // Handle slug collisions by appending a number
  while (attempt < 5) {
    const { data: existing } = await supabase
      .from('stores')
      .select('id')
      .eq('slug', slug)
      .maybeSingle()

    if (!existing) break
    attempt++
    slug = `${baseSlug}-${attempt}`
  }

  const { data: store, error: storeError } = await supabase
    .from('stores')
    .insert({
      merchant_id: merchant.id,
      name: name.trim(),
      slug,
      industry,
    })
    .select()
    .single()

  if (storeError) {
    return { error: storeError.message }
  }

redirect(`/stores/${store.id}/setup`)
}