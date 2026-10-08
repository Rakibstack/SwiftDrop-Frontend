import { RoleGuard } from "@/components/auth/role-guard";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return <RoleGuard roles={["ADMIN"]}>{children}</RoleGuard>;
}
