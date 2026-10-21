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
      return "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400";

    case "PENDING":
      return "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-400";

    case "FAILED":
    case "CANCELLED":
      return "border-rose-500/20 bg-rose-500/10 text-rose-700 dark:text-rose-400";

    case "REFUNDED":
    case "PARTIALLY_REFUNDED":
      return "border-violet-500/20 bg-violet-500/10 text-violet-700 dark:text-violet-400";

    default:
      return "border-border bg-muted text-foreground";
  }
}

function InfoRow({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="flex flex-col gap-1.5 py-3 sm:flex-row sm:items-start sm:justify-between sm:gap-5">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="break-all text-sm font-semibold text-foreground sm:max-w-[65%] sm:text-right">
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
    <section className="rounded-2xl border border-border/80 bg-card p-5 shadow-sm sm:p-6">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400">
          <FileText className="size-5" />
        </div>
        <div>
          <h2 className="font-bold text-foreground">Payment information</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Invoice and transaction references
          </p>
        </div>
      </div>

      <div className="mt-5 divide-y divide-border">
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
    <section className="rounded-2xl border border-border/80 bg-card p-5 shadow-sm sm:p-6">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400">
          <Package className="size-5" />
        </div>
        <div>
          <h2 className="font-bold text-foreground">Linked shipment</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Shipment associated with this payment
          </p>
        </div>
      </div>

      {shipment ? (
        <>
          <div className="mt-5 rounded-xl border border-border bg-muted p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Tracking number
            </p>
            <p className="mt-2 break-all text-lg font-bold text-foreground">
              {shipment.trackingId || "Tracking ID unavailable"}
            </p>

            {shipment.status && (
              <span className="mt-3 inline-flex rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-foreground">
                {shipment.status.replaceAll("_", " ")}
              </span>
            )}
          </div>

          <div className="mt-4 divide-y divide-border">
            <InfoRow label="Recipient" value={shipment.recipientName} />
            <InfoRow label="Sender" value={shipment.senderName} />
          </div>

          {shipment.id && (
            <Link
              href={`/merchant/shipments/${shipment.id}`}
              className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-border text-sm font-semibold text-foreground transition hover:border-orange-500/40 hover:bg-orange-500/10 hover:text-orange-700 dark:text-orange-400"
            >
              View shipment details
              <ExternalLink className="size-4" />
            </Link>
          )}
        </>
      ) : (
        <div className="mt-5 rounded-xl border border-dashed border-border p-5 text-center">
          <Package className="mx-auto size-7 text-muted-foreground" />
          <p className="mt-2 text-sm font-semibold text-foreground">
            Shipment details unavailable
          </p>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            The payment response did not include its shipment information.
          </p>

          {payment.shipmentId && (
            <p className="mt-3 break-all text-xs text-muted-foreground">
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
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 bg-muted/70">
        <LoaderCircle className="size-8 animate-spin text-orange-500" />
        <p className="text-sm text-muted-foreground">Loading payment details...</p>
      </div>
    );
  }

  if (isError || !payment) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center bg-muted/70 px-5 text-center">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
          <CreditCard className="size-7" />
        </div>
        <h1 className="mt-4 text-xl font-bold text-foreground">
          Payment not found
        </h1>
        <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
          We couldn&apos;t load this payment. It may not exist, or you may not
          have permission to view it.
        </p>

        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => void refetch()}
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-card px-4 text-sm font-semibold text-foreground hover:bg-muted"
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
    <main className="min-h-screen space-y-6 bg-muted/70 p-4 sm:p-6 lg:p-8">
      {/* Navigation */}
      <button
        type="button"
        onClick={() => router.push("/merchant/payments")}
        className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-orange-600 dark:text-orange-400"
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

            <p className="mt-2 max-w-lg break-all text-sm leading-6 text-white/70">
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
            <p className="text-sm font-medium text-white/70">Payment amount</p>
            <p className="mt-2 break-words text-3xl font-bold tracking-tight sm:text-4xl">
              {formatMoney(payment.amount, payment.currency || "BDT")}
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-white/70">
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
                  <CreditCard className="size-4 text-white/70" />
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
          <section className="rounded-2xl border border-border/80 bg-card p-5 shadow-sm sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400">
                <CalendarDays className="size-5" />
              </div>
              <div>
                <h2 className="font-bold text-foreground">Payment timeline</h2>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Recorded payment timestamps
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-5">
              <div className="flex gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <Clock3 className="size-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-foreground">
                    Payment record created
                  </p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    {formatDate(payment.createdAt)}
                  </p>
                </div>
              </div>

              <div className="ml-4 h-5 border-l border-dashed border-border" />

              <div className="flex gap-3">
                <div
                  className={`flex size-9 shrink-0 items-center justify-center rounded-full ${
                    successful
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {successful ? (
                    <CheckCircle2 className="size-4" />
                  ) : (
                    <Clock3 className="size-4" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-foreground">
                    {successful
                      ? "Payment confirmed"
                      : "Awaiting final payment status"}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    {formatDate(payment.paidAt)}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Security note */}
          <section className="rounded-2xl border border-orange-500/10 bg-orange-500/10/70 p-5">
            <div className="flex gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-card text-orange-600 dark:text-orange-400 shadow-sm">
                <ShieldCheck className="size-5" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">
                  Secure payment records
                </h3>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
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
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-border bg-card text-sm font-semibold text-foreground shadow-sm transition hover:border-orange-500/40 hover:text-orange-600 dark:text-orange-400 disabled:opacity-60"
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
