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
  PAYMENT_PENDING: "bg-amber-50 text-amber-700 ring-amber-200",
  PAYMENT_CONFIRMED: "bg-blue-50 text-blue-700 ring-blue-200",
  CANCELLED: "bg-red-50 text-red-700 ring-red-200",
  ASSIGNED: "bg-indigo-50 text-indigo-700 ring-indigo-200",
  ACCEPTED: "bg-violet-50 text-violet-700 ring-violet-200",
  PICKED_UP: "bg-cyan-50 text-cyan-700 ring-cyan-200",
  IN_TRANSIT: "bg-sky-50 text-sky-700 ring-sky-200",
  OUT_FOR_DELIVERY: "bg-orange-50 text-orange-700 ring-orange-200",
  DELIVERED: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  DELIVERY_FAILED: "bg-red-50 text-red-700 ring-red-200",
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
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
          {icon}
        </div>
        <h2 className="text-base font-semibold text-slate-900">{title}</h2>
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
      <p className="font-semibold text-slate-900">{name}</p>
      <p className="text-sm text-slate-600">{phone}</p>
      <div className="flex items-start gap-2 text-sm leading-6 text-slate-600">
        <MapPin className="mt-1 size-4 shrink-0 text-slate-400" />
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
      <div className="rounded-xl bg-slate-50 px-4 py-6 text-center">
        <Clock3 className="mx-auto mb-2 size-6 text-slate-400" />
        <p className="text-sm font-medium text-slate-700">
          No tracking events yet
        </p>
        <p className="mt-1 text-xs text-slate-500">
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
            <div className="absolute bottom-0 left-[15px] top-8 w-px bg-slate-200" />
          )}

          <div
            className={`relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full ${
              index === 0
                ? "bg-orange-100 text-orange-600"
                : "bg-slate-100 text-slate-500"
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
              <p className="text-sm font-semibold text-slate-900">
                {STATUS_LABELS[event.status]}
              </p>
              {index === 0 && (
                <span className="rounded-full bg-orange-50 px-2 py-0.5 text-[10px] font-semibold text-orange-700">
                  Latest
                </span>
              )}
            </div>

            <p className="mt-1 text-sm leading-6 text-slate-600">
              {event.description}
            </p>

            <p className="mt-2 text-xs text-slate-400">
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
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-orange-600"
        >
          <ArrowLeft className="size-4" />
          Back to shipments
        </Link>

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
                <Package className="size-5" />
              </span>
              <StatusBadge status={shipment.status} />
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Shipment details
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Tracking ID:{" "}
              <span className="font-semibold text-slate-800">
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
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
              <Truck className="size-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">
                Shipment status
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-900">
                {STATUS_LABELS[shipment.status]}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <CalendarDays className="size-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Created on</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">
                {formatDate(shipment.createdAt)}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:col-span-2 xl:col-span-1">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <CreditCard className="size-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Delivery fee</p>
              <p className="mt-1 text-lg font-bold text-slate-900">
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
                <p className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Sender
                </p>
                <AddressDetails
                  name={shipment.senderName}
                  phone={shipment.senderPhone}
                  address={shipment.senderAddress}
                />
              </div>

              <div className="border-t border-slate-100 pt-6 md:border-l md:border-t-0 md:pl-6 md:pt-0">
                <p className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">
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
                <p className="text-xs text-slate-500">Parcel type</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {shipment.parcelType}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">Parcel weight</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {shipment.weight != null
                    ? `${shipment.weight} kg`
                    : "Not specified"}
                </p>
              </div>

              <div className="sm:col-span-2">
                <p className="text-xs text-slate-500">Description</p>
                <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-slate-700">
                  {shipment.parcelDescription?.trim() ||
                    "No parcel description provided."}
                </p>
              </div>

              <div className="sm:col-span-2">
                <p className="text-xs text-slate-500">Cash on delivery (COD)</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {formatMoney(shipment.codAmount)}
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
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
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-5">
              <h2 className="font-semibold text-slate-900">Payment summary</h2>
              <p className="mt-1 text-sm text-slate-500">
                Shipment payment details
              </p>
            </div>

            <div className="space-y-4 p-5">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-slate-500">Delivery fee</span>
                <span className="text-sm font-semibold text-slate-900">
                  {formatMoney(shipment.deliveryFee)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-slate-500">COD amount</span>
                <span className="text-sm font-semibold text-slate-900">
                  {formatMoney(shipment.codAmount)}
                </span>
              </div>

              <div className="border-t border-dashed border-slate-200 pt-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-slate-700">
                    Payment status
                  </span>

                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      paymentPending
                        ? "bg-amber-50 text-amber-700"
                        : "bg-emerald-50 text-emerald-700"
                    }`}
                  >
                    {paymentPending
                      ? "Pending"
                      : paymentCancel
                        ? "Cancelled"
                        : "Paid"}
                  </span>
                </div>

                <p className="mt-2 text-xs leading-5 text-slate-500">
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

              <div className="flex items-start gap-2 rounded-xl bg-slate-50 p-3">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-slate-500" />
                <p className="text-xs leading-5 text-slate-500">
                  Payment confirmation depends on the backend payment
                  verification flow.
                </p>
              </div>
            </div>
          </section>

          {canCancel ? (
            <section className="rounded-2xl border border-red-100 bg-white p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                  <XCircle className="size-5" />
                </div>
                <div>
                  <h2 className="font-semibold text-slate-900">
                    Cancel shipment
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
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
                  className="mt-4 w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  Cancel shipment
                </Button>
              ) : (
                <div className="mt-4 space-y-3">
                  <label
                    htmlFor="cancellationReason"
                    className="block text-sm font-medium text-slate-700"
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
                    className="w-full resize-y rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 disabled:cursor-not-allowed disabled:opacity-60"
                  />

                  <div className="flex items-center justify-between gap-2 text-xs text-slate-400">
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
            <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-start gap-3">
                <UserRound className="mt-0.5 size-5 shrink-0 text-slate-400" />
                <div>
                  <h2 className="text-sm font-semibold text-slate-800">
                    Cancellation unavailable
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    This shipment can no longer be cancelled from the merchant
                    dashboard because of its current status.
                  </p>
                </div>
              </div>
            </section>
          )}

          <Link
            href="/merchant/shipments"
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-600 transition hover:border-orange-200 hover:text-orange-600"
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
        <div className="h-8 w-48 animate-pulse rounded-lg bg-slate-200" />
        <div className="h-24 animate-pulse rounded-2xl bg-slate-100" />
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-6">
            <div className="h-64 animate-pulse rounded-2xl bg-slate-100" />
            <div className="h-52 animate-pulse rounded-2xl bg-slate-100" />
          </div>
          <div className="h-72 animate-pulse rounded-2xl bg-slate-100" />
        </div>
      </div>
    );
  }

  if (isError || !shipment) {
    return (
      <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-4 text-center">
        <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
          <Package className="size-7" />
        </div>

        <h1 className="text-xl font-bold text-slate-900">
          Unable to load shipment
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-500">
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
