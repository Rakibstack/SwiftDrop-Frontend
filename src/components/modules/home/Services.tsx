
"use client";

import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  CreditCard,
  MapPin,
  Package,
  Truck,
} from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { StaggerChildren, StaggerItem } from "@/components/shared/StaggerChildren";



const services = [
  {
    number: "01",
    title: "Shipment Management",
    description:
      "Create shipments, organize parcel details, and manage delivery operations from one workspace.",
    icon: Package,
    tag: "SHIPMENTS",
  },
  {
    number: "02",
    title: "Delivery Tracking",
    description:
      "Follow parcel progress with clear status updates throughout the delivery journey.",
    icon: MapPin,
    tag: "VISIBILITY",
  },
  {
    number: "03",
    title: "Rider Operations",
    description:
      "Connect riders and administrators through an organized shipment assignment workflow.",
    icon: Truck,
    tag: "OPERATIONS",
  },
  {
    number: "04",
    title: "Payment Workflow",
    description:
      "Keep shipment payment information connected to the delivery process.",
    icon: CreditCard,
    tag: "PAYMENTS",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="relative isolate overflow-hidden bg-background py-20 text-foreground transition-colors duration-300 sm:py-24 lg:py-32"
    >
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 -z-10 h-96 w-96 rounded-full bg-orange-500/[0.07] blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-96 w-96 rounded-full bg-orange-500/[0.05] blur-[100px]"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Section heading */}
        <AnimatedSection>
          <div className="mb-12 flex flex-col gap-5 border-b border-border pb-8 sm:mb-16 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/[0.07] px-3.5 py-2 text-xs font-semibold tracking-wide text-orange-600 dark:text-orange-400">
                <span className="h-2 w-2 rounded-full bg-orange-500" />
                THE SWIFTDROP PLATFORM
              </div>

              <h2 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Delivery operations,{" "}
                <span className="text-orange-600 dark:text-orange-400">
                  made simpler.
                </span>
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
              The essential tools to manage shipments, coordinate delivery
              teams, and keep your logistics workflow organized.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:gap-8">
          {/* Feature panel */}
          <AnimatedSection className="h-full">
            <div className="relative flex h-full min-h-[410px] flex-col overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-sm sm:p-9 lg:min-h-[570px] lg:p-10">
              {/* Decorative graphic */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 top-24 h-64 w-64 rounded-full border border-orange-500/10 sm:h-72 sm:w-72"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-8 top-32 h-48 w-48 rounded-full border border-orange-500/15 sm:h-56 sm:w-56"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute right-8 top-44 flex h-28 w-28 items-center justify-center rounded-3xl border border-orange-500/20 bg-orange-500/[0.07] shadow-xl shadow-orange-950/5 sm:right-12 sm:h-32 sm:w-32"
              >
                <Truck
                  className="h-14 w-14 text-orange-600 dark:text-orange-400"
                  strokeWidth={1.3}
                />
              </div>

              <div className="relative z-10 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                One connected workflow
              </div>

              <div className="relative z-10 mt-auto pt-52 sm:pt-56 lg:pt-64">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 dark:text-orange-400">
                  Less friction. More control.
                </p>

                <h3 className="mt-4 max-w-md text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                  Every delivery has a clearer path.
                </h3>

                <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
                  Bring shipment creation, delivery coordination, tracking,
                  and payment workflows together in one place.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  {["Merchant", "Rider", "Admin"].map((role) => (
                    <span
                      key={role}
                      className="rounded-full border border-border bg-muted/60 px-3.5 py-2 text-xs font-semibold text-foreground"
                    >
                      {role}
                    </span>
                  ))}
                </div>

                <Link
                  href="/register"
                  className="group mt-8 inline-flex w-fit items-center gap-3 rounded-xl bg-orange-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-600/20 transition duration-200 hover:-translate-y-0.5 hover:bg-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                >
                  Get started
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </AnimatedSection>

          {/* Services list */}
          <StaggerChildren className="flex flex-col gap-3">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <StaggerItem key={service.number}>
                  <article className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-500/40 hover:bg-muted/30 hover:shadow-lg hover:shadow-black/[0.03] dark:hover:shadow-black/10 sm:p-6">
                    <div className="flex items-start gap-4 sm:gap-5">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-orange-500/15 bg-orange-500/[0.07] text-orange-600 transition duration-300 group-hover:bg-orange-600 group-hover:text-white dark:text-orange-400 dark:group-hover:text-white sm:h-14 sm:w-14">
                        <Icon className="h-6 w-6" strokeWidth={1.7} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-bold tracking-[0.18em] text-muted-foreground">
                            {service.number}
                          </span>

                          <span className="rounded-md bg-muted px-2 py-1 text-[9px] font-bold tracking-[0.12em] text-muted-foreground">
                            {service.tag}
                          </span>
                        </div>

                        <h3 className="mt-2 text-base font-bold tracking-tight text-foreground transition-colors group-hover:text-orange-600 dark:group-hover:text-orange-400 sm:text-lg">
                          {service.title}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          {service.description}
                        </p>
                      </div>

                      <div className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 group-hover:border-orange-500/30 group-hover:bg-orange-500/10 group-hover:text-orange-600 sm:flex dark:group-hover:text-orange-400">
                        <ArrowDownRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-[-45deg]" />
                      </div>
                    </div>

                    <div className="mt-5 flex items-center gap-2 border-t border-border/70 pt-4 text-xs text-muted-foreground">
                      <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>
                        Part of the connected SwiftDrop workflow
                      </span>
                    </div>
                  </article>
                </StaggerItem>
              );
            })}
          </StaggerChildren>
        </div>
      </div>
    </section>
  );
}
