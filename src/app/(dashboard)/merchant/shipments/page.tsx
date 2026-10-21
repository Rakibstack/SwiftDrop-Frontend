"use client";

import {
  ArrowRight,
  Package,
  Plus,
  RefreshCw,
  Search,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { PaymentStatusHandler } from "@/components/dashboard/merchant/PaymentStatusHandler";
import { Button } from "@/components/ui/button";
import { useShipments } from "@/hooks";
import { useDataTable } from "@/hooks/shared/useDataTable";
import type { Shipment, ShipmentStatus } from "@/types/shipment.types";

const statuses: { label: string; value: ShipmentStatus | "" }[] = [
  { label: "All statuses", value: "" },
  { label: "Payment pending", value: "PAYMENT_PENDING" },
  { label: "Payment confirmed", value: "PAYMENT_CONFIRMED" },
  { label: "Assigned", value: "ASSIGNED" },
  { label: "Accepted", value: "ACCEPTED" },
  { label: "Picked up", value: "PICKED_UP" },
  { label: "In transit", value: "IN_TRANSIT" },
  { label: "Out for delivery", value: "OUT_FOR_DELIVERY" },
  { label: "Delivered", value: "DELIVERED" },
  { label: "Delivery failed", value: "DELIVERY_FAILED" },
];

function formatMoney(amount: number) {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 2,
  }).format(amount);
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function formatStatus(status: ShipmentStatus) {
  return status
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function StatusBadge({ status }: { status: ShipmentStatus }) {
  const styles: Record<ShipmentStatus, string> = {
    PAYMENT_PENDING: "bg-amber-500/10 text-amber-700 dark:text-amber-400 ring-amber-500/20",
    PAYMENT_CONFIRMED: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 ring-emerald-500/20",
    CANCELLED: "bg-red-500/10 text-red-700 dark:text-red-400 ring-red-500/20",
    ASSIGNED: "bg-blue-500/10 text-blue-700 dark:text-blue-400 ring-blue-500/20",
    ACCEPTED: "bg-blue-500/10 text-blue-700 dark:text-blue-400 ring-blue-500/20",
    PICKED_UP: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 ring-indigo-500/20",
    IN_TRANSIT: "bg-violet-500/10 text-violet-700 dark:text-violet-400 ring-violet-500/20",
    OUT_FOR_DELIVERY: "bg-orange-500/10 text-orange-700 dark:text-orange-400 ring-orange-500/20",
    DELIVERED: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 ring-emerald-500/20",
    DELIVERY_FAILED: "bg-red-500/10 text-red-700 dark:text-red-400 ring-red-500/20",
  };

  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${styles[status]}`}
    >
      {formatStatus(status)}
    </span>
  );
}

function PaymentBadge({ status }: { status: ShipmentStatus }) {
  const confirmed = status !== "PAYMENT_PENDING";

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-medium ${
        confirmed ? "text-emerald-700 dark:text-emerald-400" : "text-amber-700 dark:text-amber-400"
      }`}
    >
      <span
        className={`size-1.5 rounded-full ${
          confirmed ? "bg-emerald-500" : "bg-amber-500"
        }`}
      />
      {confirmed ? "Confirmed" : "Payment due"}
    </span>
  );
}

export default function MerchantShipmentsPage() {
  const table = useDataTable();

  const query = useMemo(
    () => ({
      page: table.page,
      limit: table.limit,
      ...(table.searchTerm.trim()
        ? { searchTerm: table.searchTerm.trim() }
        : {}),
      ...(table.status ? { status: table.status as ShipmentStatus } : {}),
    }),
    [table.page, table.limit, table.searchTerm, table.status],
  );

  const {
    data: response,
    isPending,
    isError,
    refetch,
    isFetching,
  } = useShipments(query);

  const shipments: Shipment[] = response?.data.data ?? [];
  const meta = response?.meta;

  const total = meta?.total ?? 0;
  const totalPages = meta?.totalPages ?? 1;

  return (
    <main className="mx-auto w-full max-w-[1500px] space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
            <Truck className="size-4" />
            Merchant dashboard
            <span>/</span>
            <span className="text-foreground">Shipments</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            All shipments
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Track your deliveries, check payment status and manage your shipment
            details.
          </p>
        </div>

        <Link href="/merchant/shipments/create">
          <Button className="h-11 w-full rounded-xl bg-orange-600 text-white hover:bg-orange-700 sm:w-auto">
            <Plus className="mr-2 size-4" />
            Create shipment
          </Button>
        </Link>
      </div>

      {/* Summary */}
      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              Total matching shipments
            </p>
            <div className="flex size-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400">
              <Package className="size-5" />
            </div>
          </div>
          <p className="mt-3 text-3xl font-bold text-foreground">
            {isPending ? "—" : total}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Based on the current search and filters
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              Awaiting payment
            </p>
            <div className="flex size-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Truck className="size-5" />
            </div>
          </div>
          <p className="mt-3 text-3xl font-bold text-foreground">
            {isPending
              ? "—"
              : shipments.filter(
                  (shipment) => shipment.status === "PAYMENT_PENDING",
                ).length}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Pending shipments on this page
          </p>
        </div>
      </section>

      {/* Table card */}
      <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="flex flex-col gap-4 border-b border-border p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-semibold text-foreground">Shipment records</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Select a shipment to view its full details.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative min-w-0 sm:min-w-64">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                aria-label="Search shipments"
                value={table.searchTerm}
                onChange={(event) => table.setSearchTerm(event.target.value)}
                placeholder="Search recipient or address..."
                className="h-10 w-full rounded-xl border border-border bg-card pl-9 pr-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10"
              />
            </div>

            <select
              aria-label="Filter by shipment status"
              value={table.status}
              onChange={(event) => table.setStatus(event.target.value)}
              className="h-10 rounded-xl border border-border bg-card px-3 text-sm text-foreground outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10"
            >
              {statuses.map((status) => (
                <option key={status.label} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>

            <Button
              type="button"
              variant="outline"
              aria-label="Refresh shipments"
              onClick={() => void refetch()}
              disabled={isFetching}
              className="h-10 rounded-xl"
            >
              <RefreshCw
                className={`size-4 ${isFetching ? "animate-spin" : ""}`}
              />
            </Button>
          </div>
        </div>
        <PaymentStatusHandler />

        {isError ? (
          <div className="flex flex-col items-center px-5 py-16 text-center">
            <Package className="size-10 text-muted-foreground" />
            <h3 className="mt-4 font-semibold text-foreground">
              Could not load shipments
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Check your connection and try again.
            </p>
            <Button
              onClick={() => void refetch()}
              className="mt-5 rounded-xl bg-orange-600 text-white hover:bg-orange-700"
            >
              Try again
            </Button>
          </div>
        ) : isPending ? (
          <div className="space-y-4 p-5">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="h-16 animate-pulse rounded-xl bg-muted"
              />
            ))}
          </div>
        ) : shipments.length === 0 ? (
          <div className="flex flex-col items-center px-5 py-16 text-center">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-600 dark:text-orange-400">
              <Package className="size-7" />
            </div>
            <h3 className="mt-4 font-semibold text-foreground">
              No shipments found
            </h3>
            <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
              {table.searchTerm || table.status
                ? "Try changing your search or status filter."
                : "Your shipments will appear here after you create your first one."}
            </p>
            {!table.searchTerm && !table.status && (
              <Link href="/merchant/shipments/create" className="mt-5">
                <Button className="rounded-xl bg-orange-600 text-white hover:bg-orange-700">
                  <Plus className="mr-2 size-4" />
                  Create your first shipment
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[1050px] text-left">
                <thead className="bg-muted/80">
                  <tr className="border-b border-border text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    <th className="px-5 py-4">Shipment</th>
                    <th className="px-5 py-4">Recipient</th>
                    <th className="px-5 py-4">Delivery fee</th>
                    <th className="px-5 py-4">COD</th>
                    <th className="px-5 py-4">Payment</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4">Created</th>
                    <th className="px-5 py-4"> </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-border">
                  {shipments.map((shipment) => (
                    <tr
                      key={shipment.id}
                      className="transition hover:bg-orange-500/10/30"
                    >
                      <td className="px-5 py-4">
                        <Link
                          href={`/merchant/shipments/${shipment.id}`}
                          className="font-semibold text-foreground hover:text-orange-700 dark:text-orange-400"
                        >
                          {shipment.trackingId}
                        </Link>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {shipment.parcelType}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="font-medium text-foreground">
                          {shipment.recipientName}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {shipment.recipientPhone}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-sm font-semibold text-foreground">
                        {formatMoney(shipment.deliveryFee)}
                      </td>

                      <td className="px-5 py-4 text-sm text-foreground">
                        {formatMoney(shipment.codAmount)}
                      </td>

                      <td className="px-5 py-4">
                        <PaymentBadge status={shipment.status} />
                      </td>

                      <td className="px-5 py-4">
                        <StatusBadge status={shipment.status} />
                      </td>

                      <td className="px-5 py-4 text-sm text-muted-foreground">
                        {formatDate(shipment.createdAt)}
                      </td>

                      <td className="px-5 py-4">
                        <Link
                          aria-label={`View shipment ${shipment.trackingId}`}
                          href={`/merchant/shipments/${shipment.id}`}
                          className="inline-flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition hover:border-orange-500/20 hover:bg-orange-500/10 hover:text-orange-600 dark:text-orange-400"
                        >
                          <ArrowRight className="size-4" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="grid gap-3 p-4 md:hidden">
              {shipments.map((shipment) => (
                <Link
                  key={shipment.id}
                  href={`/merchant/shipments/${shipment.id}`}
                  className="rounded-xl border border-border p-4 transition hover:border-orange-500/20 hover:bg-orange-500/10/30"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="break-all text-sm font-semibold text-foreground">
                        {shipment.trackingId}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {shipment.parcelType} · {formatDate(shipment.createdAt)}
                      </p>
                    </div>
                    <ArrowRight className="mt-1 size-4 shrink-0 text-muted-foreground" />
                  </div>

                  <div className="mt-4">
                    <p className="text-sm font-medium text-foreground">
                      {shipment.recipientName}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {shipment.recipientPhone}
                    </p>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <StatusBadge status={shipment.status} />
                    <PaymentBadge status={shipment.status} />
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Delivery fee</p>
                      <p className="mt-1 text-sm font-semibold text-foreground">
                        {formatMoney(shipment.deliveryFee)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">COD amount</p>
                      <p className="mt-1 text-sm font-semibold text-foreground">
                        {formatMoney(shipment.codAmount)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-3 border-t border-border px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
              <p className="text-sm text-muted-foreground">
                Page {table.page} of {Math.max(totalPages, 1)} · {total} results
              </p>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  disabled={table.page <= 1 || isFetching}
                  onClick={() => table.setPage(table.page - 1)}
                  className="rounded-xl"
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  disabled={
                    table.page >= totalPages || totalPages === 0 || isFetching
                  }
                  onClick={() => table.setPage(table.page + 1)}
                  className="rounded-xl"
                >
                  Next
                </Button>
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
