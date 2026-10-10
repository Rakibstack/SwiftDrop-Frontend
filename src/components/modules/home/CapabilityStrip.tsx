import { CreditCard, MapPin, Package, Truck } from "lucide-react";

const capabilities = [
  {
    icon: Package,
    title: "Shipment Management",
    description: "Create and manage every delivery.",
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description: "Reliable payment verification flow.",
  },
  {
    icon: Truck,
    title: "Rider Operations",
    description: "Assignment and delivery lifecycle.",
  },
  {
    icon: MapPin,
    title: "Live Tracking",
    description: "Track shipments from pickup to delivery.",
  },
];

const CapabilityStrip = () => {
  return (
    <section className="border-y border-border bg-secondary/30">
      <div className="mx-auto grid max-w-7xl divide-y divide-border px-5 sm:px-6 md:grid-cols-2 md:divide-x md:divide-y-0 lg:grid-cols-4 lg:px-8">
        {capabilities.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="flex items-center gap-4 px-1 py-6 md:px-6 lg:py-7"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-primary">
                <Icon className="size-[18px]" />
              </div>

              <div>
                <p className="text-sm font-semibold tracking-tight">
                  {item.title}
                </p>

                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CapabilityStrip;
