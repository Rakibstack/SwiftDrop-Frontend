
import {
  Activity,
  CheckCircle2,
  Clock3,
  Package,
  Truck,
  XCircle,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type {
  RecentActivity as RecentActivityItem,
} from "@/types/admin-analytics.types";

interface RecentActivityProps {
  activities: RecentActivityItem[];
}

function getActivityIcon(status: string) {
  switch (status) {
    case "DELIVERED":
      return CheckCircle2;
    case "CANCELLED":
      return XCircle;
    case "IN_TRANSIT":
    case "OUT_FOR_DELIVERY":
    case "ASSIGNED":
      return Truck;
    case "PAYMENT_PENDING":
    case "PAYMENT_CONFIRMED":
      return Package;
    default:
      return Activity;
  }
}

function formatActivityDate(value: string) {
  return new Intl.DateTimeFormat("en-BD", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(value));
}

export default function RecentActivity({
  activities,
}: RecentActivityProps) {
  return (
    <Card className="rounded-2xl border-border/70 bg-card shadow-sm">
      <CardHeader>
        <CardTitle className="text-base font-bold sm:text-lg">
          Recent activity
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          The latest shipment events across SwiftDrop
        </p>
      </CardHeader>

      <CardContent>
        {activities.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <Clock3 className="mb-3 h-8 w-8 text-muted-foreground/50" />
            <p className="text-sm font-semibold">Nothing to report yet</p>
            <p className="mt-1 text-xs text-muted-foreground">
              New shipment events will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-0">
            {activities.map((activity, index) => {
              const Icon = getActivityIcon(activity.status);

              return (
                <div
                  key={activity.id}
                  className="relative flex gap-3 pb-5 last:pb-0 sm:gap-4"
                >
                  {index !== activities.length - 1 && (
                    <div className="absolute bottom-0 left-[17px] top-9 w-px bg-border" />
                  )}

                  <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-muted/60 text-muted-foreground">
                    <Icon className="h-4 w-4" />
                  </div>

                  <div className="min-w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium leading-6 text-foreground">
                      {activity.description}
                    </p>

                    <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                      <span>
                        {formatActivityDate(activity.createdAt)}
                      </span>
                      <span className="font-mono">
                        #{activity.shipmentId.slice(0, 8)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
