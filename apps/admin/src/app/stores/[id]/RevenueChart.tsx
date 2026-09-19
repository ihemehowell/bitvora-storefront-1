'use client'

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import { Card } from '@bitvora/ui/src/Card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

type DayRevenue = { label: string; total: number }

const chartConfig = {
  total: {
    label: 'Revenue',
    color: 'var(--color-indigo-600)',
  },
} satisfies ChartConfig

export function RevenueChart({ data }: { data: DayRevenue[] }) {
  return (
    <Card>
      <p className="font-display text-sm font-semibold mb-4">Revenue, last 7 days</p>
      <ChartContainer config={chartConfig} className="h-28 w-full aspect-auto">
        <BarChart data={data} margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} fontSize={10} />
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                hideLabel
                formatter={(value) => `₦${Number(value).toLocaleString()}`}
              />
            }
          />
          <Bar dataKey="total" fill="var(--color-total)" radius={4} />
        </BarChart>
      </ChartContainer>
    </Card>
  )
}