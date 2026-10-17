"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BadgeHelp,
  Check,
  ChevronDown,
  CircleHelp,
  Clock3,
  Headphones,
  Mail,
  MessageCircle,
  Package,
  Send,
  ShieldCheck,
  Sparkles,
  Truck,
  Users,
} from "lucide-react";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: "easeOut",
    },
  },
};

const contactOptions = [
  {
    icon: Headphones,
    number: "01",
    title: "Customer support",
    description: "Need help with an account, delivery workflow, or an issue?",
    category: "Support request",
    color: "from-sky-500/20 to-blue-500/5",
    iconColor: "text-sky-500",
  },
  {
    icon: MessageCircle,
    number: "02",
    title: "Share feedback",
    description: "Have an idea that could make SwiftDrop even better?",
    category: "Product feedback",
    color: "from-violet-500/20 to-purple-500/5",
    iconColor: "text-violet-500",
  },
  {
    icon: Users,
    number: "03",
    title: "Partner with us",
    description:
      "Interested in collaborating or exploring a business opportunity?",
    category: "Partnership",
    color: "from-emerald-500/20 to-teal-500/5",
    iconColor: "text-emerald-500",
  },
];

const faqs = [
  {
    question: "How can I get help with a shipment?",
    answer:
      "Include your shipment reference, the issue you encountered, and any relevant status details when contacting support. This helps the team understand the problem.",
  },
  {
    question: "Can I report a delivery issue?",
    answer:
      "Yes. Choose Customer support in the message form and describe the delivery issue. Avoid including passwords, payment credentials, or other sensitive information.",
  },
  {
    question: "How do I share a product suggestion?",
    answer:
      "Choose Product feedback and explain the problem you want to solve, your suggested improvement, and how it would help merchants, riders, or customers.",
  },
  {
    question: "Can I discuss a business partnership?",
    answer:
      "Select Partnership and provide a brief overview of your organization, the type of collaboration you have in mind, and the best way to follow up.",
  },
];

export default function ContactPageClient() {
  const shouldReduceMotion = useReducedMotion();
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [messageStatus, setMessageStatus] = useState<"idle" | "integration">(
    "idle",
  );

  const animationVariants = shouldReduceMotion
    ? {
        hidden: { opacity: 1 },
        visible: { opacity: 1 },
      }
    : itemVariants;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // TODO: Connect this form to the SwiftDrop contact API.
    // Do not display a sent/success message until the API confirms success.
    setMessageStatus("integration");
  };

  return (
    <main className="overflow-hidden bg-background text-foreground">
      {/* HERO */}
      <section className="relative isolate">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute -top-44 left-1/2 h-[460px] w-[760px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
          <div className="absolute right-[-140px] top-40 h-72 w-72 rounded-full bg-violet-500/10 blur-[100px]" />
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
              backgroundSize: "52px 52px",
            }}
          />
        </div>

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-20 sm:px-8 sm:pb-20 sm:pt-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:px-10 lg:pb-24">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10"
          >
            <motion.div variants={animationVariants}>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-primary">
                <Sparkles size={14} />
                LET&apos;S TALK
              </span>
            </motion.div>

            <motion.h1
              variants={animationVariants}
              className="mt-7 max-w-2xl text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl md:text-6xl lg:text-[4.25rem]"
            >
              Great things
              <br />
              start with a{" "}
              <span className="bg-gradient-to-r from-sky-500 via-blue-500 to-violet-500 bg-clip-text text-transparent">
                conversation.
              </span>
            </motion.h1>

            <motion.p
              variants={animationVariants}
              className="mt-6 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg"
            >
              Questions, ideas, or something we can help you solve? Tell us
              what&apos;s on your mind. Let&apos;s make every delivery
              experience better, together.
            </motion.p>

            <motion.div
              variants={animationVariants}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Link
                href="#message"
                className="group inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/25"
              >
                Send us a message
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="#faq"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/60 px-5 py-3.5 text-sm font-semibold transition hover:border-primary/30 hover:bg-accent"
              >
                Explore FAQs
                <ArrowDown size={16} />
              </Link>
            </motion.div>

            <motion.div
              variants={animationVariants}
              className="mt-10 grid max-w-lg grid-cols-2 gap-5 border-t border-border/70 pt-6 sm:grid-cols-3"
            >
              <div className="flex items-start gap-2.5">
                <div className="mt-0.5 rounded-lg bg-primary/10 p-2 text-primary">
                  <Clock3 size={17} />
                </div>
                <div>
                  <p className="text-sm font-semibold">Clear communication</p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    Tell us what you need
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="mt-0.5 rounded-lg bg-violet-500/10 p-2 text-violet-500">
                  <ShieldCheck size={17} />
                </div>
                <div>
                  <p className="text-sm font-semibold">Privacy first</p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    Share only what&apos;s needed
                  </p>
                </div>
              </div>

              <div className="col-span-2 flex items-start gap-2.5 sm:col-span-1">
                <div className="mt-0.5 rounded-lg bg-emerald-500/10 p-2 text-emerald-500">
                  <Check size={17} />
                </div>
                <div>
                  <p className="text-sm font-semibold">The right context</p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    Help us understand your issue
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Animated visual */}
          <motion.div
            initial={
              shouldReduceMotion
                ? { opacity: 1 }
                : { opacity: 0, scale: 0.94, x: 24 }
            }
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative mx-auto w-full max-w-xl"
          >
            <div className="absolute inset-10 rounded-full bg-gradient-to-br from-primary/25 via-violet-500/20 to-sky-500/20 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-border/80 bg-card/70 p-5 shadow-2xl shadow-primary/5 backdrop-blur-xl sm:p-8">
              <div
                aria-hidden="true"
                className="absolute right-0 top-0 h-40 w-40 rounded-full bg-primary/10 blur-3xl"
              />

              <div className="relative flex items-center justify-between border-b border-border/70 pb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-blue-700 text-white shadow-lg shadow-blue-500/20">
                    <Send size={21} />
                  </div>
                  <div>
                    <p className="font-semibold">SwiftDrop</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Your delivery workspace
                    </p>
                  </div>
                </div>

                <span className="rounded-full border border-border bg-background/70 px-3 py-1 text-xs text-muted-foreground">
                  Contact
                </span>
              </div>

              <div className="relative flex min-h-[275px] flex-col justify-center py-8 sm:min-h-[310px]">
                <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10 sm:h-60 sm:w-60" />
                <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-primary/20 sm:h-48 sm:w-48" />

                <motion.div
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : { y: [0, -8, 0], rotate: [0, -2, 0] }
                  }
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative z-10 mx-auto w-[85%] max-w-sm rounded-2xl border border-primary/20 bg-background/90 p-5 shadow-xl shadow-primary/10 backdrop-blur-xl sm:p-6"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <MessageCircle size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">
                        Start a conversation
                      </p>
                      <p className="text-xs text-muted-foreground">
                        We&apos;re listening
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 rounded-xl rounded-tl-sm bg-primary/10 px-4 py-3">
                    <p className="text-sm leading-6">
                      Hi there! How can we help make your delivery experience
                      better?
                    </p>
                  </div>

                  <div className="mt-4 flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-3">
                    <span className="flex-1 text-xs text-muted-foreground">
                      Your message starts here...
                    </span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <Send size={14} />
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  animate={shouldReduceMotion ? undefined : { y: [0, 7, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute left-0 top-8 z-20 hidden items-center gap-2 rounded-xl border border-border bg-card/95 px-3 py-2.5 shadow-lg sm:flex"
                >
                  <Package size={17} className="text-sky-500" />
                  <span className="text-xs font-medium">Shipment support</span>
                </motion.div>

                <motion.div
                  animate={shouldReduceMotion ? undefined : { y: [0, -6, 0] }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  className="absolute bottom-8 right-0 z-20 hidden items-center gap-2 rounded-xl border border-border bg-card/95 px-3 py-2.5 shadow-lg sm:flex"
                >
                  <Truck size={17} className="text-violet-500" />
                  <span className="text-xs font-medium">
                    Delivery operations
                  </span>
                </motion.div>
              </div>

              <div className="relative flex items-center justify-between gap-3 rounded-xl border border-border/70 bg-background/60 p-4">
                <div>
                  <p className="text-sm font-semibold">
                    Every message matters.
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Choose the topic that fits your needs.
                  </p>
                </div>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <ArrowUpRight size={19} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CONTACT CATEGORIES */}
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={animationVariants} className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              HERE FOR YOU
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              What can we help you with?
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              Every great solution starts with understanding the problem. Pick a
              topic to get your message in the right context.
            </p>
          </motion.div>

          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {contactOptions.map((option) => {
              const Icon = option.icon;

              return (
                <motion.button
                  key={option.number}
                  type="button"
                  variants={animationVariants}
                  onClick={() => {
                    const select = document.getElementById(
                      "contact-subject",
                    ) as HTMLSelectElement | null;

                    if (select) {
                      select.value = option.category;
                      select.dispatchEvent(
                        new Event("change", { bubbles: true }),
                      );

                      select.focus();

                      document.getElementById("message")?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }
                  }}
                  className="group relative w-full cursor-pointer overflow-hidden rounded-2xl border border-border bg-card p-6 text-left transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:p-7"
                >
                  <div
                    className={`absolute inset-x-0 top-0 h-32 bg-gradient-to-b ${option.color} opacity-70 transition group-hover:opacity-100`}
                  />

                  <div className="relative">
                    <div className="flex items-start justify-between">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl border border-border/70 bg-background/80 ${option.iconColor}`}
                      >
                        <Icon size={22} />
                      </div>

                      <span className="text-xs font-medium tracking-widest text-muted-foreground/70">
                        {option.number}
                      </span>
                    </div>

                    <h3 className="mt-7 text-lg font-semibold">
                      {option.title}
                    </h3>

                    <p className="mt-2 min-h-[52px] text-sm leading-6 text-muted-foreground">
                      {option.description}
                    </p>

                    <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                      Get in touch
                      <ArrowRight
                        size={16}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* MESSAGE FORM */}
      <section
        id="message"
        className="relative scroll-mt-24 border-y border-border/70 bg-muted/20"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-primary/10 blur-[100px]"
        />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16 lg:px-10 lg:py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="flex flex-col"
          >
            <motion.div variants={animationVariants}>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary">
                <Mail size={14} />
                YOUR MESSAGE
              </span>
            </motion.div>

            <motion.h2
              variants={animationVariants}
              className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Let&apos;s make
              <br />
              something happen.
            </motion.h2>

            <motion.p
              variants={animationVariants}
              className="mt-5 leading-7 text-muted-foreground"
            >
              Tell us a little about what you need. A clear subject and a few
              relevant details will help the team understand your request.
            </motion.p>

            <motion.div variants={animationVariants} className="mt-8 space-y-5">
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-primary">
                  <BadgeHelp size={20} />
                </div>
                <div>
                  <p className="font-semibold">Describe the situation</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    Include the relevant details so the issue is easier to
                    understand.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-violet-500">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="font-semibold">Keep your information safe</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    Never include passwords, OTPs, full card details, or other
                    sensitive credentials.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={animationVariants}
              className="mt-9 rounded-2xl border border-border bg-card/80 p-5"
            >
              <div className="flex items-center gap-2 text-sm font-semibold">
                <CircleHelp size={17} className="text-primary" />
                Not sure what to write?
              </div>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Start with the problem, explain what you expected, and mention
                what happened instead.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={
              shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6 }}
            className="rounded-[1.75rem] border border-border bg-card p-5 shadow-xl shadow-primary/[0.035] sm:p-8 lg:p-9"
          >
            <div className="flex items-start justify-between gap-4 border-b border-border pb-6">
              <div>
                <h3 className="text-xl font-bold sm:text-2xl">
                  Send us a message
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Fill in the details below to prepare your inquiry.
                </p>
              </div>
              <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary sm:flex">
                <Send size={21} />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-7 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="contact-name" className="text-sm font-medium">
                    Full name <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    autoComplete="name"
                    required
                    minLength={2}
                    placeholder="Your full name"
                    className="h-12 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none transition placeholder:text-muted-foreground/70 focus:border-primary focus:ring-4 focus:ring-primary/10"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="contact-email"
                    className="text-sm font-medium"
                  >
                    Email address <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="you@example.com"
                    className="h-12 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none transition placeholder:text-muted-foreground/70 focus:border-primary focus:ring-4 focus:ring-primary/10"
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <label
                    htmlFor="contact-subject"
                    className="text-sm font-medium"
                  >
                    What is this about?{" "}
                    <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="contact-subject"
                      name="subject"
                      required
                      defaultValue=""
                      onChange={() => setMessageStatus("idle")}
                      className="h-12 w-full appearance-none rounded-xl border border-input bg-background px-4 pr-10 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
                    >
                      <option value="" disabled>
                        Choose a topic
                      </option>
                      <option value="Support request">Customer support</option>
                      <option value="Product feedback">Product feedback</option>
                      <option value="Partnership">Partnership</option>
                      <option value="General inquiry">General inquiry</option>
                    </select>
                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="contact-reference"
                    className="text-sm font-medium"
                  >
                    Reference ID{" "}
                    <span className="text-muted-foreground">(optional)</span>
                  </label>
                  <input
                    id="contact-reference"
                    name="referenceId"
                    placeholder="Shipment or request ID"
                    className="h-12 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none transition placeholder:text-muted-foreground/70 focus:border-primary focus:ring-4 focus:ring-primary/10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <label
                    htmlFor="contact-message"
                    className="text-sm font-medium"
                  >
                    Your message <span className="text-destructive">*</span>
                  </label>
                  <span className="text-xs text-muted-foreground">
                    Be as specific as you can
                  </span>
                </div>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  minLength={10}
                  maxLength={2000}
                  rows={5}
                  placeholder="Describe your question, idea, or issue..."
                  onChange={() => setMessageStatus("idle")}
                  className="w-full resize-y rounded-xl border border-input bg-background px-4 py-3.5 text-sm leading-6 outline-none transition placeholder:text-muted-foreground/70 focus:border-primary focus:ring-4 focus:ring-primary/10"
                />
                <p className="text-xs text-muted-foreground">
                  Please do not share passwords, OTPs, or payment credentials.
                </p>
              </div>

              {messageStatus === "integration" && (
                <output className="block rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm leading-6 text-foreground">
                  <span className="font-semibold">One last step</span>

                  <span className="mt-1 block text-muted-foreground">
                    The form UI is ready, but message delivery has not been
                    connected yet. Connect this form to your contact API before
                    using it in production.
                  </span>
                </output>
              )}

              <button
                type="submit"
                className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-blue-600 px-5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/25 active:translate-y-0"
              >
                Prepare message
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>

              <p className="flex items-center justify-center gap-2 text-center text-xs leading-5 text-muted-foreground">
                <ShieldCheck size={14} className="shrink-0" />
                Your information should be handled securely.
              </p>
            </form>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="mx-auto max-w-4xl scroll-mt-24 px-5 py-16 sm:px-8 lg:py-24"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.div
            variants={animationVariants}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary">
              <CircleHelp size={14} />
              QUICK ANSWERS
            </span>
            <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
              Before you reach out
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              A few useful pointers to help you prepare your request.
            </p>
          </motion.div>

          <motion.div variants={animationVariants} className="mt-10 space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;

              return (
                <div
                  key={faq.question}
                  className={`overflow-hidden rounded-2xl border transition-colors ${
                    isOpen
                      ? "border-primary/30 bg-primary/[0.025]"
                      : "border-border bg-card"
                  }`}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                  >
                    <span className="flex items-start gap-3">
                      <span className="mt-0.5 text-xs font-semibold text-primary">
                        0{index + 1}
                      </span>
                      <span className="font-semibold leading-6">
                        {faq.question}
                      </span>
                    </span>

                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-muted-foreground transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-primary" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 pl-12 text-sm leading-7 text-muted-foreground sm:px-6 sm:pl-[3.75rem]">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      </section>

      {/* FINAL CTA */}
      <section className="px-5 pb-16 sm:px-8 lg:px-10 lg:pb-24">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-violet-500/10 px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16"
        >
          <div
            aria-hidden="true"
            className="absolute -right-16 -top-28 h-72 w-72 rounded-full bg-primary/20 blur-[90px]"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-36 left-1/3 h-64 w-64 rounded-full bg-violet-500/10 blur-[80px]"
          />

          <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                <Send size={22} />
              </div>

              <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
                Better deliveries start
                <br className="hidden sm:block" /> with better conversations.
              </h2>

              <p className="mt-4 max-w-xl leading-7 text-muted-foreground">
                Discover how SwiftDrop brings shipment workflows, delivery
                operations, and team coordination together.
              </p>
            </div>

            <Link
              href="/register"
              className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              Get started
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
