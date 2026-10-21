"use client";

import {
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Package,
  RefreshCw,
  Search,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useAdminShipments } from "@/hooks/admin.shipments.hooks";
import type {
  AdminShipment,
  ShipmentStatus,
} from "@/types/admin-shipment.types";

const statuses: Array<ShipmentStatus | ""> = [
  "",
  "PAYMENT_PENDING",
  "PAYMENT_CONFIRMED",
  "ASSIGNED",
  "ACCEPTED",
  "PICKED_UP",
  "IN_TRANSIT",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
  "DELIVERY_FAILED",
  "CANCELLED",
];

const statusStyles: Record<string, string> = {
  PAYMENT_PENDING: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  PAYMENT_CONFIRMED: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  ASSIGNED: "bg-violet-500/10 text-violet-700 dark:text-violet-400",
  ACCEPTED: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-400",
  PICKED_UP: "bg-sky-500/10 text-sky-700 dark:text-sky-400",
  IN_TRANSIT: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-400",
  OUT_FOR_DELIVERY: "bg-orange-500/10 text-orange-700 dark:text-orange-400",
  DELIVERED: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  DELIVERY_FAILED: "bg-red-500/10 text-red-700 dark:text-red-400",
  CANCELLED: "bg-muted text-muted-foreground",
};

function money(value: string | number | null | undefined) {
  const amount = Number(value ?? 0);

  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(amount) ? amount : 0);
}

function formatDate(value: string | null | undefined) {
  if (!value) return "—";

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) return "—";

  return new Intl.DateTimeFormat("en-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(parsedDate);
}

function StatusBadge({ status }: { status: ShipmentStatus }) {
  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${
        statusStyles[status] ?? "bg-muted text-muted-foreground"
      }`}
    >
      {status.replaceAll("_", " ")}
    </span>
  );
}

export default function AdminShipmentsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<ShipmentStatus | "">("");
  const [page, setPage] = useState(1);

  const limit = 10;

  const { data, isPending, isError, refetch, isFetching } = useAdminShipments({
    page,
    limit,
    searchTerm: search.trim(),
    status,
  });
  
  const response = data?.data;
  const shipments: AdminShipment[] = response?.data ?? [];
  const meta = response?.meta;

  const total = meta?.total ?? shipments.length;
  const totalPages = meta?.totalPages ?? 1;

  const summary = [
    {
      title: "Total shipments",
      value: total,
      icon: Package,
      color: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
    },
    {
      title: "Awaiting payment",
      value: shipments.filter(
        (shipment) => shipment.status === "PAYMENT_PENDING",
      ).length,
      icon: Clock3,
      color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    },
    {
      title: "In transit",
      value: shipments.filter((shipment) =>
        ["PICKED_UP", "IN_TRANSIT", "OUT_FOR_DELIVERY"].includes(
          shipment.status,
        ),
      ).length,
      icon: Truck,
      color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    },
    {
      title: "Delivered",
      value: shipments.filter((shipment) => shipment.status === "DELIVERED")
        .length,
      icon: CheckCircle2,
      color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
  ];

  return (
    <main className="min-w-0 space-y-7 pb-10">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-orange-600 dark:text-orange-400">
            OPERATIONS / SHIPMENTS
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
            Shipment management
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Monitor deliveries, review shipment records and manage rider
            assignments.
          </p>
        </div>

        <button
          type="button"
          onClick={() => void refetch()}
          disabled={isFetching}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold transition hover:bg-muted disabled:opacity-60"
        >
          <RefreshCw size={16} className={isFetching ? "animate-spin" : ""} />
          Refresh data
        </button>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summary.map((item) => {
          const Icon = item.icon;

          return (
            <article
              key={item.title}
              className="rounded-2xl border border-border/80 bg-card p-5 shadow-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">{item.title}</p>

                <span className={`rounded-xl p-2.5 ${item.color}`}>
                  <Icon size={19} />
                </span>
              </div>

              <p className="mt-5 text-3xl font-bold tracking-tight text-foreground">
                {isPending ? "—" : item.value.toLocaleString()}
              </p>
            </article>
          );
        })}
      </section>

      <section className="overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm">
        <div className="border-b border-border p-5 sm:p-6">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-lg font-bold text-foreground">All shipments</h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Search, filter and inspect delivery records.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex items-center gap-2 rounded-xl border border-border px-3 focus-within:border-orange-400">
                <Search size={17} className="shrink-0 text-muted-foreground" />

                <input
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setPage(1);
                  }}
                  placeholder="Tracking ID, sender..."
                  aria-label="Search shipments"
                  className="h-11 min-w-0 bg-transparent text-sm outline-none sm:w-56"
                />
              </div>

              <select
                value={status}
                onChange={(event) => {
                  setStatus(event.target.value as ShipmentStatus | "");
                  setPage(1);
                }}
                aria-label="Filter by shipment status"
                className="h-11 rounded-xl border border-border bg-card px-3 text-sm outline-none focus:border-orange-400"
              >
                {statuses.map((item) => (
                  <option key={item || "ALL"} value={item}>
                    {item ? item.replaceAll("_", " ") : "All statuses"}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {isError ? (
          <div className="p-12 text-center">
            <h3 className="font-semibold text-foreground">
              Could not load shipments
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Check your connection and try again.
            </p>

            <button
              type="button"
              onClick={() => void refetch()}
              className="mt-4 rounded-xl bg-zinc-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800"
            >
              Try again
            </button>
          </div>
        ) : isPending ? (
          <div className="space-y-4 p-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-14 animate-pulse rounded-xl bg-muted"
              />
            ))}
          </div>
        ) : shipments.length === 0 ? (
          <div className="p-14 text-center">
            <Package className="mx-auto text-muted-foreground" size={34} />

            <h3 className="mt-4 font-semibold text-foreground">
              No shipments found
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Try changing your search or status filter.
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[920px] text-left">
                <thead className="bg-muted/80 text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Shipment</th>
                    <th className="px-6 py-4 font-semibold">Recipient</th>
                    <th className="px-6 py-4 font-semibold">Merchant</th>
                    <th className="px-6 py-4 font-semibold">Rider</th>
                    <th className="px-6 py-4 font-semibold">Fee</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold">Created</th>
                    <th className="px-6 py-4" />
                  </tr>
                </thead>

                <tbody className="divide-y divide-border">
                  {shipments.map((shipment) => (
                    <tr
                      key={shipment.id}
                      className="transition hover:bg-orange-500/10/30"
                    >
                      <td className="px-6 py-4">
                        <p className="font-semibold text-foreground">
                          {shipment.trackingId}
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          {shipment.parcelType.replaceAll("_", " ")}
                        </p>
                      </td>

                      <td className="px-6 py-4">
                        <p className="font-medium text-foreground">
                          {shipment.recipientName}
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          {shipment.recipientPhone}
                        </p>
                      </td>

                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-foreground">
                          {shipment.merchant?.businessName ?? "—"}
                        </p>
                      </td>

                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {shipment.rider?.user?.name ?? "Unassigned"}
                      </td>

                      <td className="px-6 py-4 text-sm font-semibold text-foreground">
                        {money(shipment.deliveryFee)}
                      </td>

                      <td className="px-6 py-4">
                        <StatusBadge status={shipment.status} />
                      </td>

                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {formatDate(shipment.createdAt)}
                      </td>

                      <td className="px-6 py-4">
                        <Link
                          href={`/admin/shipments/${shipment.id}`}
                          aria-label={`View ${shipment.trackingId}`}
                          className="inline-flex rounded-lg border border-border p-2 text-muted-foreground transition hover:border-orange-500/40 hover:text-orange-600 dark:text-orange-400"
                        >
                          <ArrowUpRight size={17} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col justify-between gap-3 border-t border-border px-5 py-4 sm:flex-row sm:items-center">
              <p className="text-sm text-muted-foreground">
                Showing {shipments.length} records
                {meta?.total != null ? ` of ${meta.total}` : ""}
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={page <= 1 || isFetching}
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                  className="rounded-lg border border-border px-3 py-2 text-sm transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>

                <span className="px-2 text-sm text-muted-foreground">
                  Page {page} of {totalPages}
                </span>

                <button
                  type="button"
                  disabled={isFetching || page >= totalPages}
                  onClick={() => setPage((current) => current + 1)}
                  className="rounded-lg border border-border px-3 py-2 text-sm transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
