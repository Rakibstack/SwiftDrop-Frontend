"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  Ban,
  CheckCircle2,
  Clock3,
  CreditCard,
  MapPin,
  Package,
  RefreshCw,
  ShieldCheck,
  Truck,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Shipment, ShipmentStatus } from "@/types/shipment.types";
import { useShipmentDetails } from "@/hooks";

function formatMoney(amount: number) {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 2,
  }).format(amount);
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(date));
}

function formatStatus(status: ShipmentStatus) {
  return status
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function StatusBadge({ status }: { status: ShipmentStatus }) {
  const styles: Record<ShipmentStatus, string> = {
    PAYMENT_PENDING: "bg-amber-50 text-amber-700 ring-amber-200",
    PAYMENT_CONFIRMED: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    ASSIGNED: "bg-blue-50 text-blue-700 ring-blue-200",
    ACCEPTED: "bg-blue-50 text-blue-700 ring-blue-200",
    PICKED_UP: "bg-indigo-50 text-indigo-700 ring-indigo-200",
    IN_TRANSIT: "bg-violet-50 text-violet-700 ring-violet-200",
    OUT_FOR_DELIVERY: "bg-orange-50 text-orange-700 ring-orange-200",
    DELIVERED: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    DELIVERY_FAILED: "bg-red-50 text-red-700 ring-red-200",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${styles[status]}`}
    >
      {formatStatus(status)}
    </span>
  );
}

function InfoCard({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Package;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
          <Icon className="size-5" />
        </div>
        <h2 className="font-semibold text-gray-900">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="text-xs font-medium text-gray-500">{label}</p>
      <p className="mt-1.5 break-words text-sm font-medium leading-6 text-gray-900">
        {value || "—"}
      </p>
    </div>
  );
}

function LoadingState() {
  return (
    <main className="mx-auto max-w-6xl space-y-5 pb-10">
      <div className="h-5 w-40 animate-pulse rounded bg-gray-100" />
      <div className="h-32 animate-pulse rounded-2xl bg-gray-100" />
      <div className="grid gap-5 lg:grid-cols-3">
        <div className="h-64 animate-pulse rounded-2xl bg-gray-100 lg:col-span-2" />
        <div className="h-64 animate-pulse rounded-2xl bg-gray-100" />
      </div>
    </main>
  );
}

function ShipmentDetailsContent({
  shipment,
  onRefresh,
  isFetching,
}: {
  shipment: Shipment;
  onRefresh: () => void;
  isFetching: boolean;
}) {
  const canCancel =
    shipment.status === "PAYMENT_PENDING" ||
    shipment.status === "PAYMENT_CONFIRMED";

  const paymentPending = shipment.status === "PAYMENT_PENDING";

  // UI placeholder only. Connect these to the backend mutations later.
  const handlePayment = () => {
    toast.info("bKash payment integration will be connected next.");
  };

  const handleCancel = () => {
    toast.info("Shipment cancellation API will be connected next.");
  };

  const events = [...(shipment.trackingEvents ?? [])].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );

  return (
    <main className="mx-auto w-full max-w-6xl space-y-6 pb-10">
      {/* Breadcrumb */}
      <Link
        href="/merchant/shipments"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-orange-600"
      >
        <ArrowLeft className="size-4" />
        Back to shipments
      </Link>

      {/* Shipment heading */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="hidden size-12 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-orange-600 sm:flex">
              <Package className="size-6" />
            </div>

            <div className="min-w-0">
              <p className="text-sm text-gray-500">Shipment tracking ID</p>
              <h1 className="mt-1 break-all text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {shipment.trackingId}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <StatusBadge status={shipment.status} />
                <span className="text-xs text-gray-500">
                  Created {formatDate(shipment.createdAt)}
                </span>
              </div>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            disabled={isFetching}
            onClick={onRefresh}
            className="h-10 shrink-0 rounded-xl"
          >
            <RefreshCw
              className={`mr-2 size-4 ${isFetching ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>
      </section>

      {/* Main content */}
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_350px]">
        <div className="min-w-0 space-y-6">
          {/* Sender and recipient */}
          <div className="grid gap-5 md:grid-cols-2">
            <InfoCard icon={UserRound} title="Sender information">
              <div className="space-y-4">
                <DetailItem label="Full name" value={shipment.senderName} />
                <DetailItem label="Phone number" value={shipment.senderPhone} />
                <DetailItem
                  label="Pickup address"
                  value={shipment.senderAddress}
                />
              </div>
            </InfoCard>

            <InfoCard icon={MapPin} title="Recipient information">
              <div className="space-y-4">
                <DetailItem label="Full name" value={shipment.recipientName} />
                <DetailItem
                  label="Phone number"
                  value={shipment.recipientPhone}
                />
                <DetailItem
                  label="Delivery address"
                  value={shipment.recipientAddress}
                />
              </div>
            </InfoCard>
          </div>

          {/* Parcel details */}
          <InfoCard icon={Package} title="Parcel details">
            <div className="grid gap-5 sm:grid-cols-2">
              <DetailItem label="Tracking ID" value={shipment.trackingId} />
              <DetailItem label="Parcel type" value={shipment.parcelType} />
              <DetailItem
                label="Weight"
                value={
                  shipment.weight == null
                    ? "Not specified"
                    : `${shipment.weight} kg`
                }
              />
              <DetailItem
                label="Description"
                value={shipment.parcelDescription || "No description provided"}
              />
              <DetailItem
                label="Last updated"
                value={formatDate(shipment.updatedAt)}
              />
            </div>
          </InfoCard>

          {/* Tracking timeline */}
          <InfoCard icon={Truck} title="Shipment activity">
            {events.length === 0 ? (
              <div className="rounded-xl bg-gray-50 px-4 py-8 text-center">
                <Clock3 className="mx-auto size-7 text-gray-300" />
                <p className="mt-3 text-sm font-medium text-gray-700">
                  No tracking activity yet
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Shipment updates will appear here as they become available.
                </p>
              </div>
            ) : (
              <ol className="space-y-0">
                {events.map((event, index) => {
                  const latest = index === events.length - 1;

                  return (
                    <li
                      key={event.id}
                      className="relative flex gap-3 pb-6 last:pb-0"
                    >
                      <div className="flex flex-col items-center">
                        <div
                          className={`z-10 flex size-8 shrink-0 items-center justify-center rounded-full ${
                            latest
                              ? "bg-orange-100 text-orange-700"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {latest ? (
                            <Truck className="size-4" />
                          ) : (
                            <CheckCircle2 className="size-4" />
                          )}
                        </div>

                        {index !== events.length - 1 && (
                          <div className="absolute bottom-0 left-4 top-8 w-px bg-gray-200" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1 pt-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-semibold text-gray-900">
                            {formatStatus(event.status)}
                          </p>
                          {latest && (
                            <span className="rounded-full bg-orange-50 px-2 py-0.5 text-[10px] font-semibold text-orange-700">
                              Latest
                            </span>
                          )}
                        </div>

                        <p className="mt-1 text-sm leading-6 text-gray-600">
                          {event.description}
                        </p>

                        <p className="mt-2 text-xs text-gray-400">
                          {formatDate(event.createdAt)}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            )}
          </InfoCard>
        </div>

        {/* Payment sidebar */}
        <aside className="space-y-5 lg:sticky lg:top-24">
          <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 p-5">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                  <CreditCard className="size-5" />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">
                    Payment summary
                  </h2>
                  <p className="mt-1 text-xs text-gray-500">Shipment charges</p>
                </div>
              </div>

              <p className="mt-6 text-sm text-gray-500">Delivery fee</p>
              <p className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
                {formatMoney(shipment.deliveryFee)}
              </p>

              <div className="mt-4 flex items-center gap-2">
                {paymentPending ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
                    <Clock3 className="size-3.5" />
                    Payment pending
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                    <CheckCircle2 className="size-3.5" />
                    Payment confirmed
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-3 p-5">
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="text-gray-500">Delivery fee</span>
                <span className="font-medium text-gray-900">
                  {formatMoney(shipment.deliveryFee)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="text-gray-500">COD to collect</span>
                <span className="font-medium text-gray-900">
                  {formatMoney(shipment.codAmount)}
                </span>
              </div>

              <div className="border-t border-dashed border-gray-200 pt-3">
                <div className="flex items-start gap-2">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                  <p className="text-xs leading-5 text-gray-500">
                    COD is collected from the recipient. It is separate from the
                    delivery fee payable by the merchant.
                  </p>
                </div>
              </div>

              {paymentPending ? (
                <Button
                  type="button"
                  onClick={handlePayment}
                  className="h-11 w-full rounded-xl bg-orange-600 font-semibold text-white hover:bg-orange-700"
                >
                  Pay with bKash
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              ) : (
                <div className="flex items-center justify-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-3 text-sm font-semibold text-emerald-700">
                  <CheckCircle2 className="size-4" />
                  Payment confirmed
                </div>
              )}

              <p className="text-center text-xs leading-5 text-gray-400">
                {paymentPending
                  ? "Complete payment to proceed with shipment processing."
                  : "Your shipment has passed the initial payment stage."}
              </p>
            </div>
          </section>

          {/* Cancellation action */}
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-gray-900">Shipment actions</h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              {canCancel
                ? "You can request cancellation while the shipment is pending payment or payment confirmed."
                : "Cancellation is unavailable after the shipment moves beyond the eligible payment stages."}
            </p>

            <Button
              type="button"
              variant="outline"
              disabled={!canCancel}
              onClick={handleCancel}
              className="mt-4 h-10 w-full rounded-xl border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 disabled:text-gray-400"
            >
              <Ban className="mr-2 size-4" />
              Cancel shipment
            </Button>

            {!canCancel && (
              <p className="mt-2 text-xs text-gray-400">
                Only Payment Pending and Payment Confirmed shipments are
                eligible.
              </p>
            )}
          </section>
        </aside>
      </div>
    </main>
  );
}

export default function MerchantShipmentDetailsPage() {
  const params = useParams<{ shipmentId: string }>();
  const shipmentId = params.shipmentId;

  const {
    data: response,
    isPending,
    isError,
    refetch,
    isFetching,
  } = useShipmentDetails(shipmentId);

  const shipment = response?.data;

  if (isPending) {
    return <LoadingState />;
  }

  if (isError || !shipment) {
    return (
      <main className="mx-auto max-w-3xl py-16 text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-500">
          <Package className="size-7" />
        </div>
        <h1 className="mt-4 text-xl font-bold text-gray-900">
          Shipment not found
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          We could not load this shipment. It may not exist, or you may not have
          permission to view it.
        </p>
        <div className="mt-5 flex justify-center gap-3">
          <Button
            variant="outline"
            onClick={() => void refetch()}
            className="rounded-xl"
          >
            Try again
          </Button>
          <Link href="/merchant/shipments">
            <Button className="rounded-xl bg-orange-600 text-white hover:bg-orange-700">
              All shipments
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <ShipmentDetailsContent
      shipment={shipment}
      onRefresh={() => void refetch()}
      isFetching={isFetching}
    />
  );
}
