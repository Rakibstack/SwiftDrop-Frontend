"use client";

import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  CreditCard,
  ExternalLink,
  FileText,
  LoaderCircle,
  Package,
  RefreshCw,
  ShieldCheck,
  Wallet,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { usePaymentDetails } from "@/hooks/payment.hooks";
import type { Payment } from "@/types/payment.types";

function formatMoney(amount: number | string, currency = "BDT") {
  const value = Number(amount);

  if (!Number.isFinite(value)) return "—";

  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value);
}

function formatDate(date?: string | null) {
  if (!date) return "Not available";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "Not available";

  return new Intl.DateTimeFormat("en-BD", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(parsed);
}

function getStatusStyle(status: string) {
  switch (status.toUpperCase()) {
    case "PAID":
    case "COMPLETED":
      return "border-emerald-200 bg-emerald-50 text-emerald-700";

    case "PENDING":
      return "border-amber-200 bg-amber-50 text-amber-700";

    case "FAILED":
    case "CANCELLED":
      return "border-rose-200 bg-rose-50 text-rose-700";

    case "REFUNDED":
    case "PARTIALLY_REFUNDED":
      return "border-violet-200 bg-violet-50 text-violet-700";

    default:
      return "border-slate-200 bg-slate-100 text-slate-700";
  }
}

function InfoRow({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="flex flex-col gap-1.5 py-3 sm:flex-row sm:items-start sm:justify-between sm:gap-5">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="break-all text-sm font-semibold text-slate-800 sm:max-w-[65%] sm:text-right">
        {value || "Not available"}
      </span>
    </div>
  );
}

function PaymentStatusIcon({ status }: { status: string }) {
  const normalized = status.toUpperCase();

  if (["PAID", "COMPLETED"].includes(normalized)) {
    return <CheckCircle2 className="size-6" />;
  }

  if (["FAILED", "CANCELLED"].includes(normalized)) {
    return <XCircle className="size-6" />;
  }

  if (normalized === "PENDING") {
    return <Clock3 className="size-6" />;
  }

  return <Wallet className="size-6" />;
}

function PaymentInformation({ payment }: { payment: Payment }) {
  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
          <FileText className="size-5" />
        </div>
        <div>
          <h2 className="font-bold text-slate-900">Payment information</h2>
          <p className="mt-0.5 text-xs text-slate-500">
            Invoice and transaction references
          </p>
        </div>
      </div>

      <div className="mt-5 divide-y divide-slate-100">
        <InfoRow label="Invoice number" value={payment.merchantInvoiceNumber} />
        <InfoRow label="Payment ID" value={payment.id} />
        <InfoRow label="Payment gateway" value={payment.paymentGateway} />
        <InfoRow label="Currency" value={payment.currency || "BDT"} />
        <InfoRow label="bKash payment ID" value={payment.bkashPaymentId} />
        <InfoRow label="bKash transaction ID" value={payment.bkashTrxId} />
        <InfoRow label="Payer reference" value={payment.payerReference} />
        <InfoRow label="Created at" value={formatDate(payment.createdAt)} />
        <InfoRow label="Paid at" value={formatDate(payment.paidAt)} />
        <InfoRow label="Last updated" value={formatDate(payment.updatedAt)} />
      </div>
    </section>
  );
}

function ShipmentInformation({ payment }: { payment: Payment }) {
  const shipment = payment.shipment;

  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
          <Package className="size-5" />
        </div>
        <div>
          <h2 className="font-bold text-slate-900">Linked shipment</h2>
          <p className="mt-0.5 text-xs text-slate-500">
            Shipment associated with this payment
          </p>
        </div>
      </div>

      {shipment ? (
        <>
          <div className="mt-5 rounded-xl border border-slate-100 bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Tracking number
            </p>
            <p className="mt-2 break-all text-lg font-bold text-slate-900">
              {shipment.trackingId || "Tracking ID unavailable"}
            </p>

            {shipment.status && (
              <span className="mt-3 inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                {shipment.status.replaceAll("_", " ")}
              </span>
            )}
          </div>

          <div className="mt-4 divide-y divide-slate-100">
            <InfoRow label="Recipient" value={shipment.recipientName} />
            <InfoRow label="Sender" value={shipment.senderName} />
          </div>

          {shipment.id && (
            <Link
              href={`/merchant/shipments/${shipment.id}`}
              className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700"
            >
              View shipment details
              <ExternalLink className="size-4" />
            </Link>
          )}
        </>
      ) : (
        <div className="mt-5 rounded-xl border border-dashed border-slate-200 p-5 text-center">
          <Package className="mx-auto size-7 text-slate-400" />
          <p className="mt-2 text-sm font-semibold text-slate-800">
            Shipment details unavailable
          </p>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            The payment response did not include its shipment information.
          </p>

          {payment.shipmentId && (
            <p className="mt-3 break-all text-xs text-slate-500">
              Shipment ID: {payment.shipmentId}
            </p>
          )}
        </div>
      )}
    </section>
  );
}

export default function MerchantPaymentDetailsPage() {
  const params = useParams<{ paymentId: string }>();
  const router = useRouter();
  const paymentId = params.paymentId;

  const {
    data: response,
    isPending,
    isError,
    refetch,
    isFetching,
  } = usePaymentDetails(paymentId);

  const payment = response?.data;

  if (isPending) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 bg-slate-50/70">
        <LoaderCircle className="size-8 animate-spin text-orange-500" />
        <p className="text-sm text-slate-500">Loading payment details...</p>
      </div>
    );
  }

  if (isError || !payment) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center bg-slate-50/70 px-5 text-center">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
          <CreditCard className="size-7" />
        </div>
        <h1 className="mt-4 text-xl font-bold text-slate-900">
          Payment not found
        </h1>
        <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
          We couldn&apos;t load this payment. It may not exist, or you may not
          have permission to view it.
        </p>

        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => void refetch()}
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            <RefreshCw className="size-4" />
            Try again
          </button>

          <button
            type="button"
            onClick={() => router.push("/merchant/payments")}
            className="h-10 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white hover:bg-slate-700"
          >
            Back to payments
          </button>
        </div>
      </main>
    );
  }

  const successful = ["PAID", "COMPLETED"].includes(
    payment.status.toUpperCase(),
  );

  return (
    <main className="min-h-screen space-y-6 bg-slate-50/70 p-4 sm:p-6 lg:p-8">
      {/* Navigation */}
      <button
        type="button"
        onClick={() => router.push("/merchant/payments")}
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-orange-600"
      >
        <ArrowLeft className="size-4" />
        Back to payments
      </button>

      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-950 p-6 text-white shadow-sm sm:p-8">
        <div className="pointer-events-none absolute -right-16 -top-24 size-72 rounded-full bg-orange-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 right-1/3 size-56 rounded-full bg-orange-400/10 blur-3xl" />

        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-orange-300">
              <Wallet className="size-4" />
              Payment overview
            </div>

            <h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
              Payment details
            </h1>

            <p className="mt-2 max-w-lg break-all text-sm leading-6 text-slate-300">
              {payment.merchantInvoiceNumber || payment.id}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${getStatusStyle(payment.status)}`}
              >
                <PaymentStatusIcon status={payment.status} />
                {payment.status.replaceAll("_", " ")}
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200">
                <ShieldCheck className="size-3.5" />
                Merchant payment
              </span>
            </div>
          </div>

          <div className="relative rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-sm md:min-w-64">
            <p className="text-sm font-medium text-slate-300">Payment amount</p>
            <p className="mt-2 break-words text-3xl font-bold tracking-tight sm:text-4xl">
              {formatMoney(payment.amount, payment.currency || "BDT")}
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-300">
              {successful ? (
                <>
                  <CheckCircle2 className="size-4 text-emerald-400" />
                  Payment successful
                </>
              ) : payment.status.toUpperCase() === "PENDING" ? (
                <>
                  <Clock3 className="size-4 text-amber-300" />
                  Awaiting confirmation
                </>
              ) : (
                <>
                  <CreditCard className="size-4 text-slate-300" />
                  Current payment status
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6">
          <PaymentInformation payment={payment} />
          <ShipmentInformation payment={payment} />
        </div>

        <div className="space-y-6">
          {/* Timeline */}
          <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                <CalendarDays className="size-5" />
              </div>
              <div>
                <h2 className="font-bold text-slate-900">Payment timeline</h2>
                <p className="mt-0.5 text-xs text-slate-500">
                  Recorded payment timestamps
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-5">
              <div className="flex gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                  <Clock3 className="size-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-900">
                    Payment record created
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {formatDate(payment.createdAt)}
                  </p>
                </div>
              </div>

              <div className="ml-4 h-5 border-l border-dashed border-slate-200" />

              <div className="flex gap-3">
                <div
                  className={`flex size-9 shrink-0 items-center justify-center rounded-full ${
                    successful
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {successful ? (
                    <CheckCircle2 className="size-4" />
                  ) : (
                    <Clock3 className="size-4" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-900">
                    {successful
                      ? "Payment confirmed"
                      : "Awaiting final payment status"}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {formatDate(payment.paidAt)}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Security note */}
          <section className="rounded-2xl border border-orange-100 bg-orange-50/70 p-5">
            <div className="flex gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-orange-600 shadow-sm">
                <ShieldCheck className="size-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">
                  Secure payment records
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  This page displays the payment status reported by your
                  backend. Use the transaction reference when contacting support
                  about a payment issue.
                </p>
              </div>
            </div>
          </section>

          <button
            type="button"
            onClick={() => void refetch()}
            disabled={isFetching}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 shadow-sm transition hover:border-orange-300 hover:text-orange-600 disabled:opacity-60"
          >
            <RefreshCw
              className={`size-4 ${isFetching ? "animate-spin" : ""}`}
            />
            Refresh payment details
          </button>
        </div>
      </div>
    </main>
  );
}
