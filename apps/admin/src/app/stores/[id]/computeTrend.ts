export type Trend = 'up' | 'down' | 'flat'

export function computeTrend(current: number, previous: number, comparisonLabel: string): { label: string | undefined; trend: Trend } {
  if (previous === 0 && current === 0) {
    return { label: undefined, trend: 'flat' }
  }
  if (previous === 0) {
    return { label: `New ${comparisonLabel}`, trend: 'up' }
  }
  const pctChange = ((current - previous) / previous) * 100
  const rounded = Math.round(Math.abs(pctChange))
  if (rounded === 0) {
    return { label: `Flat ${comparisonLabel}`, trend: 'flat' }
  }
  return {
    label: `${rounded}% ${comparisonLabel}`,
    trend: pctChange > 0 ? 'up' : 'down',
  }
}
