"use client";
import { useState } from "react";
import { Wrench, Plus, Filter } from "lucide-react";
import { maintenanceRequests, properties } from "@/data/mockData";
import { formatDate } from "@/lib/utils";
import { Badge, Button, Card, CardContent, PageHeader } from "@/components/ui";
import type { MaintenanceRequest } from "@/data/mockData";

function priorityVariant(priority: string) {
  if (priority === 'emergency') return 'danger' as const;
  if (priority === 'high') return 'warning' as const;
  if (priority === 'medium') return 'info' as const;
  return 'muted' as const;
}

function statusVariant(status: string) {
  if (status === 'completed') return 'success' as const;
  if (status === 'in_progress') return 'info' as const;
  if (status === 'open') return 'warning' as const;
  return 'muted' as const;
}

function categoryIcon(category: string) {
  const icons: Record<string, string> = {
    plumbing: '🔧',
    electrical: '⚡',
    hvac: '❄️',
    appliance: '🍳',
    structural: '🏗️',
    other: '📋',
  };
  return icons[category] || '📋';
}

const ALL_STATUSES = ['all', 'open', 'in_progress', 'completed', 'cancelled'];

export default function MaintenancePage() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const filtered = maintenanceRequests.filter(req => {
    if (statusFilter !== 'all' && req.status !== statusFilter) return false;
    if (priorityFilter !== 'all' && req.priority !== priorityFilter) return false;
    return true;
  });

  const open = maintenanceRequests.filter(r => r.status === 'open').length;
  const inProgress = maintenanceRequests.filter(r => r.status === 'in_progress').length;
  const completed = maintenanceRequests.filter(r => r.status === 'completed').length;
  const emergency = maintenanceRequests.filter(r => r.priority === 'emergency').length;

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="Maintenance"
        description={`${open} open · ${inProgress} in progress · ${completed} completed`}
        action={
          <Button size="sm">
            <Plus className="h-4 w-4" />
            New Request
          </Button>
        }
      />

      <div className="p-6 space-y-5">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'Open', value: open, color: 'text-amber-600' },
            { label: 'In Progress', value: inProgress, color: 'text-blue-600' },
            { label: 'Emergency', value: emergency, color: 'text-red-600' },
            { label: 'Completed', value: completed, color: 'text-emerald-600' },
          ].map((s) => (
            <Card key={s.label}>
              <div className="p-4 text-center">
                <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{s.label}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1 rounded-lg border border-border bg-card p-1">
            {ALL_STATUSES.map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors capitalize ${
                  statusFilter === s
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {s.replace('_', ' ')}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1 rounded-lg border border-border bg-card p-1">
            {['all', 'emergency', 'high', 'medium', 'low'].map(p => (
              <button
                key={p}
                onClick={() => setPriorityFilter(p)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors capitalize ${
                  priorityFilter === p
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Requests */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-2xl">
                <Wrench className="h-7 w-7 text-muted-foreground" />
              </div>
              <p className="mt-4 text-sm font-semibold text-foreground">No requests found</p>
              <p className="mt-1 text-sm text-muted-foreground">Try adjusting your filters</p>
            </div>
          ) : filtered.map((req) => {
            const property = properties.find(p => p.id === req.propertyId);
            return (
              <Card key={req.id} className={`transition-shadow hover:shadow-md ${req.priority === 'emergency' ? 'border-red-200 bg-red-50/30' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted text-lg">
                      {categoryIcon(req.category)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-start gap-2">
                        <h3 className="text-sm font-semibold text-foreground">{req.title}</h3>
                        <Badge variant={priorityVariant(req.priority)} className="capitalize">
                          {req.priority}
                        </Badge>
                        <Badge variant={statusVariant(req.status)}>
                          {req.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{req.description}</p>
                      <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
                        <span>🏠 {property?.name}</span>
                        <span>📍 Unit {req.unit}</span>
                        <span>👤 {req.tenantName}</span>
                        <span>📅 {formatDate(req.createdAt)}</span>
                        <span className="capitalize">🔧 {req.category}</span>
                      </div>
                    </div>
                    <div className="flex shrink-0 gap-2">
                      {req.status !== 'completed' && (
                        <Button variant="secondary" size="sm">
                          {req.status === 'open' ? 'Start' : 'Complete'}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
