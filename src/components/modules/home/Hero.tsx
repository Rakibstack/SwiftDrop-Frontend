"use client";

import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Truck,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Hero = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute -right-40 -top-40 size-[500px] rounded-full bg-primary/8 blur-3xl"
        />
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          className="absolute -left-40 bottom-0 size-[400px] rounded-full bg-primary/8 blur-3xl"
        />
      </div>

      <div className="mx-auto grid min-h-[calc(100vh-76px)] max-w-7xl items-center gap-14 px-5 py-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20 lg:px-8 lg:py-20">
        {/* ---------------------------------------------------------------- */}
        {/* Left Content */}
        {/* ---------------------------------------------------------------- */}

        <div className="max-w-2xl">
          {/* Eyebrow */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground shadow-sm backdrop-blur"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/50" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            Modern logistics platform
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.1,
              ease: [0.25, 0.4, 0.25, 1],
            }}
            className="max-w-2xl text-5xl font-bold leading-[1.02] tracking-[-0.05em] sm:text-6xl lg:text-7xl"
          >
            Ship smarter.
            <br />
            <span className="text-primary">Deliver faster.</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: [0.25, 0.4, 0.25, 1],
            }}
            className="mt-7 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8"
          >
            Everything you need to manage modern deliveries — from shipment
            creation and secure payments to rider operations and real-time
            tracking.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.3,
              ease: [0.25, 0.4, 0.25, 1],
            }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Link
              href="/register"
              className={cn(
                buttonVariants(),
                "group h-12 rounded-xl px-6 text-sm font-semibold shadow-lg shadow-primary/15 transition-all duration-300 hover:shadow-xl hover:shadow-primary/20",
              )}
            >
              Start Shipping
              <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/tracking"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-12 rounded-xl border-border bg-background px-6 text-sm font-semibold transition-all duration-300 hover:border-primary/20",
              )}
            >
              Track a Shipment
            </Link>
          </motion.div>

          {/* Trust points */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.4,
              ease: [0.25, 0.4, 0.25, 1],
            }}
            className="mt-9 flex flex-wrap gap-x-6 gap-y-3"
          >
            <TrustPoint icon={ShieldCheck} text="Secure payments" />

            <TrustPoint icon={Truck} text="Reliable delivery" />

            <TrustPoint icon={Zap} text="Real-time operations" />
          </motion.div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Right Visual */}
        {/* ---------------------------------------------------------------- */}

        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.7,
            delay: 0.3,
            ease: [0.25, 0.4, 0.25, 1],
          }}
          className="relative mx-auto w-full max-w-[620px]"
        >
          {/* Image glow */}
          <div className="absolute -inset-6 rounded-[3rem] bg-primary/10 blur-3xl" />

          {/* Main image container */}
          <div className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-secondary shadow-2xl shadow-black/10">
            <Image
              src="/hero1.jpg"
              alt="SwiftDrop delivery and logistics"
              width={500}
              height={500}
              priority
              className="h-auto w-full object-cover"
            />

            {/* Soft overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* Floating Status Card */}
          {/* ---------------------------------------------------------------- */}

          <motion.div
            initial={
              prefersReducedMotion ? {} : { opacity: 0, y: 20, scale: 0.9 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.6,
              ease: [0.25, 0.4, 0.25, 1],
            }}
            className="absolute -bottom-6 -left-4 hidden rounded-2xl border border-border/70 bg-background/95 p-3 shadow-xl backdrop-blur-md sm:block md:-left-6"
          >
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <CheckCircle2 className="size-5" />
              </div>

              <div>
                <p className="text-xs font-bold">Delivery made simple</p>

                <p className="mt-0.5 text-[10px] text-muted-foreground">
                  From pickup to doorstep
                </p>
              </div>
            </div>
          </motion.div>

          {/* ---------------------------------------------------------------- */}
          {/* Floating Live Card */}
          {/* ---------------------------------------------------------------- */}

          <motion.div
            initial={
              prefersReducedMotion ? {} : { opacity: 0, y: -20, scale: 0.9 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.7,
              ease: [0.25, 0.4, 0.25, 1],
            }}
            className="absolute -right-3 top-8 hidden rounded-2xl border border-border/70 bg-background/95 px-4 py-3 shadow-xl backdrop-blur-md sm:block md:-right-5"
          >
            <div className="flex items-center gap-3">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/50" />
                <span className="absolute inline-flex size-2.5 rounded-full bg-primary" />
              </span>

              <div>
                <p className="text-xs font-semibold">Operations are live</p>

                <p className="text-[10px] text-muted-foreground">
                  Track every delivery
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

interface TrustPointProps {
  icon: React.ElementType;
  text: string;
}

const TrustPoint = ({ icon: Icon, text }: TrustPointProps) => {
  return (
    <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
      <Icon className="size-4 text-primary" />
      {text}
    </div>
  );
};

export default Hero;
