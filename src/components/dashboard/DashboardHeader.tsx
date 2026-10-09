"use client";

import Image from "next/image";
import { Bell, Menu, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks";

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

const DashboardHeader = ({ onMenuClick }: DashboardHeaderProps) => {
  const { data } = useCurrentUser();

  const user = data?.data;

  return (
    <header className="sticky top-0 z-50 flex h-18 shrink-0 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur sm:px-6">
      {/* Mobile menu */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onMenuClick}
        className="mr-2 rounded-xl lg:hidden"
        aria-label="Open dashboard navigation"
      >
        <Menu className="size-5" />
      </Button>

      {/* Left */}
      <div className="hidden min-w-0 flex-1 lg:block">
        <p className="text-sm font-semibold tracking-tight">
          Welcome back{user?.name ? `, ${user.name.split(" ")[0]}` : ""}
        </p>

        <p className="mt-0.5 text-xs text-muted-foreground">
          Here&apos;s what&apos;s happening with your deliveries.
        </p>
      </div>

      {/* Right */}
      <div className="ml-auto flex items-center gap-2">
        {/* Notification */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="relative rounded-xl"
          aria-label="Notifications"
        >
          <Bell className="size-4.5" strokeWidth={1.8} />

          <span className="absolute right-2.5 top-2.5 size-1.5 rounded-full bg-primary" />
        </Button>

        {/* User */}
        <div className="ml-1 flex items-center gap-2.5 border-l border-border pl-3">
          <div className="relative size-8 overflow-hidden rounded-full bg-secondary">
            {user?.imageUrl ? (
              <Image
                src={user.imageUrl}
                alt={user.name}
                fill
                sizes="32px"
                className="object-cover"
              />
            ) : (
              <UserRound className="absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 text-muted-foreground" />
            )}
          </div>

          <div className="hidden max-w-32 sm:block">
            <p className="truncate text-xs font-semibold">{user?.name}</p>

            <p className="truncate text-[10px] text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
