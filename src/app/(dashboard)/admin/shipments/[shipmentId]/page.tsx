"use client";

import {
  ArrowLeft,
  Clock3,
  CreditCard,
  MapPin,
  Package,
  RefreshCw,
  Truck,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import AssignRiderPanel from "@/components/shipment/AssignRiderPanel";
import { useAdminShipmentDetails } from "@/hooks/admin.shipments.hooks";

function formatMoney(value: string | number | null | undefined) {
  const amount = Number(value ?? 0);

  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(amount) ? amount : 0);
}

function formatDate(value: string | null | undefined) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  return new Intl.DateTimeFormat("en-BD", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function formatStatus(status: string) {
  return status.replaceAll("_", " ");
}

export default function AdminShipmentDetailsPage() {
  const params = useParams<{ shipmentId: string }>();
  const shipmentId = params.shipmentId;

  const { data, isPending, isError, refetch, isFetching } =
    useAdminShipmentDetails(shipmentId);

  // Expected response: { success, statusCode, message, data: AdminShipment }
  const shipment = data?.data;

  if (isPending) {
    return (
      <main className="space-y-5 p-4 sm:p-6">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-zinc-100" />
        <div className="h-36 animate-pulse rounded-2xl bg-zinc-100" />
        <div className="h-64 animate-pulse rounded-2xl bg-zinc-100" />
      </main>
    );
  }

  if (isError || !shipment) {
    return (
      <main className="p-6">
        <Link
          href="/admin/shipments"
          className="inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-orange-600"
        >
          <ArrowLeft size={16} />
          Back to shipments
        </Link>

        <div className="mt-6 rounded-2xl border border-red-100 bg-white p-8">
          <h1 className="text-lg font-semibold text-zinc-900">
            Could not load shipment
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            The shipment may not exist, or the request failed.
          </p>

          <button
            type="button"
            onClick={() => void refetch()}
            className="mt-4 rounded-xl bg-zinc-950 px-4 py-2 text-sm font-semibold text-white"
          >
            Try again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-w-0 space-y-6 pb-10">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <Link
            href="/admin/shipments"
            className="mb-4 inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-orange-600"
          >
            <ArrowLeft size={16} />
            All shipments
          </Link>

          <p className="text-sm font-medium text-orange-600">
            OPERATIONS / SHIPMENTS / DETAILS
          </p>

          <h1 className="mt-2 break-all text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl">
            {shipment.trackingId}
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Created {formatDate(shipment.createdAt)}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="rounded-full bg-orange-50 px-3 py-1.5 text-xs font-semibold text-orange-700">
            {formatStatus(shipment.status)}
          </span>

          <button
            type="button"
            onClick={() => void refetch()}
            disabled={isFetching}
            aria-label="Refresh shipment"
            className="rounded-xl border border-zinc-200 bg-white p-3 hover:bg-zinc-50 disabled:opacity-50"
          >
            <RefreshCw size={17} className={isFetching ? "animate-spin" : ""} />
          </button>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Delivery fee"
          value={formatMoney(shipment.deliveryFee)}
          icon={<CreditCard size={19} />}
        />
        <MetricCard
          label="COD amount"
          value={formatMoney(shipment.codAmount)}
          icon={<Package size={19} />}
        />
        <MetricCard
          label="Parcel type"
          value={formatStatus(shipment.parcelType)}
          icon={<Truck size={19} />}
        />
        <MetricCard
          label="Parcel weight"
          value={`${shipment.weight ?? "—"} kg`}
          icon={<Package size={19} />}
        />
      </section>

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(320px,1fr)]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm sm:p-6">
            <SectionTitle
              icon={<MapPin size={19} />}
              title="Delivery information"
              description="Sender and recipient details"
            />

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="rounded-xl bg-zinc-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Sender
                </p>
                <p className="mt-3 font-semibold text-zinc-900">
                  {shipment.senderName}
                </p>
                <p className="mt-1 text-sm text-zinc-600">
                  {shipment.senderPhone}
                </p>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  {shipment.senderAddress}
                </p>
              </div>

              <div className="rounded-xl bg-zinc-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Recipient
                </p>
                <p className="mt-3 font-semibold text-zinc-900">
                  {shipment.recipientName}
                </p>
                <p className="mt-1 text-sm text-zinc-600">
                  {shipment.recipientPhone}
                </p>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  {shipment.recipientAddress}
                </p>
              </div>
            </div>

            <div className="mt-5 border-t border-zinc-100 pt-5">
              <p className="text-sm font-medium text-zinc-700">
                Parcel description
              </p>
              <p className="mt-2 text-sm leading-6 text-zinc-500">
                {shipment.parcelDescription || "No description provided."}
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm sm:p-6">
            <SectionTitle
              icon={<UserRound size={19} />}
              title="Merchant information"
              description="Shipment owner"
            />

            <div className="mt-5 space-y-3 text-sm">
              <InfoRow
                label="Business"
                value={shipment.merchant?.businessName ?? "—"}
              />
              <InfoRow
                label="Business phone"
                value={shipment.merchant?.businessPhone ?? "—"}
              />
              <InfoRow label="Merchant ID" value={shipment.merchantId} />
            </div>
          </section>

          <section className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm sm:p-6">
            <SectionTitle
              icon={<Clock3 size={19} />}
              title="Shipment timeline"
              description="Recorded tracking events"
            />

            <div className="mt-6">
              {!shipment.trackingEvents?.length ? (
                <p className="text-sm text-zinc-500">
                  No tracking events recorded yet.
                </p>
              ) : (
                <div className="space-y-5">
                  {shipment.trackingEvents.map((event) => (
                    <div key={event.id} className="flex gap-3">
                      <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-orange-500 ring-4 ring-orange-50" />

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-zinc-900">
                          {formatStatus(event.status)}
                        </p>
                        <p className="mt-1 text-sm leading-5 text-zinc-600">
                          {event.description}
                        </p>
                        {event.location && (
                          <p className="mt-1 text-xs text-zinc-500">
                            {event.location}
                          </p>
                        )}
                        <p className="mt-2 text-xs text-zinc-400">
                          {formatDate(event.createdAt)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          <section className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm sm:p-6">
            <SectionTitle
              icon={<CreditCard size={19} />}
              title="Payment records"
              description="Payments associated with this shipment"
            />

            <div className="mt-5 space-y-3">
              {!shipment.payments?.length ? (
                <p className="text-sm text-zinc-500">
                  No payment records found.
                </p>
              ) : (
                shipment.payments.map((payment) => (
                  <div
                    key={payment.id}
                    className="rounded-xl border border-zinc-100 p-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-semibold text-zinc-900">
                        {formatMoney(payment.amount)}
                      </p>
                      <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600">
                        {formatStatus(payment.status)}
                      </span>
                    </div>

                    <p className="mt-2 text-xs text-zinc-500">
                      {payment.paymentGateway} · {payment.merchantInvoiceNumber}
                    </p>

                    <p className="mt-1 text-xs text-zinc-400">
                      {formatDate(payment.paidAt ?? payment.createdAt)}
                    </p>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm sm:p-6">
            <SectionTitle
              icon={<Truck size={19} />}
              title="Rider assignment"
              description="Manage the assigned delivery rider"
            />

            <div className="mt-5">
              <AssignRiderPanel shipment={shipment} />
            </div>
          </section>

          <section className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm sm:p-6">
            <SectionTitle
              icon={<Package size={19} />}
              title="Shipment timestamps"
              description="Latest available lifecycle dates"
            />

            <div className="mt-5 space-y-4">
              <InfoRow
                label="Assigned"
                value={formatDate(shipment.assignedAt)}
              />
              <InfoRow
                label="Picked up"
                value={formatDate(shipment.pickedUpAt)}
              />
              <InfoRow
                label="Delivered"
                value={formatDate(shipment.deliveredAt)}
              />
              <InfoRow
                label="Delivery failed"
                value={formatDate(shipment.deliveryFailedAt)}
              />
              {shipment.failureReason && (
                <InfoRow
                  label="Failure reason"
                  value={shipment.failureReason}
                />
              )}
              {shipment.cancellationReason && (
                <InfoRow
                  label="Cancellation reason"
                  value={shipment.cancellationReason}
                />
              )}
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}

function MetricCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <article className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-zinc-500">{label}</p>
        <span className="rounded-xl bg-orange-50 p-2.5 text-orange-600">
          {icon}
        </span>
      </div>
      <p className="mt-4 break-words text-xl font-bold text-zinc-950">
        {value}
      </p>
    </article>
  );
}

function SectionTitle({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="rounded-xl bg-zinc-100 p-2.5 text-zinc-700">{icon}</span>
      <div>
        <h2 className="font-bold text-zinc-950">{title}</h2>
        <p className="mt-1 text-sm text-zinc-500">{description}</p>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col justify-between gap-1 sm:flex-row sm:gap-4">
      <span className="shrink-0 text-zinc-500">{label}</span>
      <span className="break-words text-sm font-medium text-zinc-800 sm:text-right">
        {value}
      </span>
    </div>
  );
}
