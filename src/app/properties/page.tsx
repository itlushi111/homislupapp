import { Building2, MapPin, Home, TrendingUp, Plus } from "lucide-react";
import Link from "next/link";
import { properties } from "@/data/mockData";
import { formatCurrency, getOccupancyRate } from "@/lib/utils";
import { Badge, Button, Card, PageHeader, ProgressBar } from "@/components/ui";

function PropertyTypeIcon({ type }: { type: string }) {
  return <Building2 className="h-4 w-4" />;
}

function statusVariant(status: string) {
  if (status === 'active') return 'success' as const;
  if (status === 'maintenance') return 'warning' as const;
  return 'muted' as const;
}

function typeLabel(type: string) {
  const map: Record<string, string> = {
    apartment: 'Apartment',
    house: 'House',
    commercial: 'Commercial',
    condo: 'Condo',
  };
  return map[type] || type;
}

export default function PropertiesPage() {
  const totalRevenue = properties.reduce((s, p) => s + p.monthlyRent * p.occupiedUnits, 0);

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="Properties"
        description={`${properties.length} properties · ${formatCurrency(totalRevenue)}/mo potential revenue`}
        action={
          <Button size="sm">
            <Plus className="h-4 w-4" />
            Add Property
          </Button>
        }
      />

      <div className="p-6">
        {/* Summary strip */}
        <div className="mb-6 grid grid-cols-3 gap-4">
          {[
            { label: 'Total Properties', value: properties.length },
            { label: 'Active', value: properties.filter(p => p.status === 'active').length },
            { label: 'Under Maintenance', value: properties.filter(p => p.status === 'maintenance').length },
          ].map((s) => (
            <Card key={s.label}>
              <div className="px-4 py-3 text-center">
                <p className="text-2xl font-semibold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Property Grid */}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {properties.map((property) => (
            <Link key={property.id} href={`/properties/${property.id}`}>
              <Card className="group overflow-hidden hover:shadow-md transition-shadow cursor-pointer h-full">
                <div className="relative h-44 overflow-hidden bg-muted">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <Badge variant={statusVariant(property.status)} className="capitalize">
                      {property.status}
                    </Badge>
                  </div>
                  <div className="absolute right-3 top-3">
                    <Badge variant="muted" className="capitalize">
                      {typeLabel(property.type)}
                    </Badge>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{property.name}</h3>
                  <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{property.address}, {property.city}</span>
                  </div>

                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Occupancy</span>
                      <span className="font-medium text-foreground">
                        {property.occupiedUnits}/{property.units} units ({getOccupancyRate(property.occupiedUnits, property.units)}%)
                      </span>
                    </div>
                    <ProgressBar value={property.occupiedUnits} max={property.units} />
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Monthly Rent</p>
                      <p className="text-sm font-semibold text-foreground">{formatCurrency(property.monthlyRent)}/unit</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Gross Revenue</p>
                      <p className="text-sm font-semibold text-emerald-600">
                        {formatCurrency(property.monthlyRent * property.occupiedUnits)}/mo
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}

          {/* Add Property Card */}
          <div className="flex min-h-[300px] cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border bg-muted/30 p-6 text-center transition-colors hover:border-primary/50 hover:bg-primary/5">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <Plus className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Add Property</p>
              <p className="text-xs text-muted-foreground">Expand your portfolio</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
