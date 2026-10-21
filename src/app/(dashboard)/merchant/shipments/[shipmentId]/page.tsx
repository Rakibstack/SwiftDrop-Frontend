"use client";

import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  CreditCard,
  MapPin,
  Package,
  RefreshCw,
  ShieldCheck,
  Truck,
  UserRound,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  useCancelShipment,
  useInitiateShipmentPayment,
  useShipmentDetails,
} from "@/hooks";
import type { Shipment, ShipmentStatus } from "@/types/shipment.types";

const STATUS_STYLES: Record<ShipmentStatus, string> = {
  PAYMENT_PENDING: "bg-amber-500/10 text-amber-700 dark:text-amber-400 ring-amber-500/20",
  PAYMENT_CONFIRMED: "bg-blue-500/10 text-blue-700 dark:text-blue-400 ring-blue-500/20",
  CANCELLED: "bg-red-500/10 text-red-700 dark:text-red-400 ring-red-500/20",
  ASSIGNED: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 ring-indigo-500/20",
  ACCEPTED: "bg-violet-500/10 text-violet-700 dark:text-violet-400 ring-violet-500/20",
  PICKED_UP: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 ring-cyan-500/20",
  IN_TRANSIT: "bg-sky-500/10 text-sky-700 dark:text-sky-400 ring-sky-500/20",
  OUT_FOR_DELIVERY: "bg-orange-500/10 text-orange-700 dark:text-orange-400 ring-orange-500/20",
  DELIVERED: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 ring-emerald-500/20",
  DELIVERY_FAILED: "bg-red-500/10 text-red-700 dark:text-red-400 ring-red-500/20",
};

const STATUS_LABELS: Record<ShipmentStatus, string> = {
  PAYMENT_PENDING: "Payment Pending",
  PAYMENT_CONFIRMED: "Payment Confirmed",
  CANCELLED: "Payment Cancelled",
  ASSIGNED: "Rider Assigned",
  ACCEPTED: "Accepted",
  PICKED_UP: "Picked Up",
  IN_TRANSIT: "In Transit",
  OUT_FOR_DELIVERY: "Out for Delivery",
  DELIVERED: "Delivered",
  DELIVERY_FAILED: "Delivery Failed",
};

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(date));

const formatMoney = (amount: number) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 2,
  }).format(amount);

function StatusBadge({ status }: { status: ShipmentStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${
        STATUS_STYLES[status]
      }`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}

function DetailCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400">
          {icon}
        </div>
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function AddressDetails({
  name,
  phone,
  address,
}: {
  name: string;
  phone: string;
  address: string;
}) {
  return (
    <div className="space-y-3">
      <p className="font-semibold text-foreground">{name}</p>
      <p className="text-sm text-muted-foreground">{phone}</p>
      <div className="flex items-start gap-2 text-sm leading-6 text-muted-foreground">
        <MapPin className="mt-1 size-4 shrink-0 text-muted-foreground" />
        <span>{address}</span>
      </div>
    </div>
  );
}

function TrackingTimeline({ shipment }: { shipment: Shipment }) {
  const events = [...(shipment.trackingEvents ?? [])].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  if (events.length === 0) {
    return (
      <div className="rounded-xl bg-muted px-4 py-6 text-center">
        <Clock3 className="mx-auto mb-2 size-6 text-muted-foreground" />
        <p className="text-sm font-medium text-foreground">
          No tracking events yet
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Shipment activity will appear here as it progresses.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {events.map((event, index) => (
        <div key={event.id} className="relative flex gap-4 pb-6 last:pb-0">
          {index !== events.length - 1 && (
            <div className="absolute bottom-0 left-[15px] top-8 w-px bg-muted" />
          )}

          <div
            className={`relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full ${
              index === 0
                ? "bg-orange-500/10 text-orange-600 dark:text-orange-400"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {index === 0 ? (
              <CheckCircle2 className="size-4" />
            ) : (
              <Package className="size-4" />
            )}
          </div>

          <div className="min-w-0 flex-1 pt-0.5">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-semibold text-foreground">
                {STATUS_LABELS[event.status]}
              </p>
              {index === 0 && (
                <span className="rounded-full bg-orange-500/10 px-2 py-0.5 text-[10px] font-semibold text-orange-700 dark:text-orange-400">
                  Latest
                </span>
              )}
            </div>

            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              {event.description}
            </p>

            <p className="mt-2 text-xs text-muted-foreground">
              {formatDate(event.createdAt)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function ShipmentDetailsContent({ shipment }: { shipment: Shipment }) {
  const [showCancelForm, setShowCancelForm] = useState(false);
  const [cancellationReason, setCancellationReason] = useState("");

  const paymentMutation = useInitiateShipmentPayment();
  const cancelMutation = useCancelShipment();

  const canCancel =
    shipment.status === "PAYMENT_PENDING" ||
    shipment.status === "PAYMENT_CONFIRMED";

  const paymentPending = shipment.status === "PAYMENT_PENDING";
  const paymentCancel = shipment.status === "CANCELLED";

  const handlePayment = async () => {
    if (!paymentPending) {
      toast.error("Payment cannot be initiated for this shipment status.");
      return;
    }

    try {
      const response = await paymentMutation.mutateAsync({
        shipmentId: shipment.id,
      });

      const paymentURL = response.data?.paymentURL;

      if (!paymentURL) {
        toast.error("The server did not return a bKash payment URL.");
        return;
      }

      // Redirect the merchant to the payment provider.
      window.location.assign(paymentURL);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to initiate bKash payment.",
      );
    }
  };

  const handleCancel = async () => {
    const reason = cancellationReason.trim();

    if (!canCancel) {
      toast.error("This shipment can no longer be cancelled.");
      return;
    }

    if (reason.length < 5) {
      toast.error("Cancellation reason must be at least 5 characters.");
      return;
    }

    if (reason.length > 500) {
      toast.error("Cancellation reason cannot exceed 500 characters.");
      return;
    }

    try {
      const response = await cancelMutation.mutateAsync({
        shipmentId: shipment.id,
        payload: { reason },
      });

      toast.success(response.message || "Shipment cancelled successfully.");

      setShowCancelForm(false);
      setCancellationReason("");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to cancel this shipment.",
      );
    }
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      {/* Page header */}
      <div>
        <Link
          href="/merchant/shipments"
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-orange-600 dark:text-orange-400"
        >
          <ArrowLeft className="size-4" />
          Back to shipments
        </Link>

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-600 dark:text-orange-400">
                <Package className="size-5" />
              </span>
              <StatusBadge status={shipment.status} />
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Shipment details
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Tracking ID:{" "}
              <span className="font-semibold text-foreground">
                {shipment.trackingId}
              </span>
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            disabled={paymentMutation.isPending || cancelMutation.isPending}
            onClick={() => window.location.reload()}
            className="gap-2 self-start"
          >
            <RefreshCw className="size-4" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400">
              <Truck className="size-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">
                Shipment status
              </p>
              <p className="mt-1 text-sm font-semibold text-foreground">
                {STATUS_LABELS[shipment.status]}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <CalendarDays className="size-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Created on</p>
              <p className="mt-1 text-sm font-semibold text-foreground">
                {formatDate(shipment.createdAt)}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 sm:col-span-2 xl:col-span-1">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <CreditCard className="size-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Delivery fee</p>
              <p className="mt-1 text-lg font-bold text-foreground">
                {formatMoney(shipment.deliveryFee)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-6">
          <DetailCard
            title="Delivery information"
            icon={<MapPin className="size-5" />}
          >
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <p className="mb-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Sender
                </p>
                <AddressDetails
                  name={shipment.senderName}
                  phone={shipment.senderPhone}
                  address={shipment.senderAddress}
                />
              </div>

              <div className="border-t border-border pt-6 md:border-l md:border-t-0 md:pl-6 md:pt-0">
                <p className="mb-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Recipient
                </p>
                <AddressDetails
                  name={shipment.recipientName}
                  phone={shipment.recipientPhone}
                  address={shipment.recipientAddress}
                />
              </div>
            </div>
          </DetailCard>

          <DetailCard
            title="Parcel information"
            icon={<Package className="size-5" />}
          >
            <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
              <div>
                <p className="text-xs text-muted-foreground">Parcel type</p>
                <p className="mt-1 text-sm font-semibold text-foreground">
                  {shipment.parcelType}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Parcel weight</p>
                <p className="mt-1 text-sm font-semibold text-foreground">
                  {shipment.weight != null
                    ? `${shipment.weight} kg`
                    : "Not specified"}
                </p>
              </div>

              <div className="sm:col-span-2">
                <p className="text-xs text-muted-foreground">Description</p>
                <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-foreground">
                  {shipment.parcelDescription?.trim() ||
                    "No parcel description provided."}
                </p>
              </div>

              <div className="sm:col-span-2">
                <p className="text-xs text-muted-foreground">Cash on delivery (COD)</p>
                <p className="mt-1 text-sm font-semibold text-foreground">
                  {formatMoney(shipment.codAmount)}
                </p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  COD is the amount collected from the recipient. It is separate
                  from the merchant&apos;s delivery fee.
                </p>
              </div>
            </div>
          </DetailCard>

          <DetailCard
            title="Tracking history"
            icon={<Truck className="size-5" />}
          >
            <TrackingTimeline shipment={shipment} />
          </DetailCard>
        </div>

        {/* Payment and actions */}
        <aside className="space-y-6 lg:sticky lg:top-6">
          <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="border-b border-border p-5">
              <h2 className="font-semibold text-foreground">Payment summary</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Shipment payment details
              </p>
            </div>

            <div className="space-y-4 p-5">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-muted-foreground">Delivery fee</span>
                <span className="text-sm font-semibold text-foreground">
                  {formatMoney(shipment.deliveryFee)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-muted-foreground">COD amount</span>
                <span className="text-sm font-semibold text-foreground">
                  {formatMoney(shipment.codAmount)}
                </span>
              </div>

              <div className="border-t border-dashed border-border pt-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-foreground">
                    Payment status
                  </span>

                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      paymentPending
                        ? "bg-amber-500/10 text-amber-700 dark:text-amber-400"
                        : "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                    }`}
                  >
                    {paymentPending
                      ? "Pending"
                      : paymentCancel
                        ? "Cancelled"
                        : "Paid"}
                  </span>
                </div>

                <p className="mt-2 text-xs leading-5 text-muted-foreground">
                  {paymentPending
                    ? "Complete the delivery-fee payment to proceed."
                    : "The shipment has moved past the initial payment-pending stage."}
                </p>
              </div>

              {paymentPending && (
                <Button
                  type="button"
                  onClick={handlePayment}
                  disabled={
                    paymentMutation.isPending || cancelMutation.isPending
                  }
                  className="w-full bg-orange-500 text-white hover:bg-orange-600"
                >
                  {paymentMutation.isPending
                    ? "Connecting to bKash..."
                    : "Pay with bKash"}

                  {!paymentMutation.isPending && (
                    <ArrowRight className="ml-2 size-4" />
                  )}
                </Button>
              )}

              <div className="flex items-start gap-2 rounded-xl bg-muted p-3">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <p className="text-xs leading-5 text-muted-foreground">
                  Payment confirmation depends on the backend payment
                  verification flow.
                </p>
              </div>
            </div>
          </section>

          {canCancel ? (
            <section className="rounded-2xl border border-red-500/10 bg-card p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-600 dark:text-red-400">
                  <XCircle className="size-5" />
                </div>
                <div>
                  <h2 className="font-semibold text-foreground">
                    Cancel shipment
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    You can cancel while payment is pending or confirmed. This
                    action depends on the server&apos;s cancellation rules.
                  </p>
                </div>
              </div>

              {!showCancelForm ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCancelForm(true)}
                  disabled={
                    paymentMutation.isPending || cancelMutation.isPending
                  }
                  className="mt-4 w-full border-red-500/20 text-red-600 dark:text-red-400 hover:bg-red-500/10 hover:text-red-700 dark:text-red-400"
                >
                  Cancel shipment
                </Button>
              ) : (
                <div className="mt-4 space-y-3">
                  <label
                    htmlFor="cancellationReason"
                    className="block text-sm font-medium text-foreground"
                  >
                    Cancellation reason
                    <span className="ml-1 text-red-500">*</span>
                  </label>

                  <textarea
                    id="cancellationReason"
                    value={cancellationReason}
                    onChange={(event) =>
                      setCancellationReason(event.target.value)
                    }
                    placeholder="Explain why you want to cancel this shipment..."
                    rows={4}
                    maxLength={500}
                    disabled={cancelMutation.isPending}
                    className="w-full resize-y rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-orange-400 focus:ring-2 focus:ring-orange-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                  />

                  <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
                    <span>Minimum 5 characters</span>
                    <span>{cancellationReason.length}/500</span>
                  </div>

                  <Button
                    type="button"
                    onClick={handleCancel}
                    disabled={
                      cancelMutation.isPending ||
                      paymentMutation.isPending ||
                      cancellationReason.trim().length < 5 ||
                      cancellationReason.trim().length > 500
                    }
                    className="w-full bg-red-600 text-white hover:bg-red-700"
                  >
                    {cancelMutation.isPending
                      ? "Cancelling shipment..."
                      : "Confirm cancellation"}
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      setShowCancelForm(false);
                      setCancellationReason("");
                    }}
                    disabled={cancelMutation.isPending}
                    className="w-full"
                  >
                    Keep shipment
                  </Button>
                </div>
              )}
            </section>
          ) : (
            <section className="rounded-2xl border border-border bg-muted p-5">
              <div className="flex items-start gap-3">
                <UserRound className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
                <div>
                  <h2 className="text-sm font-semibold text-foreground">
                    Cancellation unavailable
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    This shipment can no longer be cancelled from the merchant
                    dashboard because of its current status.
                  </p>
                </div>
              </div>
            </section>
          )}

          <Link
            href="/merchant/shipments"
            className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-muted-foreground transition hover:border-orange-500/20 hover:text-orange-600 dark:text-orange-400"
          >
            <ArrowLeft className="size-4" />
            Back to all shipments
          </Link>
        </aside>
      </div>
    </div>
  );
}

export default function ShipmentDetailsPage() {
  const params = useParams<{ shipmentId: string }>();
  const shipmentId = params.shipmentId;
  const router = useRouter();

  const {
    data: response,
    isPending,
    isError,
    error,
    refetch,
    isFetching,
  } = useShipmentDetails(shipmentId);

  const shipment = response?.data as Shipment | undefined;

  if (isPending) {
    return (
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-muted" />
        <div className="h-24 animate-pulse rounded-2xl bg-muted" />
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-6">
            <div className="h-64 animate-pulse rounded-2xl bg-muted" />
            <div className="h-52 animate-pulse rounded-2xl bg-muted" />
          </div>
          <div className="h-72 animate-pulse rounded-2xl bg-muted" />
        </div>
      </div>
    );
  }

  if (isError || !shipment) {
    return (
      <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-4 text-center">
        <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-500">
          <Package className="size-7" />
        </div>

        <h1 className="text-xl font-bold text-foreground">
          Unable to load shipment
        </h1>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {error instanceof Error
            ? error.message
            : "We couldn't retrieve this shipment. It may not exist or you may not have permission to view it."}
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
            className="gap-2 bg-orange-500 text-white hover:bg-orange-600"
          >
            <RefreshCw className="size-4" />
            {isFetching ? "Retrying..." : "Try again"}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/merchant/shipments")}
          >
            Back to shipments
          </Button>
        </div>
      </div>
    );
  }

  return <ShipmentDetailsContent shipment={shipment} />;
}
