import { ArrowRight, CreditCard, MapPin, Package, Truck } from "lucide-react";
import Link from "next/link";

const services = [
  {
    number: "01",
    icon: Package,
    title: "Shipment Management",
    description: "Create, manage, and monitor shipments through a structured delivery workflow designed for growing businesses.",
    href: "#how-it-works",
    className: "lg:col-span-2",
  },
  {
    number: "02",
    icon: CreditCard,
    title: "Secure Payments",
    description: "Handle courier payments with a reliable payment flow and verification process.",
    href: "#how-it-works",
    className: "lg:col-span-1",
  },
  {
    number: "03",
    icon: Truck,
    title: "Rider Operations",
    description: "Assign riders and manage every stage of the delivery lifecycle from pickup to doorstep.",
    href: "#operations",
    className: "lg:col-span-1",
  },
  {
    number: "04",
    icon: MapPin,
    title: "Real-time Tracking",
    description: "Keep merchants informed with shipment status and delivery progress throughout the journey.",
    href: "/tracking",
    className: "lg:col-span-2",
  },
];

const Services = () => {
  return (
    <section id="solutions" className="relative overflow-hidden py-24 sm:py-32 bg-background/50">
      {/* Background Tech Subgrid Line Overlay (Optional SaaS Core Look) */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="flex flex-col items-start gap-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
              One platform. Complete control.
            </p>
          </div>
          
          <h2 className="text-4xl font-extrabold tracking-[-0.04em] sm:text-5xl lg:text-6xl bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
            Everything your delivery operation needs.
          </h2>
          <p className="mt-2 text-base leading-7 text-muted-foreground sm:text-lg max-w-2xl">
            SwiftDrop brings the core parts of your delivery operation together so you can spend less time managing logistics and more time growing your business.
          </p>
        </div>

        {/* Services grid */}
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.number}
                href={service.href}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-gradient-to-b from-card/80 to-card/20 p-6 backdrop-blur-sm transition-all duration-500 hover:border-primary/40 hover:shadow-[0_0_30px_-5px_rgba(var(--primary),0.15)] sm:p-8 ${service.className}`}
              >
                {/* Modern Glossy Inner Border Glow */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                
                <div>
                  {/* Number & Icon Header */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-medium tracking-wider text-muted-foreground/60">
                      // {service.number}
                    </span>
                    <div className="flex size-11 items-center justify-center rounded-2xl border border-border bg-background shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:border-primary/30 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-[0_0_20px_rgba(var(--primary),0.2)]">
                      <Icon className="size-5 transition-transform duration-500 group-hover:rotate-6" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mt-12">
                    <h3 className="text-2xl font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground/90">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Bottom link with dynamic interactive arrow */}
                <div className="mt-10 flex items-center gap-1.5 text-sm font-semibold text-foreground/80 transition-colors duration-300 group-hover:text-primary">
                  <span>Explore capability</span>
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>

                {/* Cyberpunk style subtle accent corner grid */}
                <div className="pointer-events-none absolute bottom-0 right-0 -z-10 size-32 bg-radial-gradient from-primary/10 to-transparent opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
