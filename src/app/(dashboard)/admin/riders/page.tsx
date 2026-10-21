"use client";

import {
  Bike,
  CheckCircle2,
  Eye,
  LoaderCircle,
  MapPin,
  RefreshCw,
  Search,
  ShieldCheck,
  Truck,
  UserRound,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useRiders } from "@/hooks/rider.hooks";
import type { Rider } from "@/types/rider.types";

function RiderStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    PENDING: "bg-amber-500/10 text-amber-700 dark:text-amber-400 ring-amber-600/20",
    ACTIVE: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 ring-emerald-600/20",
    REJECTED: "bg-rose-500/10 text-rose-700 dark:text-rose-400 ring-rose-600/20",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
        styles[status] || "bg-muted text-muted-foreground ring-border"
      }`}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

function formatDate(date: string) {
  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "—";

  return new Intl.DateTimeFormat("en-BD", {
    dateStyle: "medium",
  }).format(parsed);
}

function SummaryCard({
  title,
  value,
  icon: Icon,
  color,
  description,
}: {
  title: string;
  value: number;
  icon: typeof Users;
  color: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center justify-between">
        <div
          className={`flex size-11 items-center justify-center rounded-xl ${color}`}
        >
          <Icon className="size-5" />
        </div>
        <ShieldCheck className="size-4 text-muted-foreground" />
      </div>

      <p className="mt-5 text-sm font-medium text-muted-foreground">{title}</p>
      <p className="mt-1 text-3xl font-bold tracking-tight text-foreground">
        {value.toLocaleString()}
      </p>
      <p className="mt-2 text-xs text-muted-foreground">{description}</p>
    </div>
  );
}

function RiderRow({ rider }: { rider: Rider }) {
  const initial = rider.user.name?.trim().charAt(0).toUpperCase() || "R";

  return (
    <tr className="border-t border-border transition hover:bg-orange-500/10/30">
      <td className="px-5 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          {rider.user.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <Image
              src={rider.user.imageUrl}
              alt={rider.user.name}
              width={500}
              height={500}
              className="size-10 rounded-xl object-cover"
            />
          ) : (
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-sm font-bold text-orange-600 dark:text-orange-400">
              {initial}
            </div>
          )}

          <div className="min-w-0">
            <p className="max-w-48 truncate text-sm font-semibold text-foreground">
              {rider.user.name}
            </p>
            <p className="mt-1 max-w-48 truncate text-xs text-muted-foreground">
              {rider.user.email}
            </p>
          </div>
        </div>
      </td>

      <td className="px-5 py-4">
        <p className="text-sm font-medium text-foreground">{rider.phone}</p>
        <p className="mt-1 text-xs text-muted-foreground">{rider.licenseNumber}</p>
      </td>

      <td className="px-5 py-4">
        <span className="inline-flex items-center gap-2 rounded-lg bg-muted px-2.5 py-1.5 text-xs font-semibold text-foreground">
          <Bike className="size-3.5 text-muted-foreground" />
          {rider.vehicleType}
        </span>
      </td>

      <td className="px-5 py-4">
        <RiderStatusBadge status={rider.status} />
        {rider.isSuspended && (
          <p className="mt-1.5 text-[11px] font-semibold text-rose-600 dark:text-rose-400">
            Suspended
          </p>
        )}
      </td>

      <td className="px-5 py-4 text-sm text-muted-foreground">
        {formatDate(rider.createdAt)}
      </td>

      <td className="px-5 py-4 text-right">
        <Link
          href={`/admin/riders/${rider.id}`}
          aria-label={`View ${rider.user.name}`}
          className="inline-flex size-9 items-center justify-center rounded-xl border border-border text-muted-foreground transition hover:border-orange-500/40 hover:bg-orange-500/10 hover:text-orange-600 dark:text-orange-400"
        >
          <Eye className="size-4" />
        </Link>
      </td>
    </tr>
  );
}

export default function AdminRidersPage() {
  const {
    data: riders = [],
    isPending,
    isError,
    refetch,
    isFetching,
  } = useRiders();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");

  const pendingCount = riders.filter(
    (rider) => rider.status === "PENDING",
  ).length;

  const activeCount = riders.filter(
    (rider) => rider.status === "ACTIVE",
  ).length;

  const rejectedCount = riders.filter(
    (rider) => rider.status === "REJECTED",
  ).length;

  const filteredRiders = useMemo(() => {
    const term = search.trim().toLowerCase();

    return riders.filter((rider) => {
      const matchesStatus = status === "ALL" || rider.status === status;

      const searchable = [
        rider.user.name,
        rider.user.email,
        rider.phone,
        rider.licenseNumber,
        rider.vehicleType,
        rider.address,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return matchesStatus && (!term || searchable.includes(term));
    });
  }, [riders, search, status]);

  return (
    <main className="min-h-screen space-y-7 bg-[#F7F8FA] p-4 sm:p-6 lg:p-8">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-orange-600 dark:text-orange-400">
            <Truck className="size-4" />
            Fleet management
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Rider management
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Review rider applications, verify profile information, and manage
            your delivery network.
          </p>
        </div>

        <button
          type="button"
          onClick={() => void refetch()}
          disabled={isFetching}
          className="inline-flex h-10 items-center justify-center gap-2 self-start rounded-xl border border-border bg-card px-4 text-sm font-semibold text-foreground shadow-sm transition hover:border-orange-500/20 hover:text-orange-600 dark:text-orange-400 disabled:opacity-60"
        >
          <RefreshCw className={`size-4 ${isFetching ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </header>

      {/* Application review banner */}
      <section className="relative overflow-hidden rounded-2xl bg-slate-950 p-5 text-white sm:p-6">
        <div className="pointer-events-none absolute -right-12 -top-20 size-56 rounded-full bg-orange-500/20 blur-3xl" />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-orange-500/15 text-orange-300">
              <ShieldCheck className="size-5" />
            </div>
            <div>
              <h2 className="font-semibold">Rider application review</h2>
              <p className="mt-1 max-w-xl text-sm leading-6 text-white/70">
                Review each application before granting rider access to
                SwiftDrop delivery operations.
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-amber-400/10 text-amber-300">
              <UserRound className="size-4.5" />
            </div>
            <div>
              <p className="text-xl font-bold">{pendingCount}</p>
              <p className="text-xs text-white/70">Awaiting review</p>
            </div>
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Total riders"
          value={riders.length}
          icon={Users}
          color="bg-blue-500/10 text-blue-600 dark:text-blue-400"
          description="Riders returned by the API"
        />
        <SummaryCard
          title="Pending applications"
          value={pendingCount}
          icon={UserRound}
          color="bg-amber-500/10 text-amber-600 dark:text-amber-400"
          description="Awaiting an admin decision"
        />
        <SummaryCard
          title="Active riders"
          value={activeCount}
          icon={CheckCircle2}
          color="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
          description="Approved rider profiles"
        />
        <SummaryCard
          title="Rejected applications"
          value={rejectedCount}
          icon={ShieldCheck}
          color="bg-rose-500/10 text-rose-600 dark:text-rose-400"
          description="Applications marked rejected"
        />
      </section>

      {/* Table */}
      <section className="overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm">
        <div className="flex flex-col gap-4 border-b border-border p-5 lg:flex-row lg:items-center lg:justify-between sm:p-6">
          <div>
            <h2 className="font-bold text-foreground">Rider directory</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {filteredRiders.length} rider
              {filteredRiders.length === 1 ? "" : "s"} match your filters
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative sm:w-72">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Name, email, phone, license..."
                className="h-10 w-full rounded-xl border border-border bg-muted pl-9 pr-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-orange-500/40 focus:bg-card focus:ring-4 focus:ring-orange-500/10"
              />
            </div>

            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="h-10 rounded-xl border border-border bg-card px-3 text-sm text-foreground outline-none focus:border-orange-500/40 focus:ring-4 focus:ring-orange-500/10"
            >
              <option value="ALL">All statuses</option>
              <option value="PENDING">Pending</option>
              <option value="ACTIVE">Active</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
        </div>

        {isPending ? (
          <div className="flex min-h-72 flex-col items-center justify-center gap-3">
            <LoaderCircle className="size-8 animate-spin text-orange-500" />
            <p className="text-sm text-muted-foreground">Loading rider directory...</p>
          </div>
        ) : isError ? (
          <div className="flex min-h-72 flex-col items-center justify-center px-5 text-center">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
              <Truck className="size-6" />
            </div>
            <h3 className="mt-4 font-semibold text-foreground">
              Could not load riders
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Check your connection and try again.
            </p>
            <button
              type="button"
              onClick={() => void refetch()}
              className="mt-4 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
            >
              Try again
            </button>
          </div>
        ) : filteredRiders.length === 0 ? (
          <div className="flex min-h-72 flex-col items-center justify-center px-5 text-center">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
              <Users className="size-6" />
            </div>
            <h3 className="mt-4 font-semibold text-foreground">
              No riders found
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Try changing your search term or status filter.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead className="bg-muted/80">
                <tr className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  <th className="px-5 py-3.5 sm:px-6">Rider</th>
                  <th className="px-5 py-3.5">Contact / License</th>
                  <th className="px-5 py-3.5">Vehicle</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5">Applied</th>
                  <th className="px-5 py-3.5 text-right">Details</th>
                </tr>
              </thead>
              <tbody>
                {filteredRiders.map((rider) => (
                  <RiderRow key={rider.id} rider={rider} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-border pt-4 text-xs text-muted-foreground">
        <span>SwiftDrop · Rider administration</span>
        <span>
          <MapPin className="mr-1 inline size-3.5" />
          Rider information provided by the backend
        </span>
      </footer>
    </main>
  );
}
