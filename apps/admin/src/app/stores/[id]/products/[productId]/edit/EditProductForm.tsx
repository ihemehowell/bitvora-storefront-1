'use client'

import { useActionState } from 'react'
import { updateProduct } from '../../actions'
import { ImageUploader } from '../../ImageUploader'

type Product = {
  id: string
  name: string
  description: string | null
  price: number
  stock_quantity: number
  category: string | null
  is_active: boolean
  images: string[] | null
}

export function EditProductForm({ product, storeId }: { product: Product; storeId: string }) {
  const boundAction = updateProduct.bind(null, product.id, storeId)
  const [state, formAction] = useActionState(boundAction, undefined)

  return (
    <form action={formAction} className="space-y-4">
      {state?.error && <p className="text-red-600 text-sm">{state.error}</p>}
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input name="name" type="text" required defaultValue={product.name} className="w-full border rounded-md p-2" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea name="description" rows={3} defaultValue={product.description ?? ''} className="w-full border rounded-md p-2" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Price (₦)</label>
        <input name="price" type="number" step="0.01" min="0" required defaultValue={product.price} className="w-full border rounded-md p-2" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Stock quantity</label>
        <input name="stock_quantity" type="number" min="0" defaultValue={product.stock_quantity} className="w-full border rounded-md p-2" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        <input name="category" type="text" defaultValue={product.category ?? ''} className="w-full border rounded-md p-2" />
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="is_active" defaultChecked={product.is_active} />
        Active (visible on storefront)
      </label>
      <ImageUploader initialImages={product.images ?? []} />
      <button type="submit" className="w-full bg-brand-600 text-white rounded-md p-2">Save changes</button>
    </form>
  )
}