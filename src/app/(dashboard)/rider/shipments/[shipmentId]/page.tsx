"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Clock3,
  MapPin,
  Package,
  Phone,
  RefreshCw,
  Truck,
  UserRound,
} from "lucide-react";

import {
  useAcceptShipment,
  useDeliverShipment,
  useMarkShipmentInTransit,
  useMarkShipmentOutForDelivery,
  usePickupShipment,
  useRiderShipmentDetails,
} from "@/hooks/rider.hooks";

const DELIVERY_STEPS = [
  { status: "ASSIGNED", label: "Assigned to rider" },
  { status: "ACCEPTED", label: "Shipment accepted" },
  { status: "PICKED_UP", label: "Parcel picked up" },
  { status: "IN_TRANSIT", label: "In transit" },
  { status: "OUT_FOR_DELIVERY", label: "Out for delivery" },
  { status: "DELIVERED", label: "Delivered successfully" },
] as const;

const STATUS_STYLES: Record<string, string> = {
  ASSIGNED: "bg-amber-50 text-amber-700 ring-amber-200",
  ACCEPTED: "bg-blue-50 text-blue-700 ring-blue-200",
  PICKED_UP: "bg-violet-50 text-violet-700 ring-violet-200",
  IN_TRANSIT: "bg-indigo-50 text-indigo-700 ring-indigo-200",
  OUT_FOR_DELIVERY: "bg-orange-50 text-orange-700 ring-orange-200",
  DELIVERED: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  DELIVERY_FAILED: "bg-red-50 text-red-700 ring-red-200",
  RETURNED: "bg-slate-100 text-slate-700 ring-slate-200",
  CANCELLED: "bg-red-50 text-red-700 ring-red-200",
};

const STATUS_LABELS: Record<string, string> = {
  ASSIGNED: "Assigned",
  ACCEPTED: "Accepted",
  PICKED_UP: "Picked up",
  IN_TRANSIT: "In transit",
  OUT_FOR_DELIVERY: "Out for delivery",
  DELIVERED: "Delivered",
  DELIVERY_FAILED: "Delivery failed",
  RETURNED: "Returned",
  CANCELLED: "Cancelled",
};

function formatDate(value?: string | Date | null) {
  if (!value) return "Not available";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Not available";

  return new Intl.DateTimeFormat("en-BD", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function formatMoney(value?: string | number | null) {
  if (value === null || value === undefined || value === "") {
    return "৳0.00";
  }

  const amount = Number(value);

  if (!Number.isFinite(amount)) return "Not available";

  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 2,
  }).format(amount);
}

function humanizeStatus(status: string) {
  return STATUS_LABELS[status] ?? status.toLowerCase().replaceAll("_", " ");
}

export default function RiderShipmentDetailsPage() {
  const params = useParams<{ shipmentId: string }>();
  const shipmentId = params.shipmentId;

  const {
    data: shipment,
    isPending,
    isError,
    error,
    refetch,
    isFetching,
  } = useRiderShipmentDetails(shipmentId);

  const acceptMutation = useAcceptShipment();
  const pickupMutation = usePickupShipment();
  const inTransitMutation = useMarkShipmentInTransit();
  const outForDeliveryMutation = useMarkShipmentOutForDelivery();
  const deliverMutation = useDeliverShipment();

  const isUpdating =
    acceptMutation.isPending ||
    pickupMutation.isPending ||
    inTransitMutation.isPending ||
    outForDeliveryMutation.isPending ||
    deliverMutation.isPending;

  const status = String(shipment?.status ?? "").toUpperCase();

  const nextAction: Record<string, { label: string; description: string }> = {
    ASSIGNED: {
      label: "Accept shipment",
      description: "Confirm that you will handle this shipment.",
    },
    ACCEPTED: {
      label: "Confirm pickup",
      description: "Use this after you have collected the parcel.",
    },
    PICKED_UP: {
      label: "Mark in transit",
      description: "Confirm that the parcel is on its way.",
    },
    IN_TRANSIT: {
      label: "Out for delivery",
      description: "Use this when you start the final delivery.",
    },
    OUT_FOR_DELIVERY: {
      label: "Confirm delivered",
      description: "Use this only after handing over the parcel.",
    },
  };

  const currentAction = nextAction[status];

  function handleNextAction() {
    if (!shipment || isUpdating) return;

    switch (status) {
      case "ASSIGNED":
        acceptMutation.mutate(shipment.id);
        break;
      case "ACCEPTED":
        pickupMutation.mutate(shipment.id);
        break;
      case "PICKED_UP":
        inTransitMutation.mutate(shipment.id);
        break;
      case "IN_TRANSIT":
        outForDeliveryMutation.mutate(shipment.id);
        break;
      case "OUT_FOR_DELIVERY":
        deliverMutation.mutate(shipment.id);
        break;
      default:
        break;
    }
  }

  if (isPending) {
    return (
      <main className="mx-auto max-w-6xl space-y-6 p-4 sm:p-6">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-muted" />
        <div className="h-48 animate-pulse rounded-2xl bg-muted" />
        <div className="h-64 animate-pulse rounded-2xl bg-muted" />
      </main>
    );
  }

  if (isError || !shipment) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
        <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-red-50 text-red-600">
          <Package className="size-8" />
        </div>

        <h1 className="text-xl font-semibold text-foreground">
          Shipment not found
        </h1>

        <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
          {error?.message ||
            "This shipment could not be found in your assigned shipments. It may be on another page or may no longer be assigned to you."}
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => refetch()}
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            <RefreshCw className="size-4" />
            Try again
          </button>

          <Link
            href="/rider/shipments"
            className="inline-flex h-10 items-center rounded-xl border px-4 text-sm font-medium hover:bg-muted"
          >
            Back to shipments
          </Link>
        </div>
      </main>
    );
  }

  const currentStepIndex = DELIVERY_STEPS.findIndex(
    (step) => step.status === status,
  );

  return (
    <main className="mx-auto max-w-6xl space-y-6 p-4 pb-12 sm:p-6 lg:p-8">
      {/* Page heading */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link
            href="/rider/shipments"
            className="mb-3 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to shipments
          </Link>

          <p className="text-sm font-medium text-primary">Rider workspace</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
            Shipment details
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Review parcel information and update delivery progress.
          </p>
        </div>

        <button
          type="button"
          onClick={() => refetch()}
          disabled={isFetching || isUpdating}
          className="inline-flex h-10 items-center gap-2 rounded-xl border bg-background px-4 text-sm font-medium transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshCw className={`size-4 ${isFetching ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Shipment summary */}
      <section className="overflow-hidden rounded-2xl border bg-card shadow-sm">
        <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-start sm:justify-between sm:p-7">
          <div className="flex items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Package className="size-6" />
            </div>

            <div className="min-w-0">
              <p className="text-sm text-muted-foreground">Tracking ID</p>
              <h2 className="mt-1 break-all text-xl font-bold tracking-tight">
                {shipment.trackingId}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Created {formatDate(shipment.createdAt)}
              </p>
            </div>
          </div>

          <span
            className={`inline-flex w-fit items-center rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${
              STATUS_STYLES[status] ??
              "bg-muted text-muted-foreground ring-border"
            }`}
          >
            {humanizeStatus(status)}
          </span>
        </div>

        <div className="grid gap-px border-t bg-border sm:grid-cols-3">
          <div className="bg-card p-5">
            <p className="text-sm text-muted-foreground">Delivery fee</p>
            <p className="mt-1 text-xl font-bold">
              {formatMoney(shipment.deliveryFee)}
            </p>
          </div>

          <div className="bg-card p-5">
            <p className="text-sm text-muted-foreground">Cash on delivery</p>
            <p className="mt-1 text-xl font-bold">
              {formatMoney(shipment.codAmount)}
            </p>
          </div>

          <div className="bg-card p-5">
            <p className="text-sm text-muted-foreground">Parcel weight</p>
            <p className="mt-1 text-xl font-bold">
              {shipment.weight !== null && shipment.weight !== undefined
                ? `${shipment.weight} kg`
                : "Not available"}
            </p>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        {/* Recipient and package information */}
        <div className="space-y-6">
          <section className="rounded-2xl border bg-card p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-muted">
                <UserRound className="size-5" />
              </div>
              <div>
                <h2 className="font-semibold">Recipient information</h2>
                <p className="text-sm text-muted-foreground">
                  Delivery contact and destination
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Recipient name
                </p>
                <p className="mt-1 font-medium">
                  {shipment.recipientName || "Not available"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Phone number
                </p>
                {shipment.recipientPhone ? (
                  <a
                    href={`tel:${shipment.recipientPhone}`}
                    className="mt-1 inline-flex items-center gap-2 font-medium text-primary hover:underline"
                  >
                    <Phone className="size-4" />
                    {shipment.recipientPhone}
                  </a>
                ) : (
                  <p className="mt-1 text-sm text-muted-foreground">
                    Not available
                  </p>
                )}
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Delivery address
                </p>
                <p className="mt-1 flex items-start gap-2 text-sm leading-6">
                  <MapPin className="mt-1 size-4 shrink-0 text-muted-foreground" />
                  <span>{shipment.recipientAddress || "Not available"}</span>
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border bg-card p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-muted">
                <Truck className="size-5" />
              </div>
              <div>
                <h2 className="font-semibold">Parcel information</h2>
                <p className="text-sm text-muted-foreground">
                  Shipment contents and delivery type
                </p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Package description
                </p>
                <p className="mt-1 text-sm leading-6">
                  {shipment.parcelDescription || "Not provided"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Delivery type
                </p>
                <p className="mt-1 font-medium">
                  {shipment.parcelType || "Not specified"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Last updated
                </p>
                <p className="mt-1 text-sm font-medium">
                  {formatDate(shipment.updatedAt)}
                </p>
              </div>
            </div>
          </section>

          {shipment.failureReason && (
            <section className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-800">
              <h2 className="font-semibold">Delivery issue</h2>
              <p className="mt-2 text-sm leading-6">{shipment.failureReason}</p>
            </section>
          )}
        </div>

        {/* Progress and next action */}
        <aside className="space-y-6">
          <section className="rounded-2xl border bg-card p-5 shadow-sm sm:p-6">
            <div className="mb-6">
              <h2 className="font-semibold">Delivery progress</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Follow each step until delivery is complete.
              </p>
            </div>

            <div className="space-y-0">
              {DELIVERY_STEPS.map((step, index) => {
                const completed =
                  currentStepIndex >= 0 && index <= currentStepIndex;

                const current = step.status === status;

                return (
                  <div key={step.status} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div
                        className={`flex size-8 shrink-0 items-center justify-center rounded-full border ${
                          completed
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-background text-muted-foreground"
                        }`}
                      >
                        {completed ? (
                          <Check className="size-4" />
                        ) : (
                          <span className="text-xs font-semibold">
                            {index + 1}
                          </span>
                        )}
                      </div>

                      {index < DELIVERY_STEPS.length - 1 && (
                        <div
                          className={`my-1 min-h-8 w-px flex-1 ${
                            completed ? "bg-primary" : "bg-border"
                          }`}
                        />
                      )}
                    </div>

                    <div className="pb-6 pt-1">
                      <p
                        className={`text-sm font-medium ${
                          current ? "text-primary" : ""
                        }`}
                      >
                        {step.label}
                      </p>
                      {current && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          Current status
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {status === "DELIVERED" && (
              <div className="mt-2 flex items-start gap-3 rounded-xl bg-emerald-50 p-4 text-emerald-800">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold">Delivery completed</p>
                  <p className="mt-1 text-xs leading-5">
                    This shipment has reached its final status.
                  </p>
                </div>
              </div>
            )}
          </section>

          {currentAction ? (
            <section className="rounded-2xl border bg-card p-5 shadow-sm sm:p-6">
              <div className="flex items-center gap-2">
                <Clock3 className="size-5 text-primary" />
                <h2 className="font-semibold">Next action</h2>
              </div>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {currentAction.description}
              </p>

              <button
                type="button"
                onClick={handleNextAction}
                disabled={isUpdating}
                className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isUpdating ? (
                  <>
                    <RefreshCw className="size-4 animate-spin" />
                    Updating shipment...
                  </>
                ) : (
                  <>
                    {currentAction.label}
                    <CheckCircle2 className="size-4" />
                  </>
                )}
              </button>

              <p className="mt-3 text-center text-xs leading-5 text-muted-foreground">
                Only confirm an action after the real delivery step is complete.
              </p>
            </section>
          ) : (
            <section className="rounded-2xl border bg-muted/40 p-5">
              <h2 className="font-semibold">
                {status === "DELIVERED" ? "All done!" : "No action available"}
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {status === "DELIVERED"
                  ? "You have completed this shipment."
                  : "This shipment has no available next action in the current rider workflow. Contact an administrator if it needs attention."}
              </p>
            </section>
          )}
        </aside>
      </div>
    </main>
  );
}
