'use client'

import { useActionState } from 'react'
import { createStore } from './actions'

const INDUSTRIES = [
  { value: 'fashion', label: 'Fashion & Clothing' },
  { value: 'thrift', label: 'Thrift / Second-hand' },
  { value: 'food', label: 'Food & Beverage' },
  { value: 'electronics', label: 'Electronics & Gadgets' },
  { value: 'beauty', label: 'Beauty & Cosmetics' },
  { value: 'services', label: 'Services' },
  { value: 'general', label: 'General / Other' },
]

export function StoreForm() {
  const [state, formAction] = useActionState(createStore, undefined)

  return (
    <form action={formAction} className="space-y-4">
      {state?.error && <p className="text-red-600 text-sm">{state.error}</p>}
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">Store name</label>
        <input id="name" name="name" type="text" placeholder="e.g. Jochenna Thrift" required minLength={2} className="w-full border rounded-md p-2" />
      </div>
      <div>
        <label htmlFor="industry" className="block text-sm font-medium mb-1">Industry</label>
        <select id="industry" name="industry" required className="w-full border rounded-md p-2">
          <option value="">Select an industry</option>
          {INDUSTRIES.map((ind) => (
            <option key={ind.value} value={ind.value}>{ind.label}</option>
          ))}
        </select>
      </div>
      <button type="submit" className="w-full bg-brand-600 text-white rounded-md p-2">Create store</button>
    </form>
  )
}