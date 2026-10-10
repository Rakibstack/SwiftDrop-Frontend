import { ArrowRight, PackageCheck, Sparkles } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CTA = () => {
  return (
    <section className="relative overflow-hidden border-t border-border bg-foreground py-24 text-background sm:py-32">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-1/2 size-96 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -right-32 top-0 size-96 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04]">
          <div className="grid items-center gap-12 px-6 py-12 sm:px-10 sm:py-16 lg:grid-cols-[1fr_auto] lg:px-14 lg:py-20">
            {/* Content */}
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-background/60">
                <Sparkles className="size-3.5 text-primary" />
                Built for modern delivery operations
              </div>

              <h2 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.05] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
                Ready to move your
                <br />
                <span className="text-primary">deliveries forward?</span>
              </h2>

              <p className="mt-6 max-w-2xl text-base leading-7 text-background/60 sm:text-lg sm:leading-8">
                Create shipments, manage payments, coordinate riders, and track
                every delivery from one connected logistics platform.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/register"
                  className={cn(
                    buttonVariants(),
                    "group h-12 rounded-xl px-6 font-semibold shadow-lg shadow-primary/20",
                  )}
                >
                  Start Shipping
                  <ArrowRight className="ml-2 size-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/tracking"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "h-12 rounded-xl border-white/15 bg-transparent px-6 font-semibold text-background hover:bg-white/10 hover:text-background",
                  )}
                >
                  Track a Shipment
                </Link>
              </div>
            </div>

            {/* Product Signal */}
            <div className="relative hidden lg:block">
              <div className="flex size-32 items-center justify-center rounded-[2rem] border border-white/10 bg-white/[0.05] shadow-2xl">
                <div className="flex size-20 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/25">
                  <PackageCheck className="size-9" strokeWidth={1.8} />
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 flex items-center gap-2 rounded-xl border border-white/10 bg-background/10 px-3 py-2 backdrop-blur-md">
                <span className="size-2 rounded-full bg-primary" />

                <span className="text-[10px] font-semibold text-background/70">
                  Operations connected
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
