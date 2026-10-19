

import Link from "next/link";
import { ArrowUpRight, Package } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import type {
  RecentShipment,
} from "@/types/admin-analytics.types";

interface RecentShipmentsProps {
  shipments: RecentShipment[];
}

const statusStyles: Record<string, string> = {
  PAYMENT_PENDING:
    "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-400",
  PAYMENT_CONFIRMED:
    "border-blue-500/20 bg-blue-500/10 text-blue-700 dark:text-blue-400",
  ASSIGNED:
    "border-violet-500/20 bg-violet-500/10 text-violet-700 dark:text-violet-400",
  IN_TRANSIT:
    "border-indigo-500/20 bg-indigo-500/10 text-indigo-700 dark:text-indigo-400",
  OUT_FOR_DELIVERY:
    "border-orange-500/20 bg-orange-500/10 text-orange-700 dark:text-orange-400",
  DELIVERED:
    "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  CANCELLED:
    "border-rose-500/20 bg-rose-500/10 text-rose-700 dark:text-rose-400",
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-BD", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export default function RecentShipments({
  shipments,
}: RecentShipmentsProps) {
  return (
    <Card className="rounded-2xl border-border/70 bg-card shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between gap-3 space-y-0">
        <div>
          <CardTitle className="text-base font-bold sm:text-lg">
            Recent shipments
          </CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">
            Latest shipments created on the platform
          </p>
        </div>

        <Link
          href="/admin/shipments"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2 py-2 text-xs font-semibold text-orange-600 transition hover:bg-orange-500/10 dark:text-orange-400 sm:text-sm"
        >
          View all
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </CardHeader>

      <CardContent>
        {shipments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Package className="mb-3 h-8 w-8 text-muted-foreground/50" />
            <p className="text-sm font-semibold">No shipments yet</p>
            <p className="mt-1 text-xs text-muted-foreground">
              New shipments will appear here.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border text-xs text-muted-foreground">
                    <th className="pb-3 pr-4 font-medium">Shipment</th>
                    <th className="pb-3 pr-4 font-medium">Recipient</th>
                    <th className="pb-3 pr-4 font-medium">Status</th>
                    <th className="pb-3 pr-4 text-right font-medium">
                      Delivery fee
                    </th>
                    <th className="pb-3 text-right font-medium">Date</th>
                  </tr>
                </thead>

                <tbody>
                  {shipments.map((shipment) => (
                    <tr
                      key={shipment.id}
                      className="border-b border-border/60 last:border-0"
                    >
                      <td className="py-4 pr-4">
                        <p className="font-semibold text-foreground">
                          {shipment.senderName}
                        </p>
                        <p className="mt-1 font-mono text-[10px] text-muted-foreground">
                          {shipment.id.slice(0, 8)}
                        </p>
                      </td>

                      <td className="max-w-40 py-4 pr-4">
                        <p className="truncate text-muted-foreground">
                          {shipment.recipientAddress}
                        </p>
                      </td>

                      <td className="py-4 pr-4">
                        <Badge
                          variant="outline"
                          className={`whitespace-nowrap text-[10px] font-semibold ${statusStyles[shipment.status] ?? ""}`}
                        >
                          {shipment.status.replaceAll("_", " ")}
                        </Badge>
                      </td>

                      <td className="py-4 pr-4 text-right font-semibold tabular-nums">
                        ৳{Number(shipment.deliveryFee).toLocaleString("en-BD")}
                      </td>

                      <td className="whitespace-nowrap py-4 text-right text-xs text-muted-foreground">
                        {formatDate(shipment.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile-friendly list */}
            <div className="space-y-3 md:hidden">
              {shipments.map((shipment) => (
                <div
                  key={shipment.id}
                  className="rounded-xl border border-border/70 p-3.5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">
                        {shipment.senderName}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        #{shipment.id.slice(0, 8)}
                      </p>
                    </div>

                    <Badge
                      variant="outline"
                      className={`shrink-0 text-[9px] ${statusStyles[shipment.status] ?? ""}`}
                    >
                      {shipment.status.replaceAll("_", " ")}
                    </Badge>
                  </div>

                  <p className="mt-3 truncate text-xs text-muted-foreground">
                    {shipment.recipientAddress}
                  </p>

                  <div className="mt-3 flex items-center justify-between gap-3 border-t border-border/60 pt-3">
                    <span className="text-xs text-muted-foreground">
                      {formatDate(shipment.createdAt)}
                    </span>
                    <span className="text-sm font-bold">
                      ৳{Number(shipment.deliveryFee).toLocaleString("en-BD")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
