import { User, Bell, Shield, CreditCard, Building2, Save } from "lucide-react";
import { Badge, Button, Card, CardContent, CardHeader, PageHeader } from "@/components/ui";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="Settings"
        description="Manage your account, notifications, and preferences"
      />

      <div className="p-6 max-w-2xl space-y-5">
        {/* Profile */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <h2 className="font-semibold text-foreground">Profile</h2>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
                AM
              </div>
              <div>
                <Button variant="secondary" size="sm">Change Photo</Button>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { label: 'First Name', value: 'Alex' },
                { label: 'Last Name', value: 'Morgan' },
              ].map((field) => (
                <div key={field.label}>
                  <label className="mb-1.5 block text-xs font-medium text-muted-foreground">{field.label}</label>
                  <input
                    defaultValue={field.value}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
              ))}
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Email</label>
                <input
                  defaultValue="alex.morgan@propmanager.com"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Phone</label>
                <input
                  defaultValue="(555) 123-4567"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button size="sm">
                <Save className="h-3.5 w-3.5" />
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-muted-foreground" />
              <h2 className="font-semibold text-foreground">Notifications</h2>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: 'Overdue payments', description: 'Alert when a payment is 3+ days overdue', enabled: true },
              { label: 'New maintenance requests', description: 'Notify when tenants submit requests', enabled: true },
              { label: 'Lease expiring soon', description: 'Alert 60 days before lease expiration', enabled: true },
              { label: 'Monthly reports', description: 'Receive monthly portfolio summary', enabled: false },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
                <div
                  className={`relative h-5 w-9 cursor-pointer rounded-full transition-colors ${item.enabled ? 'bg-primary' : 'bg-muted'}`}
                >
                  <div
                    className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-all ${item.enabled ? 'left-4' : 'left-0.5'}`}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Company */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <h2 className="font-semibold text-foreground">Company Details</h2>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Company Name</label>
              <input
                defaultValue="Morgan Property Group"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Business Address</label>
              <input
                defaultValue="1400 Commerce Drive, Suite 200, Austin, TX 78701"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="flex justify-end">
              <Button size="sm">
                <Save className="h-3.5 w-3.5" />
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-200">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-red-500" />
              <h2 className="font-semibold text-red-700">Danger Zone</h2>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Delete Account</p>
                <p className="text-xs text-muted-foreground">Permanently delete your account and all data</p>
              </div>
              <Button variant="danger" size="sm">Delete Account</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
