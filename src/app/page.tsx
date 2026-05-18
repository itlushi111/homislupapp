import {
  Building2,
  Users,
  DollarSign,
  Wrench,
  TrendingUp,
  AlertCircle,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import {
  properties,
  tenants,
  maintenanceRequests,
  payments,
  revenueData,
} from "@/data/mockData";
import { formatCurrency, formatDate, getOccupancyRate } from "@/lib/utils";
import { Badge, Card, CardContent, CardHeader, PageHeader, StatCard, ProgressBar } from "@/components/ui";
import { RevenueChart } from "@/components/RevenueChart";

const totalUnits = properties.reduce((s, p) => s + p.units, 0);
const occupiedUnits = properties.reduce((s, p) => s + p.occupiedUnits, 0);
const monthlyRevenue = payments.filter(p => p.status === 'paid').reduce((s, p) => s + p.amount, 0);
const overduePayments = payments.filter(p => p.status === 'overdue');
const openMaintenance = maintenanceRequests.filter(m => m.status === 'open' || m.status === 'in_progress');
const emergencyRequests = maintenanceRequests.filter(m => m.priority === 'emergency' && m.status !== 'completed');

function priorityBadgeVariant(priority: string) {
  if (priority === 'emergency') return 'danger';
  if (priority === 'high') return 'warning';
  if (priority === 'medium') return 'info';
  return 'muted';
}

function statusBadge(status: string) {
  if (status === 'paid') return { label: 'Paid', variant: 'success' as const };
  if (status === 'overdue') return { label: 'Overdue', variant: 'danger' as const };
  if (status === 'pending') return { label: 'Pending', variant: 'warning' as const };
  return { label: status, variant: 'muted' as const };
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="Dashboard"
        description="Welcome to Homislup APP."
      />

      <div className="p-6 space-y-6">
        <div className="rounded-2xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-5 shadow-sm">
  <div className="flex items-center justify-between">
    
    <div>
      <p className="text-lg font-semibold text-green-800">
        Portfolio performance is growing successfully
      </p>

      <p className="mt-1 text-sm text-green-600">
        Occupancy rates and monthly revenue increased this month
      </p>
    </div>

    <div className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
      +12% Growth
    </div>

  </div>
</div>
        

        {/* KPI Stats */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            label="Total Properties"
            value={String(properties.length)}
            sub={`${totalUnits} total units`}
            icon={<Building2 className="h-5 w-5" />}
            color="default"
          />
          <StatCard
            label="Occupancy Rate"
            value={`${getOccupancyRate(occupiedUnits, totalUnits)}%`}
            sub={`${occupiedUnits} of ${totalUnits} units`}
            icon={<Users className="h-5 w-5" />}
            trend={{ value: '3% vs last month', up: true }}
            color="green"
          />
          <StatCard
            label="Monthly Revenue"
            value={formatCurrency(monthlyRevenue)}
            sub="Collected this month"
            icon={<DollarSign className="h-5 w-5" />}
            trend={{ value: formatCurrency(overduePayments.reduce((s, p) => s + p.amount, 0)) + ' outstanding', up: false }}
            color="amber"
          />
          <StatCard
            label="Open Requests"
            value={String(openMaintenance.length)}
            sub={`${emergencyRequests.length} emergency`}
            icon={<Wrench className="h-5 w-5" />}
            color={emergencyRequests.length > 0 ? 'red' : 'default'}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          {/* Revenue Chart */}
          <div className="lg:col-span-3">
            <RevenueChart data={revenueData} />
          </div>

          {/* Properties Overview */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-foreground">Properties</h2>
                  <Link href="/properties" className="text-xs text-primary hover:underline flex items-center gap-1">
                    View all <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {properties.slice(0, 4).map((property) => (
                  <Link key={property.id} href={`/properties/${property.id}`}>
                    <div className="group flex items-center gap-3 rounded-lg p-2 hover:bg-muted transition-colors cursor-pointer">
                      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-muted">
                        <img
                          src={property.image}
                          alt={property.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-foreground group-hover:text-primary">{property.name}</p>
                        <div className="mt-1">
                          <ProgressBar value={property.occupiedUnits} max={property.units} />
                        </div>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {property.occupiedUnits}/{property.units} units
                        </p>
                      </div>
                      <Badge variant={property.status === 'active' ? 'success' : property.status === 'maintenance' ? 'warning' : 'muted'}>
                        {property.status === 'active' ? 'Active' : property.status === 'maintenance' ? 'Maint.' : 'Vacant'}
                      </Badge>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Payments */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-foreground">Recent Payments</h2>
                <Link href="/payments" className="text-xs text-primary hover:underline flex items-center gap-1">
                  View all <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-0">
              {payments.slice(0, 5).map((payment, i) => {
                const { label, variant } = statusBadge(payment.status);
                return (
                  <div
                    key={payment.id}
                    className={`flex items-center gap-3 py-3 ${i < payments.slice(0, 5).length - 1 ? 'border-b border-border' : ''}`}
                  >
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${payment.status === 'paid' ? 'bg-emerald-100 text-emerald-700' : payment.status === 'overdue' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                      {payment.status === 'paid' ? <CheckCircle2 className="h-4 w-4" /> : <DollarSign className="h-4 w-4" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">{payment.tenantName}</p>
                      <p className="text-xs text-muted-foreground">{payment.unit} · Due {formatDate(payment.dueDate)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-foreground">{formatCurrency(payment.amount)}</p>
                      <Badge variant={variant} className="mt-0.5">{label}</Badge>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Maintenance Requests */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-foreground">Maintenance Requests</h2>
                <Link href="/maintenance" className="text-xs text-primary hover:underline flex items-center gap-1">
                  View all <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-0">
              {maintenanceRequests.slice(0, 5).map((req, i) => (
                <Link key={req.id} href="/maintenance">
                  <div className={`flex items-start gap-3 py-3 hover:bg-muted/50 rounded-lg px-1 -mx-1 transition-colors ${i < maintenanceRequests.slice(0, 5).length - 1 ? 'border-b border-border' : ''}`}>
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                      <Wrench className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">{req.title}</p>
                      <p className="text-xs text-muted-foreground">{req.tenantName} · Unit {req.unit}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge variant={priorityBadgeVariant(req.priority)}>
                        {req.priority}
                      </Badge>
                      <Badge variant={req.status === 'completed' ? 'success' : req.status === 'in_progress' ? 'info' : 'muted'}>
                        {req.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
