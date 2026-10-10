"use client";
import { useForm } from "@tanstack/react-form";
import {
  Bike,
  CheckCircle2,
  IdCard,
  Mail,
  MapPin,
  Phone,
  UserRound,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { useApplyAsRider } from "@/hooks";
import { applyAsRiderSchema } from "@/validation/rider.schema";

const defaultValues = {
  name: "",
  email: "",
  phone: "",
  address: "",
  vehicleType: "BIKE" as "BIKE" | "MOTORCYCLE",
  licenseNumber: "",
};

export default function RiderApplicationForm() {
  const router = useRouter();
  const { mutate: applyAsRider, isPending } = useApplyAsRider();

  const form = useForm({
    defaultValues,

    validators: {
      onSubmit: applyAsRiderSchema,
    },

    onSubmit: ({ value }) => {
      applyAsRider(value, {
        onSuccess: () => {
          toast.success("Application submitted successfully!");

          const params = new URLSearchParams({
            email: value.email,
          });

          router.push(`/apply-as-rider/verify-email?${params.toString()}`);
        },

        onError: (error: any) => {
          toast.error(
            error?.message || "Something went wrong. Please try again.",
          );
        },
      });
    },
  });

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-6"
    >
      {/* Name */}
      <form.Field name="name">
        {(field) => (
          <Field>
            <FieldLabel htmlFor="rider-name">Full name</FieldLabel>

            <div className="relative">
              <UserRound className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="rider-name"
                type="text"
                placeholder="Enter your full name"
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
                className="h-11 rounded-xl pl-10"
              />
            </div>

            {field.state.meta.errors.length > 0 && (
              <FieldError>{field.state.meta.errors[0]?.message}</FieldError>
            )}
          </Field>
        )}
      </form.Field>

      {/* Email */}
      <form.Field name="email">
        {(field) => (
          <Field>
            <FieldLabel htmlFor="rider-email">Email address</FieldLabel>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="rider-email"
                type="email"
                placeholder="you@example.com"
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
                className="h-11 rounded-xl pl-10"
              />
            </div>

            {field.state.meta.errors.length > 0 && (
              <FieldError>{field.state.meta.errors[0]?.message}</FieldError>
            )}
          </Field>
        )}
      </form.Field>

      {/* Phone */}
      <form.Field name="phone">
        {(field) => (
          <Field>
            <FieldLabel htmlFor="rider-phone">Phone number</FieldLabel>

            <div className="relative">
              <Phone className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="rider-phone"
                type="tel"
                placeholder="01XXXXXXXXX"
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
                className="h-11 rounded-xl pl-10"
              />
            </div>

            <p className="text-xs text-muted-foreground">
              Use a valid Bangladeshi mobile number.
            </p>

            {field.state.meta.errors.length > 0 && (
              <FieldError>{field.state.meta.errors[0]?.message}</FieldError>
            )}
          </Field>
        )}
      </form.Field>

      {/* Address */}
      <form.Field name="address">
        {(field) => (
          <Field>
            <FieldLabel htmlFor="rider-address">Current address</FieldLabel>

            <div className="relative">
              <MapPin className="absolute left-3 top-3.5 size-4 text-muted-foreground" />

              <Input
                id="rider-address"
                type="text"
                placeholder="Enter your current address"
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
                className="h-11 rounded-xl pl-10"
              />
            </div>

            {field.state.meta.errors.length > 0 && (
              <FieldError>{field.state.meta.errors[0]?.message}</FieldError>
            )}
          </Field>
        )}
      </form.Field>

      {/* Vehicle */}
      <form.Field name="vehicleType">
        {(field) => (
          <Field>
            <FieldLabel>Vehicle type</FieldLabel>

            <RadioGroup
              value={field.state.value}
              onValueChange={(value) =>
                field.handleChange(value as "BIKE" | "MOTORCYCLE")
              }
              className="grid grid-cols-2 gap-3"
            >
              <label
                htmlFor="vehicle-bike"
                className="flex cursor-pointer items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-secondary/40"
              >
                <RadioGroupItem id="vehicle-bike" value="BIKE" />

                <div className="flex items-center gap-2">
                  <Bike className="size-4 text-primary" />

                  <div>
                    <p className="text-sm font-medium">Bike</p>
                    <p className="text-xs text-muted-foreground">
                      Bicycle delivery
                    </p>
                  </div>
                </div>
              </label>

              <label
                htmlFor="vehicle-motorcycle"
                className="flex cursor-pointer items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-secondary/40"
              >
                <RadioGroupItem id="vehicle-motorcycle" value="MOTORCYCLE" />

                <div className="flex items-center gap-2">
                  <Bike className="size-4 text-primary" />

                  <div>
                    <p className="text-sm font-medium">Motorcycle</p>
                    <p className="text-xs text-muted-foreground">
                      Motorbike delivery
                    </p>
                  </div>
                </div>
              </label>
            </RadioGroup>

            {field.state.meta.errors.length > 0 && (
              <FieldError>{field.state.meta.errors[0]?.message}</FieldError>
            )}
          </Field>
        )}
      </form.Field>

      {/* License */}
      <form.Field name="licenseNumber">
        {(field) => (
          <Field>
            <FieldLabel htmlFor="rider-license">
              Driving license number
            </FieldLabel>

            <div className="relative">
              <IdCard className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="rider-license"
                type="text"
                placeholder="Enter your license number"
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
                className="h-11 rounded-xl pl-10"
              />
            </div>

            {field.state.meta.errors.length > 0 && (
              <FieldError>{field.state.meta.errors[0]?.message}</FieldError>
            )}
          </Field>
        )}
      </form.Field>

      {/* Info */}
      <div className="flex gap-3 rounded-xl border border-primary/15 bg-primary/5 p-4">
        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />

        <div>
          <p className="text-sm font-medium">What happens next?</p>

          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            We&apos;ll send a verification code to your email. After
            verification, your rider application will be submitted for review.
          </p>
        </div>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={isPending}
        className="h-11 w-full rounded-xl font-semibold"
      >
        {isPending ? "Submitting application..." : "Apply as Rider"}
      </Button>
    </form>
  );
}
