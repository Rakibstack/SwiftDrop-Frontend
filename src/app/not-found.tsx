
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  MapPinOff,
  PackageSearch,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Logo from "@/components/shared/Logo";

const NotFound = () => {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-5 py-16">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-1/4 size-[420px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -right-40 bottom-0 size-[420px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative w-full max-w-3xl">
        {/* Brand */}
        <div className="flex justify-center">
          <Logo />
        </div>

        {/* Main content */}
        <div className="mt-14 text-center">
          {/* 404 */}
          <div className="relative mx-auto w-fit">
            <span className="text-[8rem] font-black leading-none tracking-[-0.08em] text-secondary-foreground/10 sm:text-[11rem]">
              404
            </span>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex size-20 items-center justify-center rounded-[1.5rem] border border-border bg-background shadow-xl shadow-black/5 sm:size-24">
                <PackageSearch
                  className="size-9 text-primary sm:size-11"
                  strokeWidth={1.6}
                />
              </div>
            </div>
          </div>

          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Route not found
          </p>

          <h1 className="mt-4 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
            This shipment seems to be off route.
          </h1>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-muted-foreground sm:text-base">
            The page you're looking for doesn't exist, may have moved, or
            the address might be incorrect.
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className={cn(
                buttonVariants(),
                "group h-11 rounded-xl px-5 font-semibold",
              )}
            >
              <ArrowLeft className="mr-2 size-4 transition-transform duration-200 group-hover:-translate-x-1" />
              Back to home
            </Link>

            <Link
              href="/tracking"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "group h-11 rounded-xl px-5 font-semibold",
              )}
            >
              Track a shipment
              <ArrowRight className="ml-2 size-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Status card */}
          <div className="mx-auto mt-12 flex max-w-md items-center gap-4 rounded-2xl border border-border bg-secondary/40 p-4 text-left">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <MapPinOff className="size-5" />
            </div>

            <div>
              <p className="text-xs font-semibold">
                Can't find what you're looking for?
              </p>

              <p className="mt-1 text-[11px] leading-5 text-muted-foreground">
                Use shipment tracking or return to the SwiftDrop home page.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFound;