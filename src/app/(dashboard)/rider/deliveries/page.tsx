
"use client";

import { useAcceptShipment, useMyShipments } from "@/hooks/rider.hooks";
import { Shipment } from "@/types/shipment.types";

export default function RiderShipmentsPage() {
  const { data, isPending, isError } = useMyShipments({
    page: 1,
    limit: 10,
  });

  const acceptMutation = useAcceptShipment();

  const shipments = data?.data.data ?? [];
  const meta = data?.data.meta;

  if (isPending) {
    return <p>Loading shipments...</p>;
  }

  if (isError) {
    return <p>Failed to load shipments. Please try again.</p>;
  }

  return (
    <section className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">My Shipments</h1>
        <p className="text-sm text-muted-foreground">
          Total shipments: {meta?.total ?? 0}
        </p>
      </div>

      {shipments.length === 0 ? (
        <p>No assigned shipments found.</p>
      ) : (
        shipments.map((shipment) => (
          <article
            key={shipment.id}
            className="rounded-xl border p-4"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="font-semibold">
                  {shipment.trackingId}
                </h2>
                <p className="text-sm text-muted-foreground">
                  Recipient: {shipment.recipientName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {shipment.recipientAddress}
                </p>
              </div>

              <span className="text-sm font-medium">
                {shipment.status}
              </span>
            </div>

            {shipment.status === "ASSIGNED" && (
              <button
                type="button"
                disabled={acceptMutation.isPending}
                onClick={() =>
                  acceptMutation.mutate(shipment.id)
                }
                className="mt-4 rounded-lg bg-primary px-4 py-2 text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
              >
                {acceptMutation.isPending
                  ? "Accepting..."
                  : "Accept Shipment"}
              </button>
            )}
          </article>
        ))
      )}

      {meta && meta.totalPages > 1 && (
        <p className="text-sm text-muted-foreground">
          Page {meta.page} of {meta.totalPages}
        </p>
      )}
    </section>
  );
}
