import { cn } from "@/lib/utils";
import type { ShipmentStatus } from "@/types/shipment.types";

interface StatusBadgeProps {
  status: ShipmentStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const formatStatus = (status: ShipmentStatus) => {
    return status
      .toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Theme-aware status colors
  const styles: Record<ShipmentStatus, string> = {
    PAYMENT_PENDING:
      "bg-amber-100 text-amber-900 ring-amber-300 dark:bg-amber-950 dark:text-amber-300 dark:ring-amber-800",
    PAYMENT_CONFIRMED:
      "bg-blue-100 text-blue-900 ring-blue-300 dark:bg-blue-950 dark:text-blue-300 dark:ring-blue-800",
    CANCELLED:
      "bg-red-100 text-red-900 ring-red-300 dark:bg-red-950 dark:text-red-300 dark:ring-red-800",
    ASSIGNED:
      "bg-violet-100 text-violet-900 ring-violet-300 dark:bg-violet-950 dark:text-violet-300 dark:ring-violet-800",
    ACCEPTED:
      "bg-indigo-100 text-indigo-900 ring-indigo-300 dark:bg-indigo-950 dark:text-indigo-300 dark:ring-indigo-800",
    PICKED_UP:
      "bg-cyan-100 text-cyan-900 ring-cyan-300 dark:bg-cyan-950 dark:text-cyan-300 dark:ring-cyan-800",
    IN_TRANSIT:
      "bg-orange-100 text-orange-900 ring-orange-300 dark:bg-orange-950 dark:text-orange-300 dark:ring-orange-800",
    OUT_FOR_DELIVERY:
      "bg-orange-100 text-orange-950 ring-orange-300 dark:bg-orange-950 dark:text-orange-200 dark:ring-orange-800",
    DELIVERED:
      "bg-emerald-100 text-emerald-900 ring-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:ring-emerald-800",
    DELIVERY_FAILED:
      "bg-red-100 text-red-900 ring-red-300 dark:bg-red-950 dark:text-red-300 dark:ring-red-800",
  };

  return (
    <span
      className={cn(
        "inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset transition-colors",
        styles[status],
        className,
      )}
    >
      {formatStatus(status)}
    </span>
  );
}
