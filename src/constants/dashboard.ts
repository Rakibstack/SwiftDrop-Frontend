
import {
  Bike,
  ClipboardList,
  CreditCard,
  LayoutDashboard,
  Package,
  Settings,
  ShieldCheck,
  Truck,
  UserRound,
  Users,
  WalletCards,
} from "lucide-react";

import type { UserRole } from "@/types";

export interface DashboardNavItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

export const dashboardNavigation: Record<UserRole, DashboardNavItem[]> = {
  MERCHANT: [
    {
      title: "Overview",
      href: "/merchant/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Shipments",
      href: "/merchant/shipments",
      icon: Package,
    },
    {
      title: "Create Shipment",
      href: "/merchant/shipments/create",
      icon: ClipboardList,
    },
    {
      title: "Tracking",
      href: "/merchant/tracking",
      icon: Truck,
    },
    {
      title: "Payments",
      href: "/merchant/payments",
      icon: CreditCard,
    },
  ],

  RIDER: [
    {
      title: "Overview",
      href: "/rider/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Deliveries",
      href: "/rider/deliveries",
      icon: Package,
    },
    {
      title: "Active Delivery",
      href: "/rider/deliveries/active",
      icon: Bike,
    },
    {
      title: "Delivery History",
      href: "/rider/deliveries/history",
      icon: ClipboardList,
    },
    {
      title: "Earnings",
      href: "/rider/earnings",
      icon: WalletCards,
    },
  ],

  ADMIN: [
    {
      title: "Overview",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Shipments",
      href: "/admin/shipments",
      icon: Package,
    },
    {
      title: "Riders",
      href: "/admin/riders",
      icon: Bike,
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: Users,
    },
    {
      title: "Payments",
      href: "/admin/payments",
      icon: CreditCard,
    },
    {
      title: "Audit Logs",
      href: "/admin/audit-logs",
      icon: ShieldCheck,
    },
  ],
};

export const commonDashboardNavigation = [
  {
    title: "Profile",
    href: "/profile",
    icon: UserRound,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];