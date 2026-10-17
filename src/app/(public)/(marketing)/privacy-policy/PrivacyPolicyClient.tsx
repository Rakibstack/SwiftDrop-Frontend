
"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Cookie,
  Database,
  Eye,
  FileText,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const sections = [
  {
    id: "information",
    number: "01",
    icon: Database,
    title: "Information We Handle",
    content:
      "Depending on how you use SwiftDrop, the platform may process account information, contact details, shipment information, delivery status updates, and information submitted through its features.",
    bullets: [
      "Account and profile information you provide.",
      "Shipment details and delivery-related records.",
      "Information needed to support authentication and platform operations.",
    ],
  },
  {
    id: "usage",
    number: "02",
    icon: Eye,
    title: "How Information Is Used",
    content:
      "Information is used to support the platform's intended courier and last-mile logistics workflows.",
    bullets: [
      "Create and manage user accounts.",
      "Coordinate shipment and delivery activities.",
      "Display shipment progress to authorized users.",
      "Maintain platform security and troubleshoot technical issues.",
    ],
  },
  {
    id: "sharing",
    number: "03",
    icon: UserRound,
    title: "Information Sharing",
    content:
      "Some shipment and contact information may need to be accessible to the relevant merchant, assigned rider, or administrator to support a delivery workflow. Access should be limited according to the platform's roles and permissions.",
    bullets: [
      "Relevant information may be shared among participants in a shipment.",
      "Technical service providers may process data when required to operate the platform.",
      "Information may be disclosed when legally required.",
    ],
  },
  {
    id: "security",
    number: "04",
    icon: LockKeyhole,
    title: "Data Security",
    content:
      "SwiftDrop should use appropriate technical and organizational safeguards to protect information against unauthorized access, alteration, disclosure, or loss. No online service can guarantee absolute security.",
    bullets: [
      "Access should follow established authentication and authorization rules.",
      "Users should protect their credentials and sign out of shared devices.",
      "Suspected security issues should be reported promptly.",
    ],
  },
  {
    id: "retention",
    number: "05",
    icon: Database,
    title: "Data Retention",
    content:
      "Information should be retained only for as long as needed for legitimate operational, security, legal, or recordkeeping purposes. Actual retention periods depend on the platform's implemented policies and applicable requirements.",
    bullets: [
      "Account records may be retained while an account is active.",
      "Shipment records may need to remain available for operational or audit purposes.",
      "Deletion requests may be subject to legal or operational limitations.",
    ],
  },
  {
    id: "cookies",
    number: "06",
    icon: Cookie,
    title: "Cookies and Authentication",
    content:
      "SwiftDrop may use cookies or similar browser storage mechanisms to support authentication, session management, and essential platform functionality. The exact mechanisms depend on the application's implementation.",
    bullets: [
      "Essential authentication cookies may be necessary for signed-in features.",
      "Browser settings may affect cookie behavior.",
      "Do not assume that analytics or advertising cookies are used unless they are implemented.",
    ],
  },
  {
    id: "rights",
    number: "07",
    icon: ShieldCheck,
    title: "Your Choices and Rights",
    content:
      "Depending on applicable law, you may have rights to request access to, correction of, or deletion of personal information. Account settings and available request procedures depend on the platform's implemented features.",
    bullets: [
      "Keep account information accurate.",
      "Review available profile and account settings.",
      "Use an official support channel to raise privacy questions or requests.",
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function PrivacyPolicyClient() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      {/* Hero */}
      <section className="relative border-b border-border">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -right-32 -top-32 size-96 rounded-full bg-primary/10 blur-[100px]" />
          <div className="absolute -left-24 bottom-0 size-72 rounded-full bg-primary/5 blur-[90px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground backdrop-blur">
              <ShieldCheck className="size-4 text-primary" />
              Privacy & data
            </div>

            <h1 className="mt-7 text-4xl font-bold tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              Your data deserves
              <span className="mt-2 block text-primary">
                thoughtful care.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              This policy explains the types of information that may be
              handled when using SwiftDrop and how that information relates
              to courier and delivery operations.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/70 px-3.5 py-2.5">
                <LockKeyhole className="size-4 text-primary" />
                Data protection
              </span>
              <span className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/70 px-3.5 py-2.5">
                <UserRound className="size-4 text-primary" />
                User privacy
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-16 lg:px-10">
        {/* Sticky navigation */}
        <aside className="h-fit lg:sticky lg:top-28">
          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              On this page
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
            <ShieldCheck className="size-6 text-primary" />
            <h3 className="mt-3 font-semibold">Privacy matters</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Use the platform responsibly and protect your account
              credentials.
            </p>
          </div>
        </aside>

        {/* Policy sections */}
        <div className="min-w-0">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8 rounded-2xl border border-border bg-muted/30 p-5 sm:p-6"
          >
            <div className="flex items-start gap-3">
              <FileText className="mt-1 size-5 shrink-0 text-primary" />
              <div>
                <h2 className="font-semibold">About this policy</h2>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  This is a draft policy for the SwiftDrop project. It
                  describes intended privacy practices in general terms
                  and must be reviewed against the actual application,
                  infrastructure, and applicable laws before production use.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
            className="space-y-5"
          >
            {sections.map((section) => {
              const Icon = section.icon;

              return (
                <motion.article
                  key={section.id}
                  id={section.id}
                  variants={itemVariants}
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
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>

          {/* Contact CTA */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-8 overflow-hidden rounded-2xl bg-primary p-6 text-primary-foreground sm:p-8"
          >
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <Mail className="size-6" />
                <h2 className="mt-4 text-2xl font-bold">
                  Questions about privacy?
                </h2>
                <p className="mt-2 max-w-lg text-sm leading-7 opacity-85">
                  Visit our contact page to find the available ways to get
                  in touch with the SwiftDrop team.
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
