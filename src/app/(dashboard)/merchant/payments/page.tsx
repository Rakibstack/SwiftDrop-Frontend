
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CreditCard,
  Eye,
  LoaderCircle,
  RefreshCw,
  Search,
  Wallet,
} from "lucide-react";

import type { Payment } from "@/types/payment.types";
import { usePayments } from "@/hooks/payment.hooks";

const PAGE_SIZE = 10;

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
    dateStyle: "medium",
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

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusStyle(status)}`}
    >
      {status.replaceAll("_", " ")}
    </span>
  );
}

function PaymentRow({ payment }: { payment: Payment }) {
  const invoice =
    payment.merchantInvoiceNumber || payment.id.slice(0, 8).toUpperCase();

  return (
    <tr className="border-b border-slate-100 transition hover:bg-orange-50/30 last:border-0">
      <td className="px-5 py-4">
        <div className="font-semibold text-slate-900">{invoice}</div>
        <div className="mt-1 text-xs text-slate-500">
          {formatDate(payment.createdAt)}
        </div>
      </td>

      <td className="px-5 py-4">
        <div className="font-medium text-slate-800">
          {payment.shipment?.trackingId || "—"}
        </div>
        <div className="mt-1 text-xs text-slate-500">
          {payment.shipment?.recipientName || "Shipment payment"}
        </div>
      </td>

      <td className="px-5 py-4">
        <span className="font-semibold text-slate-900">
          {formatMoney(payment.amount, payment.currency || "BDT")}
        </span>
      </td>

      <td className="px-5 py-4">
        <span className="font-medium text-slate-700">
          {payment.paymentGateway || "—"}
        </span>
      </td>

      <td className="px-5 py-4">
        <StatusBadge status={payment.status} />
      </td>

      <td className="px-5 py-4 text-right">
        <Link
          href={`/merchant/payments/${payment.id}`}
          aria-label={`View payment ${invoice}`}
          className="inline-flex size-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
        >
          <Eye className="size-4" />
        </Link>
      </td>
    </tr>
  );
}

export default function MerchantPaymentsPage() {
  const { data: response, isPending, isError, refetch, isFetching } =
    usePayments();

  const payments = response?.data ?? [];

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [page, setPage] = useState(1);

  const filteredPayments = useMemo(() => {
    const term = search.trim().toLowerCase();

    return payments.filter((payment) => {
      const matchesStatus =
        status === "ALL" || payment.status.toUpperCase() === status;

      const searchable = [
        payment.id,
        payment.merchantInvoiceNumber,
        payment.bkashTrxId,
        payment.bkashPaymentId,
        payment.payerReference,
        payment.shipment?.trackingId,
        payment.shipment?.recipientName,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return matchesStatus && (!term || searchable.includes(term));
    });
  }, [payments, search, status]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPayments.length / PAGE_SIZE),
  );

  const currentPage = Math.min(page, totalPages);

  const paginatedPayments = filteredPayments.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const paidPayments = payments.filter((payment) =>
    ["PAID", "COMPLETED"].includes(payment.status.toUpperCase()),
  );

  const pendingPayments = payments.filter(
    (payment) => payment.status.toUpperCase() === "PENDING",
  );

  const paidAmount = paidPayments.reduce(
    (total, payment) => total + (Number(payment.amount) || 0),
    0,
  );

  const pendingAmount = pendingPayments.reduce(
    (total, payment) => total + (Number(payment.amount) || 0),
    0,
  );

  function handleSearch(value: string) {
    setSearch(value);
    setPage(1);
  }

  function handleStatus(value: string) {
    setStatus(value);
    setPage(1);
  }

  return (
    <main className="min-h-screen space-y-7 bg-slate-50/70 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-orange-600">
            <Wallet className="size-4" />
            Finance & transactions
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            Payments
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
            Track shipment payments, review transaction references, and check
            payment status in one place.
          </p>
        </div>

        <button
          type="button"
          onClick={() => void refetch()}
          disabled={isFetching}
          className="inline-flex h-10 items-center justify-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-orange-300 hover:text-orange-600 disabled:opacity-60 sm:self-auto"
        >
          <RefreshCw
            className={`size-4 ${isFetching ? "animate-spin" : ""}`}
          />
          Refresh
        </button>
      </section>

      {/* Summary cards */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex size-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
              <CreditCard className="size-5" />
            </div>
            <span className="text-xs font-medium text-slate-400">
              All records
            </span>
          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Total payments
          </p>
          <p className="mt-1 text-3xl font-bold tracking-tight text-slate-950">
            {payments.length}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <ArrowUpRight className="size-5" />
            </div>
            <span className="text-xs font-medium text-emerald-600">
              Paid / completed
            </span>
          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Successful payment amount
          </p>
          <p className="mt-1 text-2xl font-bold tracking-tight text-slate-950">
            {formatMoney(paidAmount)}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex size-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <ArrowDownRight className="size-5" />
            </div>
            <span className="text-xs font-medium text-amber-600">
              Awaiting payment
            </span>
          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Pending amount
          </p>
          <p className="mt-1 text-2xl font-bold tracking-tight text-slate-950">
            {formatMoney(pendingAmount)}
          </p>
        </div>
      </section>

      {/* Payments table */}
      <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-slate-100 p-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-bold text-slate-900">Transaction history</h2>
            <p className="mt-1 text-sm text-slate-500">
              {filteredPayments.length} matching payment
              {filteredPayments.length === 1 ? "" : "s"}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative min-w-0 sm:w-72">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(event) => handleSearch(event.target.value)}
                placeholder="Search invoice, tracking ID..."
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-orange-300 focus:bg-white focus:ring-4 focus:ring-orange-500/10"
              />
            </div>

            <select
              value={status}
              onChange={(event) => handleStatus(event.target.value)}
              className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-orange-300 focus:ring-4 focus:ring-orange-500/10"
            >
              <option value="ALL">All statuses</option>
              <option value="PENDING">Pending</option>
              <option value="PAID">Paid</option>
              <option value="COMPLETED">Completed</option>
              <option value="FAILED">Failed</option>
              <option value="CANCELLED">Cancelled</option>
              <option value="REFUNDED">Refunded</option>
              <option value="PARTIALLY_REFUNDED">Partially refunded</option>
            </select>
          </div>
        </div>

        {isPending ? (
          <div className="flex min-h-72 flex-col items-center justify-center gap-3">
            <LoaderCircle className="size-8 animate-spin text-orange-500" />
            <p className="text-sm text-slate-500">Loading your payments...</p>
          </div>
        ) : isError ? (
          <div className="flex min-h-72 flex-col items-center justify-center px-5 text-center">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
              <CreditCard className="size-6" />
            </div>
            <h3 className="mt-4 font-semibold text-slate-900">
              Unable to load payments
            </h3>
            <p className="mt-1 max-w-sm text-sm text-slate-500">
              Please check your connection and try again.
            </p>
            <button
              type="button"
              onClick={() => void refetch()}
              className="mt-4 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
            >
              Try again
            </button>
          </div>
        ) : filteredPayments.length === 0 ? (
          <div className="flex min-h-72 flex-col items-center justify-center px-5 text-center">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
              <Wallet className="size-7" />
            </div>
            <h3 className="mt-4 font-semibold text-slate-900">
              No payments found
            </h3>
            <p className="mt-1 max-w-sm text-sm text-slate-500">
              {search || status !== "ALL"
                ? "Try changing your search or status filter."
                : "Your shipment payments will appear here."}
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-left">
                <thead className="bg-slate-50/80">
                  <tr className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <th className="px-5 py-3.5">Invoice / Date</th>
                    <th className="px-5 py-3.5">Shipment</th>
                    <th className="px-5 py-3.5">Amount</th>
                    <th className="px-5 py-3.5">Gateway</th>
                    <th className="px-5 py-3.5">Status</th>
                    <th className="px-5 py-3.5 text-right">Details</th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedPayments.map((payment) => (
                    <PaymentRow key={payment.id} payment={payment} />
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-500">
                Showing{" "}
                {Math.min((currentPage - 1) * PAGE_SIZE + 1, filteredPayments.length)}
                {"–"}
                {Math.min(currentPage * PAGE_SIZE, filteredPayments.length)} of{" "}
                {filteredPayments.length}
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setPage((value) => Math.max(1, value - 1))}
                  className="h-9 rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>

                <span className="min-w-16 text-center text-sm font-semibold text-slate-700">
                  {currentPage} / {totalPages}
                </span>

                <button
                  type="button"
                  disabled={currentPage >= totalPages}
                  onClick={() =>
                    setPage((value) => Math.min(totalPages, value + 1))
                  }
                  className="inline-flex h-9 items-center gap-1 rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next <ArrowRight className="size-3.5" />
                </button>
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
}