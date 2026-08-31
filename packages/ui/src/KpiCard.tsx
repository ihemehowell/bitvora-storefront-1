import { HTMLAttributes } from 'react'
import { Card } from './Card'

type Trend = 'up' | 'down' | 'flat'

interface KpiCardProps extends HTMLAttributes<HTMLDivElement> {
  label: string
  value: string
  trendLabel?: string
  trend?: Trend
}

const TREND_STYLES: Record<Trend, string> = {
  up: 'text-palm-600',
  down: 'text-pepper-600',
  flat: 'text-ink/40',
}

const TREND_PREFIX: Record<Trend, string> = {
  up: '↑ ',
  down: '↓ ',
  flat: '',
}

export function KpiCard({ label, value, trendLabel, trend = 'flat', className = '', ...props }: KpiCardProps) {
  return (
    <Card className={`p-4.5 ${className}`} {...props}>
      <p className="text-xs text-ink/50 font-medium mb-2.5">{label}</p>
      <p className="font-display text-2xl font-semibold mb-1.5">{value}</p>
      {trendLabel && (
        <p className={`text-xs font-medium ${TREND_STYLES[trend]}`}>
          {TREND_PREFIX[trend]}{trendLabel}
        </p>
      )}
    </Card>
  )
}
