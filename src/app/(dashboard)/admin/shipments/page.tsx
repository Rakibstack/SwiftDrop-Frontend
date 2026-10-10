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
  PAYMENT_PENDING: "bg-amber-50 text-amber-700",
  PAYMENT_CONFIRMED: "bg-blue-50 text-blue-700",
  ASSIGNED: "bg-violet-50 text-violet-700",
  ACCEPTED: "bg-indigo-50 text-indigo-700",
  PICKED_UP: "bg-sky-50 text-sky-700",
  IN_TRANSIT: "bg-cyan-50 text-cyan-700",
  OUT_FOR_DELIVERY: "bg-orange-50 text-orange-700",
  DELIVERED: "bg-emerald-50 text-emerald-700",
  DELIVERY_FAILED: "bg-red-50 text-red-700",
  CANCELLED: "bg-zinc-100 text-zinc-600",
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
        statusStyles[status] ?? "bg-zinc-100 text-zinc-600"
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
      color: "bg-orange-50 text-orange-600",
    },
    {
      title: "Awaiting payment",
      value: shipments.filter(
        (shipment) => shipment.status === "PAYMENT_PENDING",
      ).length,
      icon: Clock3,
      color: "bg-amber-50 text-amber-600",
    },
    {
      title: "In transit",
      value: shipments.filter((shipment) =>
        ["PICKED_UP", "IN_TRANSIT", "OUT_FOR_DELIVERY"].includes(
          shipment.status,
        ),
      ).length,
      icon: Truck,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Delivered",
      value: shipments.filter((shipment) => shipment.status === "DELIVERED")
        .length,
      icon: CheckCircle2,
      color: "bg-emerald-50 text-emerald-600",
    },
  ];

  return (
    <main className="min-w-0 space-y-7 pb-10">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-orange-600">
            OPERATIONS / SHIPMENTS
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-950">
            Shipment management
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Monitor deliveries, review shipment records and manage rider
            assignments.
          </p>
        </div>

        <button
          type="button"
          onClick={() => void refetch()}
          disabled={isFetching}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-semibold transition hover:bg-zinc-50 disabled:opacity-60"
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
              className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-zinc-500">{item.title}</p>

                <span className={`rounded-xl p-2.5 ${item.color}`}>
                  <Icon size={19} />
                </span>
              </div>

              <p className="mt-5 text-3xl font-bold tracking-tight text-zinc-950">
                {isPending ? "—" : item.value.toLocaleString()}
              </p>
            </article>
          );
        })}
      </section>

      <section className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-sm">
        <div className="border-b border-zinc-100 p-5 sm:p-6">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-lg font-bold text-zinc-950">All shipments</h2>

              <p className="mt-1 text-sm text-zinc-500">
                Search, filter and inspect delivery records.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex items-center gap-2 rounded-xl border border-zinc-200 px-3 focus-within:border-orange-400">
                <Search size={17} className="shrink-0 text-zinc-400" />

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
                className="h-11 rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:border-orange-400"
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
            <h3 className="font-semibold text-zinc-900">
              Could not load shipments
            </h3>

            <p className="mt-2 text-sm text-zinc-500">
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
                className="h-14 animate-pulse rounded-xl bg-zinc-100"
              />
            ))}
          </div>
        ) : shipments.length === 0 ? (
          <div className="p-14 text-center">
            <Package className="mx-auto text-zinc-300" size={34} />

            <h3 className="mt-4 font-semibold text-zinc-900">
              No shipments found
            </h3>

            <p className="mt-1 text-sm text-zinc-500">
              Try changing your search or status filter.
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[920px] text-left">
                <thead className="bg-zinc-50/80 text-xs uppercase tracking-wider text-zinc-500">
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

                <tbody className="divide-y divide-zinc-100">
                  {shipments.map((shipment) => (
                    <tr
                      key={shipment.id}
                      className="transition hover:bg-orange-50/30"
                    >
                      <td className="px-6 py-4">
                        <p className="font-semibold text-zinc-900">
                          {shipment.trackingId}
                        </p>

                        <p className="mt-1 text-xs text-zinc-500">
                          {shipment.parcelType.replaceAll("_", " ")}
                        </p>
                      </td>

                      <td className="px-6 py-4">
                        <p className="font-medium text-zinc-800">
                          {shipment.recipientName}
                        </p>

                        <p className="mt-1 text-xs text-zinc-500">
                          {shipment.recipientPhone}
                        </p>
                      </td>

                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-zinc-800">
                          {shipment.merchant?.businessName ?? "—"}
                        </p>
                      </td>

                      <td className="px-6 py-4 text-sm text-zinc-600">
                        {shipment.rider?.user?.name ?? "Unassigned"}
                      </td>

                      <td className="px-6 py-4 text-sm font-semibold text-zinc-800">
                        {money(shipment.deliveryFee)}
                      </td>

                      <td className="px-6 py-4">
                        <StatusBadge status={shipment.status} />
                      </td>

                      <td className="px-6 py-4 text-sm text-zinc-500">
                        {formatDate(shipment.createdAt)}
                      </td>

                      <td className="px-6 py-4">
                        <Link
                          href={`/admin/shipments/${shipment.id}`}
                          aria-label={`View ${shipment.trackingId}`}
                          className="inline-flex rounded-lg border border-zinc-200 p-2 text-zinc-600 transition hover:border-orange-300 hover:text-orange-600"
                        >
                          <ArrowUpRight size={17} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col justify-between gap-3 border-t border-zinc-100 px-5 py-4 sm:flex-row sm:items-center">
              <p className="text-sm text-zinc-500">
                Showing {shipments.length} records
                {meta?.total != null ? ` of ${meta.total}` : ""}
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={page <= 1 || isFetching}
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                  className="rounded-lg border border-zinc-200 px-3 py-2 text-sm transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>

                <span className="px-2 text-sm text-zinc-600">
                  Page {page} of {totalPages}
                </span>

                <button
                  type="button"
                  disabled={isFetching || page >= totalPages}
                  onClick={() => setPage((current) => current + 1)}
                  className="rounded-lg border border-zinc-200 px-3 py-2 text-sm transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40"
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
