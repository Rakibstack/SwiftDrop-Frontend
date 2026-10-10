
"use client";

import Link from "next/link";
import {
  ArrowRight,
  Banknote,
  CheckCircle2,
  Clock3,
  MapPin,
  Package,
  Phone,
  Route,
  Truck,
  Wallet,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const stats = [
  {
    title: "Assigned deliveries",
    value: "12",
    subtitle: "Today's assigned shipments",
    icon: Package,
    iconStyle: "bg-blue-50 text-blue-700",
    trend: "+3 from yesterday",
    trendStyle: "text-blue-700",
  },
  {
    title: "Completed deliveries",
    value: "08",
    subtitle: "Successfully delivered",
    icon: CheckCircle2,
    iconStyle: "bg-emerald-50 text-emerald-700",
    trend: "66.7% completion",
    trendStyle: "text-emerald-700",
  },
  {
    title: "Active shipments",
    value: "04",
    subtitle: "Pickups and deliveries",
    icon: Truck,
    iconStyle: "bg-violet-50 text-violet-700",
    trend: "Needs attention",
    trendStyle: "text-violet-700",
  },
  {
    title: "Today's earnings",
    value: "৳2,450",
    subtitle: "Illustrative demo amount",
    icon: Wallet,
    iconStyle: "bg-amber-50 text-amber-700",
    trend: "View earnings",
    trendStyle: "text-amber-700",
  },
];

const deliveries = [
  {
    id: "SWD-20261010-RPFJU",
    recipient: "Madeson Sanders",
    phone: "01823232345",
    address: "Uttara, Dhaka",
    type: "Delivery",
    status: "PICKED_UP",
    amount: "৳440",
  },
  {
    id: "SWD-20261010-T9YSI",
    recipient: "Victoria Bernard",
    phone: "01898765434",
    address: "Mirpur 10, Dhaka",
    type: "Pickup",
    status: "ASSIGNED",
    amount: "৳860",
  },
  {
    id: "SWD-20261010-1I0YV",
    recipient: "Chancellor Sawyer",
    phone: "01756565654",
    address: "Dhanmondi, Dhaka",
    type: "Delivery",
    status: "PICKED_UP",
    amount: "৳1,010",
  },
];

const activities = [
  {
    title: "Delivery completed",
    description: "Shipment SWD-20261009-AB123",
    time: "10:35 AM",
    icon: CheckCircle2,
    style: "bg-emerald-50 text-emerald-700",
  },
  {
    title: "New shipment assigned",
    description: "Shipment SWD-20261010-T9YSI",
    time: "10:12 AM",
    icon: Package,
    style: "bg-blue-50 text-blue-700",
  },
  {
    title: "Pickup confirmed",
    description: "Shipment SWD-20261010-RPFJU",
    time: "09:40 AM",
    icon: Truck,
    style: "bg-violet-50 text-violet-700",
  },
];

function formatStatus(status: string) {
  return status.replaceAll("_", " ");
}

function statusStyle(status: string) {
  switch (status) {
    case "DELIVERED":
      return "border-emerald-200 bg-emerald-50 text-emerald-700";
    case "PICKED_UP":
      return "border-blue-200 bg-blue-50 text-blue-700";
    case "ASSIGNED":
      return "border-amber-200 bg-amber-50 text-amber-700";
    default:
      return "border-slate-200 bg-slate-50 text-slate-600";
  }
}

export default function RiderOverviewPage() {
  return (
    <main className="min-h-screen space-y-6 bg-slate-50/70 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-slate-500">
            Rider workspace / Overview
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
            Rider dashboard
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Keep track of your deliveries and make every trip count.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Badge
            variant="outline"
            className="gap-2 border-emerald-200 bg-emerald-50 px-3 py-1.5 text-emerald-700"
          >
            <span className="size-2 rounded-full bg-emerald-500" />
            On duty
          </Badge>

          <Button  className="gap-2">
            <Link href="/rider/shipments">
              <Route className="size-4" />
              My deliveries
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Welcome banner */}
      <section className="relative overflow-hidden rounded-2xl bg-slate-950 p-6 text-white sm:p-8">
        <div className="pointer-events-none absolute -right-12 -top-24 size-64 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -right-2 -top-12 size-44 rounded-full border border-white/10" />

        <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div className="max-w-xl">
            <Badge className="border border-white/15 bg-white/10 text-white hover:bg-white/10">
              Daily performance
            </Badge>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
              Ready for another productive day?
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-6 text-slate-300">
              Stay on top of your assigned shipments, follow delivery updates,
              and keep customers informed at every step.
            </p>

            <Button
              
              variant="secondary"
              className="mt-5 gap-2"
            >
              <Link href="/rider/shipments">
                Open delivery queue
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:min-w-64">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <CheckCircle2 className="size-5 text-emerald-400" />
              <p className="mt-3 text-2xl font-semibold">08</p>
              <p className="mt-1 text-xs text-slate-300">Completed</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <Clock3 className="size-5 text-amber-300" />
              <p className="mt-3 text-2xl font-semibold">04</p>
              <p className="mt-1 text-xs text-slate-300">Remaining</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Card
              key={stat.title}
              className="border-slate-200 shadow-sm transition-shadow hover:shadow-md"
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      {stat.title}
                    </p>
                    <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
                      {stat.value}
                    </p>
                  </div>

                  <div className={`rounded-xl p-3 ${stat.iconStyle}`}>
                    <Icon className="size-5" />
                  </div>
                </div>

                <p className="mt-2 text-xs text-slate-500">
                  {stat.subtitle}
                </p>

                <p className={`mt-4 text-xs font-medium ${stat.trendStyle}`}>
                  {stat.trend}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </section>

      {/* Progress and quick actions */}
      <section className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between gap-3">
            <div>
              <CardTitle className="text-base">
                Delivery progress
              </CardTitle>
              <p className="mt-1 text-sm text-slate-500">
                Your delivery performance for today
              </p>
            </div>
            <Badge variant="outline">Today</Badge>
          </CardHeader>

          <CardContent>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-3xl font-semibold text-slate-950">
                  66.7%
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  8 of 12 deliveries completed
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-slate-900">04</p>
                <p className="text-xs text-slate-500">Remaining</p>
              </div>
            </div>

            <div
              className="mt-5 h-2.5 overflow-hidden rounded-full bg-slate-100"
              role="progressbar"
              aria-label="Daily delivery completion"
              aria-valuemin={0}
              aria-valuemax={12}
              aria-valuenow={8}
            >
              <div className="h-full w-2/3 rounded-full bg-emerald-500" />
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-emerald-500" />
                Completed: 8
              </span>
              <span className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-slate-300" />
                Remaining: 4
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Quick actions</CardTitle>
            <p className="text-sm text-slate-500">
              Common tasks in one place
            </p>
          </CardHeader>

          <CardContent className="grid gap-3">
            <Link
              href="/rider/shipments"
              className="group flex items-center gap-3 rounded-xl border border-slate-200 p-3 transition-colors hover:border-blue-200 hover:bg-blue-50/50"
            >
              <div className="rounded-lg bg-blue-50 p-2.5 text-blue-700">
                <Package className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-slate-900">
                  View assigned shipments
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Review your delivery queue
                </p>
              </div>
              <ArrowRight className="size-4 text-slate-400 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/rider/earnings"
              className="group flex items-center gap-3 rounded-xl border border-slate-200 p-3 transition-colors hover:border-emerald-200 hover:bg-emerald-50/50"
            >
              <div className="rounded-lg bg-emerald-50 p-2.5 text-emerald-700">
                <Banknote className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-slate-900">
                  View earnings
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Review your payment summary
                </p>
              </div>
              <ArrowRight className="size-4 text-slate-400 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/rider/profile"
              className="group flex items-center gap-3 rounded-xl border border-slate-200 p-3 transition-colors hover:border-violet-200 hover:bg-violet-50/50"
            >
              <div className="rounded-lg bg-violet-50 p-2.5 text-violet-700">
                <MapPin className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-slate-900">
                  Rider profile
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Check your account information
                </p>
              </div>
              <ArrowRight className="size-4 text-slate-400 transition-transform group-hover:translate-x-1" />
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Delivery queue */}
      <Card className="overflow-hidden border-slate-200 shadow-sm">
        <CardHeader className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <CardTitle className="text-base">Active delivery queue</CardTitle>
            <p className="mt-1 text-sm text-slate-500">
              Shipments that need your attention
            </p>
          </div>

          <Button  variant="outline" className="w-fit gap-2">
            <Link href="/rider/shipments">
              All shipments
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </CardHeader>

        <CardContent className="p-0">
          <div className="divide-y divide-slate-100">
            {deliveries.map((delivery) => (
              <div
                key={delivery.id}
                className="flex flex-col gap-4 px-5 py-4 transition-colors hover:bg-slate-50/70 sm:flex-row sm:items-center"
              >
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                  {delivery.type === "Pickup" ? (
                    <Package className="size-5" />
                  ) : (
                    <Truck className="size-5" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-mono text-xs font-semibold text-slate-900">
                      {delivery.id}
                    </p>
                    <Badge
                      variant="outline"
                      className={statusStyle(delivery.status)}
                    >
                      {formatStatus(delivery.status)}
                    </Badge>
                  </div>

                  <p className="mt-1 text-sm font-medium text-slate-900">
                    {delivery.recipient}
                  </p>

                  <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                    <MapPin className="size-3.5 shrink-0" />
                    {delivery.address}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-3 sm:justify-end">
                  <div className="text-left sm:text-right">
                    <p className="font-semibold text-slate-900">
                      {delivery.amount}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {delivery.type}
                    </p>
                  </div>

                  <Button  variant="outline" size="sm">
                    <Link href="/rider/shipments">View</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Activity and rider tips */}
      <section className="grid gap-5 xl:grid-cols-[1.4fr_1fr]">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Recent activity</CardTitle>
            <p className="text-sm text-slate-500">
              Latest updates from your delivery workflow
            </p>
          </CardHeader>

          <CardContent>
            <div className="space-y-5">
              {activities.map((activity, index) => {
                const Icon = activity.icon;

                return (
                  <div key={`${activity.title}-${index}`} className="flex gap-3">
                    <div
                      className={`flex size-10 shrink-0 items-center justify-center rounded-full ${activity.style}`}
                    >
                      <Icon className="size-4" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-sm font-medium text-slate-900">
                          {activity.title}
                        </p>
                        <span className="text-xs text-slate-500">
                          {activity.time}
                        </span>
                      </div>
                      <p className="mt-1 break-all text-xs text-slate-500">
                        {activity.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-100 bg-blue-50/50 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-blue-100 p-2 text-blue-700">
                <CheckCircle2 className="size-5" />
              </div>
              <CardTitle className="text-base">Delivery checklist</CardTitle>
            </div>
          </CardHeader>

          <CardContent>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                <div>
                  <p className="font-medium text-slate-900">
                    Verify recipient details
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Confirm the recipient's name, phone and delivery address.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                <div>
                  <p className="font-medium text-slate-900">
                    Update shipment status
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Keep shipment progress accurate throughout the delivery.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-blue-700" />
                <div>
                  <p className="font-medium text-slate-900">
                    Contact the recipient when needed
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Coordinate delivery attempts and report any issues promptly.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-blue-100 bg-white/80 p-3">
              <p className="text-xs leading-5 text-slate-600">
                Dashboard figures and activity entries are demo data. Connect
                them to the authenticated rider APIs before production use.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
