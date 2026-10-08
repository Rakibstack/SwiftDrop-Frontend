"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Loader2, LockKeyhole, Mail } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useForm } from "@tanstack/react-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DemoLoginCards, {
  type DemoRole,
} from "@/components/form/DemoLoginCards";
import { DEMO_ACCOUNTS } from "@/constants/demoAccounts";
import { useLogin } from "@/hooks/auth.hooks";
import GoogleLoginComponent from "../modules/google-login/GoogleLogin";
import { merchantLoginSchema } from "@/validation/auth.schema";

const LoginForm = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [activeDemoRole, setActiveDemoRole] = useState<DemoRole | null>(null);
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const { mutate: loginUser, isPending } = useLogin();

  const handleLoginSuccess = () => {
    toast.success("Welcome back to SwiftDrop!");

    router.push(redirectTo);
    router.refresh();
  };

  const handleLoginError = (error: Error) => {
    setActiveDemoRole(null);

    toast.error(
      error.message || "Unable to sign in. Please check your credentials.",
    );
  };

  const handleDemoLogin = (role: DemoRole) => {
    const account = DEMO_ACCOUNTS[role];

    if (!account.email || !account.password) {
      toast.error("This demo account is not configured.");
      return;
    }

    setActiveDemoRole(role);

    loginUser(
      {
        email: account.email,
        password: account.password,
      },
      {
        onSuccess: handleLoginSuccess,
        onError: handleLoginError,
      },
    );
  };

  const form = useForm({
    defaultValues: {
      email: "",
      password: "R@kibdev!",
    },

    validators: {
      onSubmit: merchantLoginSchema,
    },

    onSubmit: ({ value }) => {
      setActiveDemoRole(null);

      loginUser(value, {
        onSuccess: handleLoginSuccess,
        onError: handleLoginError,
      });
    },
  });

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-5"
      >
        {/* Email */}
        <form.Field name="email">
          {(field) => {
            const hasError =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <div className="space-y-2">
                <label
                  htmlFor={field.name}
                  className="text-sm font-medium text-foreground"
                >
                  Email address
                </label>

                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    placeholder="you@company.com"
                    autoComplete="email"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    disabled={isPending}
                    className="h-12 rounded-xl pl-10"
                  />
                </div>

                {hasError && (
                  <p className="text-xs text-destructive">
                    {field.state.meta.errors
                      .map((error) =>
                        typeof error === "string" ? error : error?.message,
                      )
                      .join(", ")}
                  </p>
                )}
              </div>
            );
          }}
        </form.Field>

        <form.Field name="password">
          {(field) => {
            const hasError =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor={field.name} className="text-sm font-medium">
                    Password
                  </label>

                  <Link
                    href="/forgot-password"
                    className="text-xs font-semibold text-primary hover:text-primary/80"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <LockKeyhole className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    id={field.name}
                    name={field.name}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    disabled={isPending}
                    className="h-12 rounded-xl pl-10 pr-11"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((previous) => !previous)}
                    disabled={isPending}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>

                {hasError && (
                  <p className="text-xs text-destructive">
                    {field.state.meta.errors
                      .map((error) =>
                        typeof error === "string" ? error : error?.message,
                      )
                      .join(", ")}
                  </p>
                )}
              </div>
            );
          }}
        </form.Field>

        {/* Normal Login */}
        <Button
          type="submit"
          disabled={isPending}
          className="h-12 w-full rounded-xl font-semibold shadow-lg shadow-primary/15"
        >
          {isPending && !activeDemoRole ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign in to SwiftDrop"
          )}
        </Button>
      </form>
      <div className="mt-5">
        
      <GoogleLoginComponent></GoogleLoginComponent>
      </div>

      {/* Demo Login */}
      <div className="my-8 flex items-center gap-4">
        <div className="h-px flex-1 bg-border" />

        <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          Or explore a demo
        </span>

        <div className="h-px flex-1 bg-border" />
      </div>

      <DemoLoginCards
        onLogin={handleDemoLogin}
        isPending={isPending}
        activeRole={activeDemoRole}
      />
    </div>
  );
};

export default LoginForm;
