import {
  ArrowRight,
  CheckCircle2,
  CreditCard,
  MapPin,
  Package,
  Truck,
  UserRound,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Package,
    title: "Create your shipment",
    description:
      "Add pickup and delivery details, package information, and create a shipment in seconds.",
  },
  {
    number: "02",
    icon: CreditCard,
    title: "Confirm payment",
    description:
      "Complete the courier payment securely and let SwiftDrop verify the transaction.",
  },
  {
    number: "03",
    icon: UserRound,
    title: "Get a rider assigned",
    description:
      "Your shipment moves into the delivery operation and an available rider is assigned.",
  },
  {
    number: "04",
    icon: Truck,
    title: "Pickup & delivery",
    description:
      "The rider picks up your package and moves it through the delivery lifecycle.",
  },
  {
    number: "05",
    icon: MapPin,
    title: "Track every milestone",
    description:
      "Follow important tracking events from pickup and transit to out-for-delivery.",
  },
  {
    number: "06",
    icon: CheckCircle2,
    title: "Delivered",
    description:
      "Once the package reaches its destination, the shipment is marked as delivered.",
  },
];

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="border-t border-border bg-secondary/30 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              How SwiftDrop works
            </p>

            <h2 className="mt-4 max-w-xl text-4xl font-bold tracking-[-0.045em] sm:text-5xl lg:text-6xl">
              From pickup to
              <br />
              <span className="text-muted-foreground">
                doorstep, simplified.
              </span>
            </h2>
          </div>

          <div className="max-w-xl lg:justify-self-end">
            <p className="text-base leading-7 text-muted-foreground">
              SwiftDrop turns a complex delivery operation into a clear,
              trackable workflow. Every shipment moves through a structured
              lifecycle so merchants always know what happens next.
            </p>
          </div>
        </div>

        {/* Journey */}
        <div className="mt-16 overflow-hidden rounded-[2rem] border border-border bg-background shadow-sm">
          {/* Journey Header */}
          <div className="flex flex-col justify-between gap-4 border-b border-border px-6 py-5 sm:flex-row sm:items-center sm:px-8">
            <div>
              <p className="text-xs font-semibold">Shipment lifecycle</p>

              <p className="mt-1 text-[11px] text-muted-foreground">
                A structured journey from creation to delivery
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/40" />
                <span className="relative size-2 rounded-full bg-primary" />
              </span>

              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Live workflow
              </span>
            </div>
          </div>

          {/* Progress */}
          <div className="overflow-x-auto">
            <div className="min-w-[900px] px-8 py-10 lg:px-12">
              <div className="relative">
                {/* Progress Line */}
                <div className="absolute left-[7%] right-[7%] top-7 h-px bg-border" />

                <div className="absolute left-[7%] top-7 h-px w-[48%] bg-primary" />

                {/* Steps */}
                <div className="relative grid grid-cols-6 gap-5">
                  {steps.map((step, index) => {
                    const Icon = step.icon;
                    const isCompleted = index < 4;
                    const isCurrent = index === 4;

                    return (
                      <div
                        key={step.number}
                        className="flex flex-col items-center text-center"
                      >
                        {/* Icon */}
                        <div
                          className={`relative z-10 flex size-14 items-center justify-center rounded-2xl border transition-colors ${
                            isCompleted
                              ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                              : isCurrent
                                ? "border-primary bg-background text-primary ring-4 ring-primary/10"
                                : "border-border bg-background text-muted-foreground"
                          }`}
                        >
                          <Icon className="size-5" />
                        </div>

                        {/* Number */}
                        <span
                          className={`mt-5 text-[10px] font-bold tracking-[0.16em] ${
                            isCurrent
                              ? "text-primary"
                              : "text-muted-foreground"
                          }`}
                        >
                          {step.number}
                        </span>

                        <h3 className="mt-2 text-sm font-semibold tracking-tight">
                          {step.title}
                        </h3>

                        <p className="mt-2 max-w-[150px] text-[11px] leading-5 text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Current shipment preview */}
          <div className="border-t border-border bg-secondary/40 px-6 py-6 sm:px-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex size-11 items-center justify-center rounded-xl bg-background text-primary shadow-sm">
                  <Truck className="size-5" />
                </div>

                <div>
                  <p className="text-xs font-semibold">
                    Shipment SD-20481
                  </p>

                  <p className="mt-1 text-[10px] text-muted-foreground">
                    Currently moving through the delivery network
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge label="Payment confirmed" />
                <StatusBadge label="Rider assigned" />
                <StatusBadge label="Picked up" />

                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-[10px] font-semibold text-primary">
                  <span className="size-1.5 rounded-full bg-primary" />
                  In transit
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <p className="max-w-xl text-sm leading-6 text-muted-foreground">
            Every status transition is backed by SwiftDrop's delivery rules,
            ownership checks, and tracking events.
          </p>

          <a
            href="#operations"
            className="group flex w-fit items-center gap-2 text-sm font-semibold"
          >
            See how operations work
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
};

interface StatusBadgeProps {
  label: string;
}

const StatusBadge = ({ label }: StatusBadgeProps) => {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-[10px] font-medium text-muted-foreground">
      <CheckCircle2 className="size-3 text-primary" />
      {label}
    </span>
  );
};

export default HowItWorks;