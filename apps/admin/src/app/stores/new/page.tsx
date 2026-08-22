import { StoreForm } from './StoreForm'

export default function NewStorePage() {
  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-2xl font-display mb-2">Create your store</h1>
      <p className="text-gray-500 mb-6 text-sm">You can change these details anytime.</p>
      <StoreForm />
    </div>
  )
}