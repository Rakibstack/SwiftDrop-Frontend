import { ArrowLeft, ArrowRight, LockKeyhole } from "lucide-react";
import Link from "next/link";

import Logo from "@/components/shared/Logo";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ForbiddenPage = () => {
  return (
    <main className="min-h-screen bg-background">
      <div className="relative flex min-h-screen flex-col overflow-hidden">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 size-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />

          <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(to_right,#171411_1px,transparent_1px),linear-gradient(to_bottom,#171411_1px,transparent_1px)] [background-size:56px_56px]" />
        </div>

        {/* Header */}
        <header className="relative z-10 px-5 py-6 sm:px-8 lg:px-12">
          <Logo />
        </header>

        {/* Content */}
        <section className="relative z-10 flex flex-1 items-center justify-center px-5 py-16">
          <div className="w-full max-w-xl text-center">
            {/* Icon */}
            <div className="mx-auto flex size-20 items-center justify-center rounded-[24px] border border-border bg-card shadow-xl shadow-black/5">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <LockKeyhole className="size-6" strokeWidth={1.8} />
              </div>
            </div>

            {/* Status */}
            <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Access restricted
            </p>

            {/* Heading */}
            <h1 className="mt-4 text-5xl font-bold tracking-[-0.055em] sm:text-6xl">
              403
            </h1>

            <h2 className="mt-3 text-2xl font-bold tracking-[-0.035em] sm:text-3xl">
              You don&apos;t have access here.
            </h2>

            <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
              This workspace is restricted to authorized users. Your current
              account doesn&apos;t have the required permissions to access this
              area.
            </p>

            {/* Actions */}
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "h-11 rounded-xl px-5 font-semibold",
                )}
              >
                <ArrowLeft className="mr-2 size-4" />
                Back to home
              </Link>

              <Link
                href="/login"
                className={cn(
                  buttonVariants(),
                  "h-11 rounded-xl px-5 font-semibold shadow-lg shadow-primary/15",
                )}
              >
                Switch account
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </div>

            {/* Small hint */}
            <div className="mx-auto mt-10 max-w-md rounded-2xl border border-border bg-card/70 px-5 py-4 text-left">
              <p className="text-xs font-semibold">
                Need access to this workspace?
              </p>

              <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
                Make sure you&apos;re signed in with an account that has the
                required role and permissions.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-10 px-5 py-6 text-center sm:px-8">
          <p className="text-[11px] text-muted-foreground">
            © {new Date().getFullYear()} SwiftDrop. Built for better deliveries.
          </p>
        </footer>
      </div>
    </main>
  );
};

export default ForbiddenPage;
