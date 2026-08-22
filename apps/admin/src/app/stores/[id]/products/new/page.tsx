import { ProductForm } from './ProductForm'
import { Card } from '@bitvora/ui/src/Card'
import Link from 'next/link'
import { ArrowLeft } from 'switch-icons'

export default async function NewProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: storeId } = await params
  return (
    <div className="max-w-md">
      <Link href={`/stores/${storeId}/products`} className="flex items-center gap-1.5 text-sm text-ink/50 hover:text-ink mb-4">
        <ArrowLeft className="w-4 h-4" />
        Back to products
      </Link>
      <h1 className="text-2xl font-display font-semibold mb-6">Add product</h1>
      <Card>
        <ProductForm storeId={storeId} />
      </Card>
    </div>
  )
}