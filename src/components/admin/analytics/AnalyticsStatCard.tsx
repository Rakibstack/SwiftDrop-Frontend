import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

interface AnalyticsStatCardProps {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  accent: "orange" | "blue" | "green" | "violet";
  trend?: {
    value: string;
    direction: "up" | "down";
  };
}

const accentStyles = {
  orange: {
    icon: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
    glow: "bg-orange-500/5",
  },
  blue: {
    icon: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    glow: "bg-blue-500/5",
  },
  green: {
    icon: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    glow: "bg-emerald-500/5",
  },
  violet: {
    icon: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
    glow: "bg-violet-500/5",
  },
};

export function AnalyticsStatCard({
  title,
  value,
  description,
  icon: Icon,
  accent,
  trend,
}: AnalyticsStatCardProps) {
  const styles = accentStyles[accent];

  return (
    <Card className="group relative overflow-hidden rounded-2xl border-border/70 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full blur-2xl ${styles.glow}`}
      />

      <CardContent className="relative p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>

            <p className="mt-3 break-words text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {value}
            </p>
          </div>

          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${styles.icon}`}
          >
            <Icon className="h-5 w-5" />
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-border/70 pt-4">
          {trend && (
            <span
              className={`inline-flex items-center gap-1 text-xs font-semibold ${
                trend.direction === "up"
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-rose-600 dark:text-rose-400"
              }`}
            >
              {trend.direction === "up" ? (
                <ArrowUpRight className="h-3.5 w-3.5" />
              ) : (
                <ArrowDownRight className="h-3.5 w-3.5" />
              )}
              {trend.value}
            </span>
          )}

          <span className="text-xs text-muted-foreground">{description}</span>
        </div>
      </CardContent>
    </Card>
  );
}
