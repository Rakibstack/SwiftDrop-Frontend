"use client";

import { useForm } from "@tanstack/react-form";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { ArrowLeft, Eye, EyeOff, KeyRound, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useResetPassword } from "@/hooks";
import { resetPasswordSchema } from "@/validation/auth.schema";

const ResetPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { mutate: resetPassword, isPending } = useResetPassword();

  useEffect(() => {
    if (!email) {
      router.replace("/forgot-password");
    }
  }, [email, router]);

  const form = useForm({
    defaultValues: {
      email,
      otp: "",
      newPassword: "",
      confirmPassword: "",
    },

    validators: {
      onSubmit: resetPasswordSchema,
    },

    onSubmit: ({ value }) => {
      resetPassword(
        {
          email: value.email,
          otp: value.otp,
          newPassword: value.newPassword,
        },
        {
          onSuccess: (response: any) => {
            toast.success(response.message || "Password reset successfully.");

            router.push("/login");
          },

          onError: (error: any) => {
            toast.error(
              error.message || "Unable to reset password. Please try again.",
            );
          },
        },
      );
    },
  });

  if (!email) {
    return null;
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-5"
    >
      {/* OTP */}
      <form.Field name="otp">
        {(field) => (
          <div className="space-y-2">
            <label htmlFor="verification-code" className="text-sm font-medium">
              Verification code
            </label>

            <InputOTP
              id="verification-code"
              maxLength={6}
              pattern={REGEXP_ONLY_DIGITS}
              value={field.state.value}
              onChange={(value) => field.handleChange(value)}
            >
              <InputOTPGroup className="w-full justify-between">
                <InputOTPSlot index={0} className="size-11 rounded-lg" />
                <InputOTPSlot index={1} className="size-11 rounded-lg" />
                <InputOTPSlot index={2} className="size-11 rounded-lg" />
                <InputOTPSlot index={3} className="size-11 rounded-lg" />
                <InputOTPSlot index={4} className="size-11 rounded-lg" />
                <InputOTPSlot index={5} className="size-11 rounded-lg" />
              </InputOTPGroup>
            </InputOTP>

            {field.state.meta.errors.length > 0 && (
              <p className="text-xs text-destructive">
                {field.state.meta.errors[0]?.message}
              </p>
            )}
          </div>
        )}
      </form.Field>
      {/* New Password */}
      <form.Field name="newPassword">
        {(field) => (
          <div className="space-y-2">
            <label htmlFor={field.name} className="text-sm font-medium">
              New password
            </label>

            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id={field.name}
                name={field.name}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your new password"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                className="h-11 rounded-xl pl-10 pr-11"
              />

              <button
                type="button"
                onClick={() => setShowPassword((previous) => !previous)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>

            {field.state.meta.errors.length > 0 && (
              <p className="text-xs text-destructive">
                {field.state.meta.errors[0]?.message}
              </p>
            )}
          </div>
        )}
      </form.Field>

      {/* Confirm Password */}
      <form.Field name="confirmPassword">
        {(field) => (
          <div className="space-y-2">
            <label htmlFor={field.name} className="text-sm font-medium">
              Confirm password
            </label>

            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id={field.name}
                name={field.name}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your new password"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                className="h-11 rounded-xl pl-10 pr-11"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword((previous) => !previous)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>

            {field.state.meta.errors.length > 0 && (
              <p className="text-xs text-destructive">
                {field.state.meta.errors[0]?.message}
              </p>
            )}
          </div>
        )}
      </form.Field>

      <Button
        type="submit"
        disabled={isPending}
        className="h-11 w-full rounded-xl font-semibold"
      >
        {isPending ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Resetting password...
          </>
        ) : (
          "Reset Password"
        )}
      </Button>

      <Link
        href="/login"
        className="flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to login
      </Link>
    </form>
  );
};

export default ResetPasswordForm;
