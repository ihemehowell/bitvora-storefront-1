
import { EditProductForm } from './EditProductForm'
import { Card } from '@bitvora/ui/src/Card'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'switch-icons'
import { createClient } from '../../../../../../lib/supabase/server'

export default async function EditProductPage({ params }: { params: Promise<{ id: string; productId: string }> }) {
  const { id: storeId, productId } = await params
  const supabase = await createClient()

  const { data: product } = await supabase.from('products').select('*').eq('id', productId).single()

  if (!product) notFound()

  return (
    <div className="max-w-md">
      <Link href={`/stores/${storeId}/products`} className="flex items-center gap-1.5 text-sm text-ink/50 hover:text-ink mb-4">
        <ArrowLeft className="w-4 h-4" />
        Back to products
      </Link>
      <h1 className="text-2xl font-display font-semibold mb-6">Edit product</h1>
      <Card>
        <EditProductForm product={product} storeId={storeId} />
      </Card>
    </div>
  )
}