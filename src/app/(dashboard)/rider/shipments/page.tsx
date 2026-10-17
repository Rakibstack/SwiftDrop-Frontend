
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

import { StatusBadge } from "@/components/shipment/StatusBadge";
import { useAcceptShipment, useMyShipments } from "@/hooks/rider.hooks";

const PAGE_SIZE = 10;

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
      <section className="relative overflow-hidden rounded-3xl bg-sidebar p-6 text-sidebar-foreground sm:p-8">
        <div className="pointer-events-none absolute -right-12 -top-20 size-64 rounded-full bg-primary/20 blur-3xl" />

        <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
              <Truck className="size-4 text-primary" />
              Rider workspace
              <ArrowDownRight className="size-3" />
              Shipments
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              My shipments
            </h1>

            <p className="mt-2 max-w-lg text-sm leading-6 text-muted-foreground">
              Manage your assigned parcels, accept new deliveries, and
              keep every shipment moving.
            </p>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-sidebar-border bg-sidebar-accent/50 p-4">
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <Package className="size-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total shipments</p>
              <p className="mt-1 text-2xl font-bold">{total}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">Assigned on this page</p>
          <p className="mt-2 text-3xl font-bold text-card-foreground">
            {shipments.filter((item) => item.status === "ASSIGNED").length}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Waiting for your acceptance
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">Active on this page</p>
          <p className="mt-2 text-3xl font-bold text-card-foreground">
            {shipments.filter((item) =>
              ["ACCEPTED", "PICKED_UP", "IN_TRANSIT", "OUT_FOR_DELIVERY"].includes(
                item.status,
              ),
            ).length}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Accepted or in progress
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">Delivered on this page</p>
          <p className="mt-2 text-3xl font-bold text-card-foreground">
            {shipments.filter((item) => item.status === "DELIVERED").length}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Successfully completed
          </p>
        </div>
      </section>

      <section className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
        <div className="border-b border-border p-5 sm:p-6">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-lg font-bold text-card-foreground">
                Shipment directory
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Search and filter the shipments on this page.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative sm:w-72">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Tracking ID, recipient..."
                  className="h-11 w-full rounded-xl border border-input bg-muted/50 pl-9 pr-3 text-sm text-foreground outline-none transition focus:border-primary focus:bg-background focus:ring-4 focus:ring-primary/10"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="h-11 rounded-xl border border-input bg-muted/50 px-3 text-sm text-foreground outline-none focus:border-primary"
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
                className="h-28 animate-pulse rounded-2xl bg-muted"
              />
            ))}
          </div>
        ) : isError ? (
          <div className="p-10 text-center">
            <Package className="mx-auto size-10 text-muted-foreground" />
            <h3 className="mt-4 font-semibold text-foreground">
              Could not load shipments
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Please check your connection and try again.
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              className="mt-5 rounded-xl bg-foreground px-5 py-2.5 text-sm font-semibold text-background hover:opacity-90"
            >
              Try again
            </button>
          </div>
        ) : filteredShipments.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
              <Package className="size-7" />
            </div>
            <h3 className="mt-4 font-semibold text-foreground">
              No shipments found
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Try another search term or choose a different status.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setStatusFilter("ALL");
              }}
              className="mt-4 text-sm font-semibold text-primary hover:opacity-80"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredShipments.map((shipment) => (
              <article
                key={shipment.id}
                className="p-5 transition hover:bg-accent/50 sm:p-6"
              >
                <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                  <div className="flex min-w-0 gap-4">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Package className="size-5" />
                    </div>

                    <div className="min-w-0">
                      <Link
                        href={`/rider/shipments/${shipment.id}`}
                        className="break-all font-bold text-foreground hover:text-primary"
                      >
                        {shipment.trackingId}
                        <ArrowRight className="ml-2 inline size-4" />
                      </Link>

                      <p className="mt-1 text-sm text-foreground">
                        {shipment.recipientName}
                      </p>

                      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                        {shipment.recipientAddress}
                      </p>

                      <Link
                        href={`/rider/shipments/${shipment.id}`}
                        className="mt-3 inline-flex text-xs font-semibold text-primary hover:opacity-80"
                      >
                        View shipment details
                      </Link>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 lg:justify-end">
                    <StatusBadge status={shipment.status as any} />

                    {shipment.status === "ASSIGNED" && (
                      <button
                        type="button"
                        disabled={acceptMutation.isPending}
                        onClick={() => acceptMutation.mutate(shipment.id)}
                        className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
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
          <div className="flex flex-col gap-4 border-t border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p className="text-sm text-muted-foreground">
              Page <span className="font-semibold text-foreground">{meta.page}</span>{" "}
              of <span className="font-semibold text-foreground">{meta.totalPages}</span>
              {" · "}{meta.total} total shipments
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={page <= 1 || isFetching}
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                className="flex h-10 items-center gap-1 rounded-xl border border-border bg-background px-3 text-sm font-medium text-foreground disabled:opacity-40"
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
                className="flex h-10 items-center gap-1 rounded-xl border border-border bg-background px-3 text-sm font-medium text-foreground disabled:opacity-40"
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
