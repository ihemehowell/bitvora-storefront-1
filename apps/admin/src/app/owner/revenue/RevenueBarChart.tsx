'use client'

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

type DayRevenue = { label: number; total: number }

const chartConfig = {
  total: {
    label: 'Revenue',
    color: 'var(--color-indigo-600)',
  },
} satisfies ChartConfig

export function RevenueBarChart({ data }: { data: DayRevenue[] }) {
  return (
    <ChartContainer config={chartConfig} className="h-32 w-full aspect-auto">
      <BarChart data={data} margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} fontSize={10} interval={2} />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              hideLabel
              formatter={(value) => `₦${Number(value).toLocaleString()}`}
            />
          }
        />
        <Bar dataKey="total" fill="var(--color-total)" radius={3} />
      </BarChart>
    </ChartContainer>
  )
}