"use client";

import { DataPagination } from "@/components/shared/DataPagination";
import { StatusBadge } from "@/components/shipment/StatusBadge";
import { useShipments } from "@/hooks";
import { useDataTable } from "@/hooks/shared/useDataTable";
import type { Shipment, ShipmentStatus } from "@/types/shipment.types";

const shipmentStatuses: { label: string; value: ShipmentStatus }[] = [
  { label: "Payment Pending", value: "PAYMENT_PENDING" },
  { label: "Payment Confirmed", value: "PAYMENT_CONFIRMED" },
  { label: "Assigned", value: "ASSIGNED" },
  { label: "Accepted", value: "ACCEPTED" },
  { label: "Picked Up", value: "PICKED_UP" },
  { label: "In Transit", value: "IN_TRANSIT" },
  { label: "Out for Delivery", value: "OUT_FOR_DELIVERY" },
  { label: "Delivered", value: "DELIVERED" },
  { label: "Delivery Failed", value: "DELIVERY_FAILED" },
];

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(amount);
}

function ShipmentRow({ shipment }: { shipment: Shipment }) {
  return (
    <tr className="border-b border-border transition-colors hover:bg-accent/50">
      <td className="px-5 py-4">
        <p className="font-semibold text-foreground">{shipment.trackingId}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          {new Date(shipment.createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>
      </td>
      <td className="px-5 py-4">
        <p className="font-medium text-foreground">{shipment.recipientName}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          {shipment.recipientPhone}
        </p>
        <p className="mt-1 max-w-52 truncate text-xs text-muted-foreground">
          {shipment.recipientAddress}
        </p>
      </td>
      <td className="px-5 py-4">
        <p className="font-medium text-foreground">{shipment.parcelType}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          {shipment.weight != null ? `${shipment.weight} kg` : "Weight N/A"}
        </p>
      </td>
      <td className="px-5 py-4 text-right">
        <p className="font-semibold text-foreground">
          {formatCurrency(shipment.codAmount)}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">COD amount</p>
      </td>
      <td className="px-5 py-4 text-right font-medium text-foreground">
        {formatCurrency(shipment.deliveryFee)}
      </td>
      <td className="px-5 py-4">
        <StatusBadge status={shipment.status} />
      </td>
    </tr>
  );
}

export default function MerchantDashboardPage() {
  const table = useDataTable();

  const query = {
    page: table.page,
    limit: table.limit,
    ...(table.searchTerm.trim() ? { searchTerm: table.searchTerm.trim() } : {}),
    ...(table.status ? { status: table.status as ShipmentStatus } : {}),
  };

  const { data: response, isPending, isError, refetch } = useShipments(query);

  const shipments = response?.data.data ?? [];
  const meta = response?.meta;

  return (
    <main className="min-h-full space-y-7 p-4 sm:p-6 lg:p-8">
      {/* Page heading */}
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="mb-2 text-sm font-medium text-primary">
            MERCHANT WORKSPACE
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Shipments
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Manage your deliveries, track progress, and monitor COD payments.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start rounded-xl border border-border bg-card px-4 py-3 shadow-sm">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="size-5"
              aria-hidden="true"
            >
              <path d="M3 7h11v11H3zM14 11h4l3 3v4h-7z" />
              <circle cx="7.5" cy="18.5" r="1.5" />
              <circle cx="17.5" cy="18.5" r="1.5" />
            </svg>
          </span>
          <div>
            <p className="text-xs text-muted-foreground">Total shipments</p>
            <p className="text-lg font-bold text-foreground">
              {meta?.total ?? (isPending ? "—" : shipments.length)}
            </p>
          </div>
        </div>
      </section>
      {/* Shipments table */}
      <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="border-b border-border p-5 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-bold text-card-foreground">
                All Shipments
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Search and manage your shipment records.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative min-w-0 sm:w-64">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m16 16 4 4" />
                </svg>

                <input
                  type="search"
                  value={table.searchTerm}
                  onChange={(event) => table.setSearchTerm(event.target.value)}
                  placeholder="Search recipient..."
                  aria-label="Search shipments"
                  className="h-10 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <select
                value={table.status}
                onChange={(event) => table.setStatus(event.target.value)}
                aria-label="Filter shipments by status"
                className="h-10 rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                <option value="">All statuses</option>
                {shipmentStatuses.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {isError ? (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <span className="text-xl">!</span>
            </div>
            <h3 className="font-semibold text-foreground">
              Could not load shipments
            </h3>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Something went wrong while fetching your shipments. Please try
              again.
            </p>
            <button
              type="button"
              onClick={() => void refetch()}
              className="mt-5 rounded-lg bg-foreground px-4 py-2.5 text-sm font-semibold text-background transition hover:opacity-90"
            >
              Try again
            </button>
          </div>
        ) : isPending ? (
          <div className="space-y-4 p-6">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="h-14 animate-pulse rounded-lg bg-muted"
              />
            ))}
          </div>
        ) : shipments.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-2xl">
              📦
            </div>
            <h3 className="font-semibold text-foreground">
              {table.searchTerm || table.status
                ? "No matching shipments"
                : "No shipments yet"}
            </h3>
            <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
              {table.searchTerm || table.status
                ? "Try changing your search term or selecting a different status."
                : "Your shipments will appear here when you create your first delivery."}
            </p>
            {(table.searchTerm || table.status) && (
              <button
                type="button"
                onClick={() => {
                  table.setSearchTerm("");
                  table.setStatus("");
                }}
                className="mt-4 text-sm font-semibold text-primary hover:opacity-80"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1050px] text-left text-sm">
                <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-5 py-3.5 font-semibold">Tracking ID</th>
                    <th className="px-5 py-3.5 font-semibold">Recipient</th>
                    <th className="px-5 py-3.5 font-semibold">Parcel</th>
                    <th className="px-5 py-3.5 text-right font-semibold">
                      COD
                    </th>
                    <th className="px-5 py-3.5 text-right font-semibold">
                      Delivery Fee
                    </th>
                    <th className="px-5 py-3.5 font-semibold">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {shipments.map((shipment) => (
                    <ShipmentRow key={shipment.id} shipment={shipment} />
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col gap-3 border-t border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                Showing{" "}
                <span className="font-semibold text-foreground">
                  {meta?.total ? (table.page - 1) * table.limit + 1 : 0}
                  {"–"}
                  {Math.min(
                    table.page * table.limit,
                    meta?.total ?? shipments.length,
                  )}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-foreground">
                  {meta?.total ?? shipments.length}
                </span>{" "}
                shipments
              </p>

              <div className="flex items-center gap-3">
                <label
                  htmlFor="shipment-page-size"
                  className="whitespace-nowrap text-sm text-muted-foreground"
                >
                  Rows per page
                </label>
                <select
                  id="shipment-page-size"
                  value={table.limit}
                  onChange={(event) =>
                    table.setLimit(Number(event.target.value))
                  }
                  className="h-9 rounded-lg border border-input bg-background px-2 text-sm text-foreground outline-none focus:border-primary"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>

                <DataPagination
                  page={table.page}
                  totalPages={meta?.totalPages ?? 1}
                  total={meta?.total ?? shipments.length}
                  onPageChange={table.setPage}
                />
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
