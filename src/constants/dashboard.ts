import {
  Bike,
  Bot,
  ClipboardList,
  CreditCard,
  LayoutDashboard,
  Package,
  Settings,
  Truck,
  UserRound,
  Users,
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
      href: "/merchant/track-shipment",
      icon: Truck,
    },
    {
      title: "AI-Support-Chat",
      href: "/merchant/ai-support",
      icon: Bot,
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
      title: "Shipments",
      href: "/rider/shipments",
      icon: Package,
    },
    // {
    //   title: "Active Delivery",
    //   href: "/rider/deliveries/active",
    //   icon: Bike,
    // },

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
    href: "#settings",
    icon: Settings,
  },
];
