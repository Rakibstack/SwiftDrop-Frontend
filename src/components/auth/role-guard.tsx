
"use client";

import { useCurrentUser } from "@/hooks";
import { UserRole } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
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


  if (!roles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
};