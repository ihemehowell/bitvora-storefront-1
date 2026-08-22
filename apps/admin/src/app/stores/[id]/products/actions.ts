'use server'


import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '../../../../lib/supabase/server'

function slugify(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export async function createProduct(storeId: string, prevState: { error?: string } | undefined, formData: FormData) {
  const supabase = await createClient()

  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const price = parseFloat(formData.get('price') as string)
  const stockQuantity = parseInt(formData.get('stock_quantity') as string) || 0
  const category = formData.get('category') as string
  const imagesRaw = formData.get('images') as string // JSON array string
  const images = imagesRaw ? JSON.parse(imagesRaw) : []

  if (!name || name.trim().length < 2) {
    return { error: 'Product name is required.' }
  }
  if (isNaN(price) || price <= 0) {
    return { error: 'Valid price is required.' }
  }

  const baseSlug = slugify(name)
  let slug = baseSlug
  let attempt = 0

  while (attempt < 5) {
    const { data: existing } = await supabase
      .from('products')
      .select('id')
      .eq('store_id', storeId)
      .eq('slug', slug)
      .maybeSingle()

    if (!existing) break
    attempt++
    slug = `${baseSlug}-${attempt}`
  }

  const { error } = await supabase.from('products').insert({
    store_id: storeId,
    name: name.trim(),
    slug,
    description,
    price,
    stock_quantity: stockQuantity,
    category,
    images,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath(`/stores/${storeId}/products`)
  redirect(`/stores/${storeId}/products`)
}

export async function updateProduct(productId: string, storeId: string, prevState: { error?: string } | undefined, formData: FormData) {
  const supabase = await createClient()

  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const price = parseFloat(formData.get('price') as string)
  const stockQuantity = parseInt(formData.get('stock_quantity') as string) || 0
  const category = formData.get('category') as string
  const isActive = formData.get('is_active') === 'on'
  const imagesRaw = formData.get('images') as string
  const images = imagesRaw ? JSON.parse(imagesRaw) : []

  const { error } = await supabase
    .from('products')
    .update({
      name: name.trim(),
      description,
      price,
      stock_quantity: stockQuantity,
      category,
      is_active: isActive,
      images,
    })
    .eq('id', productId)

  if (error) {
    return { error: error.message }
  }

  revalidatePath(`/stores/${storeId}/products`)
  redirect(`/stores/${storeId}/products`)
}

export async function deleteProduct(productId: string, storeId: string) {
  const supabase = await createClient()
  await supabase.from('products').delete().eq('id', productId)
  revalidatePath(`/stores/${storeId}/products`)
}