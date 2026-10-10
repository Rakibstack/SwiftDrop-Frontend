"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  Banknote,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Ellipsis,
  Eye,
  Package,
  RefreshCw,
  ShieldCheck,
  Truck,
  UserRoundCheck,
  Users,
  Wallet,
} from "lucide-react";
const overviewStats = [
  {
    title: "Total users",
    value: "2,40",
    change: "+12.8%",
    description: "vs. last month",
    trend: "up",
    icon: Users,
    iconStyle: "bg-blue-50 text-blue-600",
    chart: [35, 48, 40, 65, 52, 76, 68, 90],
    chartStyle: "bg-blue-500",
  },
  {
    title: "Active riders",
    value: "126",
    change: "+8.2%",
    description: "vs. last month",
    trend: "up",
    icon: Truck,
    iconStyle: "bg-orange-50 text-orange-600",
    chart: [42, 35, 55, 48, 70, 60, 82, 94],
    chartStyle: "bg-orange-500",
  },
  {
    title: "Total shipments",
    value: "4,486",
    change: "+18.4%",
    description: "vs. last month",
    trend: "up",
    icon: Package,
    iconStyle: "bg-violet-50 text-violet-600",
    chart: [25, 42, 35, 58, 52, 72, 63, 92],
    chartStyle: "bg-violet-500",
  },
  {
    title: "Total revenue",
    value: "৳ 2.42L",
    change: "+14.6%",
    description: "vs. last month",
    trend: "up",
    icon: Wallet,
    iconStyle: "bg-emerald-50 text-emerald-600",
    chart: [32, 45, 40, 55, 49, 73, 66, 88],
    chartStyle: "bg-emerald-500",
  },
];

const shipmentTrends = [
  { day: "Mon", shipments: 420, delivered: 310 },
  { day: "Tue", shipments: 560, delivered: 420 },
  { day: "Wed", shipments: 480, delivered: 365 },
  { day: "Thu", shipments: 690, delivered: 530 },
  { day: "Fri", shipments: 610, delivered: 475 },
  { day: "Sat", shipments: 820, delivered: 650 },
  { day: "Sun", shipments: 740, delivered: 590 },
];

const shipmentStatuses = [
  {
    label: "Delivered",
    count: "3,240",
    percentage: 66,
    color: "bg-emerald-500",
    dot: "bg-emerald-500",
  },
  {
    label: "In transit",
    count: "1,64",
    percentage: 15,
    color: "bg-blue-500",
    dot: "bg-blue-500",
  },
  {
    label: "Awaiting pickup",
    count: "1,98",
    percentage: 12,
    color: "bg-amber-500",
    dot: "bg-amber-500",
  },
  {
    label: "Delivery failed",
    count: "84",
    percentage: 7,
    color: "bg-rose-500",
    dot: "bg-rose-500",
  },
];

const recentShipments = [
  {
    trackingId: "SD-2026-008421",
    customer: "Rahim Enterprise",
    destination: "Dhanmondi, Dhaka",
    amount: "৳ 120",
    status: "DELIVERED",
    initials: "RE",
    avatar: "bg-blue-100 text-blue-700",
    time: "10:42 AM",
  },
  {
    trackingId: "SD-2026-008420",
    customer: "Nexus Fashion",
    destination: "Uttara, Dhaka",
    amount: "৳ 160",
    status: "IN_TRANSIT",
    initials: "NF",
    avatar: "bg-violet-100 text-violet-700",
    time: "10:36 AM",
  },
  {
    trackingId: "SD-2026-008419",
    customer: "Urban Mart",
    destination: "Mirpur, Dhaka",
    amount: "৳ 100",
    status: "ASSIGNED",
    initials: "UM",
    avatar: "bg-orange-100 text-orange-700",
    time: "10:21 AM",
  },
  {
    trackingId: "SD-2026-008418",
    customer: "Daily Needs BD",
    destination: "Banani, Dhaka",
    amount: "৳ 140",
    status: "OUT_FOR_DELIVERY",
    initials: "DN",
    avatar: "bg-emerald-100 text-emerald-700",
    time: "10:08 AM",
  },
  {
    trackingId: "SD-2026-008417",
    customer: "Style Avenue",
    destination: "Mohammadpur, Dhaka",
    amount: "৳ 120",
    status: "DELIVERY_FAILED",
    initials: "SA",
    avatar: "bg-pink-100 text-pink-700",
    time: "09:54 AM",
  },
];

const topRiders = [
  {
    name: "Tanvir Ahmed",
    id: "RDR-00128",
    deliveries: 148,
    rating: "4.9",
    initials: "TA",
    avatar: "bg-orange-100 text-orange-700",
  },
  {
    name: "Sabbir Hossain",
    id: "RDR-00105",
    deliveries: 132,
    rating: "4.8",
    initials: "SH",
    avatar: "bg-blue-100 text-blue-700",
  },
  {
    name: "Nayeem Islam",
    id: "RDR-00087",
    deliveries: 119,
    rating: "4.8",
    initials: "NI",
    avatar: "bg-violet-100 text-violet-700",
  },
];

const activities = [
  {
    title: "New rider application",
    description: "Mehedi Hasan submitted an application.",
    time: "4 minutes ago",
    icon: UserRoundCheck,
    color: "bg-orange-50 text-orange-600",
  },
  {
    title: "Shipment delivered",
    description: "SD-2026-008421 was delivered successfully.",
    time: "12 minutes ago",
    icon: CheckCircle2,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "Payment confirmed",
    description: "A shipment payment of ৳ 1,250 was confirmed.",
    time: "21 minutes ago",
    icon: Wallet,
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Delivery needs attention",
    description: "SD-2026-008417 was marked as delivery failed.",
    time: "36 minutes ago",
    icon: AlertTriangle,
    color: "bg-rose-50 text-rose-600",
  },
];

function formatStatus(status: string) {
  return status.replaceAll("_", " ");
}

function ShipmentStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    DELIVERED: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
    IN_TRANSIT: "bg-blue-50 text-blue-700 ring-blue-600/15",
    ASSIGNED: "bg-violet-50 text-violet-700 ring-violet-600/15",
    OUT_FOR_DELIVERY: "bg-amber-50 text-amber-700 ring-amber-600/15",
    DELIVERY_FAILED: "bg-rose-50 text-rose-700 ring-rose-600/15",
  };

  const dotStyles: Record<string, string> = {
    DELIVERED: "bg-emerald-500",
    IN_TRANSIT: "bg-blue-500",
    ASSIGNED: "bg-violet-500",
    OUT_FOR_DELIVERY: "bg-amber-500",
    DELIVERY_FAILED: "bg-rose-500",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-bold ring-1 ring-inset sm:text-xs ${
        styles[status] || "bg-slate-100 text-slate-600 ring-slate-500/10"
      }`}
    >
      <span
        className={`size-1.5 rounded-full ${
          dotStyles[status] || "bg-slate-400"
        }`}
      />
      {formatStatus(status)}
    </span>
  );
}

function StatCard({ stat }: { stat: (typeof overviewStats)[number] }) {
  const Icon = stat.icon;

  return (
    <div className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_2px_8px_rgba(15,23,42,0.02)] transition duration-200 hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div
          className={`flex size-11 items-center justify-center rounded-xl ${stat.iconStyle}`}
        >
          <Icon className="size-5" />
        </div>

        <button
          type="button"
          aria-label={`More options for ${stat.title}`}
          className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
        >
          <Ellipsis className="size-5" />
        </button>
      </div>

      <p className="mt-5 text-sm font-medium text-slate-500">{stat.title}</p>

      <div className="mt-1 flex flex-wrap items-end justify-between gap-3">
        <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
          {stat.value}
        </h2>

        <div className="flex h-10 items-end gap-1 pb-0.5" aria-hidden="true">
          {stat.chart.map((height, index) => (
            <span
              key={index}
              style={{ height: `${height}%` }}
              className={`w-1.5 rounded-t-sm opacity-50 transition group-hover:opacity-100 ${stat.chartStyle}`}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-3">
        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600">
          <ArrowUpRight className="size-3.5" />
          {stat.change}
        </span>
        <span className="text-xs text-slate-400">{stat.description}</span>
      </div>
    </div>
  );
}

function ShipmentAnalytics() {
  const maxValue = Math.max(...shipmentTrends.map((item) => item.shipments));

  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
              <Activity className="size-4.5" />
            </div>
            <h2 className="font-bold text-slate-900">Shipment analytics</h2>
          </div>

          <p className="mt-2 text-sm text-slate-500">
            Monitor your delivery volume and fulfillment performance.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex h-9 items-center gap-2 self-start rounded-lg border border-slate-200 px-3 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
        >
          <CalendarDays className="size-3.5" />
          This week
          <ChevronDown className="size-3.5" />
        </button>
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-sm bg-orange-500" />
          <span className="text-xs font-medium text-slate-600">
            Total shipments
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-sm bg-slate-800" />
          <span className="text-xs font-medium text-slate-600">Delivered</span>
        </div>
      </div>

      <div className="mt-6 grid h-56 grid-cols-7 gap-3 border-b border-slate-100 pb-0 sm:gap-5">
        {shipmentTrends.map((item) => (
          <div
            key={item.day}
            className="flex min-w-0 flex-col items-center justify-end gap-3"
          >
            <div className="flex h-full w-full items-end justify-center gap-1.5">
              <div
                title={`${item.shipments} shipments`}
                style={{
                  height: `${(item.shipments / maxValue) * 100}%`,
                }}
                className="w-[45%] max-w-7 rounded-t-md bg-orange-500 transition-all duration-300 hover:bg-orange-400"
              />
              <div
                title={`${item.delivered} delivered`}
                style={{
                  height: `${(item.delivered / maxValue) * 100}%`,
                }}
                className="w-[45%] max-w-7 rounded-t-md bg-slate-800 transition-all duration-300 hover:bg-slate-600"
              />
            </div>
            <span className="pb-2 text-[11px] font-medium text-slate-400 sm:text-xs">
              {item.day}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs text-slate-500">Weekly shipment volume</p>
          <p className="mt-1 text-xl font-bold text-slate-950">4,320</p>
        </div>
        <div className="flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-2 text-xs font-semibold text-emerald-700">
          <ArrowUpRight className="size-4" />
          18.4% vs last week
        </div>
      </div>
    </section>
  );
}

function ShipmentBreakdown() {
  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="font-bold text-slate-900">Shipment status</h2>
          <p className="mt-1 text-xs text-slate-500">
            Current operational breakdown
          </p>
        </div>

        <div className="flex size-9 items-center justify-center rounded-xl bg-slate-50 text-slate-500">
          <Package className="size-4.5" />
        </div>
      </div>

      <div className="mt-7 flex items-center justify-center">
        <div
          className="relative flex size-40 items-center justify-center rounded-full"
          style={{
            background:
              "conic-gradient(#10b981 0% 66%, #3b82f6 66% 81%, #f59e0b 81% 93%, #f43f5e 93% 100%)",
          }}
        >
          <div className="flex size-28 flex-col items-center justify-center rounded-full bg-white">
            <span className="text-2xl font-bold tracking-tight text-slate-950">
              4.4k
            </span>
            <span className="mt-1 text-[10px] font-medium text-slate-400">
              Total shipments
            </span>
          </div>
        </div>
      </div>

      <div className="mt-7 space-y-4">
        {shipmentStatuses.map((status) => (
          <div key={status.label}>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className={`size-2 rounded-full ${status.dot}`} />
                <span className="text-xs font-medium text-slate-600">
                  {status.label}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-800">
                  {status.count}
                </span>
                <span className="w-8 text-right text-[10px] text-slate-400">
                  {status.percentage}%
                </span>
              </div>
            </div>

            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div
                style={{ width: `${status.percentage}%` }}
                className={`h-full rounded-full ${status.color}`}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function RecentShipments() {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <div className="flex flex-col justify-between gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:p-6">
        <div>
          <h2 className="font-bold text-slate-900">Recent shipments</h2>
          <p className="mt-1 text-sm text-slate-500">
            Latest shipment activity across the platform.
          </p>
        </div>

        <Link
          href="/admin/shipments"
          className="inline-flex items-center gap-1.5 self-start text-sm font-semibold text-orange-600 transition hover:text-orange-700"
        >
          View all <ArrowRight className="size-4" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left">
          <thead className="bg-slate-50/70">
            <tr className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              <th className="px-5 py-3.5 sm:px-6">Shipment</th>
              <th className="px-5 py-3.5">Destination</th>
              <th className="px-5 py-3.5">Delivery fee</th>
              <th className="px-5 py-3.5">Status</th>
              <th className="px-5 py-3.5">Created</th>
            </tr>
          </thead>

          <tbody>
            {recentShipments.map((shipment) => (
              <tr
                key={shipment.trackingId}
                className="border-t border-slate-100 transition hover:bg-slate-50/70"
              >
                <td className="px-5 py-4 sm:px-6">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex size-9 shrink-0 items-center justify-center rounded-xl text-[10px] font-bold ${shipment.avatar}`}
                    >
                      {shipment.initials}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">
                        {shipment.trackingId}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        {shipment.customer}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <span className="text-xs text-slate-600">
                    {shipment.destination}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <span className="text-xs font-semibold text-slate-800">
                    {shipment.amount}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <ShipmentStatusBadge status={shipment.status} />
                </td>

                <td className="px-5 py-4">
                  <span className="text-xs text-slate-500">
                    {shipment.time}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t border-slate-100 px-5 py-3.5 sm:px-6">
        <p className="text-xs text-slate-400">Showing 5 sample shipments</p>
      </div>
    </section>
  );
}

function RiderPerformance() {
  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-bold text-slate-900">Top performing riders</h2>
          <p className="mt-1 text-xs text-slate-500">
            Riders with the most deliveries this month.
          </p>
        </div>

        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
          <Truck className="size-4.5" />
        </div>
      </div>

      <div className="mt-5 space-y-4">
        {topRiders.map((rider, index) => (
          <div
            key={rider.id}
            className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 transition hover:border-orange-100 hover:bg-orange-50/30"
          >
            <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-xs font-bold text-slate-500">
              {String(index + 1).padStart(2, "0")}
            </div>

            <div
              className={`flex size-10 shrink-0 items-center justify-center rounded-full text-xs font-bold ${rider.avatar}`}
            >
              {rider.initials}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-800">
                {rider.name}
              </p>
              <p className="mt-0.5 text-[11px] text-slate-400">{rider.id}</p>
            </div>

            <div className="text-right">
              <p className="text-sm font-bold text-slate-800">
                {rider.deliveries}
              </p>
              <p className="mt-1 text-[10px] font-medium text-amber-600">
                ★ {rider.rating}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Link
        href="/admin/riders"
        className="mt-5 flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600"
      >
        View all riders <ArrowRight className="size-3.5" />
      </Link>
    </section>
  );
}

function ActivityFeed() {
  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-bold text-slate-900">Recent activity</h2>
          <p className="mt-1 text-xs text-slate-500">Latest platform events.</p>
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
          <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
          Activity feed
        </span>
      </div>

      <div className="mt-6">
        {activities.map((activity, index) => {
          const Icon = activity.icon;

          return (
            <div key={activity.title} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div
                  className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${activity.color}`}
                >
                  <Icon className="size-4" />
                </div>

                {index !== activities.length - 1 && (
                  <div className="my-1.5 min-h-6 w-px flex-1 bg-slate-100" />
                )}
              </div>

              <div className="min-w-0 flex-1 pb-5">
                <p className="text-sm font-semibold text-slate-800">
                  {activity.title}
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {activity.description}
                </p>
                <p className="mt-2 text-[10px] font-medium text-slate-400">
                  {activity.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default function AdminDashboardPage() {
  const [refreshing, setRefreshing] = useState(false);

  function handleRefresh() {
    setRefreshing(true);

    // Static demo page: no network request yet.
    window.setTimeout(() => setRefreshing(false), 500);
  }

  return (
    <main className="min-h-screen bg-[#F7F8FA] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px] space-y-7">
        {/* Header */}
        <header className="flex flex-col justify-between gap-5 xl:flex-row xl:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-orange-600">
              <span className="size-2 rounded-full bg-orange-500" />
              SwiftDrop administration
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Dashboard overview
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Your command center for shipments, riders, merchants, and platform
              performance.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleRefresh}
              disabled={refreshing}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-orange-200 hover:text-orange-600 disabled:opacity-60"
            >
              <RefreshCw
                className={`size-4 ${refreshing ? "animate-spin" : ""}`}
              />
              Refresh
            </button>

            <Link
              href="/admin/shipments"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 text-sm font-semibold text-white shadow-sm shadow-orange-500/20 transition hover:bg-orange-600"
            >
              <Eye className="size-4" />
              View operations
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </header>

        {/* System status banner */}
        <section className="relative overflow-hidden rounded-2xl bg-slate-950 p-5 text-white shadow-sm sm:p-6">
          <div className="pointer-events-none absolute -right-10 -top-20 size-64 rounded-full bg-orange-500/20 blur-3xl" />

          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-400">
                <ShieldCheck className="size-5" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-semibold">Platform operations</h2>
                  <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-[10px] font-bold text-emerald-300 ring-1 ring-emerald-400/20">
                    DEMO STATUS
                  </span>
                </div>

                <p className="mt-1.5 max-w-xl text-sm leading-6 text-slate-300">
                  Welcome to your control center. Monitor delivery activity,
                  manage your network, and review operational exceptions.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-5 border-t border-white/10 pt-4 sm:gap-7 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
              <div>
                <p className="text-xs text-slate-400">On-time delivery</p>
                <p className="mt-1.5 flex items-center gap-2 text-xl font-bold">
                  94.8%
                  <ArrowUpRight className="size-4 text-emerald-400" />
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400">Pending issues</p>
                <p className="mt-1.5 flex items-center gap-2 text-xl font-bold">
                  12
                  <span className="size-2 rounded-full bg-amber-400" />
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400">Rider availability</p>
                <p className="mt-1.5 flex items-center gap-2 text-xl font-bold">
                  82%
                  <span className="size-2 rounded-full bg-emerald-400" />
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* KPI cards */}
        <section>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Platform metrics
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Sample metrics for dashboard development
              </p>
            </div>

            <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
              <CalendarDays className="size-3.5" />
              Monthly comparison
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {overviewStats.map((stat) => (
              <StatCard key={stat.title} stat={stat} />
            ))}
          </div>
        </section>

        {/* Analytics */}
        <section className="grid gap-5 xl:grid-cols-[1.65fr_1fr]">
          <ShipmentAnalytics />
          <ShipmentBreakdown />
        </section>

        {/* Shipment table */}
        <RecentShipments />

        {/* Rider performance + activity */}
        <section className="grid gap-5 xl:grid-cols-2">
          <RiderPerformance />
          <ActivityFeed />
        </section>

        {/* Admin quick actions */}
        <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5">
            <h2 className="font-bold text-slate-900">Quick access</h2>
            <p className="mt-1 text-sm text-slate-500">
              Jump directly to a platform management section.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <Link
              href="/admin/users"
              className="group flex items-center gap-3 rounded-xl border border-slate-200 p-4 transition hover:border-orange-200 hover:bg-orange-50/40"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Users className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-800">
                  Manage users
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Accounts and access
                </p>
              </div>
              <ArrowRight className="size-4 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-orange-500" />
            </Link>

            <Link
              href="/admin/riders"
              className="group flex items-center gap-3 rounded-xl border border-slate-200 p-4 transition hover:border-orange-200 hover:bg-orange-50/40"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                <Truck className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-800">
                  Manage riders
                </p>
                <p className="mt-1 text-xs text-slate-500">Rider network</p>
              </div>
              <ArrowRight className="size-4 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-orange-500" />
            </Link>

            <Link
              href="/admin/shipments"
              className="group flex items-center gap-3 rounded-xl border border-slate-200 p-4 transition hover:border-orange-200 hover:bg-orange-50/40"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <Package className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-800">
                  All shipments
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Track delivery flow
                </p>
              </div>
              <ArrowRight className="size-4 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-orange-500" />
            </Link>

            <Link
              href="/admin/payments"
              className="group flex items-center gap-3 rounded-xl border border-slate-200 p-4 transition hover:border-orange-200 hover:bg-orange-50/40"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Banknote className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-800">Payments</p>
                <p className="mt-1 text-xs text-slate-500">
                  Financial overview
                </p>
              </div>
              <ArrowRight className="size-4 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-orange-500" />
            </Link>
          </div>
        </section>

        <footer className="flex flex-col justify-between gap-2 border-t border-slate-200/80 pt-5 text-xs text-slate-400 sm:flex-row sm:items-center">
          <p>SwiftDrop Admin · Logistics management platform</p>
          <p>Dashboard metrics shown are illustrative demo data.</p>
        </footer>
      </div>
    </main>
  );
}
