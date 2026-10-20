
"use client";

import ReactMarkdown from "react-markdown";
import {
  AlertCircle,
  BrainCircuit,
  CheckCircle2,
  RefreshCw,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAIInsights } from "@/hooks/ai-insights.hooks";

export function AIInsightsCard() {
  const {
    data: response,
    isPending,
    isError,
    refetch,
    isFetching,
  } = useAIInsights();

  if (isPending) {
    return (
      <section className="rounded-2xl border bg-card p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-xl bg-primary/10 p-3 text-primary">
            <BrainCircuit className="size-5" />
          </div>
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-3 w-64 max-w-full" />
          </div>
        </div>

        <div className="space-y-3">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>
      </section>
    );
  }

  if (isError || !response?.data) {
    return (
      <section className="rounded-2xl border border-destructive/20 bg-card p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="mt-1 size-5 text-destructive" />
          <div className="flex-1">
            <h2 className="font-semibold">AI insights unavailable</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              We couldn&apos;t generate the latest logistics insights.
              Please try again.
            </p>
            <Button
              className="mt-4"
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              disabled={isFetching}
            >
              <RefreshCw className="mr-2 size-4" />
              Retry
            </Button>
          </div>
        </div>
      </section>
    );
  }

  const { insights, generatedAt, metrics } = response.data;

  return (
    <section className="overflow-hidden rounded-2xl border bg-card shadow-sm">
      <div className="flex flex-col gap-4 border-b p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-primary/10 p-3 text-primary">
            <BrainCircuit className="size-5" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-semibold tracking-tight">
                AI Logistics Insights
              </h2>
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                <Sparkles className="size-3" />
                Gemini AI
              </span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Operational observations and recommended actions
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          disabled={isFetching}
        >
          <RefreshCw
            className={`mr-2 size-4 ${isFetching ? "animate-spin" : ""}`}
          />
          Refresh insights
        </Button>
      </div>

      <div className="grid gap-3 border-b p-5 sm:grid-cols-3 sm:p-6">
        <Metric
          label="Total revenue"
          value={metrics.revenue.totalPaidAmount.toLocaleString()}
          detail={`${metrics.revenue.totalPaidTransactions} paid transactions`}
        />
        <Metric
          label="Cancellation rate"
          value={`${metrics.calculatedMetrics.cancellationRatePercent}%`}
          detail={`${metrics.overview.cancelledShipments} cancelled shipments`}
        />
        <Metric
          label="Payment pending"
          value={`${metrics.calculatedMetrics.paymentPendingSharePercent}%`}
          detail={`${metrics.overview.pendingShipments} shipments awaiting payment`}
        />
      </div>

      <div className="p-5 sm:p-6">
        <article className="prose prose-sm max-w-none break-words dark:prose-invert prose-headings:font-semibold prose-h3:text-base prose-li:my-1 prose-p:leading-7">
          <ReactMarkdown>{insights}</ReactMarkdown>
        </article>
      </div>

      <div className="flex flex-col gap-2 border-t bg-muted/30 px-5 py-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <span className="flex items-center gap-2">
          <CheckCircle2 className="size-4" />
          Based on current platform analytics
        </span>
        <span>
          Generated{" "}
          {new Date(generatedAt).toLocaleString()}
        </span>
      </div>
    </section>
  );
}

function Metric({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-xl border bg-background p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
    </div>
  );
}
