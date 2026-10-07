"use client";

import { Building2, Loader2, ShieldCheck, Truck } from "lucide-react";

import { cn } from "@/lib/utils";
export type DemoRole = "merchant" | "rider" | "admin";

interface DemoLoginCardsProps {
  onLogin: (role: DemoRole) => void;
  isPending: boolean;
  activeRole: DemoRole | null;
}

const demoAccounts = [
  {
    role: "merchant" as const,
    title: "Merchant",
    description: "Manage shipments, payments and deliveries.",
    icon: Building2,
  },
  {
    role: "rider" as const,
    title: "Rider",
    description: "Manage assigned deliveries and tracking.",
    icon: Truck,
  },
  {
    role: "admin" as const,
    title: "Admin",
    description: "Monitor operations across SwiftDrop.",
    icon: ShieldCheck,
  },
];

const DemoLoginCards = ({
  onLogin,
  isPending,
  activeRole,
}: DemoLoginCardsProps) => {
  return (
    <div className="space-y-3">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          Explore SwiftDrop
        </p>

        <p className="mt-1.5 text-sm text-muted-foreground">
          Try a role instantly with a demo account
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {demoAccounts.map((account) => {
          const Icon = account.icon;
          const isActive = activeRole === account.role;

          return (
            <button
              key={account.role}
              type="button"
              onClick={() => onLogin(account.role)}
              disabled={isPending}
              className={cn(
                "group rounded-2xl border border-border bg-card p-4 text-left",
                "transition-all duration-200",
                "hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5",
                "disabled:pointer-events-none disabled:opacity-60",
                isActive && "border-primary/50 bg-primary/[0.03]",
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-xl",
                    "bg-secondary text-muted-foreground",
                    "transition-colors duration-200",
                    "group-hover:bg-primary/10 group-hover:text-primary",
                    isActive && "bg-primary/10 text-primary",
                  )}
                >
                  {isActive ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Icon className="size-4" />
                  )}
                </div>

                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Demo
                </span>
              </div>

              <div className="mt-4">
                <p className="text-sm font-semibold tracking-tight">
                  {isActive ? `Signing in...` : `Login as ${account.title}`}
                </p>

                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  {account.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DemoLoginCards;
