'use client'

import { useActionState } from 'react'
import { createStore } from './actions'
import { Button } from '@bitvora/ui/src/Button'
import { Input } from '@bitvora/ui/src/Input'
import { Select } from '@bitvora/ui/src/Select'
import { Label } from '@bitvora/ui/src/Label'
import { AlertTriangle } from 'switch-icons'

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
      {state?.error && (
        <div className="flex items-start gap-2 bg-pepper-50 text-pepper-600 text-sm rounded-lg px-3 py-2">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
          {state.error}
        </div>
      )}
      <div>
        <Label htmlFor="name">Store name</Label>
        <Input id="name" name="name" type="text" placeholder="e.g. Jochenna Thrift" required minLength={2} />
      </div>
      <div>
        <Label htmlFor="industry">Industry</Label>
        <Select id="industry" name="industry" required defaultValue="">
          <option value="" disabled>Select an industry</option>
          {INDUSTRIES.map((ind) => (
            <option key={ind.value} value={ind.value}>{ind.label}</option>
          ))}
        </Select>
          <div className="pt-2 border-t border-sand-200">
          <p className="text-sm font-medium mb-3">Bank account for payments</p>
          <p className="text-xs text-ink/50 mb-3">
            Customers paying by bank transfer will send money here. This is required to create a store.
          </p>
        </div>
        <div>
          <Label htmlFor="bank_name">Bank name</Label>
          <Input id="bank_name" name="bank_name" type="text" placeholder="e.g. GTBank" required />
        </div>
        <div>
          <Label htmlFor="account_number">Account number</Label>
          <Input id="account_number" name="account_number" type="text" placeholder="0123456789" required />
        </div>
        <div>
          <Label htmlFor="account_name">Account name</Label>
          <Input id="account_name" name="account_name" type="text" placeholder="e.g. Ada Okonkwo" required />
        </div>
      </div>
      <Button type="submit" className="w-full">Create store</Button>
    </form>
  )
}