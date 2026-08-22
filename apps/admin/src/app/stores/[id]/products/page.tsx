
import Link from 'next/link'
import { deleteProduct } from './actions'
import { createClient } from '../../../../lib/supabase/server'

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id: storeId } = await params
  const supabase = await createClient()

  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('store_id', storeId)
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-2xl mx-auto mt-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-display">Products</h1>
        <Link
          href={`/stores/${storeId}/products/new`}
          className="bg-brand-600 text-white rounded-md px-4 py-2 text-sm"
        >
          + Add product
        </Link>
      </div>

      {(!products || products.length === 0) && (
        <p className="text-gray-500">No products yet. Add your first one.</p>
      )}

      <div className="space-y-3">
        {products?.map((product) => (
          <div key={product.id} className="flex items-center justify-between border rounded-md p-3">
            <div className="flex items-center gap-3">
              {product.images?.[0] && (
                <img src={product.images[0]} alt="" className="w-12 h-12 object-cover rounded-md" />
              )}
              <div>
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-gray-500">
                  ₦{Number(product.price).toLocaleString()} · Stock: {product.stock_quantity}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/stores/${storeId}/products/${product.id}/edit`}
                className="text-sm text-brand-600"
              >
                Edit
              </Link>
              <form action={deleteProduct.bind(null, product.id, storeId)}>
                <button type="submit" className="text-sm text-red-600">
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}