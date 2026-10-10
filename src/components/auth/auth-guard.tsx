"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCurrentUser } from "@/hooks";
import AuthLoading from "../shared/AuthLoading";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { data, isPending, isError } = useCurrentUser();
  const router = useRouter();

  const user = data?.data;

  useEffect(() => {
    if (isPending) {
      return;
    }

    if (!user || isError) {
      router.replace("/login");
    }
  }, [isError, isPending, router, user]);

  if (isPending) {
    return <AuthLoading />;
  }

  if (isError || !user) {
    return null;
  }

  return <>{children}</>;
};
