# SwiftDrop

**Merchant-Focused Courier & Last-Mile Logistics Platform (MVP)**

SwiftDrop connects merchants, riders, and admins in a single shipment workflow, from parcel creation and payment to rider assignment, tracking, and delivery completion.

| | |
|---|---|
| **Live Demo** | https://swift-drop-frontend.vercel.app |
| **Live API** | https://swiftdrop-logistics-api.vercel.app |
| **Frontend Repo** | https://github.com/Rakibstack/SwiftDrop-Frontend |
| **Backend Repo** | https://github.com/Rakibstack/SwiftDrop-Backend-Project.git |

## The Problem

Courier operations involve many handoffs between merchants, riders, and administrators. SwiftDrop centralizes these workflows and keeps shipment ownership, payment status, and delivery progress consistent.

## Core Workflow

```
Merchant creates shipment → Payment / COD → Admin assigns rider → Rider accepts & delivers → Tracking updates
```

## Features

- **Authentication & access control:** Email/password, Google login, OTP verification, and role-based access for Merchants, Riders, and Admins.
- **Shipment management:** Create and manage shipments, with server-side delivery-fee calculation and shipment ownership checks.
- **Payment handling:** bKash Tokenized Checkout, payment retry/refund handling, and separate Cash on Delivery (COD) tracking.
- **Rider workflow:** Admin assignment, then rider-managed acceptance, pickup, transit, and delivery/failure updates.
- **Tracking & accountability:** Shipment tracking events and audit logs for operational visibility.
- **Reliable APIs:** Zod validation, Prisma transactions, pagination, filtering, soft deletion, and status/permission checks.

## Demo Accounts

| Role | Email | Password |
|---|---|---|
| Merchant | qoxuqy@mailinator.com | Tester@user1 |
| Rider | tujykawon@mailinator.com | Tester@rider1 |
| Admin | testeradmin@gmail.com | Tester@Admin123  |

> bKash runs in sandbox mode. No real money is charged.

## Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | Next.js, TypeScript, Tailwind CSS, shadcn/ui, TanStack Query |
| Backend | Node.js, Express.js, TypeScript |
| Database | PostgreSQL, Prisma ORM |
| Auth & Validation | JWT, Google OAuth, OTP, Zod |
| Integrations | bKash, Redis, Cloudinary, Nodemailer |
| Deployment | Vercel |

## Key Engineering Decisions

- **Controlled status transitions:** A shipment can only move to the next valid state, which prevents invalid updates.
- **Transactions:** Related operations (for example payment confirmation and shipment updates) are saved together or not at all.
- **Server-side fee calculation:** The client cannot tamper with delivery prices.
- **Ownership and role checks:** Users can only access and change what belongs to them.
- **Soft deletion and audit logs:** Records stay traceable.

## Getting Started

git clone https://github.com/Rakibstack/SwiftDrop-Frontend
cd SwiftDrop-Frontend
bun install
cp .env.example .env.local
bun run dev

### Environment Variables

```env
NEXT_PUBLIC_API_BASE_URL=/api/v1
```

For backend setup, see the backend repository.

## Roadmap

This is an MVP. Planned or out-of-scope items:

- GPS-based live tracking and maps/routes
- SMS notifications
- Real-time updates with WebSockets
- COD settlement

## Author

**Rakibul Hassan Rakib**, Full Stack Developer
GitHub: https://github.com/Rakibstack | LinkedIn: https://www.linkedin.com/in/rakibul-hasan-rakib-dev
