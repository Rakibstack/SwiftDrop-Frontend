"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  Store,
  UserRound,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { merchantRegisterSchema } from "@/validation/auth.schema";
import { useRegister } from "@/hooks";

const RegisterForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: registerUser, isPending } = useRegister();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      businessName: "",
      businessPhone: "",
      businessAddress: "",
    },

    validators: {
      onSubmit: merchantRegisterSchema,
    },

    onSubmit: ({ value }) => {
      const registerData = {
        name: value.name,
        email: value.email,
        password: value.password,
        businessName: value.businessName,
        businessPhone: value.businessPhone,
        businessAddress: value.businessAddress,
      };

      registerUser(registerData, {
        onSuccess: (response) => {
          toast.success(response.message || "Registration successful!");

          const params = new URLSearchParams({
            email: registerData.email,
          });

          router.push(`/register/verify-account?${params.toString()}`);
        },

        onError: (err) => {
          toast.error(
            err.message || "Unable to create your account. Please try again.",
          );
        },
      });
    },
  });

  return (
    <div className="w-full">
      <div className="mb-8">
        <div className="mb-5 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Store className="size-5" />
        </div>

        <h1 className="text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
          Create your merchant account
        </h1>

        <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">
          Start managing shipments, payments, riders, and deliveries from one
          connected logistics platform.
        </p>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-7"
      >
        {/* Personal Information */}

        <div>
          <div className="mb-4">
            <h2 className="text-sm font-semibold tracking-tight">
              Personal information
            </h2>

            <p className="mt-1 text-xs text-muted-foreground">
              Tell us a little about yourself.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <form.Field name="name">
              {(field) => (
                <FieldWrapper
                  label="Full name"
                  htmlFor={field.name}
                  error={field.state.meta.errors[0]?.message}
                >
                  <div className="relative">
                    <UserRound className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                    <input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      placeholder="Rakibul Hassan"
                      autoComplete="name"
                      className={inputClassName(
                        !!field.state.meta.errors.length,
                      )}
                    />
                  </div>
                </FieldWrapper>
              )}
            </form.Field>

            <form.Field name="email">
              {(field) => (
                <FieldWrapper
                  label="Email address"
                  htmlFor={field.name}
                  error={field.state.meta.errors[0]?.message}
                >
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                    <input
                      id={field.name}
                      name={field.name}
                      type="email"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      placeholder="you@example.com"
                      autoComplete="email"
                      className={inputClassName(
                        !!field.state.meta.errors.length,
                      )}
                    />
                  </div>
                </FieldWrapper>
              )}
            </form.Field>
          </div>
        </div>

        {/* Business Information */}

        <div>
          <div className="mb-4">
            <h2 className="text-sm font-semibold tracking-tight">
              Business information
            </h2>

            <p className="mt-1 text-xs text-muted-foreground">
              This information will be used for your merchant profile.
            </p>
          </div>

          <div className="space-y-5">
            <form.Field name="businessName">
              {(field) => (
                <FieldWrapper
                  label="Business name"
                  htmlFor={field.name}
                  error={field.state.meta.errors[0]?.message}
                >
                  <div className="relative">
                    <Store className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                    <input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      placeholder="SwiftDrop Store"
                      autoComplete="organization"
                      className={inputClassName(
                        !!field.state.meta.errors.length,
                      )}
                    />
                  </div>
                </FieldWrapper>
              )}
            </form.Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <form.Field name="businessPhone">
                {(field) => (
                  <FieldWrapper
                    label="Business phone"
                    htmlFor={field.name}
                    error={field.state.meta.errors[0]?.message}
                    hint="Example: 01712345678"
                  >
                    <div className="relative">
                      <Phone className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                      <input
                        id={field.name}
                        name={field.name}
                        type="tel"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        placeholder="01712345678"
                        autoComplete="tel"
                        inputMode="numeric"
                        className={inputClassName(
                          !!field.state.meta.errors.length,
                        )}
                      />
                    </div>
                  </FieldWrapper>
                )}
              </form.Field>

              <form.Field name="businessAddress">
                {(field) => (
                  <FieldWrapper
                    label="Business address"
                    htmlFor={field.name}
                    error={field.state.meta.errors[0]?.message}
                  >
                    <div className="relative">
                      <MapPin className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                      <input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        placeholder="Mirpur, Dhaka"
                        autoComplete="street-address"
                        className={inputClassName(
                          !!field.state.meta.errors.length,
                        )}
                      />
                    </div>
                  </FieldWrapper>
                )}
              </form.Field>
            </div>
          </div>
        </div>

        {/* Password */}

        <div>
          <div className="mb-4">
            <h2 className="text-sm font-semibold tracking-tight">
              Account security
            </h2>

            <p className="mt-1 text-xs text-muted-foreground">
              Create a strong password for your account.
            </p>
          </div>

          <form.Field name="password">
            {(field) => (
              <FieldWrapper
                label="Password"
                htmlFor={field.name}
                error={field.state.meta.errors[0]?.message}
              >
                <div className="relative">
                  <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                  <input
                    id={field.name}
                    name={field.name}
                    type={showPassword ? "text" : "password"}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="Create a strong password"
                    autoComplete="new-password"
                    className={cn(
                      inputClassName(!!field.state.meta.errors.length),
                      "pr-11",
                    )}
                  />

                  <button
                    type="button"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
              </FieldWrapper>
            )}
          </form.Field>
        </div>

        {/* Terms */}

        <p className="text-xs leading-5 text-muted-foreground">
          By creating an account, you agree to SwiftDrop&apos;s{" "}
          <Link
            href="/terms"
            className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </p>

        {/* Submit */}

        <button
          type="submit"
          disabled={isPending}
          className={cn(
            buttonVariants(),
            "group h-12 w-full rounded-xl font-semibold shadow-lg shadow-primary/15",
            isPending && "cursor-not-allowed opacity-70",
          )}
        >
          {isPending ? (
            <>
              <span className="mr-2 size-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
              Creating account...
            </>
          ) : (
            <>
              Create merchant account
              <ArrowRight className="ml-2 size-4 transition-transform duration-200 group-hover:translate-x-1" />
            </>
          )}
        </button>

        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-foreground transition-colors hover:text-primary"
          >
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
};

interface FieldWrapperProps {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}

const FieldWrapper = ({
  label,
  htmlFor,
  error,
  hint,
  children,
}: FieldWrapperProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <label
          htmlFor={htmlFor}
          className="text-xs font-semibold text-foreground"
        >
          {label}
        </label>

        {hint && !error && (
          <span className="text-[10px] text-muted-foreground">{hint}</span>
        )}
      </div>

      {children}

      {error && <p className="text-xs font-medium text-destructive">{error}</p>}
    </div>
  );
};

const inputClassName = (hasError: boolean) =>
  cn(
    "h-11 w-full rounded-xl border bg-background pl-10 pr-3 text-sm outline-none transition-all",
    "placeholder:text-muted-foreground/70",
    "focus:border-primary focus:ring-3 focus:ring-primary/10",
    "disabled:cursor-not-allowed disabled:opacity-60",
    hasError
      ? "border-destructive focus:border-destructive focus:ring-destructive/10"
      : "border-input",
  );

export default RegisterForm;
