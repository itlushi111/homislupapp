export type Property = {
  id: string;
  name: string;
  address: string;
  city: string;
  type: 'apartment' | 'house' | 'commercial' | 'condo';
  units: number;
  occupiedUnits: number;
  monthlyRent: number;
  image: string;
  status: 'active' | 'maintenance' | 'vacant';
  yearBuilt: number;
};

export type Tenant = {
  id: string;
  name: string;
  email: string;
  phone: string;
  propertyId: string;
  unit: string;
  leaseStart: string;
  leaseEnd: string;
  monthlyRent: number;
  status: 'current' | 'late' | 'eviction' | 'vacating';
  avatar: string;
  balance: number;
};

export type MaintenanceRequest = {
  id: string;
  propertyId: string;
  tenantId: string;
  tenantName: string;
  unit: string;
  title: string;
  description: string;
  category: 'plumbing' | 'electrical' | 'hvac' | 'appliance' | 'structural' | 'other';
  priority: 'low' | 'medium' | 'high' | 'emergency';
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
};

export type Payment = {
  id: string;
  tenantId: string;
  tenantName: string;
  propertyId: string;
  unit: string;
  amount: number;
  dueDate: string;
  paidDate: string | null;
  status: 'paid' | 'pending' | 'overdue' | 'partial';
  type: 'rent' | 'deposit' | 'late_fee' | 'maintenance';
};

export const properties: Property[] = [
  {
    id: 'p1',
    name: 'Oakwood Residences',
    address: '142 Oakwood Avenue',
    city: 'Austin, TX',
    type: 'apartment',
    units: 12,
    occupiedUnits: 10,
    monthlyRent: 1850,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop',
    status: 'active',
    yearBuilt: 2018,
  },
  {
    id: 'p2',
    name: 'Riverside Lofts',
    address: '88 River Street',
    city: 'Portland, OR',
    type: 'condo',
    units: 6,
    occupiedUnits: 6,
    monthlyRent: 2200,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop',
    status: 'active',
    yearBuilt: 2020,
  },
  {
    id: 'p3',
    name: 'Maple Street House',
    address: '37 Maple Street',
    city: 'Nashville, TN',
    type: 'house',
    units: 1,
    occupiedUnits: 1,
    monthlyRent: 2800,
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&auto=format&fit=crop',
    status: 'active',
    yearBuilt: 2015,
  },
  {
    id: 'p4',
    name: 'Commerce Plaza',
    address: '500 Commerce Blvd',
    city: 'Dallas, TX',
    type: 'commercial',
    units: 4,
    occupiedUnits: 2,
    monthlyRent: 4500,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop',
    status: 'maintenance',
    yearBuilt: 2010,
  },
  {
    id: 'p5',
    name: 'Sunset Villas',
    address: '210 Sunset Drive',
    city: 'Phoenix, AZ',
    type: 'apartment',
    units: 8,
    occupiedUnits: 5,
    monthlyRent: 1600,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop',
    status: 'active',
    yearBuilt: 2016,
  },
];

export const tenants: Tenant[] = [
  {
    id: 't1',
    name: 'Sarah Mitchell',
    email: 'sarah.mitchell@email.com',
    phone: '(512) 555-0142',
    propertyId: 'p1',
    unit: '3B',
    leaseStart: '2023-03-01',
    leaseEnd: '2025-02-28',
    monthlyRent: 1850,
    status: 'current',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    balance: 0,
  },
  {
    id: 't2',
    name: 'James Rodriguez',
    email: 'james.r@email.com',
    phone: '(512) 555-0198',
    propertyId: 'p1',
    unit: '5A',
    leaseStart: '2022-09-01',
    leaseEnd: '2024-08-31',
    monthlyRent: 1850,
    status: 'late',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    balance: -3700,
  },
  {
    id: 't3',
    name: 'Emily Chen',
    email: 'emily.chen@email.com',
    phone: '(503) 555-0211',
    propertyId: 'p2',
    unit: '2',
    leaseStart: '2024-01-01',
    leaseEnd: '2025-12-31',
    monthlyRent: 2200,
    status: 'current',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    balance: 0,
  },
  {
    id: 't4',
    name: 'Marcus Thompson',
    email: 'mthompson@email.com',
    phone: '(615) 555-0087',
    propertyId: 'p3',
    unit: '1',
    leaseStart: '2023-06-01',
    leaseEnd: '2025-05-31',
    monthlyRent: 2800,
    status: 'current',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
    balance: 0,
  },
  {
    id: 't5',
    name: 'Priya Patel',
    email: 'priya.p@email.com',
    phone: '(602) 555-0334',
    propertyId: 'p5',
    unit: '1A',
    leaseStart: '2024-02-01',
    leaseEnd: '2025-01-31',
    monthlyRent: 1600,
    status: 'vacating',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
    balance: 0,
  },
  {
    id: 't6',
    name: 'Daniel Foster',
    email: 'dfoster@email.com',
    phone: '(512) 555-0456',
    propertyId: 'p1',
    unit: '7C',
    leaseStart: '2023-11-01',
    leaseEnd: '2025-10-31',
    monthlyRent: 1850,
    status: 'current',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Daniel',
    balance: 0,
  },
];

export const maintenanceRequests: MaintenanceRequest[] = [
  {
    id: 'm1',
    propertyId: 'p1',
    tenantId: 't1',
    tenantName: 'Sarah Mitchell',
    unit: '3B',
    title: 'Leaking faucet in bathroom',
    description: 'The bathroom sink faucet has been dripping constantly for 3 days. Water pooling under the cabinet.',
    category: 'plumbing',
    priority: 'medium',
    status: 'open',
    createdAt: '2025-05-14T09:23:00Z',
    updatedAt: '2025-05-14T09:23:00Z',
  },
  {
    id: 'm2',
    propertyId: 'p1',
    tenantId: 't2',
    tenantName: 'James Rodriguez',
    unit: '5A',
    title: 'AC unit not cooling',
    description: 'Air conditioner is running but not producing cold air. Room temperature is 82°F.',
    category: 'hvac',
    priority: 'high',
    status: 'in_progress',
    createdAt: '2025-05-12T14:11:00Z',
    updatedAt: '2025-05-13T10:00:00Z',
  },
  {
    id: 'm3',
    propertyId: 'p4',
    tenantId: 't3',
    tenantName: 'Commercial Tenant',
    unit: 'Suite A',
    title: 'Electrical panel issue',
    description: 'Circuit breakers tripping repeatedly in the main office area.',
    category: 'electrical',
    priority: 'emergency',
    status: 'in_progress',
    createdAt: '2025-05-15T08:00:00Z',
    updatedAt: '2025-05-15T09:30:00Z',
  },
  {
    id: 'm4',
    propertyId: 'p5',
    tenantId: 't5',
    tenantName: 'Priya Patel',
    unit: '1A',
    title: 'Dishwasher not draining',
    description: 'Dishwasher completes the cycle but water stays at the bottom.',
    category: 'appliance',
    priority: 'low',
    status: 'open',
    createdAt: '2025-05-10T16:45:00Z',
    updatedAt: '2025-05-10T16:45:00Z',
  },
  {
    id: 'm5',
    propertyId: 'p2',
    tenantId: 't3',
    tenantName: 'Emily Chen',
    unit: '2',
    title: 'Window seal broken',
    description: 'Condensation forming between the double-pane glass on the living room window.',
    category: 'structural',
    priority: 'medium',
    status: 'completed',
    createdAt: '2025-05-01T11:20:00Z',
    updatedAt: '2025-05-08T14:00:00Z',
  },
];

export const payments: Payment[] = [
  {
    id: 'pay1',
    tenantId: 't1',
    tenantName: 'Sarah Mitchell',
    propertyId: 'p1',
    unit: '3B',
    amount: 1850,
    dueDate: '2025-05-01',
    paidDate: '2025-04-30',
    status: 'paid',
    type: 'rent',
  },
  {
    id: 'pay2',
    tenantId: 't2',
    tenantName: 'James Rodriguez',
    propertyId: 'p1',
    unit: '5A',
    amount: 1850,
    dueDate: '2025-05-01',
    paidDate: null,
    status: 'overdue',
    type: 'rent',
  },
  {
    id: 'pay3',
    tenantId: 't3',
    tenantName: 'Emily Chen',
    propertyId: 'p2',
    unit: '2',
    amount: 2200,
    dueDate: '2025-05-01',
    paidDate: '2025-05-01',
    status: 'paid',
    type: 'rent',
  },
  {
    id: 'pay4',
    tenantId: 't4',
    tenantName: 'Marcus Thompson',
    propertyId: 'p3',
    unit: '1',
    amount: 2800,
    dueDate: '2025-05-01',
    paidDate: '2025-05-02',
    status: 'paid',
    type: 'rent',
  },
  {
    id: 'pay5',
    tenantId: 't5',
    tenantName: 'Priya Patel',
    propertyId: 'p5',
    unit: '1A',
    amount: 1600,
    dueDate: '2025-05-01',
    paidDate: '2025-04-28',
    status: 'paid',
    type: 'rent',
  },
  {
    id: 'pay6',
    tenantId: 't6',
    tenantName: 'Daniel Foster',
    propertyId: 'p1',
    unit: '7C',
    amount: 1850,
    dueDate: '2025-05-01',
    paidDate: null,
    status: 'pending',
    type: 'rent',
  },
  {
    id: 'pay7',
    tenantId: 't2',
    tenantName: 'James Rodriguez',
    propertyId: 'p1',
    unit: '5A',
    amount: 185,
    dueDate: '2025-05-05',
    paidDate: null,
    status: 'overdue',
    type: 'late_fee',
  },
];

export const revenueData = [
  { month: 'Nov', revenue: 18200, expenses: 3400 },
  { month: 'Dec', revenue: 19100, expenses: 4200 },
  { month: 'Jan', revenue: 19800, expenses: 2800 },
  { month: 'Feb', revenue: 20100, expenses: 3100 },
  { month: 'Mar', revenue: 21400, expenses: 5600 },
  { month: 'Apr', revenue: 20900, expenses: 3900 },
  { month: 'May', revenue: 22150, expenses: 4100 },
];
