"use client";

import type { ReactNode } from "react";
import GoogleAuthProvider from "./google.auth.provider";
import QueryProvider from "./query.provider";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <GoogleAuthProvider>
      <QueryProvider>{children}</QueryProvider>
    </GoogleAuthProvider>
  );
};

export default Providers;
