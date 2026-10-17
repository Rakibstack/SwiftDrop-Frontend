
"use client";

import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  LoaderCircle,
  MapPin,
  Package,
  PackageSearch,
  RefreshCw,
  Search,
  ShieldCheck,
  Truck,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ShipmentStatusBadge,
  TrackingSectionHeading,
  TrackingTimeline,
  formatTrackingDate,
} from "@/components/tracking/tracking-ui";
import { useMerchantTracking } from "@/hooks/tracking.hooks";

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string | null | undefined;
}) {
  return (
    <div className="min-w-0">
      <p className="text-xs font-medium text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 break-words text-sm font-semibold">
        {value || "—"}
      </p>
    </div>
  );
}

function ContactCard({
  title,
  name,
  phone,
  address,
}: {
  title: string;
  name: string;
  phone: string;
  address: string;
}) {
  return (
    <section className="rounded-2xl border bg-background p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <UserRound className="size-5" />
        </div>

        <div>
          <h2 className="font-semibold">{title}</h2>
          <p className="text-xs text-muted-foreground">
            Contact information
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <DetailItem label="Full name" value={name} />

        <div>
          <p className="text-xs font-medium text-muted-foreground">
            Phone number
          </p>

          {phone ? (
            <a
              href={`tel:${phone}`}
              className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <span>{phone}</span>
            </a>
          ) : (
            <p className="mt-1 text-sm">—</p>
          )}
        </div>

        <div className="flex items-start gap-2">
          <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

          <div>
            <p className="text-xs font-medium text-muted-foreground">
              Address
            </p>
            <p className="mt-1 text-sm leading-6">
              {address || "Address not available"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function formatMoney(value: string) {
  const amount = Number(value);

  if (!Number.isFinite(amount)) {
    return value || "—";
  }

  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 2,
  }).format(amount);
}

export default function MerchantTrackShipmentPage() {
  const [inputValue, setInputValue] = useState("");
  const [submittedId, setSubmittedId] = useState("");

  const {
    data: shipment,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useMerchantTracking(submittedId);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trackingId = inputValue.trim();

    if (!trackingId || isFetching) return;

    setSubmittedId(trackingId);
  }

  const errorMessage =
    error instanceof Error
      ? error.message
      : "We couldn't retrieve this shipment. Please check the tracking ID.";

  return (
    <main className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-7xl space-y-8 p-4 sm:p-6 lg:p-8">
        {/* Page heading */}
        <section>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Truck className="size-4" />
            <span>Merchant dashboard</span>
            <span>/</span>
            <span className="text-foreground">Track shipment</span>
          </div>

          <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Track your shipment
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                Enter a shipment tracking ID to view its delivery progress,
                contact details, and complete tracking history.
              </p>
            </div>

            <div className="flex w-fit items-center gap-2 rounded-full border bg-background px-3 py-2 text-xs font-medium text-muted-foreground">
              <ShieldCheck className="size-4 text-emerald-600" />
              Private merchant tracking
            </div>
          </div>
        </section>

        {/* Search card */}
        <section className="relative overflow-hidden rounded-2xl border bg-background shadow-sm">
          <div className="pointer-events-none absolute -right-16 -top-20 size-64 rounded-full bg-primary/5 blur-3xl" />

          <div className="relative grid gap-7 p-5 sm:p-7 lg:grid-cols-[1fr_220px] lg:items-center lg:p-8">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <PackageSearch className="size-5" />
                </div>

                <div>
                  <h2 className="font-semibold">Find a shipment</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Use the tracking ID assigned to your parcel.
                  </p>
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                className="mt-6 flex flex-col gap-3 sm:flex-row"
              >
                <div className="relative min-w-0 flex-1">
                  <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    value={inputValue}
                    onChange={(event) => setInputValue(event.target.value)}
                    placeholder="e.g. SWD-20261010-RPFJU"
                    aria-label="Shipment tracking ID"
                    autoComplete="off"
                    className="h-12 pl-10"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={!inputValue.trim() || isFetching}
                  className="h-12 gap-2 px-5"
                >
                  {isFetching ? (
                    <LoaderCircle className="size-4 animate-spin" />
                  ) : (
                    <Search className="size-4" />
                  )}

                  Track shipment
                  <ArrowRight className="size-4" />
                </Button>
              </form>

              <p className="mt-3 text-xs text-muted-foreground">
                Only shipments belonging to your merchant account can be
                retrieved.
              </p>
            </div>

            <div className="hidden justify-center lg:flex">
              <div className="flex size-36 items-center justify-center rounded-full border border-primary/10 bg-primary/[0.04]">
                <div className="flex size-24 items-center justify-center rounded-3xl border bg-background shadow-sm">
                  <Package className="size-12 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Initial empty state */}
        {!submittedId && (
          <section className="rounded-2xl border border-dashed bg-background px-5 py-14 text-center sm:py-20">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-muted">
              <PackageSearch className="size-7 text-muted-foreground" />
            </div>

            <h2 className="mt-5 text-lg font-semibold">
              Your shipment tracking starts here
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              Enter a tracking ID above. Shipment information and the event
              timeline will appear here when the request succeeds.
            </p>
          </section>
        )}

        {/* Loading state */}
        {isLoading && submittedId && (
          <section className="flex flex-col items-center justify-center rounded-2xl border bg-background px-5 py-16 text-center">
            <LoaderCircle className="size-9 animate-spin text-primary" />

            <h2 className="mt-4 font-semibold">
              Retrieving shipment details
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Looking up tracking ID{" "}
              <span className="font-mono font-medium">{submittedId}</span>
            </p>
          </section>
        )}

        {/* Error state */}
        {isError && !isFetching && (
          <section className="rounded-2xl border border-destructive/20 bg-background px-5 py-12 text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
              <PackageSearch className="size-6" />
            </div>

            <h2 className="mt-4 text-lg font-semibold">
              Shipment not available
            </h2>

            <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-muted-foreground">
              {errorMessage}
            </p>

            <Button
              variant="outline"
              className="mt-5"
              onClick={() => refetch()}
              disabled={isFetching}
            >
              <RefreshCw className="mr-2 size-4" />
              Try again
            </Button>
          </section>
        )}

        {/* Shipment results */}
        {shipment && !isFetching && !isError && (
          <div className="space-y-6">
            {/* Overview */}
            <section className="overflow-hidden rounded-2xl border bg-background shadow-sm">
              <div className="border-b bg-gradient-to-r from-primary/[0.08] via-transparent to-transparent p-5 sm:p-7">
                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Tracking number
                    </p>

                    <h2 className="mt-2 break-all font-mono text-xl font-bold sm:text-2xl">
                      {shipment.trackingId}
                    </h2>

                    <p className="mt-2 text-sm text-muted-foreground">
                      {shipment.parcelType.replaceAll("_", " ")}
                    </p>
                  </div>

                  <div className="flex flex-col items-start gap-2 sm:items-end">
                    <span className="text-xs text-muted-foreground">
                      Current shipment status
                    </span>
                    <ShipmentStatusBadge status={shipment.status} />
                  </div>
                </div>
              </div>

              <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-7 lg:grid-cols-4">
                <DetailItem
                  label="Delivery fee"
                  value={formatMoney(shipment.deliveryFee)}
                />

                <DetailItem
                  label="COD amount"
                  value={formatMoney(shipment.codAmount)}
                />

                <DetailItem
                  label="Parcel weight"
                  value={`${shipment.weight} kg`}
                />

                <DetailItem
                  label="Created at"
                  value={formatTrackingDate(shipment.createdAt)}
                />
              </div>
            </section>

            {/* Contact information */}
            <div className="grid gap-6 lg:grid-cols-2">
              <ContactCard
                title="Sender details"
                name={shipment.senderName}
                phone={shipment.senderPhone}
                address={shipment.senderAddress}
              />

              <ContactCard
                title="Recipient details"
                name={shipment.recipientName}
                phone={shipment.recipientPhone}
                address={shipment.recipientAddress}
              />
            </div>

            {/* Tracking timeline and sidebar */}
            <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
              <section className="rounded-2xl border bg-background p-5 shadow-sm sm:p-7">
                <TrackingSectionHeading
                  title="Tracking activity"
                  description="A chronological record of every shipment event."
                />

                <TrackingTimeline events={shipment.trackingEvents} />
              </section>

              <aside className="space-y-6">
                {/* Shipment description */}
                <section className="rounded-2xl border bg-background p-5 shadow-sm">
                  <TrackingSectionHeading
                    title="Parcel information"
                    description="Shipment contents"
                  />

                  <p className="text-sm leading-6 text-muted-foreground">
                    {shipment.parcelDescription ||
                      "No parcel description provided."}
                  </p>

                  <div className="my-5 border-t" />

                  <div className="space-y-4">
                    <DetailItem
                      label="Parcel type"
                      value={shipment.parcelType.replaceAll("_", " ")}
                    />

                    <DetailItem
                      label="Weight"
                      value={`${shipment.weight} kg`}
                    />

                    <DetailItem
                      label="Rider ID"
                      value={shipment.riderId}
                    />
                  </div>
                </section>

                {/* Milestones */}
                <section className="rounded-2xl border bg-background p-5 shadow-sm">
                  <TrackingSectionHeading
                    title="Delivery milestones"
                    description="Recorded shipment progress"
                  />

                  <div className="space-y-5">
                    <Milestone
                      title="Rider assigned"
                      date={shipment.assignedAt}
                    />

                    <Milestone
                      title="Picked up"
                      date={shipment.pickedUpAt}
                    />

                    <Milestone
                      title="Delivered"
                      date={shipment.deliveredAt}
                    />
                  </div>

                  {shipment.failureReason && (
                    <div className="mt-5 rounded-xl border border-destructive/20 bg-destructive/5 p-3">
                      <p className="text-sm font-semibold text-destructive">
                        Delivery failure reason
                      </p>
                      <p className="mt-1 text-sm leading-6">
                        {shipment.failureReason}
                      </p>
                    </div>
                  )}

                  {shipment.cancellationReason && (
                    <div className="mt-5 rounded-xl border p-3">
                      <p className="text-sm font-semibold">
                        Cancellation reason
                      </p>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        {shipment.cancellationReason}
                      </p>
                    </div>
                  )}
                </section>

                {/* Refresh card */}
                <section className="rounded-2xl border bg-background p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <RefreshCw className="size-5" />
                    </div>

                    <div>
                      <h3 className="font-semibold">Latest information</h3>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Refresh shipment data
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="mt-4 w-full"
                    onClick={() => refetch()}
                    disabled={isFetching}
                  >
                    {isFetching ? (
                      <LoaderCircle className="mr-2 size-4 animate-spin" />
                    ) : (
                      <RefreshCw className="mr-2 size-4" />
                    )}
                    Refresh tracking
                  </Button>
                </section>
              </aside>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function Milestone({
  title,
  date,
}: {
  title: string;
  date: string | null;
}) {
  const completed = Boolean(date);

  return (
    <div className="flex gap-3">
      <div
        className={`mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full ${
          completed
            ? "bg-emerald-500/10 text-emerald-600"
            : "bg-muted text-muted-foreground"
        }`}
      >
        {completed ? (
          <CheckCircle2 className="size-4" />
        ) : (
          <Clock3 className="size-4" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">{title}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          {date ? formatTrackingDate(date) : "Awaiting update"}
        </p>
      </div>
    </div>
  );
}
