import { ArrowRight, Bike, Clock3, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";
import RiderApplicationForm from "@/components/form/RiderApplicationForm";
import Logo from "@/components/shared/Logo";

export default function ApplyAsRiderPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="grid min-h-screen lg:grid-cols-[0.85fr_1.15fr]">
        {/* Left panel */}
        <section className="relative hidden overflow-hidden bg-foreground lg:flex">
          <div className="absolute inset-0">
            <div className="absolute -left-32 -top-32 size-96 rounded-full bg-primary/20 blur-3xl" />

            <div className="absolute -bottom-32 -right-32 size-96 rounded-full bg-primary/10 blur-3xl" />

            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />
          </div>

          <div className="relative z-10 flex w-full flex-col p-10 xl:p-14">
            <Logo />

            <div className="my-auto max-w-xl">
              <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-xl shadow-primary/20">
                <Bike className="size-7" />
              </div>

              <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
                Become a SwiftDrop Rider
              </p>

              <h1 className="mt-4 text-4xl font-bold leading-[1.08] tracking-tight text-background xl:text-5xl">
                Deliver more.
                <br />
                Earn on your own terms.
              </h1>

              <p className="mt-6 max-w-lg text-base leading-7 text-background/60">
                Join SwiftDrop&apos;s delivery network and help businesses move
                packages faster across the city.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-background/10 bg-background/5 p-5 backdrop-blur-sm">
                  <Truck className="size-5 text-primary" />

                  <p className="mt-4 text-sm font-semibold text-background">
                    Flexible deliveries
                  </p>

                  <p className="mt-1 text-xs leading-5 text-background/50">
                    Manage your delivery workload around your availability.
                  </p>
                </div>

                <div className="rounded-2xl border border-background/10 bg-background/5 p-5 backdrop-blur-sm">
                  <ShieldCheck className="size-5 text-primary" />

                  <p className="mt-4 text-sm font-semibold text-background">
                    Trusted platform
                  </p>

                  <p className="mt-1 text-xs leading-5 text-background/50">
                    Work through a secure logistics platform built for modern
                    delivery operations.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 text-xs text-background/50">
                <Clock3 className="size-4" />
                <span>Application review starts after email verification.</span>
              </div>
            </div>

            <p className="text-xs text-background/30">
              © {new Date().getFullYear()} SwiftDrop. All rights reserved.
            </p>
          </div>
        </section>

        {/* Form panel */}
        <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:px-12 xl:px-20">
          <div className="w-full max-w-xl">
            {/* Mobile logo */}
            <div className="mb-10 lg:hidden">
              <Logo />
            </div>

            {/* Header */}
            <div className="mb-8">
              <div className="mb-4 inline-flex items-center rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary">
                Rider application
              </div>

              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Apply as a rider
              </h2>

              <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">
                Tell us a little about yourself and your vehicle. We&apos;ll
                verify your email before reviewing your application.
              </p>
            </div>

            <RiderApplicationForm />

            <div className="mt-8 flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
              Already have a rider account?
              <Link
                href="/login"
                className="inline-flex items-center gap-1 font-medium text-foreground transition-colors hover:text-primary"
              >
                Sign in
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
