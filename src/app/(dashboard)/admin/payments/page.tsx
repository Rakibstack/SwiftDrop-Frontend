"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  Banknote,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  CreditCard,
  Eye,
  RefreshCw,
  Search,
  X,
} from "lucide-react";

import type { AdminPayment, PaymentStatus } from "@/types/admin-payment.types";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAdminPayments } from "@/hooks/admin.payment.hooks";

const PAGE_SIZE = 10;

const PAYMENT_STATUSES = [
  "ALL",
  "PAID",
  "PENDING",
  "REFUNDED",
  "FAILED",
  "CANCELLED",
] as const;

type StatusFilter = (typeof PAYMENT_STATUSES)[number];

function formatMoney(
  amount: string | number | null | undefined,
  currency = "BDT",
) {
  const value = Number(amount ?? 0);

  if (!Number.isFinite(value)) return `${currency} 0.00`;

  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value);
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

function getStatusClass(status: PaymentStatus) {
  switch (status) {
    case "PAID":
      return "border-emerald-200 bg-emerald-50 text-emerald-700";
    case "PENDING":
      return "border-amber-200 bg-amber-50 text-amber-700";
    case "REFUNDED":
      return "border-violet-200 bg-violet-50 text-violet-700";
    case "FAILED":
    case "CANCELLED":
      return "border-rose-200 bg-rose-50 text-rose-700";
    default:
      return "border-slate-200 bg-slate-50 text-slate-600";
  }
}

function StatusBadge({ status }: { status: PaymentStatus }) {
  return (
    <Badge
      variant="outline"
      className={`whitespace-nowrap font-medium ${getStatusClass(status)}`}
    >
      {status.replaceAll("_", " ")}
    </Badge>
  );
}

function SummaryCard({
  title,
  value,
  description,
  icon: Icon,
}: {
  title: string;
  value: string;
  description: string;
  icon: typeof Banknote;
}) {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardContent className="flex items-start justify-between gap-3 p-5">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-2 break-words text-2xl font-semibold tracking-tight text-slate-950">
            {value}
          </p>
          <p className="mt-1 text-xs text-slate-500">{description}</p>
        </div>

        <div className="rounded-xl bg-slate-100 p-3 text-slate-700">
          <Icon className="size-5" aria-hidden="true" />
        </div>
      </CardContent>
    </Card>
  );
}

function PaymentsTableSkeleton() {
  return (
    <div className="space-y-3 p-5">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="h-14 animate-pulse rounded-lg bg-slate-100"
        />
      ))}
    </div>
  );
}

export default function AdminPaymentsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilter>("ALL");

  const { data, isPending, isError, isFetching, refetch } = useAdminPayments(
    page,
    PAGE_SIZE,
  );

  const payments: AdminPayment[] = data?.data?.data ?? [];
  const meta = data?.data?.meta;

  const filteredPayments = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return payments.filter((payment) => {
      const matchesStatus = status === "ALL" || payment.status === status;

      const matchesSearch =
        !normalizedSearch ||
        [
          payment.id,
          payment.bkashTrxId,
          payment.bkashPaymentId,
          payment.merchantInvoiceNumber,
          payment.payerReference,
          payment.shipment?.trackingId,
          payment.shipment?.recipientName,
          payment.shipment?.merchant?.businessName,
          payment.shipment?.merchant?.user?.name,
          payment.shipment?.merchant?.user?.email,
        ].some((value) =>
          String(value ?? "")
            .toLowerCase()
            .includes(normalizedSearch),
        );

      return matchesStatus && matchesSearch;
    });
  }, [payments, search, status]);

  const pagePaidAmount = payments
    .filter((payment) => payment.status === "PAID")
    .reduce((sum, payment) => sum + Number(payment.amount || 0), 0);

  const pagePendingCount = payments.filter(
    (payment) => payment.status === "PENDING",
  ).length;

  const pageRefundedAmount = payments
    .filter((payment) => payment.status === "REFUNDED")
    .reduce(
      (sum, payment) =>
        sum + Number(payment.refundAmount ?? payment.amount ?? 0),
      0,
    );

  const totalPages = meta?.totalPages ?? 1;

  function handleStatusChange(value: StatusFilter) {
    setStatus(value);
  }

  return (
    <main className="min-h-screen space-y-6 bg-slate-50/60 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-slate-500">
            Administration / Finance
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
            Payments
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-500">
            Monitor payment transactions, shipment charges and refunds across
            SwiftDrop.
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          disabled={isFetching}
          onClick={() => void refetch()}
          className="w-fit gap-2"
        >
          <RefreshCw className={`size-4 ${isFetching ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {isError ? (
        <Card className="border-rose-200">
          <CardContent className="flex flex-col items-start gap-3 p-6">
            <p className="font-semibold text-slate-900">
              Could not load payments
            </p>
            <p className="text-sm text-slate-500">
              Check your admin session and API connection, then try again.
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={() => void refetch()}
            >
              Try again
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <SummaryCard
              title="Total records"
              value={String(meta?.total ?? (isPending ? "—" : payments.length))}
              description="Payments across all pages"
              icon={CreditCard}
            />
            <SummaryCard
              title="Paid amount"
              value={isPending ? "—" : formatMoney(pagePaidAmount)}
              description="Paid transactions on this page"
              icon={CircleDollarSign}
            />
            <SummaryCard
              title="Pending payments"
              value={isPending ? "—" : String(pagePendingCount)}
              description="Pending transactions on this page"
              icon={Clock3}
            />
            <SummaryCard
              title="Refunded amount"
              value={isPending ? "—" : formatMoney(pageRefundedAmount)}
              description="Refunds on this page"
              icon={ArrowDownRight}
            />
          </section>

          <Card className="overflow-hidden border-slate-200 shadow-sm">
            <div className="border-b border-slate-200 p-4 sm:p-5">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div>
                  <h2 className="font-semibold text-slate-950">
                    Transaction history
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {meta?.total ?? payments.length} total records
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="relative min-w-0 sm:w-80">
                    <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder="Search transaction, shipment..."
                      aria-label="Search payments"
                      className="pl-9 pr-9"
                    />
                    {search && (
                      <button
                        type="button"
                        aria-label="Clear search"
                        onClick={() => setSearch("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                      >
                        <X className="size-4" />
                      </button>
                    )}
                  </div>

                  <select
                    value={status}
                    onChange={(event) =>
                      handleStatusChange(event.target.value as StatusFilter)
                    }
                    aria-label="Filter payments by status"
                    className="h-9 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {PAYMENT_STATUSES.map((item) => (
                      <option key={item} value={item}>
                        {item === "ALL" ? "All statuses" : item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {isPending ? (
              <PaymentsTableSkeleton />
            ) : filteredPayments.length === 0 ? (
              <div className="flex flex-col items-center px-6 py-16 text-center">
                <div className="rounded-full bg-slate-100 p-4">
                  <Search className="size-6 text-slate-500" />
                </div>
                <h3 className="mt-4 font-semibold text-slate-900">
                  No payments found
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Try another search term or change the status filter.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearch("");
                    setStatus("ALL");
                  }}
                >
                  Clear filters
                </Button>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[1050px] text-left text-sm">
                    <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                      <tr>
                        <th className="px-5 py-3 font-medium">Transaction</th>
                        <th className="px-5 py-3 font-medium">Shipment</th>
                        <th className="px-5 py-3 font-medium">Merchant</th>
                        <th className="px-5 py-3 font-medium">Amount</th>
                        <th className="px-5 py-3 font-medium">Status</th>
                        <th className="px-5 py-3 font-medium">Payment date</th>
                        <th className="px-5 py-3 text-right font-medium">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                      {filteredPayments.map((payment) => (
                        <tr
                          key={payment.id}
                          className="transition-colors hover:bg-slate-50/80"
                        >
                          <td className="px-5 py-4">
                            <p className="font-medium text-slate-900">
                              {payment.bkashTrxId || "Not completed"}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                              {payment.paymentGateway}
                            </p>
                          </td>

                          <td className="px-5 py-4">
                            <p className="font-medium text-slate-900">
                              {payment.shipment?.trackingId ?? "—"}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                              {payment.shipment?.recipientName ?? "—"}
                            </p>
                          </td>

                          <td className="px-5 py-4">
                            <p className="font-medium text-slate-900">
                              {payment.shipment?.merchant?.businessName ?? "—"}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                              {payment.shipment?.merchant?.user?.name ?? "—"}
                            </p>
                          </td>

                          <td className="px-5 py-4 font-semibold tabular-nums text-slate-900">
                            {formatMoney(payment.amount, payment.currency)}
                          </td>

                          <td className="px-5 py-4">
                            <StatusBadge status={payment.status} />
                          </td>

                          <td className="px-5 py-4 text-slate-600">
                            {formatDate(payment.paidAt ?? payment.createdAt)}
                          </td>

                          <td className="px-5 py-4 text-right">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="gap-2"
                            >
                              <Link href={`/admin/payments/${payment.id}`}>
                                <Eye className="size-4" />
                                Details
                                <ArrowRight className="size-3.5" />
                              </Link>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                  <p className="text-sm text-slate-500">
                    Page {meta?.page ?? page} of {totalPages}
                    <span className="mx-2">·</span>
                    Showing {filteredPayments.length} of {payments.length} on
                    this page
                  </p>

                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={page <= 1 || isFetching}
                      onClick={() =>
                        setPage((current) => Math.max(1, current - 1))
                      }
                    >
                      <ChevronLeft className="size-4" />
                      Previous
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={page >= totalPages || isFetching}
                      onClick={() =>
                        setPage((current) => Math.min(totalPages, current + 1))
                      }
                    >
                      Next
                      <ChevronRight className="size-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </Card>
        </>
      )}
    </main>
  );
}
