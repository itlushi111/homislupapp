"use client";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardHeader, CardContent } from "@/components/ui";
import { formatCurrency } from "@/lib/utils";

type RevenueData = {
  month: string;
  revenue: number;
  expenses: number;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-border bg-card px-3 py-2 shadow-lg">
        <p className="mb-1.5 text-xs font-semibold text-foreground">{label}</p>
        {payload.map((entry: any) => (
          <p key={entry.name} className="text-xs" style={{ color: entry.color }}>
            {entry.name}: {formatCurrency(entry.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function RevenueChart({ data }: { data: RevenueData[] }) {
  const totalRevenue = data.reduce((s, d) => s + d.revenue, 0);
  const totalExpenses = data.reduce((s, d) => s + d.expenses, 0);
  const netIncome = totalRevenue - totalExpenses;

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <h2 className="font-semibold text-foreground">Revenue Overview</h2>
            <p className="text-xs text-muted-foreground">Last 7 months</p>
          </div>
          <div className="flex gap-4 text-right">
            <div>
              <p className="text-xs text-muted-foreground">Net Income</p>
              <p className="text-sm font-semibold text-emerald-600">{formatCurrency(netIncome)}</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={data} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="revenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(157 45% 28%)" stopOpacity={0.15} />
                <stop offset="95%" stopColor="hsl(157 45% 28%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(0 72% 51%)" stopOpacity={0.1} />
                <stop offset="95%" stopColor="hsl(0 72% 51%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(36 20% 90%)" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'hsl(220 10% 48%)' }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fontSize: 11, fill: 'hsl(220 10% 48%)' }} tickLine={false} axisLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="revenue" name="Revenue" stroke="hsl(157 45% 28%)" strokeWidth={2} fill="url(#revenue)" />
            <Area type="monotone" dataKey="expenses" name="Expenses" stroke="hsl(0 72% 51%)" strokeWidth={2} fill="url(#expenses)" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
