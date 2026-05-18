"use client";
import { useState } from "react";
import { DollarSign, Plus, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";
import { payments, properties, tenants } from "@/data/mockData";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Badge, Button, Card, CardContent, PageHeader, StatCard } from "@/components/ui";

function statusVariant(status: string) {
  if (status === 'paid') return 'success' as const;
  if (status === 'overdue') return 'danger' as const;
  if (status === 'pending') return 'warning' as const;
  if (status === 'partial') return 'info' as const;
  return 'muted' as const;
}

function typeLabel(type: string) {
  const map: Record<string, string> = {
    rent: 'Rent',
    deposit: 'Deposit',
    late_fee: 'Late Fee',
    maintenance: 'Maintenance',
  };
  return map[type] || type;
}

const ALL_STATUSES = ['all', 'paid', 'pending', 'overdue', 'partial'];

export default function PaymentsPage() {
  const [statusFilter, setStatusFilter] = useState('all');

  const totalCollected = payments.filter(p => p.status === 'paid').reduce((s, p) => s + p.amount, 0);
  const totalPending = payments.filter(p => p.status === 'pending').reduce((s, p) => s + p.amount, 0);
  const totalOverdue = payments.filter(p => p.status === 'overdue').reduce((s, p) => s + p.amount, 0);
  const overdueCount = payments.filter(p => p.status === 'overdue').length;

  const filtered = statusFilter === 'all' ? payments : payments.filter(p => p.status === statusFilter);

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="Payments"
        description="Track rent collection, fees, and financial activity"
        action={
          <Button size="sm">
            <Plus className="h-4 w-4" />
            Record Payment
          </Button>
        }
      />

      <div className="p-6 space-y-5">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            label="Collected This Month"
            value={formatCurrency(totalCollected)}
            icon={<CheckCircle className="h-5 w-5" />}
            color="green"
          />
          <StatCard
            label="Pending"
            value={formatCurrency(totalPending)}
            icon={<DollarSign className="h-5 w-5" />}
            color="amber"
          />
          <StatCard
            label="Overdue"
            value={formatCurrency(totalOverdue)}
            sub={`${overdueCount} payment${overdueCount > 1 ? 's' : ''}`}
            icon={<AlertCircle className="h-5 w-5" />}
            color="red"
          />
          <StatCard
            label="Total Volume"
            value={formatCurrency(payments.reduce((s, p) => s + p.amount, 0))}
            icon={<TrendingUp className="h-5 w-5" />}
          />
        </div>

        {/* Overdue Alert */}
        {overdueCount > 0 && (
          <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
            <AlertCircle className="h-5 w-5 shrink-0 text-red-500" />
            <p className="text-sm text-red-700">
              <strong>{overdueCount} payment{overdueCount > 1 ? 's' : ''}</strong> are overdue totaling {formatCurrency(totalOverdue)}.
              Consider sending reminders to affected tenants.
            </p>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 rounded-lg border border-border bg-card p-1 w-fit">
          {ALL_STATUSES.map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`rounded-md px-4 py-1.5 text-xs font-medium transition-colors capitalize ${
                statusFilter === s
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Payments Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-5 py-3.5 text-left text-xs font-medium text-muted-foreground">Tenant</th>
                    <th className="px-5 py-3.5 text-left text-xs font-medium text-muted-foreground">Property / Unit</th>
                    <th className="px-5 py-3.5 text-left text-xs font-medium text-muted-foreground">Type</th>
                    <th className="px-5 py-3.5 text-left text-xs font-medium text-muted-foreground">Amount</th>
                    <th className="px-5 py-3.5 text-left text-xs font-medium text-muted-foreground">Due Date</th>
                    <th className="px-5 py-3.5 text-left text-xs font-medium text-muted-foreground">Paid Date</th>
                    <th className="px-5 py-3.5 text-left text-xs font-medium text-muted-foreground">Status</th>
                    <th className="px-5 py-3.5 text-left text-xs font-medium text-muted-foreground"></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((payment) => {
                    const property = properties.find(p => p.id === payment.propertyId);
                    return (
                      <tr key={payment.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2.5">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                              {payment.tenantName.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="text-sm font-medium text-foreground">{payment.tenantName}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <p className="text-sm text-foreground">{property?.name}</p>
                          <p className="text-xs text-muted-foreground">Unit {payment.unit}</p>
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-sm text-foreground capitalize">{typeLabel(payment.type)}</span>
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-sm font-semibold text-foreground">{formatCurrency(payment.amount)}</span>
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-sm text-muted-foreground">{formatDate(payment.dueDate)}</span>
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-sm text-muted-foreground">
                            {payment.paidDate ? formatDate(payment.paidDate) : '—'}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <Badge variant={statusVariant(payment.status)} className="capitalize">
                            {payment.status}
                          </Badge>
                        </td>
                        <td className="px-5 py-4">
                          {payment.status !== 'paid' && (
                            <Button variant="ghost" size="sm" className="text-primary">
                              Mark Paid
                            </Button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
