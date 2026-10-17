
"use client";
import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  LoaderCircle,
  PackageSearch,
  Search,
  ShieldCheck,
  Truck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  TrackingSectionHeading,
  TrackingTimeline,
  ShipmentStatusBadge,
} from "@/components/tracking/tracking-ui";
import { usePublicTracking } from "@/hooks/tracking.hooks";

export default function PublicTrackingPage() {
  const [inputValue, setInputValue] = useState("");
  const [submittedId, setSubmittedId] = useState("");

  const {
    data: shipment,
    isFetching,
    isError,
    error,
  } = usePublicTracking(submittedId);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trackingId = inputValue.trim();
    if (!trackingId) return;

    setSubmittedId(trackingId);
  }

  const errorMessage =
    error instanceof Error
      ? error.message
      : "We couldn't retrieve this shipment. Please try again.";

  return (
    <main className="min-h-screen bg-muted/30">
      <section className="relative isolate overflow-hidden border-b bg-background">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-2xl border bg-background shadow-sm">
              <PackageSearch className="size-7 text-primary" />
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
              SwiftDrop tracking
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Your delivery, <span className="text-primary">in view.</span>
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              Follow your shipment from dispatch to delivery with clear,
              up-to-date tracking events.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-9 flex max-w-xl flex-col gap-3 rounded-2xl border bg-background p-3 shadow-lg shadow-black/[0.03] sm:flex-row"
            >
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  placeholder="e.g. SWD-20261010-RPFJU"
                  aria-label="Shipment tracking ID"
                  className="h-12 border-0 pl-10 shadow-none focus-visible:ring-1"
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

            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="size-4 text-emerald-600" />
              No account required for public tracking
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
        {!submittedId && (
          <div className="mx-auto max-w-2xl rounded-2xl border border-dashed bg-background p-8 text-center sm:p-12">
            <Truck className="mx-auto size-9 text-muted-foreground" />
            <h2 className="mt-4 text-lg font-semibold">
              Ready when your shipment is
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              Enter the tracking ID from your shipment confirmation to view
              its latest status and journey.
            </p>
          </div>
        )}

        {isFetching && (
          <div className="flex items-center justify-center gap-3 rounded-2xl border bg-background p-10 text-sm text-muted-foreground">
            <LoaderCircle className="size-5 animate-spin text-primary" />
            Retrieving your tracking information…
          </div>
        )}

        {isError && !isFetching && (
          <div className="mx-auto max-w-2xl rounded-2xl border border-destructive/20 bg-background p-8 text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <PackageSearch className="size-6" />
            </div>
            <h2 className="mt-4 text-lg font-semibold">
              We couldn’t find that shipment
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {errorMessage}
            </p>
            <Button
              variant="outline"
              className="mt-5"
              onClick={() => setSubmittedId("")}
            >
              Try another tracking ID
            </Button>
          </div>
        )}

        {shipment && !isFetching && !isError && (
          <div className="space-y-6">
            <div className="rounded-2xl border bg-background p-5 shadow-sm sm:p-7">
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Tracking number
                  </p>
                  <p className="mt-2 break-all font-mono text-xl font-bold tracking-tight sm:text-2xl">
                    {shipment.trackingId}
                  </p>
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

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
              <div className="rounded-2xl border bg-background p-5 sm:p-7">
                <TrackingSectionHeading
                  title="Shipment journey"
                  description="A chronological record of shipment activity."
                />
                <TrackingTimeline events={shipment.trackingEvents} />
              </div>

              <aside className="space-y-4">
                <div className="rounded-2xl border bg-background p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                      <ShieldCheck className="size-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Tracking transparency</h3>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Updates from the shipment activity log
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-muted-foreground">
                    The timeline reflects events recorded by SwiftDrop.
                    Delivery progress may change as new events are added.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}