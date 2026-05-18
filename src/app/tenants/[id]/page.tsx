import { ArrowLeft, Mail, Phone, Calendar, Home, DollarSign, Wrench, Edit } from "lucide-react";
import Link from "next/link";
import { tenants, properties, payments, maintenanceRequests } from "@/data/mockData";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Badge, Button, Card, CardContent, CardHeader, StatCard } from "@/components/ui";
import { notFound } from "next/navigation";

function statusVariant(status: string) {
  if (status === 'current') return 'success' as const;
  if (status === 'late') return 'danger' as const;
  if (status === 'vacating') return 'warning' as const;
  return 'muted' as const;
}

export default function TenantDetailPage({ params }: { params: { id: string } }) {
  const tenant = tenants.find(t => t.id === params.id);
  if (!tenant) notFound();

  const property = properties.find(p => p.id === tenant.propertyId);
  const tenantPayments = payments.filter(p => p.tenantId === tenant.id);
  const tenantMaintenance = maintenanceRequests.filter(m => m.tenantId === tenant.id);
  const leaseStart = new Date(tenant.leaseStart);
  const leaseEnd = new Date(tenant.leaseEnd);
  const today = new Date();
  const daysLeft = Math.ceil((leaseEnd.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const totalPaid = tenantPayments.filter(p => p.status === 'paid').reduce((s, p) => s + p.amount, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border bg-card px-6 py-4">
        <Link href="/tenants" className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted transition-colors">
          <ArrowLeft className="h-4 w-4 text-muted-foreground" />
        </Link>
        <div className="flex-1">
          <h1 className="font-display text-xl font-semibold text-foreground">{tenant.name}</h1>
          <p className="text-sm text-muted-foreground">Unit {tenant.unit} · {property?.name}</p>
        </div>
        <Badge variant={statusVariant(tenant.status)} className="capitalize">{tenant.status}</Badge>
        <Button variant="secondary" size="sm">
          <Edit className="h-3.5 w-3.5" />
          Edit
        </Button>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Tenant Info Card */}
          <Card className="lg:col-span-1">
            <CardContent className="p-5 space-y-4">
              <div className="flex flex-col items-center gap-3 pb-4 border-b border-border text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
                  {tenant.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h2 className="font-semibold text-foreground">{tenant.name}</h2>
                  <p className="text-sm text-muted-foreground">Tenant since {formatDate(tenant.leaseStart)}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2.5 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-foreground break-all">{tenant.email}</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-foreground">{tenant.phone}</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm">
                  <Home className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-foreground">Unit {tenant.unit}, {property?.name}</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-foreground">
                    {formatDate(tenant.leaseStart)} → {formatDate(tenant.leaseEnd)}
                  </span>
                </div>
              </div>

              <div className="rounded-lg bg-muted p-3">
                <p className="text-xs text-muted-foreground">Lease expires in</p>
                <p className={`text-lg font-bold ${daysLeft < 60 ? 'text-amber-600' : 'text-foreground'}`}>
                  {daysLeft > 0 ? `${daysLeft} days` : 'Expired'}
                </p>
              </div>

              {tenant.balance < 0 && (
                <div className="rounded-lg bg-red-50 p-3 border border-red-200">
                  <p className="text-xs text-red-600">Outstanding balance</p>
                  <p className="text-lg font-bold text-red-700">{formatCurrency(Math.abs(tenant.balance))}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Stats + History */}
          <div className="lg:col-span-2 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <StatCard
                label="Monthly Rent"
                value={formatCurrency(tenant.monthlyRent)}
                icon={<DollarSign className="h-5 w-5" />}
                color="green"
              />
              <StatCard
                label="Total Paid"
                value={formatCurrency(totalPaid)}
                sub="All-time"
                icon={<DollarSign className="h-5 w-5" />}
                color="amber"
              />
            </div>

            {/* Payment History */}
            <Card>
              <CardHeader>
                <h2 className="font-semibold text-foreground">Payment History</h2>
              </CardHeader>
              <CardContent className="space-y-0">
                {tenantPayments.length === 0 ? (
                  <p className="py-6 text-center text-sm text-muted-foreground">No payments recorded</p>
                ) : tenantPayments.map((payment, i) => (
                  <div key={payment.id} className={`flex items-center justify-between py-3 ${i < tenantPayments.length - 1 ? 'border-b border-border' : ''}`}>
                    <div>
                      <p className="text-sm font-medium text-foreground capitalize">{payment.type.replace('_', ' ')}</p>
                      <p className="text-xs text-muted-foreground">Due {formatDate(payment.dueDate)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-foreground">{formatCurrency(payment.amount)}</p>
                      <Badge variant={payment.status === 'paid' ? 'success' : payment.status === 'overdue' ? 'danger' : 'warning'} className="capitalize">
                        {payment.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Maintenance History */}
            <Card>
              <CardHeader>
                <h2 className="font-semibold text-foreground">Maintenance Requests ({tenantMaintenance.length})</h2>
              </CardHeader>
              <CardContent className="space-y-0">
                {tenantMaintenance.length === 0 ? (
                  <p className="py-6 text-center text-sm text-muted-foreground">No maintenance requests</p>
                ) : tenantMaintenance.map((req, i) => (
                  <div key={req.id} className={`flex items-start gap-3 py-3 ${i < tenantMaintenance.length - 1 ? 'border-b border-border' : ''}`}>
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                      <Wrench className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{req.title}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(req.createdAt)} · {req.category}</p>
                    </div>
                    <Badge variant={req.status === 'completed' ? 'success' : req.status === 'in_progress' ? 'info' : 'muted'}>
                      {req.status.replace('_', ' ')}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
