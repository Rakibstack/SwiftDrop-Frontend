
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Package,
  Search,
  Truck,
} from "lucide-react";

import { useAcceptShipment, useMyShipments } from "@/hooks/rider.hooks";

const PAGE_SIZE = 10;

const statusStyles: Record<string, string> = {
  ASSIGNED: "bg-amber-50 text-amber-700 ring-amber-200",
  ACCEPTED: "bg-blue-50 text-blue-700 ring-blue-200",
  PICKED_UP: "bg-violet-50 text-violet-700 ring-violet-200",
  IN_TRANSIT: "bg-indigo-50 text-indigo-700 ring-indigo-200",
  OUT_FOR_DELIVERY: "bg-orange-50 text-orange-700 ring-orange-200",
  DELIVERED: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  CANCELLED: "bg-red-50 text-red-700 ring-red-200",
};

function formatStatus(status: string) {
  return status.replaceAll("_", " ");
}

export default function RiderShipmentsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const { data, isPending, isError, refetch, isFetching } =
    useMyShipments({
      page,
      limit: PAGE_SIZE,
    });

  const acceptMutation = useAcceptShipment();

  const shipments = data?.data.data ?? [];
  const meta = data?.data.meta;

  const filteredShipments = useMemo(() => {
    const term = search.trim().toLowerCase();

    return shipments.filter((shipment) => {
      const matchesSearch = [
        shipment.trackingId,
        shipment.recipientName,
        shipment.recipientAddress,
      ].some((value) => value?.toLowerCase().includes(term));

      const matchesStatus =
        statusFilter === "ALL" || shipment.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [shipments, search, statusFilter]);

  const totalPages = meta?.totalPages ?? 1;
  const total = meta?.total ?? 0;

  return (
    <main className="mx-auto max-w-7xl space-y-7 pb-10">
      <section className="relative overflow-hidden rounded-3xl bg-slate-950 p-6 text-white sm:p-8">
        <div className="absolute -right-12 -top-20 size-64 rounded-full bg-orange-500/20 blur-3xl" />

        <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs text-slate-400">
              <Truck className="size-4 text-orange-400" />
              Rider workspace
              <ArrowDownRight className="size-3" />
              Shipments
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              My shipments
            </h1>

            <p className="mt-2 max-w-lg text-sm leading-6 text-slate-400">
              Manage your assigned parcels, accept new deliveries, and
              keep every shipment moving.
            </p>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
            <div className="flex size-12 items-center justify-center rounded-xl bg-orange-500/15 text-orange-400">
              <Package className="size-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Total shipments</p>
              <p className="mt-1 text-2xl font-bold">{total}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Assigned on this page</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">
            {shipments.filter((item) => item.status === "ASSIGNED").length}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Waiting for your acceptance
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Active on this page</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">
            {shipments.filter((item) =>
              ["ACCEPTED", "PICKED_UP", "IN_TRANSIT", "OUT_FOR_DELIVERY"].includes(
                item.status,
              ),
            ).length}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Accepted or in progress
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Delivered on this page</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">
            {shipments.filter((item) => item.status === "DELIVERED").length}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Successfully completed
          </p>
        </div>
      </section>

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5 sm:p-6">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Shipment directory
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Search and filter the shipments on this page.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative sm:w-72">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Tracking ID, recipient..."
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-500/10"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-orange-400"
              >
                <option value="ALL">All statuses</option>
                <option value="ASSIGNED">Assigned</option>
                <option value="ACCEPTED">Accepted</option>
                <option value="PICKED_UP">Picked up</option>
                <option value="IN_TRANSIT">In transit</option>
                <option value="OUT_FOR_DELIVERY">Out for delivery</option>
                <option value="DELIVERED">Delivered</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {isPending ? (
          <div className="space-y-4 p-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-28 animate-pulse rounded-2xl bg-slate-100"
              />
            ))}
          </div>
        ) : isError ? (
          <div className="p-10 text-center">
            <Package className="mx-auto size-10 text-slate-300" />
            <h3 className="mt-4 font-semibold text-slate-900">
              Could not load shipments
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Please check your connection and try again.
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              className="mt-5 rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white"
            >
              Try again
            </button>
          </div>
        ) : filteredShipments.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <Package className="size-7" />
            </div>
            <h3 className="mt-4 font-semibold text-slate-900">
              No shipments found
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Try another search term or choose a different status.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setStatusFilter("ALL");
              }}
              className="mt-4 text-sm font-semibold text-orange-600"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredShipments.map((shipment) => (
              <article
                key={shipment.id}
                className="p-5 transition hover:bg-slate-50/70 sm:p-6"
              >
                <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                  <div className="flex min-w-0 gap-4">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
                      <Package className="size-5" />
                    </div>

                    <div className="min-w-0">
                      <Link
                        href={`/rider/shipments/${shipment.id}`}
                        className="break-all font-bold text-slate-900 hover:text-orange-600"
                      >
                        {shipment.trackingId}
                        <ArrowRight className="ml-2 inline size-4" />
                      </Link>

                      <p className="mt-1 text-sm text-slate-600">
                        {shipment.recipientName}
                      </p>

                      <p className="mt-1 line-clamp-2 text-sm text-slate-400">
                        {shipment.recipientAddress}
                      </p>

                      <Link
                        href={`/rider/shipments/${shipment.id}`}
                        className="mt-3 inline-flex text-xs font-semibold text-orange-600 hover:text-orange-700"
                      >
                        View shipment details
                      </Link>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 lg:justify-end">
                    <span
                      className={`rounded-full px-3 py-1.5 text-[11px] font-bold ring-1 ring-inset ${
                        statusStyles[shipment.status] ??
                        "bg-slate-100 text-slate-600 ring-slate-200"
                      }`}
                    >
                      {formatStatus(shipment.status)}
                    </span>

                    {shipment.status === "ASSIGNED" && (
                      <button
                        type="button"
                        disabled={acceptMutation.isPending}
                        onClick={() => acceptMutation.mutate(shipment.id)}
                        className="rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {acceptMutation.isPending
                          ? "Accepting..."
                          : "Accept shipment"}
                      </button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {meta && meta.totalPages > 1 && (
          <div className="flex flex-col gap-4 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p className="text-sm text-slate-500">
              Page <span className="font-semibold text-slate-900">{meta.page}</span>{" "}
              of <span className="font-semibold text-slate-900">{meta.totalPages}</span>
              {" · "}{meta.total} total shipments
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={page <= 1 || isFetching}
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                className="flex h-10 items-center gap-1 rounded-xl border border-slate-200 px-3 text-sm font-medium disabled:opacity-40"
              >
                <ChevronLeft className="size-4" />
                Previous
              </button>

              <button
                type="button"
                disabled={page >= totalPages || isFetching}
                onClick={() =>
                  setPage((current) => Math.min(totalPages, current + 1))
                }
                className="flex h-10 items-center gap-1 rounded-xl border border-slate-200 px-3 text-sm font-medium disabled:opacity-40"
              >
                Next
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
