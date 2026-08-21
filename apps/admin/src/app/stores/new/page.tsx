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

export default function NewStorePage() {
  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-2xl font-display mb-2">Create your store</h1>
      <p className="text-gray-500 mb-6 text-sm">
        You can change these details anytime.
      </p>

      <form action={createStore} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Store name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="e.g. Jochenna Thrift"
            required
            minLength={2}
            className="w-full border rounded-md p-2"
          />
        </div>

        <div>
          <label htmlFor="industry" className="block text-sm font-medium mb-1">
            Industry
          </label>
          <select
            id="industry"
            name="industry"
            required
            className="w-full border rounded-md p-2"
          >
            <option value="">Select an industry</option>
            {INDUSTRIES.map((ind) => (
              <option key={ind.value} value={ind.value}>
                {ind.label}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-brand-600 text-white rounded-md p-2"
        >
          Create store
        </button>
      </form>
    </div>
  )
}