"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useAssignShipmentRider } from "@/hooks/admin.shipments.hooks";
import { useRiders } from "@/hooks/rider.hooks";
import type { AdminShipment } from "@/types/admin-shipment.types";

interface AssignRiderPanelProps {
  shipment: AdminShipment;
}

export default function AssignRiderPanel({ shipment }: AssignRiderPanelProps) {
  const [riderId, setRiderId] = useState("");

  // Hooks must be called unconditionally.
  const {
    data: riders = [],
    isPending: ridersLoading,
    isError: ridersError,
  } = useRiders();

  const assignment = useAssignShipmentRider(shipment.id);

  const eligibleRiders = riders.filter(
    (rider) =>
      rider.status === "ACTIVE" && !rider.isSuspended && !rider.user?.isDeleted,
  );

  const canAssign =
    shipment.status === "PAYMENT_CONFIRMED" || shipment.status === "ASSIGNED";

  async function handleAssign() {
    if (!canAssign) {
      toast.error("This shipment cannot be assigned at its current status.");
      return;
    }

    if (!riderId) {
      toast.error("Please select a rider.");
      return;
    }

    const selectedRider = eligibleRiders.find((rider) => rider.id === riderId);

    if (!selectedRider) {
      toast.error("Please select an eligible rider.");
      return;
    }

    try {
      await assignment.mutateAsync({ riderId });
      toast.success("Rider assignment updated successfully.");
      setRiderId("");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to assign rider. Please try again.",
      );
    }
  }

  if (!canAssign) {
    return (
      <p className="text-sm text-zinc-500">
        Rider assignment is unavailable for this shipment status.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {shipment.rider && (
        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
            Currently assigned
          </p>

          <p className="mt-2 font-semibold text-zinc-900">
            {shipment.rider.user?.name ?? "Assigned rider"}
          </p>

          <p className="mt-1 text-sm text-zinc-500">
            {shipment.rider.phone} · {shipment.rider.vehicleType}
          </p>
        </div>
      )}

      <div>
        <label
          htmlFor="rider"
          className="mb-2 block text-sm font-medium text-zinc-700"
        >
          {shipment.rider ? "Select replacement rider" : "Select a rider"}
        </label>

        <select
          id="rider"
          value={riderId}
          onChange={(event) => setRiderId(event.target.value)}
          disabled={ridersLoading || ridersError || assignment.isPending}
          className="h-12 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:border-orange-400 disabled:opacity-60"
        >
          <option value="">
            {ridersLoading ? "Loading riders..." : "Choose an available rider"}
          </option>

          {eligibleRiders.map((rider) => (
            <option key={rider.id} value={rider.id}>
              {rider.user?.name ?? "Unnamed rider"} · {rider.vehicleType} ·{" "}
              {rider.phone}
            </option>
          ))}
        </select>

        {ridersError && (
          <p className="mt-2 text-sm text-red-600">
            Could not load riders. Please refresh and try again.
          </p>
        )}

        {!ridersLoading && !ridersError && eligibleRiders.length === 0 && (
          <p className="mt-2 text-sm text-amber-700">
            No active, eligible riders are available.
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={handleAssign}
        disabled={
          !riderId ||
          assignment.isPending ||
          ridersLoading ||
          ridersError ||
          eligibleRiders.length === 0
        }
        className="flex h-11 w-full items-center justify-center rounded-xl bg-orange-600 px-4 text-sm font-semibold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {assignment.isPending
          ? "Assigning rider..."
          : shipment.rider
            ? "Confirm reassignment"
            : "Assign rider"}
      </button>

      <p className="text-xs leading-5 text-zinc-500">
        Only active, non-suspended riders are shown. The server remains
        responsible for validating shipment status and assignment rules.
      </p>
    </div>
  );
}
