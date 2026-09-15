export function Sparkline({ data, color = 'var(--color-indigo-600)' }: { data: number[]; color?: string }) {
  const max = Math.max(...data, 1)
  const min = Math.min(...data, 0)
  const range = max - min || 1
  const points = data
    .map((v, i) => `${(i / (data.length - 1)) * 100},${100 - ((v - min) / range) * 100}`)
    .join(' ')
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-16 h-8">
      <polyline points={points} fill="none" stroke={color} strokeWidth="4" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}