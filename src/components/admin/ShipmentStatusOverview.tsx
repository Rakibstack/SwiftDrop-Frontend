

import { PackageCheck } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type {
  AdminAnalyticsOverview,
} from "@/types/admin-analytics.types";

interface ShipmentStatusOverviewProps {
  overview: AdminAnalyticsOverview;
}

const statuses = [
  {
    key: "pendingShipments",
    label: "Payment pending",
    color: "bg-amber-500",
  },
  {
    key: "confirmedShipments",
    label: "Payment confirmed",
    color: "bg-blue-500",
  },
  {
    key: "deliveredShipments",
    label: "Delivered",
    color: "bg-emerald-500",
  },
  {
    key: "cancelledShipments",
    label: "Cancelled",
    color: "bg-rose-500",
  },
] as const;

export default function ShipmentStatusOverview({
  overview,
}: ShipmentStatusOverviewProps) {
  return (
    <Card className="rounded-2xl border-border/70 bg-card shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between gap-3 space-y-0">
        <div>
          <CardTitle className="text-base font-bold sm:text-lg">
            Shipment status
          </CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">
            A snapshot of key shipment states
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
          <PackageCheck className="h-5 w-5" />
        </div>
      </CardHeader>

      <CardContent>
        <div className="mb-6 rounded-xl bg-muted/50 p-4">
          <p className="text-sm text-muted-foreground">
            Total shipments
          </p>
          <p className="mt-1 text-3xl font-bold tracking-tight">
            {overview.totalShipments.toLocaleString("en-BD")}
          </p>

          <div className="mt-4 flex h-2.5 overflow-hidden rounded-full bg-muted">
            {statuses.map((status) => {
              const count = overview[status.key];
              const percentage =
                overview.totalShipments > 0
                  ? (count / overview.totalShipments) * 100
                  : 0;

              return (
                <div
                  key={status.key}
                  className={`${status.color} transition-all duration-500`}
                  style={{ width: `${percentage}%` }}
                  title={`${status.label}: ${count}`}
                />
              );
            })}
          </div>
        </div>

        <div className="space-y-5">
          {statuses.map((status) => {
            const count = overview[status.key];
            const percentage =
              overview.totalShipments > 0
                ? (count / overview.totalShipments) * 100
                : 0;

            return (
              <div key={status.key}>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span
                      className={`h-2.5 w-2.5 shrink-0 rounded-full ${status.color}`}
                    />
                    <span className="truncate text-sm font-medium">
                      {status.label}
                    </span>
                  </div>

                  <div className="flex shrink-0 items-center gap-3">
                    <span className="text-sm font-bold">{count}</span>
                    <span className="w-10 text-right text-xs text-muted-foreground">
                      {percentage.toFixed(0)}%
                    </span>
                  </div>
                </div>

                <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${status.color}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-5 border-t border-border/70 pt-4 text-xs leading-5 text-muted-foreground">
          Other statuses, such as assigned or in transit, are included in the
          total but are not separately displayed in this summary.
        </p>
      </CardContent>
    </Card>
  );
}
