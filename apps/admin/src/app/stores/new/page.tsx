import { StoreForm } from './StoreForm'
import { Card } from '@bitvora/ui/src/Card'

export default function NewStorePage() {
  return (
    <div className="max-w-md">
      <h1 className="text-2xl font-display font-semibold mb-1">Create your store</h1>
      <p className="text-ink/50 mb-6 text-sm">You can change these details anytime.</p>
      <Card>
        <StoreForm />
      </Card>
    </div>
  )
}