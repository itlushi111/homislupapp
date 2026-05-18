import { Users, Mail, Phone, Plus, Search } from "lucide-react";
import Link from "next/link";
import { tenants, properties } from "@/data/mockData";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Badge, Button, Card, CardContent, PageHeader } from "@/components/ui";

function statusVariant(status: string) {
  if (status === 'current') return 'success' as const;
  if (status === 'late') return 'danger' as const;
  if (status === 'vacating') return 'warning' as const;
  if (status === 'eviction') return 'danger' as const;
  return 'muted' as const;
}

function statusLabel(status: string) {
  const map: Record<string, string> = {
    current: 'Current',
    late: 'Late',
    vacating: 'Vacating',
    eviction: 'Eviction',
  };
  return map[status] || status;
}

export default function TenantsPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="Tenants"
        description={`${tenants.length} tenants across ${properties.length} properties`}
        action={
          <Button size="sm">
            <Plus className="h-4 w-4" />
            Add Tenant
          </Button>
        }
      />

      <div className="p-6 space-y-5">
        {/* Stats row */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'Total Tenants', value: tenants.length, color: 'text-foreground' },
            { label: 'Current', value: tenants.filter(t => t.status === 'current').length, color: 'text-emerald-600' },
            { label: 'Late/Overdue', value: tenants.filter(t => t.status === 'late').length, color: 'text-red-500' },
            { label: 'Vacating', value: tenants.filter(t => t.status === 'vacating').length, color: 'text-amber-500' },
          ].map((s) => (
            <Card key={s.label}>
              <div className="p-4 text-center">
                <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{s.label}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Tenant Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-5 py-3.5 text-left text-xs font-medium text-muted-foreground">Tenant</th>
                    <th className="px-5 py-3.5 text-left text-xs font-medium text-muted-foreground">Property / Unit</th>
                    <th className="px-5 py-3.5 text-left text-xs font-medium text-muted-foreground">Lease Period</th>
                    <th className="px-5 py-3.5 text-left text-xs font-medium text-muted-foreground">Monthly Rent</th>
                    <th className="px-5 py-3.5 text-left text-xs font-medium text-muted-foreground">Balance</th>
                    <th className="px-5 py-3.5 text-left text-xs font-medium text-muted-foreground">Status</th>
                    <th className="px-5 py-3.5 text-left text-xs font-medium text-muted-foreground"></th>
                  </tr>
                </thead>
                <tbody>
                  {tenants.map((tenant) => {
                    const property = properties.find(p => p.id === tenant.propertyId);
                    return (
                      <tr key={tenant.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                              {tenant.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-foreground">{tenant.name}</p>
                              <p className="text-xs text-muted-foreground">{tenant.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <p className="text-sm font-medium text-foreground">{property?.name}</p>
                          <p className="text-xs text-muted-foreground">Unit {tenant.unit}</p>
                        </td>
                        <td className="px-5 py-4">
                          <p className="text-xs text-foreground">{formatDate(tenant.leaseStart)}</p>
                          <p className="text-xs text-muted-foreground">to {formatDate(tenant.leaseEnd)}</p>
                        </td>
                        <td className="px-5 py-4">
                          <p className="text-sm font-semibold text-foreground">{formatCurrency(tenant.monthlyRent)}</p>
                        </td>
                        <td className="px-5 py-4">
                          <p className={`text-sm font-semibold ${tenant.balance < 0 ? 'text-red-500' : 'text-foreground'}`}>
                            {tenant.balance === 0 ? '—' : formatCurrency(Math.abs(tenant.balance))}
                            {tenant.balance < 0 && <span className="ml-1 text-xs font-normal text-red-400">owed</span>}
                          </p>
                        </td>
                        <td className="px-5 py-4">
                          <Badge variant={statusVariant(tenant.status)}>
                            {statusLabel(tenant.status)}
                          </Badge>
                        </td>
                        <td className="px-5 py-4">
                          <Link
                            href={`/tenants/${tenant.id}`}
                            className="text-xs font-medium text-primary hover:underline"
                          >
                            View
                          </Link>
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
