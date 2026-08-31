import Link from 'next/link'
import { Button } from '@bitvora/ui/src/Button'
import { Plus } from 'switch-icons'
import { createClient } from '../../../../lib/supabase/server'
import { ProductsTable } from './Productstable'

export default async function ProductsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: storeId } = await params
  const supabase = await createClient()

  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('store_id', storeId)
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-5xl">
      <div className="flex flex-wrap justify-between items-center gap-3 mb-1">
        <h1 className="text-2xl font-display font-semibold">Products</h1>
        <Link href={`/stores/${storeId}/products/new`}>
          <Button className="gap-1.5">
            <Plus className="w-4 h-4" />
            Add product
          </Button>
        </Link>
      </div>
      <p className="text-ink/50 text-sm mb-6">
        {products?.length ?? 0} product{products?.length === 1 ? '' : 's'}
      </p>

      <ProductsTable storeId={storeId} products={products ?? []} />
    </div>
  )
}