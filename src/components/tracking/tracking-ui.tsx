
import {
  CheckCircle2,
  Circle,
  Clock3,
  MapPin,
  Package,
} from "lucide-react";

import type {
  ShipmentStatus,
  TrackingEvent,
} from "@/types/tracking.types";

const statusConfig: Record<
  ShipmentStatus,
  { label: string; className: string }
> = {
  PAYMENT_PENDING: {
    label: "Payment pending",
    className: "bg-amber-50 text-amber-700 ring-amber-200",
  },
  PAYMENT_CONFIRMED: {
    label: "Payment confirmed",
    className: "bg-blue-50 text-blue-700 ring-blue-200",
  },
  ASSIGNED: {
    label: "Rider assigned",
    className: "bg-violet-50 text-violet-700 ring-violet-200",
  },
  PICKED_UP: {
    label: "Picked up",
    className: "bg-sky-50 text-sky-700 ring-sky-200",
  },
  IN_TRANSIT: {
    label: "In transit",
    className: "bg-indigo-50 text-indigo-700 ring-indigo-200",
  },
  OUT_FOR_DELIVERY: {
    label: "Out for delivery",
    className: "bg-orange-50 text-orange-700 ring-orange-200",
  },
  DELIVERED: {
    label: "Delivered",
    className: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  },
  DELIVERY_FAILED: {
    label: "Delivery failed",
    className: "bg-rose-50 text-rose-700 ring-rose-200",
  },
  CANCELLED: {
    label: "Cancelled",
    className: "bg-gray-100 text-gray-700 ring-gray-200",
  },
  RETURNED: {
    label: "Returned",
    className: "bg-rose-50 text-rose-700 ring-rose-200",
  },
};

// Fallback for statuses not yet included in the frontend configuration.
function getStatusConfig(status: string | null | undefined) {
  const normalizedStatus = status?.trim();

  if (
    normalizedStatus &&
    Object.prototype.hasOwnProperty.call(statusConfig, normalizedStatus)
  ) {
    return statusConfig[normalizedStatus as ShipmentStatus];
  }

  return {
    label: normalizedStatus
      ? normalizedStatus.replaceAll("_", " ")
      : "Unknown status",
    className: "bg-muted text-muted-foreground ring-border",
  };
}

export function ShipmentStatusBadge({
  status,
}: {
  status: ShipmentStatus;
}) {
  const config = getStatusConfig(status);

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${config.className}`}
    >
      {config.label}
    </span>
  );
}

export function formatTrackingDate(date: string) {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Date unavailable";
  }

  return new Intl.DateTimeFormat("en-BD", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Dhaka",
  }).format(parsedDate);
}

export function TrackingTimeline({
  events,
}: {
  events: TrackingEvent[];
}) {
  // Sort a copy, preserving the original API response.
  // Oldest event first; latest event appears at the bottom.
  const sortedEvents = [...events].sort(
    (a, b) =>
      new Date(a.createdAt).getTime() -
      new Date(b.createdAt).getTime(),
  );

  if (sortedEvents.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-6 text-center">
        <Clock3 className="mx-auto mb-3 size-7 text-muted-foreground" />

        <p className="font-medium">No tracking updates yet</p>

        <p className="mt-1 text-sm text-muted-foreground">
          Shipment activity will appear here when available.
        </p>
      </div>
    );
  }

  return (
    <ol className="space-y-0">
      {sortedEvents.map((event, index) => {
        const isLatest = index === sortedEvents.length - 1;
        const config = getStatusConfig(event.status);

        return (
          <li
            key={`${event.status}-${event.createdAt}-${index}`}
            className="relative flex gap-4 pb-7 last:pb-0"
          >
            <div className="relative flex w-6 shrink-0 justify-center">
              {index !== sortedEvents.length - 1 && (
                <span className="absolute top-6 h-full w-px bg-border" />
              )}

              <span
                className={`relative z-10 flex size-6 items-center justify-center rounded-full ring-4 ring-background ${
                  isLatest
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {isLatest ? (
                  <CheckCircle2 className="size-4" />
                ) : (
                  <Circle className="size-3" />
                )}
              </span>
            </div>

            <div className="min-w-0 flex-1 pb-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-semibold text-foreground">
                  {config.label}
                </p>

                {isLatest && (
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">
                    Latest
                  </span>
                )}
              </div>

              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                {event.description || "No description available."}
              </p>

              {event.location && (
                <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="size-3.5" />
                  {event.location}
                </p>
              )}

              <p className="mt-2 text-xs text-muted-foreground">
                {formatTrackingDate(event.createdAt)}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export function TrackingSectionHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mb-5 flex items-start gap-3">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Package className="size-5" />
      </div>

      <div>
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>

        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}
