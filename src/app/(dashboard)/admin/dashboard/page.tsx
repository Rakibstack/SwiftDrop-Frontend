"use client";

import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  CircleDollarSign,
  Package,
  RefreshCw,
  Truck,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAdminAnalytics } from "@/hooks/AdminAnalytics.hooks";
import { AnalyticsStatCard } from "@/components/admin/analytics/AnalyticsStatCard";
import RevenueChart from "@/components/admin/Revenue/RevenueChart";
import ShipmentStatusOverview from "@/components/admin/ShipmentStatusOverview";
import RecentShipments from "@/components/admin/RecentShipments";
import RecentActivity from "@/components/admin/RecentActivity";
import { AIInsightsCard } from "@/components/admin/analytics/AIInsightsCard";

function formatBDT(amount: number) {
  return `৳${amount.toLocaleString("en-BD", {
    maximumFractionDigits: 2,
  })}`;
}

function formatToday() {
  return new Intl.DateTimeFormat("en-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-32 animate-pulse rounded-2xl bg-muted" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-36 animate-pulse rounded-2xl bg-muted"
          />
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="h-80 animate-pulse rounded-2xl bg-muted" />
        <div className="h-80 animate-pulse rounded-2xl bg-muted" />
      </div>
    </div>
  );
}

export default function AdminAnalyticsDashboard() {
  const { data, isLoading, isError, error, refetch, isFetching } =
    useAdminAnalytics();

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (isError || !data) {
    return (
      <Card className="rounded-2xl border-border bg-card">
        <CardContent className="flex flex-col items-center px-6 py-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
            <Activity className="h-7 w-7" />
          </div>

          <h2 className="mt-5 text-lg font-bold">Unable to load analytics</h2>

          <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            {error instanceof Error
              ? error.message
              : "Something went wrong while fetching admin analytics."}
          </p>

          <Button
            type="button"
            onClick={() => void refetch()}
            className="mt-6 gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Try again
          </Button>
        </CardContent>
      </Card>
    );
  }

  const { overview, revenue, recentShipments, recentActivities } = data;

  const stats = [
    {
      title: "Total users",
      value: overview.totalUsers.toLocaleString("en-BD"),
      description: `${overview.activeUsers.toLocaleString("en-BD")} active users`,
      icon: Users,
      accent: "orange" as const,
    },
    {
      title: "Active riders",
      value: overview.activeRiders.toLocaleString("en-BD"),
      description: "Currently active rider profiles",
      icon: Truck,
      accent: "blue" as const,
    },
    {
      title: "Total shipments",
      value: overview.totalShipments.toLocaleString("en-BD"),
      description: `${overview.todayShipments} created today`,
      icon: Package,
      accent: "green" as const,
    },
    {
      title: "Total paid amount",
      value: formatBDT(revenue.totalPaidAmount),
      description: `${revenue.totalPaidTransactions} paid transactions`,
      icon: CircleDollarSign,
      accent: "violet" as const,
    },
  ];

  return (
    <div className="space-y-7 pb-8">
      {/* Page heading */}
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-orange-600 dark:text-orange-400">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Admin workspace
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Dashboard overview
          </h1>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Monitor shipments, payments, users, and delivery operations.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-xs text-muted-foreground">Today</p>
            <p className="mt-1 text-sm font-semibold">{formatToday()}</p>
          </div>

          <Button
            type="button"
            variant="outline"
            disabled={isFetching}
            onClick={() => void refetch()}
            className="gap-2 rounded-xl"
          >
            <RefreshCw
              className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
            />
            <span>{isFetching ? "Refreshing..." : "Refresh"}</span>
          </Button>
        </div>
      </div>

    
      {/* Overview cards */}
      <section aria-label="Key metrics">
        <div className="mb-4">
          <h2 className="text-sm font-semibold text-foreground">
            Platform overview
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <AnalyticsStatCard key={stat.title} {...stat} />
          ))}
        </div>
      </section>

        <div className="space-y-6">
        <AIInsightsCard />

      </div>


      {/* Revenue + status */}
      <section
        aria-label="Revenue and shipment analytics"
        className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr] xl:gap-6"
      >
        <RevenueChart trend={revenue.trend} currency="BDT" />
        <ShipmentStatusOverview overview={overview} />
      </section>

      {/* Secondary metrics */}
      <section aria-label="Additional metrics">
        <div className="mb-4">
          <h2 className="text-sm font-semibold text-foreground">
            Operational snapshot
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Current shipment and payment activity
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <AnalyticsStatCard
            title="Pending payment"
            value={overview.pendingShipments.toLocaleString("en-BD")}
            description="Awaiting payment"
            icon={ArrowDownRight}
            accent="orange"
          />

          <AnalyticsStatCard
            title="Payment confirmed"
            value={overview.confirmedShipments.toLocaleString("en-BD")}
            description="Payment confirmed status"
            icon={ArrowUpRight}
            accent="blue"
          />

          <AnalyticsStatCard
            title="Delivered"
            value={overview.deliveredShipments.toLocaleString("en-BD")}
            description="Successfully delivered"
            icon={Truck}
            accent="green"
          />

          <AnalyticsStatCard
            title="Today's revenue"
            value={formatBDT(revenue.todayPaidAmount)}
            description={`${revenue.todayPaidTransactions} paid transactions today`}
            icon={CircleDollarSign}
            accent="violet"
          />
        </div>
      </section>

      {/* Recent data */}
      <section
        aria-label="Recent shipment activity"
        className="grid items-start gap-5 xl:grid-cols-[1.3fr_0.7fr] xl:gap-6"
      >
        <RecentShipments shipments={recentShipments} />
        <RecentActivity activities={recentActivities} />
      </section>
    </div>
  );
}
