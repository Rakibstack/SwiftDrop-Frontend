
"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export function PaymentStatusHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const handledRef = useRef(false);

  useEffect(() => {
    if (handledRef.current) return;

    const status = searchParams.get("status");
    const error = searchParams.get("error");

    if (!status && !error) return;

    handledRef.current = true;

    if (status === "success") {
      toast.success("Payment completed successfully!");
    } else if (status === "false") {
      toast.error("Payment failed. Please try again.");
    } else if (status === "cancel") {
      toast.info("Payment was cancelled.");
    } else if (error === "payment_failed") {
      toast.error("We couldn't complete your payment.");
    }

    // Remove payment query parameters from the URL.
    const params = new URLSearchParams(searchParams.toString());
    params.delete("status");
    params.delete("error");

    const query = params.toString();
    router.replace(
      query
        ? `${window.location.pathname}?${query}`
        : window.location.pathname,
      { scroll: false },
    );
  }, [searchParams, router]);

  return null;
}
