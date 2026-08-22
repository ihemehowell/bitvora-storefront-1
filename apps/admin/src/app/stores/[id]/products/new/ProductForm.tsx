'use client'

import { useActionState } from 'react'
import { createProduct } from '../actions'
import { ImageUploader } from '../ImageUploader'



export function ProductForm({ storeId }: { storeId: string }) {
  const boundAction = createProduct.bind(null, storeId)
  const [state, formAction] = useActionState(boundAction, undefined)

  return (
    <form action={formAction} className="space-y-4">
      {state?.error && <p className="text-red-600 text-sm">{state.error}</p>}
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input name="name" type="text" required minLength={2} className="w-full border rounded-md p-2" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea name="description" rows={3} className="w-full border rounded-md p-2" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Price (₦)</label>
        <input name="price" type="number" step="0.01" min="0" required className="w-full border rounded-md p-2" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Stock quantity</label>
        <input name="stock_quantity" type="number" min="0" defaultValue={0} className="w-full border rounded-md p-2" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        <input name="category" type="text" placeholder="e.g. Dresses" className="w-full border rounded-md p-2" />
      </div>
      <ImageUploader />
      <button type="submit" className="w-full bg-brand-600 text-white rounded-md p-2">Add product</button>
    </form>
  )
}