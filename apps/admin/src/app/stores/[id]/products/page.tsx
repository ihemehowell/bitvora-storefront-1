
import Link from 'next/link'
import { deleteProduct } from './actions'
import { Button } from '@bitvora/ui/src/Button'
import { Card } from '@bitvora/ui/src/Card'
import { Edit, Trash, Plus, PackageBox } from 'switch-icons'
import { createClient } from '../../../../lib/supabase/server'

export default async function ProductsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: storeId } = await params
  const supabase = await createClient()

  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('store_id', storeId)
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-2xl">
      <div className="flex justify-between items-center mb-1">
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

      {(!products || products.length === 0) && (
        <Card className="text-center py-14">
          <PackageBox className="w-8 h-8 text-ink/20 mx-auto mb-3" />
          <p className="text-ink/50 mb-3">No products yet.</p>
          <Link href={`/stores/${storeId}/products/new`} className="text-indigo-600 font-medium text-sm">
            Add your first product →
          </Link>
        </Card>
      )}

      <div className="space-y-3">
        {products?.map((product) => (
          <Card key={product.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {product.images?.[0] ? (
                <img src={product.images[0]} alt="" className="w-12 h-12 object-cover rounded-lg" />
              ) : (
                <div className="w-12 h-12 rounded-lg bg-sand-100 flex items-center justify-center">
                  <PackageBox className="w-5 h-5 text-ink/20" />
                </div>
              )}
              <div>
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-ink/50 font-mono">
                  ₦{Number(product.price).toLocaleString()} · Stock: {product.stock_quantity}
                  {!product.is_active && <span className="ml-2 text-pepper-600 font-sans">Inactive</span>}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Link
                href={`/stores/${storeId}/products/${product.id}/edit`}
                className="p-2 text-ink/40 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
              >
                <Edit className="w-4 h-4" />
              </Link>
              <form action={deleteProduct.bind(null, product.id, storeId)}>
                <button type="submit" className="p-2 text-ink/40 hover:text-pepper-600 hover:bg-pepper-50 rounded-lg transition-colors">
                  <Trash className="w-4 h-4" />
                </button>
              </form>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}