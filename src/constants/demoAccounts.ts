import type { DemoRole } from "@/components/form/DemoLoginCards";

export interface DemoAccount {
  email: string;
  password: string;
}

export const DEMO_ACCOUNTS: Record<DemoRole, DemoAccount> = {
  merchant: {
    email: process.env.NEXT_PUBLIC_DEMO_MERCHANT_EMAIL ?? "",
    password: process.env.NEXT_PUBLIC_DEMO_MERCHANT_PASSWORD ?? "",
  },

  rider: {
    email: process.env.NEXT_PUBLIC_DEMO_RIDER_EMAIL ?? "",
    password: process.env.NEXT_PUBLIC_DEMO_RIDER_PASSWORD ?? "",
  },

  admin: {
    email: process.env.NEXT_PUBLIC_DEMO_ADMIN_EMAIL ?? "",
    password: process.env.NEXT_PUBLIC_DEMO_ADMIN_PASSWORD ?? "",
  },
};
