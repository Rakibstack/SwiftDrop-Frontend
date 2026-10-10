"use client";

import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Loader2, MailCheck, RefreshCw } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { buttonVariants } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  useResendRiderVerificationOtp,
  useResendVerificationOtp,
  useVerifyEmail,
  useVerifyRider,
} from "@/hooks";
import { cn } from "@/lib/utils";
import { ApiResponse } from "@/types";

const RESEND_COOLDOWN = 120;
type VerifyAccountMode = "merchant" | "rider";

interface VerifyAccountFormProps {
  mode: VerifyAccountMode;
}

const formatTimer = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);

  const remainingSeconds = seconds % 60;

  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const VerifyAccountForm = ({ mode }: VerifyAccountFormProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState("");
  const [resendTimer, setResendTimer] = useState(RESEND_COOLDOWN);

  const { mutate: verifyMerchant, isPending: isMerchantVerifying } =
    useVerifyEmail();

  const { mutate: verifyRider, isPending: isRiderVerifying } = useVerifyRider();

  const { mutate: resendMerchantOtp, isPending: isMerchantResending } =
    useResendVerificationOtp();

  const { mutate: resendRiderOtp, isPending: isRiderResending } =
    useResendRiderVerificationOtp();

  const isVerifying =
    mode === "merchant" ? isMerchantVerifying : isRiderVerifying;

  const isResending =
    mode === "merchant" ? isMerchantResending : isRiderResending;

  useEffect(() => {
    if (!email) {
      router.replace("/login");
    }
  }, [email, router]);

  useEffect(() => {
    if (resendTimer <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setResendTimer((previous) => previous - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [resendTimer]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (otp.length !== 6) {
      toast.error("Please enter the 6-digit verification code.");
      return;
    }

    const payload = {
      email,
      otp,
    };

    const handleSuccess = () => {
      toast.success(
        mode === "merchant"
          ? "Merchant account verified successfully."
          : "Rider application verified successfully. Please Wait for Admin approval.",
      );

      router.push("/login");
    };

    const handleError = (error: Error) => {
      toast.error(error.message || "Verification failed. Please try again.");
    };

    if (mode === "merchant") {
      verifyMerchant(payload, {
        onSuccess: handleSuccess,
        onError: handleError,
      });
    } else {
      verifyRider(payload, {
        onSuccess: handleSuccess,
        onError: handleError,
      });
    }
  };

  const handleResendOtp = () => {
    if (!email) {
      toast.error("Email address is missing.");
      return;
    }

    if (resendTimer > 0 || isResending) {
      return;
    }

    const payload = { email };

    const handleSuccess = (response: ApiResponse<null>) => {
      toast.success(
        response.message || "A new verification code has been sent.",
      );

      setOtp("");
      setResendTimer(RESEND_COOLDOWN);
    };

    const handleError = (error: Error) => {
      toast.error(error.message || "Failed to resend verification code.");
    };

    if (mode === "merchant") {
      resendMerchantOtp(payload, {
        onSuccess: handleSuccess,
        onError: handleError,
      });
    } else {
      resendRiderOtp(payload, {
        onSuccess: handleSuccess,
        onError: handleError,
      });
    }
  };

  return (
    <div>
      {/* Header */}

      <div className="text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <MailCheck className="size-6" />
        </div>

        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          Verify your email
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-[-0.045em]">
          Confirm your account
        </h1>

        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
          We've sent a 6-digit verification code to
        </p>

        <p className="mt-1 break-all text-sm font-semibold">{email}</p>
      </div>

      {/* Form */}

      <form onSubmit={handleSubmit} className="mt-9 space-y-7">
        <div>
          <label
            htmlFor="verification-code"
            className="mb-3 block text-center text-xs font-semibold"
          >
            Verification code
          </label>

          <div className="flex justify-center">
            <InputOTP
              id="verification-code"
              name="otp"
              maxLength={6}
              value={otp}
              onChange={setOtp}
              pattern={REGEXP_ONLY_DIGITS}
              disabled={isVerifying}
              autoFocus
            >
              <InputOTPGroup className="gap-2">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    className="size-12 rounded-xl border text-lg font-semibold sm:size-14"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>

        {/* Verify */}

        <button
          type="submit"
          disabled={otp.length !== 6 || isVerifying}
          className={cn(
            buttonVariants(),
            "h-12 w-full rounded-xl font-semibold shadow-lg shadow-primary/15",
            "disabled:cursor-not-allowed disabled:opacity-60",
          )}
        >
          {isVerifying ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Verifying account...
            </>
          ) : (
            "Verify account"
          )}
        </button>

        {/* Resend */}

        <div className="rounded-2xl border border-border bg-secondary/40 p-4 text-center">
          <p className="text-xs text-muted-foreground">
            Didn't receive the code?
          </p>

          <button
            type="button"
            onClick={handleResendOtp}
            disabled={resendTimer > 0 || isResending}
            className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition-colors hover:text-primary/80 disabled:cursor-not-allowed disabled:text-muted-foreground"
          >
            {isResending ? (
              <>
                <RefreshCw className="size-3.5 animate-spin" />
                Sending new code...
              </>
            ) : resendTimer > 0 ? (
              `Resend code in ${formatTimer(resendTimer)}`
            ) : (
              "Resend verification code"
            )}
          </button>
        </div>

        {/* Security note */}

        <p className="text-center text-[11px] leading-5 text-muted-foreground">
          For your security, verification codes expire after a short period.
          Never share your verification code with anyone.
        </p>
      </form>
    </div>
  );
};

export default VerifyAccountForm;
