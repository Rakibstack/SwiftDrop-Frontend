import type React from "react";
import { RoleGuard } from "@/components/auth/role-guard";
import DashboardShell from "@/components/dashboard/DashboardShell";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard roles={["RIDER"]}>
      <DashboardShell>{children}</DashboardShell>
    </RoleGuard>
  );
}
