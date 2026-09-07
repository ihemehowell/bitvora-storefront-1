import { Card } from '@bitvora/ui/src/Card'

type DayRevenue = { label: string; total: number }

export function RevenueChart({ data }: { data: DayRevenue[] }) {
  const max = Math.max(...data.map((d) => d.total), 1)

  return (
    <Card>
      <p className="font-display text-sm font-semibold mb-4">Revenue, last 7 days</p>
      <div className="flex items-end justify-between gap-2 h-28">
        {data.map((d) => (
          <div key={d.label} className="flex-1 flex flex-col items-center gap-1.5">
            <div className="w-full flex items-end h-24">
              <div
                className="w-full rounded-t-md bg-indigo-600 transition-all"
                style={{ height: `${Math.max((d.total / max) * 100, d.total > 0 ? 6 : 2)}%` }}
                title={`₦${d.total.toLocaleString()}`}
              />
            </div>
            <span className="text-[10px] text-ink/40 font-medium">{d.label}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}