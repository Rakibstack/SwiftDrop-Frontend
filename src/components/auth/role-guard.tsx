"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCurrentUser } from "@/hooks";
import type { UserRole } from "@/types";
import AuthLoading from "../shared/AuthLoading";

interface RoleGuardProps {
  children: React.ReactNode;
  roles: UserRole[];
}

export const RoleGuard = ({ children, roles }: RoleGuardProps) => {
  const router = useRouter();

  const { data, isPending, isError } = useCurrentUser();
  const user = data?.data;


  useEffect(() => {
    if (isPending) {
      return;
    }

    if (isError || !user) {
      router.replace("/login");
      return;
    }

    if (!roles.includes(user.role)) {
      router.replace("/forbidden");
    }
  }, [isError, isPending, roles, router, user]);

  if (isPending) {
    return <AuthLoading />;
  }
   if (isError || !user) {
    return null;
  }

  if (!roles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
};
