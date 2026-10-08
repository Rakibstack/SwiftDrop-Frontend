import { AuthGuard } from "@/components/auth/auth-guard";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}
