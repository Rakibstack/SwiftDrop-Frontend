
"use client";

import { AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const ErrorPage = ({ error, reset }: ErrorPageProps) => {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-5 py-16">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 size-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative w-full max-w-lg text-center">
        {/* Icon */}
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl border border-destructive/20 bg-destructive/10 text-destructive">
          <AlertTriangle className="size-7" strokeWidth={1.8} />
        </div>

        {/* Content */}
        <p className="mt-7 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Something went wrong
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
          We couldn't load this page.
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
          Something unexpected happened while processing your request.
          Please try again. If the problem continues, return to the
          SwiftDrop home page.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className={cn(
              buttonVariants(),
              "h-11 rounded-xl px-5 font-semibold",
            )}
          >
            <RefreshCw className="mr-2 size-4" />
            Try again
          </button>

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
        </div>

        {/* Debug information only in development */}
        {process.env.NODE_ENV === "development" && (
          <details className="mx-auto mt-8 max-w-md rounded-xl border border-border bg-secondary/40 p-4 text-left">
            <summary className="cursor-pointer text-xs font-semibold text-muted-foreground">
              Developer error details
            </summary>

            <pre className="mt-3 overflow-auto whitespace-pre-wrap text-[11px] leading-5 text-muted-foreground">
              {error.message}
            </pre>
          </details>
        )}
      </div>
    </main>
  );
};

export default ErrorPage;