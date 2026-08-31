import { Card } from '@bitvora/ui/src/Card'

type TopProduct = { name: string; unitsSold: number }

export function TopProducts({ products }: { products: TopProduct[] }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-display text-sm font-semibold">Top products</h2>
      </div>
      <Card>
        {products.length === 0 ? (
          <p className="text-sm text-ink/50">No sales yet.</p>
        ) : (
          products.map((p, i) => (
            <div
              key={p.name}
              className={`flex items-center justify-between py-2 text-sm ${
                i !== products.length - 1 ? 'border-b border-dashed border-sand-200' : ''
              }`}
            >
              <span className="font-medium truncate pr-3">{p.name}</span>
              <span className="font-mono text-xs text-ink/50 shrink-0">{p.unitsSold} sold</span>
            </div>
          ))
        )}
      </Card>
    </div>
  )
}
