import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  MapPin,
  Package,
  Search,
  Truck,
} from "lucide-react";

const TrackingPreview = () => {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Shipment visibility
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-[-0.045em] sm:text-5xl lg:text-6xl">
              No more guessing
              <br />
              <span className="text-muted-foreground">
                where your package is.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
            Give customers and merchants a clear view of every important
            delivery event with simple, real-time shipment tracking.
          </p>
        </div>

        {/* Tracking Product */}
        <div className="relative mt-16 overflow-hidden rounded-[2rem] border border-border bg-secondary/50 p-4 sm:p-6 lg:p-8">
          {/* Decorative background */}
          <div className="pointer-events-none absolute -right-40 -top-40 size-[500px] rounded-full bg-primary/10 blur-3xl" />

          <div className="relative grid overflow-hidden rounded-[1.5rem] border border-border bg-background shadow-2xl shadow-black/10 lg:grid-cols-[1.35fr_0.65fr]">
            {/* Map / Route Area */}
            <div className="relative min-h-[520px] overflow-hidden border-b border-border bg-secondary/40 lg:border-b-0 lg:border-r">
              {/* Grid */}
              <div className="absolute inset-0 opacity-40">
                <div
                  className="h-full w-full"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)",
                    backgroundSize: "55px 55px",
                  }}
                />
              </div>

              {/* Fake map roads */}
              <div className="absolute left-[10%] top-[30%] h-px w-[80%] rotate-[12deg] bg-border" />
              <div className="absolute left-[20%] top-[65%] h-px w-[70%] -rotate-[18deg] bg-border" />
              <div className="absolute left-[38%] top-[10%] h-[90%] w-px rotate-[8deg] bg-border" />
              <div className="absolute left-[70%] top-[5%] h-[95%] w-px -rotate-[20deg] bg-border" />

              {/* Route line */}
              {/* Route line */}
              <svg
                className="absolute inset-0 size-full"
                viewBox="0 0 800 520"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true" /* Hides the element from screen readers */
              >
                <path
                  d="M120 390 C210 330, 250 360, 330 280 C410 200, 460 270, 520 210 C590 140, 640 170, 700 100"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray="8 8"
                  className="text-primary"
                />
              </svg>

              {/* Pickup */}
              <LocationPoint
                className="left-[13%] top-[72%]"
                label="Pickup"
                location="Gulshan"
              />

              {/* Current */}
              <div className="absolute left-[55%] top-[40%]">
                <span className="absolute -inset-3 animate-ping rounded-full bg-primary/20" />

                <span className="relative flex size-11 items-center justify-center rounded-full border-4 border-background bg-primary text-primary-foreground shadow-xl">
                  <Truck className="size-4" />
                </span>

                <div className="absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap rounded-lg border border-border bg-background px-3 py-2 shadow-lg">
                  <p className="text-[10px] font-semibold">
                    Rider is on the way
                  </p>
                  <p className="mt-0.5 text-[9px] text-muted-foreground">
                    Last updated 2 min ago
                  </p>
                </div>
              </div>

              {/* Destination */}
              <LocationPoint
                className="right-[9%] top-[16%]"
                label="Destination"
                location="Mirpur"
                active
              />

              {/* Map top bar */}
              <div className="absolute left-5 right-5 top-5 flex items-center justify-between">
                <div className="rounded-xl border border-border bg-background/90 px-4 py-2.5 shadow-sm backdrop-blur">
                  <div className="flex items-center gap-2">
                    <MapPin className="size-3.5 text-primary" />

                    <span className="text-xs font-semibold">
                      Dhaka delivery route
                    </span>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-background/90 px-3 py-2.5 shadow-sm backdrop-blur">
                  <span className="text-[10px] font-medium text-muted-foreground">
                    Live
                  </span>
                </div>
              </div>
            </div>

            {/* Tracking Details */}
            <div className="flex flex-col">
              {/* Header */}
              <div className="border-b border-border p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                      Tracking number
                    </p>

                    <p className="mt-2 text-lg font-bold tracking-tight">
                      SD-20481
                    </p>
                  </div>

                  <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Package className="size-5" />
                  </div>
                </div>

                <div className="mt-5 rounded-xl bg-primary/5 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-muted-foreground">
                        Current status
                      </p>

                      <p className="mt-1 text-sm font-semibold text-primary">
                        In transit
                      </p>
                    </div>

                    <Truck className="size-5 text-primary" />
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="flex-1 p-6">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold">Tracking activity</p>

                  <Clock3 className="size-4 text-muted-foreground" />
                </div>

                <div className="mt-7">
                  <TrackingEvent
                    title="Shipment created"
                    location="Gulshan, Dhaka"
                    time="09:12 AM"
                    completed
                  />

                  <TrackingEvent
                    title="Payment confirmed"
                    location="Online payment"
                    time="09:14 AM"
                    completed
                  />

                  <TrackingEvent
                    title="Rider assigned"
                    location="Rahim Ahmed"
                    time="09:18 AM"
                    completed
                  />

                  <TrackingEvent
                    title="Picked up"
                    location="Gulshan, Dhaka"
                    time="10:02 AM"
                    completed
                  />

                  <TrackingEvent
                    title="In transit"
                    location="Heading to Mirpur"
                    time="10:24 AM"
                    active
                  />

                  <TrackingEvent
                    title="Delivered"
                    location="Mirpur, Dhaka"
                    time="—"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-border p-6">
                <Link
                  href="/tracking"
                  className="group flex items-center justify-between rounded-xl border border-border px-4 py-3.5 transition-colors hover:border-primary/30 hover:bg-secondary"
                >
                  <span className="text-xs font-semibold">
                    Open tracking page
                  </span>

                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Tracking Input */}
        <div className="mx-auto mt-8 max-w-2xl">
          <div className="rounded-2xl border border-border bg-card p-2 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary">
                <Search className="size-4 text-muted-foreground" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-[10px] text-muted-foreground">
                  Track your shipment
                </p>

                <p className="truncate text-sm font-medium">
                  Enter your tracking ID
                </p>
              </div>

              <Link
                href="/tracking"
                className="hidden rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:block"
              >
                Track shipment
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface LocationPointProps {
  className: string;
  label: string;
  location: string;
  active?: boolean;
}

const LocationPoint = ({
  className,
  label,
  location,
  active,
}: LocationPointProps) => {
  return (
    <div className={`absolute ${className}`}>
      <div
        className={`flex size-9 items-center justify-center rounded-full border-4 border-background shadow-lg ${
          active
            ? "bg-primary text-primary-foreground"
            : "bg-foreground text-background"
        }`}
      >
        <MapPin className="size-3.5" />
      </div>

      <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-border bg-background px-2.5 py-1.5 shadow-md">
        <p className="text-[9px] font-semibold">{label}</p>
        <p className="text-[8px] text-muted-foreground">{location}</p>
      </div>
    </div>
  );
};

interface TrackingEventProps {
  title: string;
  location: string;
  time: string;
  completed?: boolean;
  active?: boolean;
}

const TrackingEvent = ({
  title,
  location,
  time,
  completed,
  active,
}: TrackingEventProps) => {
  return (
    <div className="relative flex gap-3 pb-6 last:pb-0">
      {/* Connector */}
      <div className="relative flex w-4 shrink-0 justify-center">
        {completed || active ? (
          <span
            className={`relative z-10 mt-0.5 flex size-3 items-center justify-center rounded-full ${
              active ? "bg-primary ring-4 ring-primary/10" : "bg-primary"
            }`}
          >
            {completed && (
              <CheckCircle2 className="size-3 text-primary-foreground" />
            )}
          </span>
        ) : (
          <span className="relative z-10 mt-0.5 size-3 rounded-full border border-border bg-background" />
        )}

        <span className="absolute top-3 h-full w-px bg-border" />
      </div>

      {/* Content */}
      <div className="-mt-1 flex min-w-0 flex-1 items-start justify-between gap-3">
        <div>
          <p
            className={`text-xs font-semibold ${active ? "text-primary" : ""}`}
          >
            {title}
          </p>

          <p className="mt-1 text-[10px] text-muted-foreground">{location}</p>
        </div>

        <span className="shrink-0 text-[9px] text-muted-foreground">
          {time}
        </span>
      </div>
    </div>
  );
};

export default TrackingPreview;
