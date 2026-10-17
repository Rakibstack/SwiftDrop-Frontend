
"use client";

import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  CircleDot,
  Clock3,
  Layers3,
  MapPin,
  Package,
  PackageCheck,
  Route,
  ShieldCheck,
  Sparkles,
  Store,
  Truck,
  Users,
  Workflow,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const principles = [
  {
    number: "01",
    icon: Workflow,
    title: "Connected workflows",
    description:
      "Bring shipment creation, delivery assignment, and status updates into a structured workflow.",
  },
  {
    number: "02",
    icon: Route,
    title: "Clearer delivery progress",
    description:
      "Follow the shipment lifecycle through meaningful status transitions and delivery updates.",
  },
  {
    number: "03",
    icon: ShieldCheck,
    title: "Role-based operations",
    description:
      "Give merchants, riders, and administrators dedicated experiences based on their responsibilities.",
  },
];

const roles = [
  {
    icon: Store,
    number: "01",
    title: "Merchant",
    subtitle: "Manage your shipments",
    description:
      "Create shipments, manage delivery requests, and keep shipment activities organized.",
    className: "md:translate-y-8",
  },
  {
    icon: Truck,
    number: "02",
    title: "Rider",
    subtitle: "Move deliveries forward",
    description:
      "Handle assigned shipments and update delivery progress through the rider workflow.",
    className: "",
  },
  {
    icon: Users,
    number: "03",
    title: "Administrator",
    subtitle: "Coordinate operations",
    description:
      "Manage platform activities and coordinate operational workflows with appropriate permissions.",
    className: "md:translate-y-8",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const revealVariants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: "easeOut" as const,
    },
  },
};

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={revealVariants}
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground shadow-sm backdrop-blur-sm">
      <span className="size-1.5 rounded-full bg-primary" />
      {children}
    </div>
  );
}

export default function AboutPageClient() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <main className="overflow-hidden bg-background text-foreground">
      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative isolate border-b border-border">
        {/* Background decoration */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute -right-48 -top-40 size-[500px] rounded-full bg-primary/10 blur-[120px] sm:size-[650px]" />
          <div className="absolute -bottom-52 -left-48 size-[400px] rounded-full bg-primary/5 blur-[110px]" />

          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
        </div>

        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:px-10 lg:py-28">
          {/* Hero copy */}
          <motion.div
            variants={containerVariants}
            initial={shouldReduceMotion ? false : "hidden"}
            animate="visible"
            className="relative z-10"
          >
            <motion.div variants={revealVariants}>
              <SectionLabel>
                <Sparkles className="size-3.5 text-primary" />
                The story behind SwiftDrop
              </SectionLabel>
            </motion.div>

            <motion.h1
              variants={revealVariants}
              className="mt-8 max-w-3xl text-5xl font-bold leading-[1.06] tracking-[-0.055em] sm:text-6xl lg:text-7xl xl:text-[5.3rem]"
            >
              Deliveries deserve
              <span className="relative mt-2 block w-fit text-primary">
                better flow.
                <motion.span
                  aria-hidden="true"
                  initial={{ scaleX: shouldReduceMotion ? 1 : 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.65 }}
                  className="absolute -bottom-2 left-0 h-1 origin-left rounded-full bg-primary/40 sm:h-1.5"
                />
              </span>
            </motion.h1>

            <motion.p
              variants={revealVariants}
              className="mt-8 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg"
            >
              We are building a more organized way to coordinate courier
              operations—connecting merchants, riders, and administrators
              through one structured delivery workflow.
            </motion.p>

            <motion.div
              variants={revealVariants}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Link
                href="/register"
                className="group inline-flex items-center gap-2.5 rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/25"
              >
                Get Started
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <a
                href="#our-story"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/70 px-5 py-3.5 text-sm font-semibold transition-colors hover:bg-muted"
              >
                Discover our story
                <ArrowDown className="size-4" />
              </a>
            </motion.div>

            <motion.div
              variants={revealVariants}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground"
            >
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="size-4 text-primary" />
                Connected workflows
              </span>

              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="size-4 text-primary" />
                Role-based operations
              </span>
            </motion.div>
          </motion.div>

          {/* Animated delivery visual */}
          <div className="relative mx-auto w-full max-w-[540px]">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative aspect-square max-h-[540px] w-full"
            >
              {/* Orbital rings */}
              <div className="absolute inset-[7%] rounded-full border border-dashed border-border" />
              <div className="absolute inset-[17%] rounded-full border border-border/70" />
              <div className="absolute inset-[27%] rounded-full border border-primary/20" />

              <motion.div
                aria-hidden="true"
                animate={
                  shouldReduceMotion ? undefined : { rotate: 360 }
                }
                transition={{
                  duration: 48,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-[10%] rounded-full border border-transparent border-t-primary/50 border-r-primary/20"
              />

              {/* Central shipment card */}
              <motion.div
                animate={
                  shouldReduceMotion ? undefined : { y: [0, -9, 0] }
                }
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute left-1/2 top-1/2 z-10 w-[78%] max-w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-border bg-card/95 p-5 shadow-2xl shadow-black/5 backdrop-blur-xl sm:p-6"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Package className="size-5" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold">Shipment flow</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Delivery lifecycle
                      </p>
                    </div>
                  </div>

                  <div className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[10px] font-semibold text-primary">
                    Workflow
                  </div>
                </div>

                <div className="mt-7 space-y-5">
                  {[
                    {
                      icon: PackageCheck,
                      title: "Shipment created",
                      detail: "Order information recorded",
                      complete: true,
                    },
                    {
                      icon: Truck,
                      title: "Pickup & transit",
                      detail: "Delivery progress updated",
                      complete: true,
                    },
                    {
                      icon: MapPin,
                      title: "Final delivery",
                      detail: "Complete the delivery flow",
                      complete: false,
                    },
                  ].map((step, index) => {
                    const Icon = step.icon;

                    return (
                      <div key={step.title} className="relative flex gap-3.5">
                        {index !== 2 && (
                          <div className="absolute left-[17px] top-10 h-7 border-l border-dashed border-border" />
                        )}

                        <div
                          className={`relative z-10 flex size-[35px] shrink-0 items-center justify-center rounded-xl ${
                            step.complete
                              ? "bg-primary/10 text-primary"
                              : "border border-border bg-muted text-muted-foreground"
                          }`}
                        >
                          <Icon className="size-4" />
                        </div>

                        <div className="min-w-0 flex-1 pt-0.5">
                          <p className="text-sm font-semibold">
                            {step.title}
                          </p>
                          <p className="mt-1 text-xs leading-5 text-muted-foreground">
                            {step.detail}
                          </p>
                        </div>

                        {step.complete ? (
                          <CheckCircle2 className="mt-1 size-4 shrink-0 text-primary" />
                        ) : (
                          <CircleDot className="mt-1 size-4 shrink-0 text-muted-foreground" />
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 flex items-center justify-between rounded-xl bg-muted/70 px-3.5 py-3">
                  <span className="text-xs text-muted-foreground">
                    Structured delivery workflow
                  </span>
                  <ArrowRight className="size-4 text-primary" />
                </div>
              </motion.div>

              {/* Floating merchant card */}
              <motion.div
                animate={
                  shouldReduceMotion
                    ? undefined
                    : { y: [0, -7, 0], rotate: [0, 1, 0] }
                }
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute left-0 top-[18%] z-20 rounded-2xl border border-border bg-card p-3.5 shadow-xl sm:left-1 sm:p-4"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Store className="size-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold">Merchant</p>
                    <p className="mt-0.5 text-[10px] text-muted-foreground">
                      Create shipments
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Floating rider card */}
              <motion.div
                animate={
                  shouldReduceMotion
                    ? undefined
                    : { y: [0, 8, 0], rotate: [0, -1, 0] }
                }
                transition={{
                  duration: 5.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-[19%] right-0 z-20 rounded-2xl border border-border bg-card p-3.5 shadow-xl sm:right-1 sm:p-4"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Truck className="size-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold">Rider</p>
                    <p className="mt-0.5 text-[10px] text-muted-foreground">
                      Delivery updates
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Floating coordination badge */}
              <motion.div
                animate={
                  shouldReduceMotion ? undefined : { y: [0, -5, 0] }
                }
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-[9%] left-[7%] z-20 flex items-center gap-2 rounded-full border border-border bg-card/95 px-3.5 py-2.5 shadow-lg backdrop-blur-md sm:bottom-[8%]"
              >
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-50" />
                  <span className="relative inline-flex size-2 rounded-full bg-primary" />
                </span>
                <span className="text-xs font-medium">
                  Connected operations
                </span>
              </motion.div>

              {/* Decorative dot */}
              <div className="absolute right-[14%] top-[10%] size-3 rounded-full bg-primary/60 shadow-[0_0_24px_var(--primary)]" />
            </motion.div>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="border-t border-border bg-muted/30">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-8 lg:px-10">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
              Designed around the shipment lifecycle
            </p>

            <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-muted-foreground sm:gap-x-8">
              <span>01 / Create</span>
              <span>02 / Assign</span>
              <span>03 / Deliver</span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          OUR STORY
      ===================================================== */}
      <section
        id="our-story"
        className="relative scroll-mt-24 py-20 sm:py-24 lg:py-32"
      >
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:px-10">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <SectionLabel>Our story</SectionLabel>

              <h2 className="mt-6 text-4xl font-bold leading-tight tracking-[-0.045em] sm:text-5xl">
                Delivery operations should feel
                <span className="text-primary"> connected.</span>
              </h2>

              <p className="mt-6 max-w-md leading-8 text-muted-foreground">
                A delivery involves more than moving a package. It requires
                coordination, clear responsibilities, and reliable updates at
                each stage.
              </p>

              <a
                href="#our-approach"
                className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary"
              >
                Explore our approach
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </Reveal>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="space-y-5"
          >
            <motion.article
              variants={revealVariants}
              className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 sm:p-9"
            >
              <div className="absolute right-0 top-0 size-40 rounded-full bg-primary/5 blur-3xl" />

              <span className="relative text-xs font-bold uppercase tracking-[0.2em] text-primary">
                The challenge
              </span>

              <h3 className="relative mt-5 text-2xl font-semibold tracking-tight sm:text-3xl">
                Multiple people. One shipment. Many moving parts.
              </h3>

              <p className="relative mt-4 max-w-xl leading-8 text-muted-foreground">
                Shipment creation, pickup, rider assignment, transit, and
                delivery all depend on different actions. Without an organized
                workflow, keeping track of these activities can become
                difficult.
              </p>
            </motion.article>

            <motion.article
              variants={revealVariants}
              className="relative overflow-hidden rounded-3xl border border-primary/20 bg-primary/[0.045] p-6 sm:p-9"
            >
              <div className="absolute -right-10 -top-10 size-48 rounded-full bg-primary/10 blur-3xl" />

              <span className="relative text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Our approach
              </span>

              <h3 className="relative mt-5 text-2xl font-semibold tracking-tight sm:text-3xl">
                Bring the workflow into one connected experience.
              </h3>

              <p className="relative mt-4 max-w-xl leading-8 text-muted-foreground">
                SwiftDrop is designed to structure these activities around
                shipments, with dedicated interfaces for the people who create,
                handle, and coordinate deliveries.
              </p>
            </motion.article>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          PRINCIPLES
      ===================================================== */}
      <section
        id="our-approach"
        className="border-y border-border bg-muted/30 py-20 sm:py-24 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <Reveal className="max-w-2xl">
            <SectionLabel>What guides us</SectionLabel>

            <h2 className="mt-6 text-4xl font-bold tracking-[-0.045em] sm:text-5xl">
              Thoughtful workflows.
              <span className="block text-muted-foreground">
                Practical outcomes.
              </span>
            </h2>

            <p className="mt-5 leading-8 text-muted-foreground">
              Our platform is organized around three practical principles
              that guide how delivery activities are represented and managed.
            </p>
          </Reveal>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="mt-12 grid gap-5 md:grid-cols-3"
          >
            {principles.map((item) => {
              const Icon = item.icon;

              return (
                <motion.article
                  key={item.number}
                  variants={revealVariants}
                  whileHover={shouldReduceMotion ? undefined : { y: -7 }}
                  transition={{ duration: 0.25 }}
                  className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 sm:p-8"
                >
                  <div className="absolute -right-12 -top-12 size-32 rounded-full bg-primary/5 blur-2xl transition-colors group-hover:bg-primary/15" />

                  <div className="relative flex items-center justify-between">
                    <div className="flex size-12 items-center justify-center rounded-2xl border border-primary/15 bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                      <Icon className="size-5" />
                    </div>

                    <span className="text-sm font-semibold tracking-widest text-muted-foreground/60">
                      {item.number}
                    </span>
                  </div>

                  <h3 className="relative mt-8 text-xl font-semibold tracking-tight">
                    {item.title}
                  </h3>

                  <p className="relative mt-3 leading-7 text-muted-foreground">
                    {item.description}
                  </p>

                  <div className="relative mt-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
                    <span className="h-px w-7 bg-primary/50 transition-all duration-300 group-hover:w-12" />
                    Our approach
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          PLATFORM ECOSYSTEM
      ===================================================== */}
      <section className="py-20 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <Reveal className="mx-auto max-w-3xl text-center">
            <SectionLabel>One connected platform</SectionLabel>

            <h2 className="mt-6 text-4xl font-bold tracking-[-0.045em] sm:text-5xl lg:text-6xl">
              Different roles.
              <span className="block text-primary">Shared progress.</span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-muted-foreground">
              Each person has a different responsibility in the delivery
              lifecycle. SwiftDrop gives each role a dedicated workflow while
              keeping shipment operations connected.
            </p>
          </Reveal>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            className="mt-14 grid gap-5 md:grid-cols-3 md:gap-6"
          >
            {roles.map((role) => {
              const Icon = role.icon;

              return (
                <motion.article
                  key={role.number}
                  variants={revealVariants}
                  whileHover={shouldReduceMotion ? undefined : { y: -8 }}
                  transition={{ duration: 0.25 }}
                  className={`group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card p-6 sm:p-8 ${role.className}`}
                >
                  <span className="absolute right-6 top-6 text-xs font-semibold tracking-widest text-muted-foreground/60">
                    {role.number}
                  </span>

                  <div className="relative flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                    <Icon className="size-6" />
                  </div>

                  <p className="mt-7 text-xs font-semibold uppercase tracking-[0.15em] text-primary">
                    {role.subtitle}
                  </p>

                  <h3 className="mt-2 text-2xl font-bold tracking-tight">
                    {role.title}
                  </h3>

                  <p className="mt-4 flex-1 leading-7 text-muted-foreground">
                    {role.description}
                  </p>

                  <div className="mt-8 flex items-center justify-between border-t border-border pt-5">
                    <span className="text-xs font-medium text-muted-foreground">
                      SwiftDrop ecosystem
                    </span>
                    <ArrowUpRight className="size-4 text-primary transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          DELIVERY PHILOSOPHY
      ===================================================== */}
      <section className="relative border-y border-border bg-muted/30">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-0 size-96 -translate-x-1/2 rounded-full bg-primary/5 blur-[100px]" />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-10 lg:py-28">
          <Reveal>
            <SectionLabel>
              <Layers3 className="size-3.5 text-primary" />
              How we think
            </SectionLabel>

            <h2 className="mt-6 text-4xl font-bold leading-tight tracking-[-0.045em] sm:text-5xl">
              A better delivery experience starts with
              <span className="text-primary"> better coordination.</span>
            </h2>

            <p className="mt-6 leading-8 text-muted-foreground">
              Our focus is not on adding complexity. It is on giving each
              workflow a clear structure, helping users understand their
              responsibilities, and making shipment progress easier to follow.
            </p>
          </Reveal>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-4"
          >
            {[
              {
                icon: PackageCheck,
                title: "Start with the shipment",
                text: "Keep shipment information organized from creation onward.",
              },
              {
                icon: Users,
                title: "Connect the right roles",
                text: "Structure actions around merchant, rider, and admin responsibilities.",
              },
              {
                icon: Clock3,
                title: "Make progress understandable",
                text: "Represent delivery stages with clear, meaningful status updates.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  variants={revealVariants}
                  className="flex gap-4 rounded-2xl border border-border bg-card/80 p-5 backdrop-blur-sm sm:p-6"
                >
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>

                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}
      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65 }}
          className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-primary text-primary-foreground"
        >
          {/* Decorative background */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -right-24 -top-40 size-96 rounded-full border border-primary-foreground/10" />
            <div className="absolute -right-8 -top-24 size-64 rounded-full border border-primary-foreground/10" />
            <div className="absolute -bottom-32 left-[35%] size-72 rounded-full bg-primary-foreground/10 blur-3xl" />
          </div>

          <div className="relative grid gap-10 px-6 py-12 sm:px-10 sm:py-16 lg:grid-cols-[1fr_auto] lg:items-center lg:px-16 lg:py-20">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3.5 py-2 text-xs font-medium">
                <Sparkles className="size-3.5" />
                Your delivery workflow starts here
              </div>

              <h2 className="mt-6 text-3xl font-bold leading-tight tracking-[-0.04em] sm:text-4xl lg:text-5xl">
                Ready to move your deliveries forward?
              </h2>

              <p className="mt-5 max-w-xl leading-8 opacity-85">
                Explore SwiftDrop and discover a structured approach to
                courier and last-mile logistics operations.
              </p>
            </div>

            <Link
              href="/register"
              className="group inline-flex w-fit items-center gap-3 rounded-xl bg-background px-6 py-4 text-sm font-bold text-foreground shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              Get Started
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}