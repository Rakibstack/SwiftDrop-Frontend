# SwiftDrop

**Merchant-Focused Courier & Last-Mile Logistics MVP**

SwiftDrop is a courier management platform that connects merchants,
riders, and admins in one shipment workflow---from parcel creation and
payment to rider assignment, tracking, and delivery completion.

## The Problem

Courier operations involve multiple handoffs between merchants, riders,
and administrators. SwiftDrop centralizes these workflows and keeps
shipment ownership, payment status, and delivery progress consistent.

## MVP Features

-   **Authentication & access control** --- Email/password, Google
    login, OTP verification, and role-based access for Merchants,
    Riders, and Admins.
-   **Shipment management** --- Create and manage shipments, calculate
    delivery fees on the server, and enforce shipment ownership.
-   **Payment handling** --- bKash Tokenized Checkout, payment
    retry/refund handling, and separate Cash on Delivery (COD) tracking.
-   **Rider workflow** --- Admin assignment and rider-managed shipment
    acceptance, pickup, transit, and delivery/failure updates.
-   **Tracking & accountability** --- Shipment tracking events and audit
    logs for operational visibility.
-   **Reliable APIs** --- Zod validation, Prisma transactions,
    pagination, filtering, soft deletion, and status/permission checks.

## Core Workflow

`Merchant creates shipment → Payment/COD → Admin assigns rider → Rider accepts & delivers → Shipment tracking updates`

## Tech Stack

-   **Backend:** Node.js, Express.js, TypeScript
-   **Database & ORM:** PostgreSQL, Prisma
-   **Auth & validation:** JWT, Google OAuth, OTP, Zod
-   **Integrations:** bKash, Redis, Cloudinary, Nodemailer
-   **Frontend:** Next.js, TypeScript, Tailwind CSS, shadcn/ui, TanStack
    Query

## Engineering Outcome

SwiftDrop turns a multi-role courier process into a structured API
workflow. It demonstrates role-based authorization, payment integration,
shipment state management, and transaction-safe handling of related
operations---the core engineering challenges of a practical logistics
MVP.

## Live API

-   **Base URL:** https://swiftdrop-logistics-api.vercel.app/api/v1
-   **Frontend URL:** https://swift-drop-frontend.vercel.app

------------------------------------------------------------------------

*Built as an MVP. GPS-based live tracking, maps/routes, SMS
notifications, real-time sockets, COD settlement, and AI features are
outside the current scope.*
