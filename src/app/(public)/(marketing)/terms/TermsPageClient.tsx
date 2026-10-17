
"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  CircleDot,
  CreditCard,
  FileText,
  LockKeyhole,
  Package,
  Scale,
  ShieldCheck,
  Truck,
  UserRound,
  Workflow,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const sections = [
  {
    id: "acceptance",
    number: "01",
    icon: FileText,
    title: "Acceptance of Terms",
    content:
      "These Terms & Conditions describe the intended rules for accessing and using SwiftDrop. By using the platform, users should review and comply with the terms applicable to their activities. If you do not agree with applicable terms, you should not use the relevant services.",
  },
  {
    id: "accounts",
    number: "02",
    icon: UserRound,
    title: "Accounts and Responsibilities",
    content:
      "Users are responsible for providing accurate information, maintaining the confidentiality of their credentials, and using their accounts appropriately.",
    bullets: [
      "Provide accurate account and contact information.",
      "Keep passwords and authentication credentials confidential.",
      "Notify the platform operator of suspected unauthorized access.",
      "Do not impersonate another person or attempt to access unauthorized accounts.",
    ],
  },
  {
    id: "shipments",
    number: "03",
    icon: Package,
    title: "Shipment Management",
    content:
      "Shipment information should be complete and accurate. Merchants and other authorized users are responsible for the information they submit and for following applicable rules relating to the items and deliveries they manage.",
    bullets: [
      "Provide accurate sender, recipient, and shipment details.",
      "Do not submit prohibited or unlawful items.",
      "Follow applicable packaging, handling, and delivery requirements.",
      "Use shipment status updates honestly and only as authorized.",
    ],
  },
  {
    id: "roles",
    number: "04",
    icon: Workflow,
    title: "Platform Roles and Permissions",
    content:
      "SwiftDrop is designed to support merchant, rider, and administrator workflows. Access to information and actions may depend on a user's assigned role and the permissions implemented in the platform.",
    bullets: [
      "Merchants should use merchant features for authorized shipment activities.",
      "Riders should act only on shipments and tasks assigned or authorized to them.",
      "Administrators should use privileged access responsibly.",
      "Users must not attempt to bypass access controls or interfere with another user's work.",
    ],
  },
  {
    id: "payments",
    number: "05",
    icon: CreditCard,
    title: "Payments and Charges",
    content:
      "Where payment features are available, users should review the applicable amount, payment status, and provider instructions before completing a transaction. Payment processing and refunds are subject to the actual implementation and the applicable provider terms.",
    bullets: [
      "Use accurate payment information and follow the payment provider's instructions.",
      "Do not treat an initiated payment as successful until its status is confirmed.",
      "Any cancellation, refund, or charge adjustment is subject to the applicable published policy and transaction status.",
    ],
  },
  {
    id: "delivery",
    number: "06",
    icon: Truck,
    title: "Delivery Operations",
    content:
      "Delivery progress may depend on shipment readiness, rider availability, recipient coordination, and other operational circumstances. Displayed statuses represent information recorded by the platform and should not be interpreted as a guarantee of a particular delivery time.",
    bullets: [
      "Users should provide accurate delivery information.",
      "Riders should update shipment status according to the actual workflow.",
      "Delays and operational issues should be handled through the available procedures.",
    ],
  },
  {
    id: "acceptable-use",
    number: "07",
    icon: ShieldCheck,
    title: "Acceptable Use",
    content:
      "Users must not misuse SwiftDrop, interfere with its operation, or use the platform in violation of applicable law.",
    bullets: [
      "Do not attempt unauthorized access to systems or data.",
      "Do not introduce malicious code or disrupt platform availability.",
      "Do not falsify shipment, payment, identity, or delivery information.",
      "Do not use the platform for unlawful or prohibited activities.",
    ],
  },
  {
    id: "availability",
    number: "08",
    icon: BadgeCheck,
    title: "Service Availability and Changes",
    content:
      "Features may be updated, modified, suspended, or unavailable because of maintenance, technical limitations, or operational decisions. The platform should not be considered a guarantee of uninterrupted availability or error-free operation.",
  },
  {
    id: "security",
    number: "09",
    icon: LockKeyhole,
    title: "Security and Account Restrictions",
    content:
      "Access may be restricted where reasonably necessary to investigate suspected misuse, protect accounts, maintain platform security, or comply with applicable requirements. Any restriction should be handled according to the platform's actual procedures and applicable law.",
  },
  {
    id: "liability",
    number: "10",
    icon: Scale,
    title: "Limitations and Applicable Law",
    content:
      "Any limitations of liability, dispute procedures, and governing-law provisions must be established in accordance with applicable law and the actual service arrangement. Nothing in these draft terms is intended to exclude a right or liability that cannot lawfully be excluded.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07 },
  },
};

const revealVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function TermsPageClient() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      {/* Hero */}
      <section className="relative border-b border-border">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -right-36 -top-32 size-[420px] rounded-full bg-primary/10 blur-[110px]" />
          <div className="absolute -left-28 bottom-0 size-72 rounded-full bg-primary/5 blur-[90px]" />
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />
        </div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1fr_320px] lg:gap-20 lg:px-10 lg:py-28">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground backdrop-blur">
              <Scale className="size-4 text-primary" />
              Platform guidelines
            </div>

            <h1 className="mt-7 text-4xl font-bold tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              Clear terms.
              <span className="mt-2 block text-primary">
                Better collaboration.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              These terms outline the responsibilities and general
              expectations for using SwiftDrop's courier and last-mile
              logistics workflows.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#terms-content"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:opacity-90"
              >
                Read the terms
                <ArrowRight className="size-4" />
              </a>

              <Link
                href="/privacy-policy"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/70 px-5 py-3.5 text-sm font-semibold transition-colors hover:bg-muted"
              >
                Privacy Policy
              </Link>
            </div>
          </motion.div>

          {/* Decorative visual */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative mx-auto w-full max-w-xs"
          >
            <div className="absolute inset-0 scale-90 rounded-full bg-primary/10 blur-3xl" />

            <motion.div
              animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative rounded-3xl border border-border bg-card p-6 shadow-2xl shadow-black/5 sm:p-7"
            >
              <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <FileText className="size-7" />
              </div>

              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                SwiftDrop
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-tight">
                Terms of service
              </h2>

              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Shared expectations for managing accounts, shipments, and
                delivery operations.
              </p>

              <div className="mt-6 space-y-3 border-t border-border pt-5">
                {[
                  "Account responsibilities",
                  "Shipment workflows",
                  "Platform security",
                ].map((label) => (
                  <div key={label} className="flex items-center gap-2.5">
                    <CheckCircle2 className="size-4 shrink-0 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <section
        id="terms-content"
        className="mx-auto grid max-w-7xl scroll-mt-24 gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-16 lg:px-10"
      >
        {/* Navigation */}
        <aside className="h-fit lg:sticky lg:top-28">
          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Contents
            </p>

            <nav className="mt-4 grid gap-1">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="group flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <span>{section.title}</span>
                  <ChevronRight className="size-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" />
                </a>
              ))}
            </nav>
          </div>

          <div className="mt-4 rounded-2xl border border-primary/20 bg-primary/[0.05] p-5">
            <CircleDot className="size-6 text-primary" />
            <h3 className="mt-3 font-semibold">Use SwiftDrop responsibly</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Follow your role's permissions and keep shipment information
              accurate.
            </p>
          </div>
        </aside>

        {/* Terms sections */}
        <div className="min-w-0">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-7 rounded-2xl border border-border bg-muted/30 p-5 sm:p-6"
          >
            <div className="flex items-start gap-3">
              <CircleAlert className="mt-1 size-5 shrink-0 text-primary" />
              <div>
                <h2 className="font-semibold">Draft terms for review</h2>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  This document is a starting point for the SwiftDrop
                  project, not a finalized legal agreement. Before
                  production use, review it against actual platform
                  functionality, payment and delivery arrangements, and
                  applicable law.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.06 }}
            className="space-y-4"
          >
            {sections.map((section) => {
              const Icon = section.icon;

              return (
                <motion.article
                  key={section.id}
                  id={section.id}
                  variants={revealVariants}
                  className="scroll-mt-28 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/30 sm:p-7 lg:p-8"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                          {section.title}
                        </h2>

                        <span className="text-xs font-semibold tracking-widest text-muted-foreground/60">
                          {section.number}
                        </span>
                      </div>

                      <p className="mt-4 leading-8 text-muted-foreground">
                        {section.content}
                      </p>

                      {"bullets" in section && section.bullets && (
                        <ul className="mt-5 space-y-3">
                          {section.bullets.map((bullet) => (
                            <li
                              key={bullet}
                              className="flex items-start gap-3 text-sm leading-7 text-muted-foreground"
                            >
                              <CheckCircle2 className="mt-1 size-4 shrink-0 text-primary" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>

          {/* Footer CTA */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-8 rounded-2xl bg-primary p-6 text-primary-foreground sm:p-8"
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold">
                  Need clarification?
                </h2>
                <p className="mt-2 max-w-lg text-sm leading-7 opacity-85">
                  Visit our contact page for available support information.
                </p>
              </div>

              <Link
                href="/contact"
                className="inline-flex w-fit shrink-0 items-center gap-2 rounded-xl bg-background px-5 py-3 font-semibold text-foreground transition-opacity hover:opacity-90"
              >
                Contact Us
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
