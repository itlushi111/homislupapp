import {
  MapPin,
  Building2,
  Users,
  DollarSign,
  Wrench,
  Calendar,
  ArrowLeft,
  Edit,
} from "lucide-react";
import Link from "next/link";
import { properties, tenants, maintenanceRequests, payments } from "@/data/mockData";
import { formatCurrency, formatDate, getOccupancyRate } from "@/lib/utils";
import { Badge, Button, Card, CardContent, CardHeader, PageHeader, ProgressBar, StatCard } from "@/components/ui";
import { notFound } from "next/navigation";

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const property = properties.find((p) => p.id === params.id);
  if (!property) notFound();

  const propertyTenants = tenants.filter((t) => t.propertyId === property.id);
  const propertyMaintenance = maintenanceRequests.filter((m) => m.propertyId === property.id);
  const propertyPayments = payments.filter((p) => p.propertyId === property.id);
  const grossRevenue = property.monthlyRent * property.occupiedUnits;
  const openRequests = propertyMaintenance.filter(m => m.status !== 'completed').length;

  function statusVariant(status: string) {
    if (status === 'current') return 'success' as const;
    if (status === 'late') return 'danger' as const;
    if (status === 'vacating') return 'warning' as const;
    return 'muted' as const;
  }

  function paymentVariant(status: string) {
    if (status === 'paid') return 'success' as const;
    if (status === 'overdue') return 'danger' as const;
    return 'warning' as const;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex items-center gap-3 border-b border-border bg-card px-6 py-4">
        <Link href="/properties" className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted transition-colors">
          <ArrowLeft className="h-4 w-4 text-muted-foreground" />
        </Link>
        <div className="flex-1">
          <h1 className="font-display text-xl font-semibold text-foreground">{property.name}</h1>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            <span>{property.address}, {property.city}</span>
          </div>
        </div>
        <Badge variant={property.status === 'active' ? 'success' : property.status === 'maintenance' ? 'warning' : 'muted'} className="capitalize">
          {property.status}
        </Badge>
        <Button variant="secondary" size="sm">
          <Edit className="h-3.5 w-3.5" />
          Edit
        </Button>
      </div>

      <div className="p-6 space-y-6">
        {/* Hero Image */}
        <div className="relative h-56 overflow-hidden rounded-xl bg-muted">
          <img src={property.image} alt={property.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-4 left-4 flex gap-2">
            <Badge variant="muted">Built {property.yearBuilt}</Badge>
            <Badge variant="muted" className="capitalize">{property.type}</Badge>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            label="Occupancy"
            value={`${getOccupancyRate(property.occupiedUnits, property.units)}%`}
            sub={`${property.occupiedUnits}/${property.units} units`}
            icon={<Users className="h-5 w-5" />}
            color="green"
          />
          <StatCard
            label="Monthly Revenue"
            value={formatCurrency(grossRevenue)}
            sub={`${formatCurrency(property.monthlyRent)}/unit`}
            icon={<DollarSign className="h-5 w-5" />}
            color="amber"
          />
          <StatCard
            label="Total Units"
            value={String(property.units)}
            sub={`${property.units - property.occupiedUnits} vacant`}
            icon={<Building2 className="h-5 w-5" />}
          />
          <StatCard
            label="Open Requests"
            value={String(openRequests)}
            sub="maintenance items"
            icon={<Wrench className="h-5 w-5" />}
            color={openRequests > 0 ? 'red' : 'green'}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Tenants */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-foreground">Tenants ({propertyTenants.length})</h2>
                <Link href="/tenants" className="text-xs text-primary hover:underline">View all</Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-0">
              {propertyTenants.length === 0 ? (
                <p className="py-8 text-center text-sm text-muted-foreground">No tenants yet</p>
              ) : propertyTenants.map((tenant, i) => (
                <Link key={tenant.id} href={`/tenants/${tenant.id}`}>
                  <div className={`flex items-center gap-3 py-3 hover:bg-muted/50 rounded-lg px-1 -mx-1 transition-colors ${i < propertyTenants.length - 1 ? 'border-b border-border' : ''}`}>
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                      {tenant.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground">{tenant.name}</p>
                      <p className="text-xs text-muted-foreground">Unit {tenant.unit} · Lease ends {formatDate(tenant.leaseEnd)}</p>
                    </div>
                    <Badge variant={statusVariant(tenant.status)} className="capitalize">{tenant.status}</Badge>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>

          {/* Maintenance */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-foreground">Maintenance ({propertyMaintenance.length})</h2>
                <Link href="/maintenance" className="text-xs text-primary hover:underline">View all</Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-0">
              {propertyMaintenance.length === 0 ? (
                <p className="py-8 text-center text-sm text-muted-foreground">No requests</p>
              ) : propertyMaintenance.map((req, i) => (
                <div key={req.id} className={`flex items-center gap-3 py-3 ${i < propertyMaintenance.length - 1 ? 'border-b border-border' : ''}`}>
                  <div className="h-2 w-2 shrink-0 rounded-full mt-0.5"
                    style={{
                      backgroundColor: req.priority === 'emergency' ? 'hsl(0 72% 51%)' : req.priority === 'high' ? 'hsl(38 92% 50%)' : req.priority === 'medium' ? 'hsl(217 91% 60%)' : 'hsl(220 10% 70%)'
                    }}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{req.title}</p>
                    <p className="text-xs text-muted-foreground">Unit {req.unit} · {formatDate(req.createdAt)}</p>
                  </div>
                  <Badge variant={req.status === 'completed' ? 'success' : req.status === 'in_progress' ? 'info' : 'muted'}>
                    {req.status.replace('_', ' ')}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Payments */}
        <Card>
          <CardHeader>
            <h2 className="font-semibold text-foreground">Payment History</h2>
          </CardHeader>
          <CardContent className="space-y-0">
            {propertyPayments.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">No payments yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="pb-2 text-left text-xs font-medium text-muted-foreground">Tenant</th>
                      <th className="pb-2 text-left text-xs font-medium text-muted-foreground">Unit</th>
                      <th className="pb-2 text-left text-xs font-medium text-muted-foreground">Amount</th>
                      <th className="pb-2 text-left text-xs font-medium text-muted-foreground">Due Date</th>
                      <th className="pb-2 text-left text-xs font-medium text-muted-foreground">Paid Date</th>
                      <th className="pb-2 text-left text-xs font-medium text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {propertyPayments.map((payment) => (
                      <tr key={payment.id} className="border-b border-border last:border-0">
                        <td className="py-3 font-medium">{payment.tenantName}</td>
                        <td className="py-3 text-muted-foreground">{payment.unit}</td>
                        <td className="py-3 font-semibold">{formatCurrency(payment.amount)}</td>
                        <td className="py-3 text-muted-foreground">{formatDate(payment.dueDate)}</td>
                        <td className="py-3 text-muted-foreground">{payment.paidDate ? formatDate(payment.paidDate) : '—'}</td>
                        <td className="py-3">
                          <Badge variant={paymentVariant(payment.status)} className="capitalize">{payment.status}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
