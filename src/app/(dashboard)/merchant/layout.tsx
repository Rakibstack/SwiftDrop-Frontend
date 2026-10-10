import { RoleGuard } from "@/components/auth/role-guard";
import DashboardShell from "@/components/dashboard/DashboardShell";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard roles={["MERCHANT"]}>
      <DashboardShell>{children}</DashboardShell>
    </RoleGuard>
  );
}
