'use client'

import { useActionState } from 'react'

import { Label } from '@bitvora/ui/src/Label'
import { Input } from '@bitvora/ui/src/Input'
import { Button } from '@bitvora/ui/src/Button'
import { AlertTriangle } from 'switch-icons'
import { updateProfile } from './action'

export function ProfileForm({
  email,
  initialFullName,
  initialPhone,
  initialBusinessName,
}: {
  email: string
  initialFullName: string
  initialPhone: string
  initialBusinessName: string
}) {
  const [state, formAction] = useActionState<
    Awaited<ReturnType<typeof updateProfile>> | undefined,
    FormData
  >(
    async (_state, formData) => updateProfile(formData),
    undefined,
  )

  return (
    <form action={formAction} className="space-y-4">
      {state?.error && (
        <div className="flex items-start gap-2 bg-pepper-50 text-pepper-600 text-sm rounded-lg px-3 py-2">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
          {state.error}
        </div>
      )}
      <div>
        <Label>Email</Label>
        <Input value={email} disabled className="bg-sand-100 text-ink/50" />
      </div>
      <div>
        <Label htmlFor="full_name">Full name</Label>
        <Input id="full_name" name="full_name" defaultValue={initialFullName} required />
      </div>
      <div>
        <Label htmlFor="phone">Phone number</Label>
        <Input id="phone" name="phone" defaultValue={initialPhone} placeholder="+234..." />
      </div>
      <div>
        <Label htmlFor="business_name">Business name</Label>
        <Input id="business_name" name="business_name" defaultValue={initialBusinessName} placeholder="e.g. Ada Crafts Ltd" />
      </div>
      <Button type="submit" className="w-full">Save changes</Button>
    </form>
  )
}