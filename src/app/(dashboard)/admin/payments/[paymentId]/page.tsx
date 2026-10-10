
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  Banknote,
  ChevronDown,
  ChevronUp,
  Copy,
  Package,
  RefreshCw,
  RotateCcw,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";

import type { PaymentStatus } from "@/types/admin-payment.types";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAdminPaymentDetails } from "@/hooks/admin.payment.hooks";

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
    timeStyle: "medium",
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

function DetailRow({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string | null | undefined;
  mono?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1 border-b border-slate-100 py-3 last:border-0 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
      <span className="text-sm text-slate-500">{label}</span>
      <span
        className={`break-all text-sm font-medium text-slate-900 sm:max-w-[65%] sm:text-right ${
          mono ? "font-mono text-xs" : ""
        }`}
      >
        {value || "—"}
      </span>
    </div>
  );
}

function SectionHeading({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Banknote;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="rounded-lg bg-slate-100 p-2 text-slate-700">
        <Icon className="size-5" />
      </div>
      <div>
        <h2 className="font-semibold text-slate-950">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        )}
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <main className="space-y-5 p-4 sm:p-6 lg:p-8">
      <div className="h-8 w-48 animate-pulse rounded bg-slate-200" />
      <div className="h-36 animate-pulse rounded-xl bg-slate-100" />
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="h-72 animate-pulse rounded-xl bg-slate-100" />
        <div className="h-72 animate-pulse rounded-xl bg-slate-100" />
      </div>
    </main>
  );
}

export default function AdminPaymentDetailsPage() {
  const params = useParams<{ paymentId: string }>();
  const paymentId = params.paymentId;

  const [showGatewayResponse, setShowGatewayResponse] = useState(false);

  const { data, isPending, isError, refetch, isFetching } =
    useAdminPaymentDetails(paymentId);

  const payment = data?.data;
  const shipment = payment?.shipment;

  async function copyValue(value: string, label: string) {
    try {
      await navigator.clipboard.writeText(value);
      toast.success(`${label} copied`);
    } catch {
      toast.error(`Could not copy ${label.toLowerCase()}`);
    }
  }

  if (isPending) {
    return <LoadingState />;
  }

  if (isError || !payment || !shipment) {
    return (
      <main className="min-h-screen bg-slate-50/60 p-4 sm:p-6 lg:p-8">
        <Link
          href="/admin/payments"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-950"
        >
          <ArrowLeft className="size-4" />
          Back to payments
        </Link>

        <Card className="mx-auto mt-8 max-w-xl border-rose-200">
          <CardContent className="flex flex-col items-start gap-3 p-6">
            <h1 className="text-lg font-semibold text-slate-950">
              Payment could not be loaded
            </h1>
            <p className="text-sm text-slate-500">
              The payment may not exist, or you may not have permission to
              view it. Check the API response and try again.
            </p>
            <Button
              type="button"
              variant="outline"
              disabled={isFetching}
              onClick={() => void refetch()}
            >
              <RefreshCw
                className={`mr-2 size-4 ${isFetching ? "animate-spin" : ""}`}
              />
              Retry
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  const merchant = shipment.merchant;
  const hasRefund =
    payment.status === "REFUNDED" ||
    Boolean(payment.refundTrxId) ||
    Boolean(payment.refundAt) ||
    Boolean(payment.refundAmount);

  const gatewayResponse = payment.gatewayResponse;
  const senderName = "senderName" in shipment ? shipment.senderName : null;
  const senderPhone = "senderPhone" in shipment ? shipment.senderPhone : null;
  const senderAddress =
    "senderAddress" in shipment ? shipment.senderAddress : null;
  const recipientAddress =
    "recipientAddress" in shipment ? shipment.recipientAddress : null;
  const parcelType = "parcelType" in shipment ? shipment.parcelType : null;
  const parcelDescription =
    "parcelDescription" in shipment ? shipment.parcelDescription : null;
  const weight = "weight" in shipment ? shipment.weight : null;
  const deliveryFee = "deliveryFee" in shipment ? shipment.deliveryFee : null;
  const codAmount = "codAmount" in shipment ? shipment.codAmount : null;
  const riderId = "riderId" in shipment ? shipment.riderId : null;
  const rider = "rider" in shipment ? shipment.rider : null;

  return (
    <main className="min-h-screen space-y-6 bg-slate-50/60 p-4 sm:p-6 lg:p-8">
      <div>
        <Link
          href="/admin/payments"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-950"
        >
          <ArrowLeft className="size-4" />
          All payments
        </Link>

        <div className="mt-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                Payment details
              </h1>
              <StatusBadge status={payment.status} />
            </div>
            <p className="mt-2 break-all font-mono text-sm text-slate-500">
              {payment.id}
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            disabled={isFetching}
            onClick={() => void refetch()}
            className="w-fit gap-2"
          >
            <RefreshCw
              className={`size-4 ${isFetching ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden border-slate-200 shadow-sm">
        <div className="grid gap-0 md:grid-cols-[1.3fr_1fr_1fr]">
          <div className="bg-slate-950 p-6 text-white sm:p-8">
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <CircleDollarIcon />
              Payment amount
            </div>
            <p className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              {formatMoney(payment.amount, payment.currency)}
            </p>
            <p className="mt-2 text-sm text-slate-300">
              Via {payment.paymentGateway}
            </p>
          </div>

          <div className="border-t border-slate-200 p-6 md:border-l md:border-t-0">
            <p className="text-sm text-slate-500">Payment transaction ID</p>
            <p className="mt-2 break-all font-mono text-sm font-medium text-slate-900">
              {payment.bkashTrxId || "Not available"}
            </p>
            {payment.bkashTrxId && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="mt-2 -ml-2 gap-2"
                onClick={() =>
                  void copyValue(payment.bkashTrxId!, "Transaction ID")
                }
              >
                <Copy className="size-3.5" />
                Copy transaction ID
              </Button>
            )}
          </div>

          <div className="border-t border-slate-200 p-6 md:border-l md:border-t-0">
            <p className="text-sm text-slate-500">Paid at</p>
            <p className="mt-2 font-medium text-slate-900">
              {formatDate(payment.paidAt)}
            </p>
            <p className="mt-2 text-xs text-slate-500">
              Created {formatDate(payment.createdAt)}
            </p>
          </div>
        </div>
      </Card>

      <div className="grid gap-5 xl:grid-cols-2">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <SectionHeading
              icon={Banknote}
              title="Transaction information"
              description="Payment gateway and invoice identifiers"
            />
          </CardHeader>
          <CardContent>
            <DetailRow label="Payment status" value={payment.status} />
            <DetailRow label="Gateway" value={payment.paymentGateway} />
            <DetailRow label="Currency" value={payment.currency} />
            <DetailRow label="Amount" value={formatMoney(payment.amount, payment.currency)} />
            <DetailRow
              label="Merchant invoice"
              value={payment.merchantInvoiceNumber}
              mono
            />
            <DetailRow
              label="bKash payment ID"
              value={payment.bkashPaymentId}
              mono
            />
            <DetailRow
              label="Transaction ID"
              value={payment.bkashTrxId}
              mono
            />
            <DetailRow label="Payer reference" value={payment.payerReference} />
            <DetailRow label="Created at" value={formatDate(payment.createdAt)} />
            <DetailRow label="Updated at" value={formatDate(payment.updatedAt)} />
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <SectionHeading
              icon={UserRound}
              title="Merchant information"
              description="Business associated with this payment"
            />
          </CardHeader>
          <CardContent>
            <DetailRow
              label="Business name"
              value={merchant.businessName}
            />
            <DetailRow
              label="Contact person"
              value={merchant.user?.name}
            />
            <DetailRow
              label="Email"
              value={merchant.user?.email}
            />
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <SectionHeading
              icon={Package}
              title="Shipment information"
              description="Parcel connected to this payment"
            />
          </CardHeader>
          <CardContent>
            <div className="mb-4 rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Tracking ID
              </p>
              <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                <span className="break-all font-mono font-semibold text-slate-950">
                  {shipment.trackingId}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    void copyValue(shipment.trackingId, "Tracking ID")
                  }
                >
                  <Copy className="size-3.5" />
                </Button>
              </div>
            </div>

            <DetailRow label="Shipment status" value={shipment.status} />
            <DetailRow label="Shipment ID" value={shipment.id} mono />
            <DetailRow label="Recipient" value={shipment.recipientName} />
            <DetailRow label="Recipient phone" value={shipment.recipientPhone} />
            {recipientAddress && (
              <DetailRow label="Recipient address" value={recipientAddress} />
            )}
            {senderName && <DetailRow label="Sender" value={senderName} />}
            {senderPhone && (
              <DetailRow label="Sender phone" value={senderPhone} />
            )}
            {senderAddress && (
              <DetailRow label="Sender address" value={senderAddress} />
            )}
            {parcelType && <DetailRow label="Parcel type" value={parcelType} />}
            {parcelDescription && (
              <DetailRow label="Parcel description" value={parcelDescription} />
            )}
            {weight && <DetailRow label="Weight" value={`${weight} kg`} />}
            {deliveryFee && (
              <DetailRow label="Delivery fee" value={formatMoney(deliveryFee, payment.currency)} />
            )}
            {codAmount && (
              <DetailRow label="COD amount" value={formatMoney(codAmount, payment.currency)} />
            )}
            {riderId && <DetailRow label="Rider ID" value={riderId} mono />}
            {rider?.phone && (
              <DetailRow label="Rider phone" value={rider.phone} />
            )}
          </CardContent>
        </Card>

        {hasRefund && (
          <Card className="border-violet-200 shadow-sm">
            <CardHeader>
              <SectionHeading
                icon={RotateCcw}
                title="Refund information"
                description="Recorded refund details"
              />
            </CardHeader>
            <CardContent>
              <DetailRow
                label="Refund status"
                value={payment.status === "REFUNDED" ? "REFUNDED" : "Refund recorded"}
              />
              <DetailRow
                label="Refund amount"
                value={formatMoney(
                  payment.refundAmount,
                  payment.currency,
                )}
              />
              <DetailRow
                label="Refund transaction ID"
                value={payment.refundTrxId}
                mono
              />
              <DetailRow
                label="Refund reason"
                value={payment.refundReason}
              />
              <DetailRow
                label="Refunded at"
                value={formatDate(payment.refundAt)}
              />
            </CardContent>
          </Card>
        )}
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <SectionHeading
              icon={ShieldCheck}
              title="Gateway response"
              description="Raw response saved from the payment gateway"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowGatewayResponse((current) => !current)}
            >
              {showGatewayResponse ? (
                <>
                  Hide response <ChevronUp className="ml-2 size-4" />
                </>
              ) : (
                <>
                  Show response <ChevronDown className="ml-2 size-4" />
                </>
              )}
            </Button>
          </div>
        </CardHeader>

        {showGatewayResponse && (
          <CardContent>
            <pre className="max-h-[480px] overflow-auto rounded-xl bg-slate-950 p-4 text-xs leading-6 text-slate-100">
              {JSON.stringify(gatewayResponse ?? {}, null, 2)}
            </pre>
          </CardContent>
        )}
      </Card>
    </main>
  );
}

function CircleDollarIcon() {
  return <Banknote className="size-4" aria-hidden="true" />;
}
