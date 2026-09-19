'use client'

import { Line, LineChart } from 'recharts'
import { ChartConfig, ChartContainer } from '@/components/ui/chart'

const chartConfig = {
  value: {
    label: 'Value',
  },
} satisfies ChartConfig

export function Sparkline({ data, color = 'var(--color-indigo-600)' }: { data: number[]; color?: string }) {
  const chartData = data.map((value, index) => ({ index, value }))

  return (
    <ChartContainer config={chartConfig} className="w-16 h-8 aspect-auto">
      <LineChart data={chartData} margin={{ top: 2, right: 1, bottom: 2, left: 1 }}>
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ChartContainer>
  )
}