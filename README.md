# PropManager — Property Management App

A modern property management dashboard built with Next.js 14, Tailwind CSS, and TypeScript.

## Features

- **Dashboard** — KPI overview, revenue chart, recent activity
- **Properties** — Portfolio view with occupancy tracking, property details
- **Tenants** — Tenant management, profiles, lease tracking
- **Maintenance** — Request tracking with priority/status filtering
- **Payments** — Rent collection tracking, overdue alerts
- **Settings** — Profile, notifications, company details

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deployment to Vercel

### Option A — Vercel CLI (fastest)

```bash
npm install -g vercel
vercel
```

Follow the prompts. Your app will be live in ~2 minutes.

### Option B — GitHub + Vercel Dashboard

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repo
4. Click Deploy

### Environment Variables

No environment variables are required for the MVP (all data is mocked).

When adding a real backend, add these to Vercel:

```
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=https://your-app.vercel.app
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Dashboard
│   ├── properties/
│   │   ├── page.tsx          # Properties list
│   │   └── [id]/page.tsx     # Property detail
│   ├── tenants/
│   │   ├── page.tsx          # Tenants list
│   │   └── [id]/page.tsx     # Tenant detail
│   ├── maintenance/page.tsx  # Maintenance requests
│   ├── payments/page.tsx     # Payments tracker
│   ├── settings/page.tsx     # Settings
│   ├── layout.tsx            # Root layout with sidebar
│   └── globals.css           # Global styles + design tokens
├── components/
│   ├── Sidebar.tsx           # Navigation sidebar
│   ├── RevenueChart.tsx      # Recharts revenue visualization
│   └── ui.tsx                # Shared UI primitives (Badge, Card, Button, etc.)
├── data/
│   └── mockData.ts           # Type definitions + seed data
└── lib/
    └── utils.ts              # Utility functions (cn, formatCurrency, formatDate)
```

## Adding a Real Backend

This app is structured for easy database integration:

1. Add [Prisma](https://prisma.io) + PostgreSQL (Supabase/Neon work great on Vercel)
2. Replace mock data imports with API calls or server actions
3. Add authentication with [NextAuth.js](https://next-auth.js.org)

```bash
npm install prisma @prisma/client
npx prisma init
```

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Recharts** (revenue chart)
- **Lucide React** (icons)
- **Google Fonts** — DM Sans + Fraunces

## Screens Not in MVP (V2 ideas)

- Lease document upload/signing
- Tenant portal (separate login)
- Automated rent reminders (email/SMS)
- Tax reporting / expense tracking
- Vendor/contractor management
- Calendar view for inspections
