"use client";

import { useMemo } from "react";
import { CalendarDays, TrendingUp } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { RevenueTrendItem } from "@/types/admin-analytics.types";

interface RevenueChartProps {
  trend: RevenueTrendItem[];
  currency?: string;
}

const numberFormatter = new Intl.NumberFormat("en-BD", {
  maximumFractionDigits: 2,
});

function formatAmount(value: number, currency: string) {
  return `${currency} ${numberFormatter.format(value)}`;
}

function formatDay(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });
}

export default function RevenueChart({
  trend,
  currency = "BDT",
}: RevenueChartProps) {
  const chartData = useMemo(
    () => [...trend].sort((a, b) => a.date.localeCompare(b.date)).slice(-7),
    [trend],
  );

  const maxRevenue = Math.max(...chartData.map((item) => item.revenue), 0);

  const hasRevenue = maxRevenue > 0;

  return (
    <Card className="rounded-2xl border-border/70 bg-card shadow-sm">
      <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0 pb-3">
        <div>
          <CardTitle className="text-base font-bold sm:text-lg">
            Revenue overview
          </CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">
            Paid transactions over the last 7 days
          </p>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400">
          <TrendingUp className="h-5 w-5" />
        </div>
      </CardHeader>

      <CardContent className="pt-4">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs text-muted-foreground">
              {hasRevenue
                ? "Highest daily revenue"
                : "Revenue in selected period"}
            </p>
            <p className="mt-1 text-xl font-bold tracking-tight">
              {formatAmount(maxRevenue, currency)}
            </p>
          </div>

          <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground">
            <CalendarDays className="h-3.5 w-3.5" />
            Last 7 days
          </span>
        </div>

        {chartData.length === 0 ? (
          <div className="flex h-48 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border text-center">
            <TrendingUp className="h-7 w-7 text-muted-foreground/60" />
            <p className="text-sm font-medium">No revenue data available</p>
            <p className="text-xs text-muted-foreground">
              Revenue data will appear here when available.
            </p>
          </div>
        ) : (
          <div
            className="grid grid-cols-7 gap-2 sm:gap-4"
            role="img"
            aria-label="Daily paid revenue for the last seven days"
          >
            {chartData.map((item) => {
              const height = hasRevenue
                ? Math.max((item.revenue / maxRevenue) * 100, 5)
                : 3;

              return (
                <div
                  key={item.date}
                  className="group flex min-w-0 flex-col items-center"
                  title={`${formatDay(item.date)}: ${formatAmount(item.revenue, currency)}`}
                >
                  <div className="flex h-40 w-full items-end justify-center overflow-hidden rounded-t-lg bg-muted/50 px-1 sm:h-48 sm:px-2">
                    <div
                      className={`w-full max-w-10 rounded-t-md transition-all duration-500 ${
                        item.revenue > 0
                          ? "bg-gradient-to-t from-orange-600 to-orange-400 group-hover:from-orange-500 group-hover:to-amber-400"
                          : "bg-orange-500/20"
                      }`}
                      style={{ height: `${height}%` }}
                    />
                  </div>

                  <p className="mt-3 text-[10px] font-medium text-muted-foreground sm:text-xs">
                    {formatDay(item.date)}
                  </p>

                  <p className="mt-1 max-w-full truncate text-[10px] font-semibold text-foreground sm:text-xs">
                    {numberFormatter.format(item.revenue)}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-5 flex items-center gap-2 border-t border-border/70 pt-4">
          <span className="h-2.5 w-2.5 rounded-sm bg-orange-500" />
          <span className="text-xs text-muted-foreground">
            Paid payment amount per day
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
