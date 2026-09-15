import { StoreForm } from './StoreForm'
import { Card } from '@bitvora/ui/src/Card'

export default function NewStorePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-display font-semibold mb-1">Create your store</h1>
      <Card>
        <StoreForm />
      </Card>
    </div>
  )
}