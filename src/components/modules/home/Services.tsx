"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  CreditCard,
  MapPin,
  Package,
  ShieldCheck,
  Truck,
} from "lucide-react";

import { AnimatedSection } from "@/components/shared/AnimatedSection";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/shared/StaggerChildren";

const services = [
  {
    number: "01",
    title: "Shipment Management",
    description:
      "Create shipments, organize parcel details, and manage deliveries from one workspace.",
    icon: Package,
    tag: "SHIPMENTS",
  },
  {
    number: "02",
    title: "Delivery Tracking",
    description:
      "Follow parcel progress through clear status updates across the delivery journey.",
    icon: MapPin,
    tag: "VISIBILITY",
  },
  {
    number: "03",
    title: "Rider Operations",
    description:
      "Coordinate rider assignments and keep every delivery handoff organized.",
    icon: Truck,
    tag: "OPERATIONS",
  },
  {
    number: "04",
    title: "Payment Workflow",
    description:
      "Connect delivery payments and shipment records in one consistent workflow.",
    icon: CreditCard,
    tag: "PAYMENTS",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="relative isolate overflow-hidden bg-background py-20 text-foreground transition-colors duration-300 sm:py-24 lg:py-28"
    >
      {/* Soft ambient brand color */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 -z-10 size-96 rounded-full bg-orange-500/[0.07] blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 -z-10 size-96 rounded-full bg-orange-500/[0.05] blur-[110px]"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14 xl:gap-16">
          {/* LEFT: Delivery image */}
          <AnimatedSection className="min-w-0">
            <div className="group relative mx-auto w-full max-w-xl lg:mx-0">
              <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-orange-500/[0.10] blur-2xl transition-opacity duration-500 group-hover:bg-orange-500/[0.16]" />

              <div className="relative min-h-[440px] overflow-hidden rounded-[1.75rem] border border-border bg-muted shadow-xl shadow-black/[0.05] sm:min-h-[540px] lg:min-h-[600px]">
                <Image
                  src="/service3.jpg"
                  alt="A delivery professional carrying a parcel"
                  fill
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                />

                {/* Preserve text contrast across themes */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/5" />

                {/* Small top label */}
                <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/90 px-3.5 py-2 text-xs font-semibold text-stone-800 shadow-lg backdrop-blur-md dark:border-white/15 dark:bg-stone-900/85 dark:text-stone-100 sm:left-7 sm:top-7">
                  <span className="size-2 rounded-full bg-orange-500" />
                  THE SWIFTDROP PLATFORM
                </div>

                {/* Image caption */}
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-9">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-300">
                    Less friction. More control.
                  </p>

                  <h3 className="mt-3 max-w-md text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
                    Every delivery has a clearer path.
                  </h3>

                  <p className="mt-4 max-w-sm text-sm leading-6 text-white/80 sm:text-base sm:leading-7">
                    Keep shipments, delivery teams, and operational updates
                    connected from a single platform.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-xs font-medium text-white/90 sm:text-sm">
                    <span className="inline-flex items-center gap-2">
                      <ShieldCheck className="size-4 text-orange-300" />
                      Secure workflows
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <Truck className="size-4 text-orange-300" />
                      Organized delivery
                    </span>
                  </div>
                </div>
              </div>

              {/* Decorative corner detail */}
              <div
                aria-hidden="true"
                className="absolute -bottom-4 -right-4 -z-10 size-24 rounded-[1.5rem] border border-orange-500/20 sm:-right-5"
              />
            </div>
          </AnimatedSection>

          {/* RIGHT: Service content */}
          <div className="min-w-0">
            <AnimatedSection>
              <div className="mb-8 sm:mb-9">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/[0.07] px-3.5 py-2 text-xs font-semibold tracking-wide text-orange-700 dark:text-orange-400">
                  <span className="size-2 rounded-full bg-orange-500" />
                  WHAT YOU CAN DO
                </div>

                <h2 className="max-w-xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[2.7rem]">
                  Everything your delivery workflow needs,{" "}
                  <span className="text-primary">in one place.</span>
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
                  From creating a shipment to completing delivery, SwiftDrop
                  helps merchants, riders, and admins work through one
                  connected process.
                </p>
              </div>
            </AnimatedSection>

            <StaggerChildren className="grid gap-3.5 sm:grid-cols-2 sm:gap-4">
              {services.map((service) => {
                const Icon = service.icon;

                return (
                  <StaggerItem key={service.number}>
                    <article className="group relative h-full overflow-hidden rounded-2xl border border-border/80 bg-card/80 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-card hover:shadow-lg hover:shadow-orange-950/[0.04] dark:hover:shadow-black/15 sm:p-6">
                      <div className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />

                      <div className="flex items-start justify-between gap-3">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-primary/15 bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                          <Icon className="size-5" strokeWidth={1.8} />
                        </div>

                        <span className="text-xs font-semibold tracking-widest text-muted-foreground">
                          {service.number}
                        </span>
                      </div>

                      <div className="mt-5">
                        <p className="text-[10px] font-bold tracking-[0.15em] text-muted-foreground">
                          {service.tag}
                        </p>

                        <h3 className="mt-2 text-base font-bold tracking-tight text-card-foreground transition-colors duration-300 group-hover:text-primary sm:text-lg">
                          {service.title}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          {service.description}
                        </p>
                      </div>

                      <div className="mt-5 flex items-center gap-2 border-t border-border/70 pt-4 text-xs text-muted-foreground">
                        <Check className="size-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                        <span>Part of one connected workflow</span>
                      </div>
                    </article>
                  </StaggerItem>
                );
              })}
            </StaggerChildren>

            {/* CTA */}
            <AnimatedSection>
              <div className="mt-7 flex flex-col gap-4 rounded-2xl border border-border bg-muted/40 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div>
                  <h3 className="font-semibold tracking-tight">
                    Ready to ship smarter?
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    Get your delivery workflow organized with SwiftDrop.
                  </p>
                </div>

                <Link
                  href="/register"
                  className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-md shadow-orange-600/15 transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Get started
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes services-float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-7px);
          }
        }
      `}</style>
    </section>
  );
}
