"use client";

import { useForm } from "@tanstack/react-form";
import { ArrowLeft, Loader2, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForgotPassword } from "@/hooks";
import { forgotPasswordSchema } from "@/validation/auth.schema";

const ForgotPasswordForm = () => {
  const router = useRouter();

  const { mutate: sendForgotPassword, isPending } = useForgotPassword();

  const form = useForm({
    defaultValues: {
      email: "",
    },

    validators: {
      onSubmit: forgotPasswordSchema,
    },

    onSubmit: ({ value }) => {
      sendForgotPassword(
        {
          email: value.email,
        },
        {
          onSuccess: (response) => {
            toast.success(
              response.message ||
                "Verification code has been sent to your email.",
            );

            const params = new URLSearchParams({
              email: value.email,
            });

            router.push(`/reset-password?${params.toString()}`);
          },

          onError: (error) => {
            toast.error(
              error.message ||
                "Unable to send verification code. Please try again.",
            );
          },
        },
      );
    },
  });

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-5"
    >
      <form.Field name="email">
        {(field) => (
          <div className="space-y-2">
            <label htmlFor={field.name} className="text-sm font-medium">
              Email address
            </label>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id={field.name}
                name={field.name}
                type="email"
                placeholder="you@example.com"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                className="h-11 rounded-xl pl-10"
              />
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
            Sending code...
          </>
        ) : (
          "Send Verification Code"
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

export default ForgotPasswordForm;
