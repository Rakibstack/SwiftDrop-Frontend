"use client";

import {
  ArrowUpRight,
  ChevronRight,
  LogOut,
  Package,
  Sparkles,
  UserRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

import Logo from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import {
  commonDashboardNavigation,
  dashboardNavigation,
} from "@/constants/dashboard";
import { useCurrentUser, useLogout } from "@/hooks";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/types";

interface DashboardSidebarProps {
  onNavigate?: () => void;
}

const roleConfig: Record<UserRole, { label: string; description: string }> = {
  MERCHANT: {
    label: "Merchant",
    description: "Business workspace",
  },
  RIDER: {
    label: "Delivery partner",
    description: "Rider workspace",
  },
  ADMIN: {
    label: "Administrator",
    description: "Platform management",
  },
};

const DashboardSidebar = ({ onNavigate }: DashboardSidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const { data } = useCurrentUser();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  const user = data?.data;

  const isActive = (href: string) => {
    if (pathname === href) return true;

    // Prevent Overview from remaining active on every nested route.
    if (href.endsWith("/dashboard") && pathname.startsWith(`${href}/`)) {
      return false;
    }

    return pathname.startsWith(`${href}/`);
  };

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.success("Logged out successfully.");
        onNavigate?.();
        router.replace("/login");
        router.refresh();
      },
      onError: (error) => {
        toast.error(error.message || "Failed to log out. Please try again.");
      },
    });
  };

  if (!user) return null;

  const navigation = dashboardNavigation[user.role];
  const accountNavigation = commonDashboardNavigation;
  const config = roleConfig[user.role];

  return (
    <aside className="relative flex h-full w-full flex-col overflow-hidden bg-sidebar text-sidebar-foreground">
      {/* Subtle brand glow */}
      <div className="pointer-events-none absolute -right-24 top-24 size-52 rounded-full bg-primary/[0.08] blur-[80px]" />

      {/* Brand */}
      <div className="relative flex h-[76px] shrink-0 items-center border-b border-sidebar-border px-6">
        <Logo />
      </div>

      {/* Workspace identity */}
      <div className="relative px-4 pb-5 pt-5">
        <div className="flex items-center gap-3 rounded-2xl border border-sidebar-border bg-sidebar-accent/30 p-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
            <Package className="size-[19px]" strokeWidth={1.8} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-semibold tracking-[-0.02em] text-sidebar-foreground">
              SwiftDrop
            </p>
            <p className="mt-1 truncate text-[11px] text-muted-foreground">
              {config.description}
            </p>
          </div>

          <Sparkles className="size-4 shrink-0 text-primary/80" />
        </div>

        <div className="mt-5 flex items-center justify-between px-1">
          <span className="text-[10px] font-semibold uppercase tracking-[0.17em] text-muted-foreground">
            Your workspace
          </span>

          <span className="rounded-md border border-primary/30 bg-primary/15 px-2 py-1 text-[9px] font-semibold text-primary">
            {config.label}
          </span>
        </div>
      </div>

      {/* Main navigation */}
      <nav
        aria-label="Dashboard navigation"
        className="relative flex-1 overflow-y-auto px-3 pb-4"
      >
        <div className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group relative flex min-h-11 items-center gap-3 rounded-xl px-3.5 text-[13px] transition-all duration-200",
                  active
                    ? "bg-sidebar-primary/15 font-semibold text-sidebar-primary"
                    : "font-medium text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground",
                )}
              >
                {/* Active indicator */}
                {active && (
                  <span className="absolute bottom-2.5 left-0 top-2.5 w-[3px] rounded-r-full bg-sidebar-primary" />
                )}

                <Icon
                  className={cn(
                    "size-[18px] shrink-0 transition-colors",
                    active
                      ? "text-sidebar-primary"
                      : "text-muted-foreground group-hover:text-sidebar-foreground",
                  )}
                  strokeWidth={1.8}
                />

                <span className="min-w-0 flex-1">{item.title}</span>

                {active && (
                  <ChevronRight className="size-3.5 text-sidebar-primary/80" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="my-6 flex items-center gap-3 px-3">
          <div className="h-px flex-1 bg-sidebar-border" />
          <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Preferences
          </span>
          <div className="h-px flex-1 bg-sidebar-border" />
        </div>

        <div className="space-y-1">
          {accountNavigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group flex min-h-10 items-center gap-3 rounded-xl px-3.5 text-[13px] transition-colors",
                  active
                    ? "bg-sidebar-accent font-semibold text-sidebar-foreground"
                    : "font-medium text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )}
              >
                <Icon
                  className="size-[17px] shrink-0 text-muted-foreground group-hover:text-sidebar-foreground"
                  strokeWidth={1.8}
                />
                <span className="flex-1">{item.title}</span>
                <ArrowUpRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-60" />
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom profile and logout */}
      <div className="relative shrink-0 border-t border-sidebar-border p-3">
        <div className="mb-2 flex items-center gap-3 rounded-xl px-2.5 py-3">
          <div className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-muted">
            {user.imageUrl ? (
              <Image
                src={user.imageUrl}
                alt={user.name}
                fill
                sizes="36px"
                className="object-cover"
              />
            ) : (
              <UserRound className="size-4 text-muted-foreground" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-sidebar-foreground">
              {user.name}
            </p>
            <p className="mt-1 truncate text-[10px] text-muted-foreground">
              {user.email}
            </p>
          </div>

          <span
            className="size-1.5 shrink-0 rounded-full bg-emerald-400"
            title="Account active"
          />
        </div>

        <Button
          type="button"
          variant="ghost"
          disabled={isLoggingOut}
          onClick={handleLogout}
          className="h-10 w-full justify-start gap-3 rounded-xl px-3 text-[12px] font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
        >
          <LogOut className="size-4" strokeWidth={1.8} />
          {isLoggingOut ? "Signing out..." : "Sign out"}
        </Button>

        <p className="mt-3 text-center text-[9px] tracking-wide text-muted-foreground">
          SwiftDrop · Delivering with confidence
        </p>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
