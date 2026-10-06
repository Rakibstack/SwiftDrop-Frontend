import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Truck,
  Zap,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-40 -top-40 size-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -left-40 bottom-0 size-[400px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="mx-auto grid min-h-[calc(100vh-76px)] max-w-7xl items-center gap-14 px-5 py-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20 lg:px-8 lg:py-20">
        {/* ---------------------------------------------------------------- */}
        {/* Left Content */}
        {/* ---------------------------------------------------------------- */}

        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground shadow-sm backdrop-blur">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/50" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>

            Modern logistics platform
          </div>

          {/* Heading */}
          <h1 className="max-w-2xl text-5xl font-bold leading-[1.02] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
            Ship smarter.
            <br />
            <span className="text-primary">Deliver faster.</span>
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Everything you need to manage modern deliveries — from shipment
            creation and secure payments to rider operations and real-time
            tracking.
          </p>

          {/* CTA */}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/register"
              className={cn(
                buttonVariants(),
                "group h-12 rounded-xl px-6 text-sm font-semibold shadow-lg shadow-primary/15",
              )}
            >
              Start Shipping
              <ArrowRight className="ml-2 size-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/tracking"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-12 rounded-xl border-border bg-background px-6 text-sm font-semibold",
              )}
            >
              Track a Shipment
            </Link>
          </div>

          {/* Trust points */}
          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3">
            <TrustPoint
              icon={ShieldCheck}
              text="Secure payments"
            />

            <TrustPoint
              icon={Truck}
              text="Reliable delivery"
            />

            <TrustPoint
              icon={Zap}
              text="Real-time operations"
            />
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Right Visual */}
        {/* ---------------------------------------------------------------- */}

        <div className="relative mx-auto w-full max-w-[620px]">
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

          <div className="absolute -bottom-6 -left-4 hidden rounded-2xl border border-border/70 bg-background/95 p-3 shadow-xl backdrop-blur-md sm:block md:-left-6">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <CheckCircle2 className="size-5" />
              </div>

              <div>
                <p className="text-xs font-bold">
                  Delivery made simple
                </p>

                <p className="mt-0.5 text-[10px] text-muted-foreground">
                  From pickup to doorstep
                </p>
              </div>
            </div>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* Floating Live Card */}
          {/* ---------------------------------------------------------------- */}

          <div className="absolute -right-3 top-8 hidden rounded-2xl border border-border/70 bg-background/95 px-4 py-3 shadow-xl backdrop-blur-md sm:block md:-right-5">
            <div className="flex items-center gap-3">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/50" />
                <span className="relative inline-flex size-2.5 rounded-full bg-primary" />
              </span>

              <div>
                <p className="text-xs font-semibold">
                  Operations are live
                </p>

                <p className="text-[10px] text-muted-foreground">
                  Track every delivery
                </p>
              </div>
            </div>
          </div>
        </div>
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