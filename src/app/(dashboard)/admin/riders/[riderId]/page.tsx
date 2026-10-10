"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  Bike,
  CheckCircle2,
  Clock3,
  FileCheck2,
  LoaderCircle,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import { useReviewRider, useRiders } from "@/hooks/rider.hooks";
import Image from "next/image";

function formatDate(date?: string | null) {
  if (!date) return "Not available";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "Not available";

  return new Intl.DateTimeFormat("en-BD", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(parsed);
}

function RiderStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    PENDING: "bg-amber-50 text-amber-700 ring-amber-600/20",
    ACTIVE: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    REJECTED: "bg-rose-50 text-rose-700 ring-rose-600/20",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ring-1 ring-inset ${
        styles[status] || "bg-slate-100 text-slate-600 ring-slate-500/20"
      }`}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

function DetailRow({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="flex flex-col gap-1.5 border-b border-slate-100 py-3.5 last:border-0 sm:flex-row sm:items-start sm:justify-between sm:gap-5">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="break-all text-sm font-semibold text-slate-800 sm:max-w-[65%] sm:text-right">
        {value || "Not provided"}
      </span>
    </div>
  );
}

function InformationCard({
  title,
  description,
  icon: Icon,
  children,
}: {
  title: string;
  description: string;
  icon: typeof UserRound;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
          <Icon className="size-5" />
        </div>
        <div>
          <h2 className="font-bold text-slate-900">{title}</h2>
          <p className="mt-0.5 text-xs text-slate-500">{description}</p>
        </div>
      </div>

      <div className="mt-4">{children}</div>
    </section>
  );
}

export default function AdminRiderDetailsPage() {
  const params = useParams<{ riderId: string }>();
  const riderId = params.riderId;

  const { data: riders = [], isPending, isError, refetch } = useRiders();
  const reviewMutation = useReviewRider();

  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  const rider = riders.find((item) => item.id === riderId);

  const isReviewing = reviewMutation.isPending;
  const isPendingReview = rider?.status === "PENDING";

  async function handleApprove() {
    if (!rider || rider.status !== "PENDING" || isReviewing) return;

    try {
      const response = await reviewMutation.mutateAsync({
        riderId: rider.id,
        status: "ACTIVE",
      });

      toast.success(response.message || "Rider approved successfully.");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to approve this rider.",
      );
    }
  }

  async function handleReject() {
    if (!rider || rider.status !== "PENDING" || isReviewing) return;

    const reason = rejectionReason.trim();

    if (!reason) {
      toast.error("Please provide a rejection reason.");
      return;
    }

    if (reason.length > 500) {
      toast.error("Rejection reason cannot exceed 500 characters.");
      return;
    }

    try {
      const response = await reviewMutation.mutateAsync({
        riderId: rider.id,
        status: "REJECTED",
        rejectionReason: reason,
      });

      toast.success(response.message || "Rider application rejected.");
      setRejectDialogOpen(false);
      setRejectionReason("");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to reject this rider.",
      );
    }
  }

  if (isPending) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 bg-[#F7F8FA]">
        <LoaderCircle className="size-8 animate-spin text-orange-500" />
        <p className="text-sm text-slate-500">Loading rider profile...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center bg-[#F7F8FA] px-5 text-center">
        <XCircle className="size-10 text-rose-500" />
        <h1 className="mt-4 text-xl font-bold text-slate-900">
          Unable to load rider
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Check your connection and try again.
        </p>
        <button
          type="button"
          onClick={() => void refetch()}
          className="mt-4 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
        >
          Try again
        </button>
      </main>
    );
  }

  if (!rider) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center bg-[#F7F8FA] px-5 text-center">
        <UserRound className="size-10 text-slate-400" />
        <h1 className="mt-4 text-xl font-bold text-slate-900">
          Rider not found
        </h1>
        <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
          This rider is not present in the records returned by the current
          rider-list API.
        </p>
        <Link
          href="/admin/riders"
          className="mt-5 inline-flex h-10 items-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white"
        >
          <ArrowLeft className="size-4" />
          Back to riders
        </Link>
      </main>
    );
  }

  const user = rider.user;
  const initial = user.name?.trim().charAt(0).toUpperCase() || "R";

  return (
    <main className="min-h-screen space-y-6 bg-[#F7F8FA] p-4 sm:p-6 lg:p-8">
      <Link
        href="/admin/riders"
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-orange-600"
      >
        <ArrowLeft className="size-4" />
        Back to rider management
      </Link>

      {/* Profile hero */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-950 p-5 text-white shadow-sm sm:p-8">
        <div className="pointer-events-none absolute -right-16 -top-24 size-72 rounded-full bg-orange-500/20 blur-3xl" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 items-start gap-4 sm:gap-5">
            {user.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <Image
                src={user.imageUrl}
                alt={user.name}
                width={500}
                height={500}
                className="size-20 shrink-0 rounded-2xl border border-white/10 object-cover sm:size-24"
              />
            ) : (
              <div className="flex size-20 shrink-0 items-center justify-center rounded-2xl bg-orange-500 text-3xl font-bold text-white sm:size-24">
                {initial}
              </div>
            )}

            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-orange-300">
                Rider application
              </p>
              <h1 className="mt-2 break-words text-2xl font-bold tracking-tight sm:text-3xl">
                {user.name}
              </h1>
              <p className="mt-2 break-all text-sm text-slate-300">
                {user.email}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <RiderStatusBadge status={rider.status} />
                {rider.isSuspended && (
                  <span className="rounded-full bg-rose-500/15 px-3 py-1.5 text-xs font-bold text-rose-300">
                    Suspended
                  </span>
                )}
                {user.emailVerified && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-300">
                    <CheckCircle2 className="size-3.5" />
                    Email verified
                  </span>
                )}
              </div>
            </div>
          </div>

          {isPendingReview && (
            <div className="flex w-full flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4 sm:flex-row lg:w-auto lg:min-w-72 lg:flex-col">
              <p className="text-sm font-semibold text-slate-200">
                Review this application
              </p>
              <div className="flex flex-1 flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleApprove}
                  disabled={isReviewing}
                  className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 text-sm font-bold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isReviewing ? (
                    <LoaderCircle className="size-4 animate-spin" />
                  ) : (
                    <CheckCircle2 className="size-4" />
                  )}
                  Approve
                </button>

                <button
                  type="button"
                  onClick={() => setRejectDialogOpen(true)}
                  disabled={isReviewing}
                  className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 text-sm font-bold text-rose-200 transition hover:bg-rose-500/20 disabled:opacity-60"
                >
                  <XCircle className="size-4" />
                  Reject
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Review state */}
      {rider.status === "PENDING" && (
        <section className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <Clock3 className="mt-0.5 size-5 shrink-0 text-amber-600" />
          <div>
            <p className="text-sm font-bold text-amber-900">
              Application awaiting review
            </p>
            <p className="mt-1 text-sm leading-6 text-amber-800">
              Check the submitted contact details, vehicle type, and license
              information before approving or rejecting this application.
            </p>
          </div>
        </section>
      )}

      {rider.status === "REJECTED" && (
        <section className="flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4">
          <XCircle className="mt-0.5 size-5 shrink-0 text-rose-600" />
          <div>
            <p className="text-sm font-bold text-rose-900">
              Application rejected
            </p>
            <p className="mt-1 text-sm leading-6 text-rose-800">
              {rider.rejectionReason || "No rejection reason was returned."}
            </p>
            {rider.rejectedAt && (
              <p className="mt-2 text-xs text-rose-700">
                Rejected at: {formatDate(rider.rejectedAt)}
              </p>
            )}
          </div>
        </section>
      )}

      {rider.status === "ACTIVE" && (
        <section className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
          <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-600" />
          <div>
            <p className="text-sm font-bold text-emerald-900">Rider approved</p>
            <p className="mt-1 text-sm leading-6 text-emerald-800">
              This rider application has been approved. Review actions are
              hidden because the application is no longer pending.
            </p>
          </div>
        </section>
      )}

      {/* Details */}
      <div className="grid gap-6 xl:grid-cols-2">
        <InformationCard
          title="Personal information"
          description="Contact and account details submitted by the rider"
          icon={UserRound}
        >
          <DetailRow label="Full name" value={user.name} />
          <DetailRow label="Email address" value={user.email} />
          <DetailRow label="Phone number" value={rider.phone} />
          <DetailRow label="Address" value={rider.address} />
          <DetailRow label="Account role" value={user.role} />
          <DetailRow label="Account status" value={user.status} />
          <DetailRow
            label="Email verification"
            value={user.emailVerified ? "Verified" : "Not verified"}
          />
          <DetailRow
            label="Authentication provider"
            value={user.authProvider}
          />
          <DetailRow
            label="Account created"
            value={formatDate(user.createdAt)}
          />
        </InformationCard>

        <InformationCard
          title="Vehicle & license"
          description="Rider delivery and identification details"
          icon={Bike}
        >
          <DetailRow label="Vehicle type" value={rider.vehicleType} />
          <DetailRow label="License number" value={rider.licenseNumber} />
          <DetailRow label="Registered phone" value={rider.phone} />
          <DetailRow label="Rider address" value={rider.address} />
          <DetailRow
            label="Suspended"
            value={rider.isSuspended ? "Yes" : "No"}
          />
          {rider.isSuspended && (
            <DetailRow
              label="Suspended at"
              value={formatDate(rider.sespendedAt)}
            />
          )}
        </InformationCard>

        <InformationCard
          title="Application review history"
          description="Audit information returned by the backend"
          icon={FileCheck2}
        >
          <DetailRow
            label="Application submitted"
            value={formatDate(rider.createdAt)}
          />
          <DetailRow label="Last updated" value={formatDate(rider.updatedAt)} />
          <DetailRow label="Reviewed at" value={formatDate(rider.reviewedAt)} />
          <DetailRow label="Reviewed by" value={rider.reviewedBy} />
          <DetailRow label="Rejected at" value={formatDate(rider.rejectedAt)} />
          <DetailRow label="Rejection reason" value={rider.rejectionReason} />
        </InformationCard>

        <InformationCard
          title="Record identifiers"
          description="Reference IDs for support and administration"
          icon={ShieldCheck}
        >
          <DetailRow label="Rider ID" value={rider.id} />
          <DetailRow label="User ID" value={rider.userId} />
          <DetailRow label="Account ID" value={user.id} />
          <DetailRow label="Email" value={user.email} />
          <div className="mt-3 flex items-start gap-2 rounded-xl bg-slate-50 p-3">
            <MapPin className="mt-0.5 size-4 shrink-0 text-slate-400" />
            <p className="break-all text-xs leading-5 text-slate-500">
              {rider.address}
            </p>
          </div>
          <div className="mt-3 flex items-start gap-2 rounded-xl bg-slate-50 p-3">
            <Mail className="mt-0.5 size-4 shrink-0 text-slate-400" />
            <p className="break-all text-xs leading-5 text-slate-500">
              {user.email}
            </p>
          </div>
          <div className="mt-3 flex items-start gap-2 rounded-xl bg-slate-50 p-3">
            <Phone className="mt-0.5 size-4 shrink-0 text-slate-400" />
            <p className="text-xs leading-5 text-slate-500">{rider.phone}</p>
          </div>
        </InformationCard>
      </div>

      {/* Reject dialog */}
      {rejectDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Close dialog"
            className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm cursor-default w-full h-full border-none outline-none"
            onClick={() => {
              if (!isReviewing) {
                setRejectDialogOpen(false);
              }
            }}
          />

          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="reject-rider-title"
            className="relative z-10 w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl sm:p-6"
          >
            <div className="flex items-start gap-3">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                <XCircle className="size-5" />
              </div>
              <div>
                <h2
                  id="reject-rider-title"
                  className="text-lg font-bold text-slate-900"
                >
                  Reject rider application{" "}
                </h2>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Provide a clear reason for rejecting {user.name}&apos;s
                  application. The reason will be submitted to the backend.
                </p>
              </div>
            </div>

            <div className="mt-5">
              <label
                htmlFor="rejectionReason"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                Rejection reason <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="rejectionReason"
                value={rejectionReason}
                onChange={(event) =>
                  setRejectionReason(event.target.value.slice(0, 500))
                }
                rows={5}
                maxLength={500}
                placeholder="Explain why this rider application cannot be approved..."
                className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-rose-300 focus:bg-white focus:ring-4 focus:ring-rose-500/10"
              />
              <div className="mt-2 flex items-center justify-between gap-3">
                <p className="text-xs text-slate-400">
                  A reason is required to reject this application.
                </p>
                <span
                  className={`shrink-0 text-xs ${rejectionReason.length >= 480 ? "text-rose-600" : "text-slate-400"}`}
                >
                  {rejectionReason.length}/500
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setRejectDialogOpen(false)}
                disabled={isReviewing}
                className="h-10 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleReject}
                disabled={isReviewing || !rejectionReason.trim()}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 text-sm font-bold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isReviewing && (
                  <LoaderCircle className="size-4 animate-spin" />
                )}
                Confirm rejection
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
