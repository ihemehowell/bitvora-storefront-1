
import { createClient } from '../../../../../../lib/supabase/server';
import { EditProductForm } from './EditProductForm'
import { notFound } from 'next/navigation'

export default async function EditProductPage({ params }: { params: Promise<{ id: string; productId: string }> }) {
  const { id: storeId, productId } = await params
  const supabase = await createClient()

  const { data: product } = await supabase.from('products').select('*').eq('id', productId).single()

  if (!product) notFound()

  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-2xl font-display mb-6">Edit product</h1>
      <EditProductForm product={product} storeId={storeId} />
    </div>
  )
}