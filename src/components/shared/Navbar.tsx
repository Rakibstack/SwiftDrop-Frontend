"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ArrowUpRight,
  Bell,
  ChevronDown,
  CircleHelp,
  CreditCard,
  LayoutDashboard,
  Loader2,
  LogOut,
  MapPin,
  Menu,
  Package,
  Settings,
  Truck,
  UserRound,
  X,
} from "lucide-react";

import Logo from "@/components/shared/Logo";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useCurrentUser, useLogout } from "@/hooks";
import { UserProfile } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";

const solutions = [
  {
    title: "Shipment Management",
    description: "Create and manage deliveries with ease.",
    href: "#solutions",
    icon: Package,
  },
  {
    title: "Rider Operations",
    description: "Manage assignments and delivery flow.",
    href: "#operations",
    icon: Truck,
  },
  {
    title: "Real-time Tracking",
    description: "Follow shipments from pickup to delivery.",
    href: "#tracking",
    icon: MapPin,
  },
  {
    title: "Secure Payments",
    description: "Reliable payment and transaction handling.",
    href: "#solutions",
    icon: CreditCard,
  },
];

const resources = [
  {
    title: "How It Works",
    href: "#how-it-works",
    icon: CircleHelp,
  },
  {
    title: "Track Shipment",
    href: "#tracking",
    icon: MapPin,
  },
];

const formatRole = (role: UserProfile["role"]) => {
  return role.charAt(0) + role.slice(1).toLowerCase();
};

const getDashboardRoute = (role: UserProfile["role"]) => {
  switch (role) {
    case "MERCHANT":
      return "/merchant/dashboard";

    case "RIDER":
      return "/rider/dashboard";

    case "ADMIN":
      return "/admin/dashboard";

    default:
      return "/";
  }
};

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const { data, isLoading } = useCurrentUser();

  const currentUser = data?.data;
  const isAuthenticated = !!currentUser;

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          <SolutionsMenu />

          <Link
            href="#how-it-works"
            className="flex h-10 items-center rounded-lg px-4 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            How It Works
          </Link>

          <ResourcesMenu />

          <Link
            href="/tracking"
            className="flex h-10 items-center rounded-lg px-4 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            Track Shipment
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-2 lg:flex">
          {isLoading ? (
            <NavbarActionsSkeleton />
          ) : isAuthenticated && currentUser ? (
            <AuthenticatedActions user={currentUser} />
          ) : (
            <GuestActions />
          )}
        </div>

        {/* Mobile Toggle */}
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="size-10 rounded-xl lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((previous) => !previous)}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <MobileNavigation
          user={currentUser}
          isLoading={isLoading}
          onClose={() => setMobileOpen(false)}
        />
      )}
    </header>
  );
};

const NavbarActionsSkeleton = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="size-10 animate-pulse rounded-full bg-secondary" />

      <div className="h-10 w-24 animate-pulse rounded-xl bg-secondary" />
    </div>
  );
};

const GuestActions = () => {
  return (
    <>
      <Link
        href="/login"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "h-10 px-4 text-sm font-semibold",
        )}
      >
        Login
      </Link>

      <Link
        href="/register"
        className={cn(
          buttonVariants({ variant: "default" }),
          "group h-10 rounded-lg px-4 text-sm font-semibold shadow-sm",
        )}
      >
        Get Started
        <ArrowUpRight className="ml-1.5 size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </Link>
    </>
  );
};

const SolutionsMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            className="h-10 gap-1.5 px-4 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
          />
        }
      >
        Solutions
        <ChevronDown className="size-3.5 opacity-60" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="center"
        sideOffset={10}
        className="w-[390px] rounded-2xl border-border/70 bg-background/95 p-2 shadow-xl backdrop-blur-xl"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            SwiftDrop Platform
          </DropdownMenuLabel>

          {solutions.map((item) => {
            const Icon = item.icon;

            return (
              <DropdownMenuItem
                key={item.title}
                render={<Link href={item.href} />}
                className="group rounded-xl px-3 py-3 focus:bg-secondary"
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-4" />
                </div>

                <div className="ml-2 flex flex-col gap-0.5">
                  <span className="text-sm font-semibold text-foreground">
                    {item.title}
                  </span>

                  <span className="text-xs leading-5 text-muted-foreground">
                    {item.description}
                  </span>
                </div>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ResourcesMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            className="h-10 gap-1.5 px-4 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
          />
        }
      >
        Resources
        <ChevronDown className="size-3.5 opacity-60" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="center"
        sideOffset={10}
        className="w-60 rounded-2xl border-border/70 bg-background/95 p-2 shadow-xl backdrop-blur-xl"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Explore
          </DropdownMenuLabel>

          {resources.map((item) => {
            const Icon = item.icon;

            return (
              <DropdownMenuItem
                key={item.title}
                render={<Link href={item.href} />}
                className="rounded-xl px-3 py-2.5 focus:bg-secondary"
              >
                <Icon className="size-4 text-muted-foreground" />

                <span className="ml-2 font-medium">{item.title}</span>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

/* -------------------------------------------------------------------------- */
/* Authenticated Actions */
/* -------------------------------------------------------------------------- */

interface AuthenticatedActionsProps {
  user: UserProfile;
}

const AuthenticatedActions = ({ user }: AuthenticatedActionsProps) => {
  const router = useRouter();

  const { mutate: logout, isPending: isLoggingOut } = useLogout();
  const queryClient = useQueryClient();

  // const initials = getUserInitials(user.name);
  const role = formatRole(user.role);
  const dashboardRoute = getDashboardRoute(user.role);

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.success("Logged out successfully.");
        queryClient.removeQueries({ queryKey: ["current-user"] });

        router.push("/login");
        router.refresh();
      },

      onError: (error: any) => {
        toast.error(error.message || "Failed to logout.");
      },
    });
  };

  return (
    <div className="flex items-center gap-2">
      {/* Notification */}
      <Button
        variant="ghost"
        size="icon"
        className="relative size-10 rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground"
        aria-label="Notifications"
      >
        <Bell className="size-[18px]" />

        <span className="absolute right-2 top-2 size-1.5 rounded-full bg-primary ring-2 ring-background" />
      </Button>

      {/* User Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="ghost"
              className="h-11 gap-2 rounded-xl px-2.5 hover:bg-secondary"
            />
          }
        >
          <span className="flex size-8 items-center justify-center overflow-hidden rounded-full bg-secondary">
            {user.imageUrl ? (
              <Image
                src={user.imageUrl}
                alt={user.name}
                width={32}
                height={32}
                className="size-full object-cover"
              />
            ) : (
              <UserRound className="size-4 text-muted-foreground" />
            )}
          </span>

          <span className="hidden text-left xl:block">
            <span className="block max-w-28 truncate text-sm font-semibold leading-4">
              {user.name}
            </span>

            <span className="block text-[11px] text-muted-foreground">
              {role}
            </span>
          </span>

          <ChevronDown className="ml-0.5 size-3.5 text-muted-foreground" />
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          sideOffset={10}
          className="w-64 rounded-2xl border-border/70 bg-background/95 p-2 shadow-xl backdrop-blur-xl"
        >
          <DropdownMenuGroup>
            {/* User Information */}
            <DropdownMenuLabel className="px-3 py-3">
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-secondary">
                  {user.imageUrl ? (
                    <Image
                      width={40}
                      height={40}
                      src={user.imageUrl}
                      alt={user.name}
                      className="size-full object-cover"
                    />
                  ) : (
                    <UserRound className="size-5 text-muted-foreground" />
                  )}
                </span>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {user.name}
                  </p>

                  <p className="truncate text-xs font-normal text-muted-foreground">
                    {user.email}
                  </p>

                  <span className="mt-1 inline-flex rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                    {role}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>

            {/* Dashboard */}
            <DropdownMenuItem
              render={<Link href={dashboardRoute} />}
              className="rounded-xl px-3 py-2.5"
            >
              <LayoutDashboard className="size-4" />
              Dashboard
            </DropdownMenuItem>

            {/* Role specific link */}
            {user.role === "MERCHANT" && (
              <DropdownMenuItem
                render={<Link href="/merchant/shipments" />}
                className="rounded-xl px-3 py-2.5"
              >
                <Package className="size-4" />
                My Shipments
              </DropdownMenuItem>
            )}

            {user.role === "RIDER" && (
              <DropdownMenuItem
                render={<Link href="/rider/deliveries" />}
                className="rounded-xl px-3 py-2.5"
              >
                <Truck className="size-4" />
                My Deliveries
              </DropdownMenuItem>
            )}

            {user.role === "ADMIN" && (
              <DropdownMenuItem
                render={<Link href="/admin/shipments" />}
                className="rounded-xl px-3 py-2.5"
              >
                <Package className="size-4" />
                Shipments
              </DropdownMenuItem>
            )}

            {/* Common */}
            <DropdownMenuItem
              render={<Link href="/profile" />}
              className="rounded-xl px-3 py-2.5"
            >
              <UserRound className="size-4" />
              Profile
            </DropdownMenuItem>

            <DropdownMenuItem
              render={<Link href="#settings" />}
              className="rounded-xl px-3 py-2.5"
            >
              <Settings className="size-4" />
              Settings
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          {/* Logout */}
          <DropdownMenuGroup>
            <DropdownMenuItem
              disabled={isLoggingOut}
              onClick={handleLogout}
              className="rounded-xl px-3 py-2.5 text-destructive focus:text-destructive"
            >
              {isLoggingOut ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <LogOut className="size-4" />
              )}

              {isLoggingOut ? "Logging out..." : "Logout"}
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Mobile Navigation */
/* -------------------------------------------------------------------------- */

interface MobileNavigationProps {
  user?: UserProfile;
  isLoading: boolean;
  onClose: () => void;
}

const MobileNavigation = ({
  user,
  isLoading,
  onClose,
}: MobileNavigationProps) => {
  const isAuthenticated = !!user;

  return (
    <div className="border-t border-border/60 bg-background lg:hidden">
      <div className="mx-auto max-w-7xl px-5 py-5 sm:px-6">
        <nav className="flex flex-col gap-1">
          <MobileLink href="#solutions" label="Solutions" onClick={onClose} />

          <MobileLink
            href="#how-it-works"
            label="How It Works"
            onClick={onClose}
          />

          <MobileLink
            href="/tracking"
            label="Track Shipment"
            onClick={onClose}
          />

          <MobileLink
            href="#operations"
            label="For Merchants"
            onClick={onClose}
          />
        </nav>

        <div className="mt-5 border-t border-border/60 pt-5">
          {isLoading ? (
            <div className="h-11 w-full animate-pulse rounded-xl bg-secondary" />
          ) : isAuthenticated && user ? (
            <div className="space-y-2">
              <div className="flex items-center gap-3 rounded-xl border border-border bg-secondary/40 p-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {getUserInitials(user.name)}
                </span>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{user.name}</p>

                  <p className="text-xs text-muted-foreground">
                    {formatRole(user.role)}
                  </p>
                </div>
              </div>

              <Link
                href={getDashboardRoute(user.role)}
                onClick={onClose}
                className={cn(buttonVariants(), "w-full rounded-xl")}
              >
                Open Dashboard
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/login"
                onClick={onClose}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "rounded-xl",
                )}
              >
                Login
              </Link>

              <Link
                href="/register"
                onClick={onClose}
                className={cn(buttonVariants(), "rounded-xl")}
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Mobile Link */
/* -------------------------------------------------------------------------- */

interface MobileLinkProps {
  href: string;
  label: string;
  onClick: () => void;
}

const MobileLink = ({ href, label, onClick }: MobileLinkProps) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex h-11 items-center rounded-xl px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
    >
      {label}
    </Link>
  );
};

export default Navbar;
