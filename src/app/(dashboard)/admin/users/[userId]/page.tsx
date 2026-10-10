"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  Building2,
  CalendarDays,
  LoaderCircle,
  Mail,
  ShieldCheck,
  Trash2,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";

import type { AdminUser } from "@/types/admin-user.types";
import { useAdminUserDetails, useDeleteAdminUser } from "@/hooks/user.hooks";
import Image from "next/image";

function formatDate(value: string | null) {
  if (!value) return "—";

  return new Intl.DateTimeFormat("en-BD", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string | number | boolean | null | undefined;
}) {
  return (
    <div className="min-w-0 rounded-xl border border-slate-100 bg-slate-50/70 p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-2 break-words text-sm font-semibold text-slate-900">
        {value === null || value === undefined || value === ""
          ? "—"
          : typeof value === "boolean"
            ? value
              ? "Yes"
              : "No"
            : value}
      </p>
    </div>
  );
}

function ProfileSection({ user }: { user: AdminUser }) {
  if (user.merchantProfile) {
    const merchant = user.merchantProfile;

    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700">
            <Building2 size={21} />
          </div>
          <div>
            <h2 className="font-semibold text-slate-900">Merchant profile</h2>
            <p className="text-sm text-slate-500">
              Business information associated with this account
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <InfoItem label="Business name" value={merchant.businessName} />
          <InfoItem label="Business phone" value={merchant.businessPhone} />
          <InfoItem label="Business address" value={merchant.businessAddress} />
          <InfoItem label="Profile ID" value={merchant.id} />
          <InfoItem label="Created at" value={formatDate(merchant.createdAt)} />
          <InfoItem label="Updated at" value={formatDate(merchant.updatedAt)} />
        </div>
      </section>
    );
  }

  if (user.riderProfile) {
    const rider = user.riderProfile;

    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
            <UserRound size={21} />
          </div>
          <div>
            <h2 className="font-semibold text-slate-900">Rider profile</h2>
            <p className="text-sm text-slate-500">
              Rider contact and approval information
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <InfoItem label="Phone" value={rider.phone} />
          <InfoItem label="Address" value={rider.address} />
          <InfoItem label="Vehicle type" value={rider.vehicleType} />
          <InfoItem label="License number" value={rider.licenseNumber} />
          <InfoItem label="Rider status" value={rider.status} />
          <InfoItem label="Suspended" value={rider.isSuspended} />
          <InfoItem label="Rejection reason" value={rider.rejectionReason} />
          <InfoItem label="Reviewed at" value={formatDate(rider.reviewedAt)} />
          <InfoItem
            label="Profile created"
            value={formatDate(rider.createdAt)}
          />
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
      <UserRound className="mx-auto text-slate-400" size={28} />
      <h2 className="mt-3 font-semibold text-slate-800">
        No additional profile
      </h2>
      <p className="mt-1 text-sm text-slate-500">
        This account does not have a merchant or rider profile.
      </p>
    </section>
  );
}

export default function AdminUserDetailsPage() {
  const params = useParams<{ userId: string }>();
  const router = useRouter();
  const userId = params.userId;

  const { data, isPending, isError, error, refetch } =
    useAdminUserDetails(userId);

  const deleteUser = useDeleteAdminUser();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  // Single-user API shape: response.data = user
  const user = data?.data;

  async function handleDelete() {
    if (!user || user.isDeleted || deleteUser.isPending) return;

    try {
      await deleteUser.mutateAsync(user.id);
      toast.success("User deleted successfully.");
      router.replace("/admin/users");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to delete user. Please try again.",
      );
    }
  }

  if (isPending) {
    return (
      <main className="space-y-5 p-4 md:p-8">
        <div className="h-8 w-40 animate-pulse rounded bg-slate-200" />
        <div className="h-48 animate-pulse rounded-2xl bg-slate-100" />
        <div className="h-56 animate-pulse rounded-2xl bg-slate-100" />
      </main>
    );
  }

  if (isError || !user) {
    return (
      <main className="p-4 md:p-8">
        <Link
          href="/admin/users"
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft size={16} />
          Back to users
        </Link>

        <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-6">
          <h2 className="font-semibold text-red-800">Unable to load user</h2>
          <p className="mt-2 text-sm text-red-700">
            {error instanceof Error ? error.message : "The user may not exist."}
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-sm text-white"
          >
            Retry
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-w-0 space-y-6 p-4 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/admin/users"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-emerald-700"
        >
          <ArrowLeft size={17} />
          Back to users
        </Link>

        <div className="flex items-center gap-2">
          <span
            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
              user.isDeleted
                ? "bg-red-50 text-red-700"
                : user.status === "ACTIVE"
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-amber-50 text-amber-700"
            }`}
          >
            {user.isDeleted ? "DELETED" : user.status}
          </span>

          {!user.isDeleted && (
            <button
              type="button"
              onClick={() => setShowDeleteConfirmation(true)}
              disabled={deleteUser.isPending}
              className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {deleteUser.isPending ? (
                <LoaderCircle className="animate-spin" size={16} />
              ) : (
                <Trash2 size={16} />
              )}
              Delete user
            </button>
          )}
        </div>
      </div>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="h-24 bg-gradient-to-r from-emerald-900 via-emerald-700 to-teal-500" />

        <div className="px-5 pb-6 md:px-7">
          <div className="-mt-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-4">
              {user.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <Image
                  src={user.imageUrl}
                  alt={user.name}
                  width={500}
                  height={500}
                  className="h-20 w-20 rounded-2xl border-4 border-white bg-white object-cover shadow-sm"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-white bg-emerald-50 text-2xl font-bold text-emerald-800 shadow-sm">
                  {user.name.slice(0, 1).toUpperCase()}
                </div>
              )}

              <div className="pb-1">
                <h1 className="text-xl font-bold text-slate-950 md:text-2xl">
                  {user.name}
                </h1>
                <p className="mt-1 text-sm text-slate-500">{user.email}</p>
              </div>
            </div>

            <span className="w-fit rounded-lg bg-slate-100 px-3 py-2 text-xs font-bold tracking-wide text-slate-700">
              {user.role}
            </span>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-3 rounded-xl border border-slate-100 p-4">
              <Mail className="shrink-0 text-slate-400" size={18} />
              <div>
                <p className="text-xs text-slate-500">Email verification</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {user.emailVerified ? "Verified" : "Not verified"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-slate-100 p-4">
              <ShieldCheck className="shrink-0 text-slate-400" size={18} />
              <div>
                <p className="text-xs text-slate-500">Authentication</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {user.authProvider}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-slate-100 p-4">
              <CalendarDays className="shrink-0 text-slate-400" size={18} />
              <div>
                <p className="text-xs text-slate-500">Joined</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {formatDate(user.createdAt)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-slate-100 p-4">
              <UserRound className="shrink-0 text-slate-400" size={18} />
              <div>
                <p className="text-xs text-slate-500">
                  Password change required
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {user.needPasswordChange ? "Yes" : "No"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
        <h2 className="mb-5 font-semibold text-slate-900">
          Account information
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <InfoItem label="User ID" value={user.id} />
          <InfoItem label="Role" value={user.role} />
          <InfoItem
            label="Account status"
            value={user.isDeleted ? "DELETED" : user.status}
          />
          <InfoItem label="Email" value={user.email} />
          <InfoItem label="Email verified" value={user.emailVerified} />
          <InfoItem label="Authentication provider" value={user.authProvider} />
          <InfoItem
            label="Account created"
            value={formatDate(user.createdAt)}
          />
          <InfoItem label="Last updated" value={formatDate(user.updatedAt)} />
          <InfoItem label="Deleted at" value={formatDate(user.deletedAt)} />
        </div>
      </section>

      <ProfileSection user={user} />

      {showDeleteConfirmation && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
          role="presentation"
        >
          <section
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-user-title"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <Trash2 size={22} />
            </div>

            <h2
              id="delete-user-title"
              className="mt-4 text-lg font-bold text-slate-900"
            >
              Delete this user?
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              You are about to delete <strong>{user.name}</strong> ({user.email}
              ). This action may affect their access to SwiftDrop.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowDeleteConfirmation(false)}
                disabled={deleteUser.isPending}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={deleteUser.isPending}
                className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {deleteUser.isPending && (
                  <LoaderCircle className="animate-spin" size={16} />
                )}
                Confirm delete
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
