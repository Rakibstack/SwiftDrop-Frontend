"use client";

import { useForm } from "@tanstack/react-form";
import {
  ArrowRight,
  MapPin,
  Package,
  RotateCcw,
  Truck,
  UserRound,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import { useCreateShipment } from "@/hooks";
import type { CreateShipmentPayload } from "@/types/shipment.types";
import { createShipmentSchema } from "@/validation/shipment.schem";

type CreateShipmentFormValues = z.input<typeof createShipmentSchema>;

const defaultValues: CreateShipmentFormValues = {
  senderName: "",
  senderPhone: "",
  senderAddress: "",
  recipientName: "",
  recipientPhone: "",
  recipientAddress: "",
  parcelType: "",
  parcelDescription: "",
  weight: undefined,
  codAmount: 0,
};

type FieldErrorProps = {
  errors: unknown[];
};

function FieldError({ errors }: FieldErrorProps) {
  if (errors.length === 0) return null;

  const error = errors[0];

  const message =
    typeof error === "string"
      ? error
      : error instanceof Error
        ? error.message
        : typeof error === "object" &&
            error !== null &&
            "message" in error &&
            typeof error.message === "string"
          ? error.message
          : "";

  if (!message) return null;

  return <p className="mt-1.5 text-xs font-medium text-red-600">{message}</p>;
}

type SectionHeaderProps = {
  icon: typeof Package;
  title: string;
  description: string;
};

function SectionHeader({ icon: Icon, title, description }: SectionHeaderProps) {
  return (
    <div className="mb-5 flex items-start gap-3">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
        <Icon className="size-5" />
      </div>

      <div>
        <h2 className="font-semibold text-gray-900">{title}</h2>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
}

type FieldLabelProps = {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
};

function FieldLabel({ htmlFor, children, required = false }: FieldLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block text-sm font-medium text-gray-700"
    >
      {children}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
  );
}

const inputClassName =
  "w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10 disabled:cursor-not-allowed disabled:bg-gray-50";

const sectionClassName =
  "rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm sm:p-6";

export default function CreateShipmentForm() {
  const createShipment = useCreateShipment();
  const router = useRouter();

  const form = useForm({
    defaultValues,

    validators: {
      onSubmit: createShipmentSchema,
    },

    onSubmit: async ({ value }) => {
      const payload: CreateShipmentPayload = {
        senderName: value.senderName.trim(),
        senderPhone: value.senderPhone.trim(),
        senderAddress: value.senderAddress.trim(),
        recipientName: value.recipientName.trim(),
        recipientPhone: value.recipientPhone.trim(),
        recipientAddress: value.recipientAddress.trim(),
        parcelType: value.parcelType.trim(),
        parcelDescription: value.parcelDescription?.trim() || undefined,
        weight: value.weight,
        codAmount: value.codAmount ?? 0,
      };

      try {
        const response = await createShipment.mutateAsync(payload);

        toast.success(response.message || "Shipment created successfully!");
        router.push("/merchant/shipments");

        form.reset();
      } catch (error) {
        console.error("Create shipment failed:", error);

        toast.error(
          error instanceof Error
            ? error.message
            : "Unable to create shipment. Please try again.",
        );
      }
    },
  });

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 pb-10">
      {/* Page heading */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
            <Truck className="size-4" />
            <span>Merchant dashboard</span>
            <span>/</span>
            <span className="text-gray-700">Create shipment</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Create a shipment
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
            Enter your sender and recipient details to arrange a delivery with
            SwiftDrop.
          </p>
        </div>

        <div className="flex size-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
          <Package className="size-6" />
        </div>
      </div>

      {/* Information banner */}
      <div className="flex items-start gap-3 rounded-2xl border border-orange-100 bg-orange-50/70 p-4">
        <MapPin className="mt-0.5 size-5 shrink-0 text-orange-600" />

        <div>
          <p className="text-sm font-semibold text-gray-900">
            Double-check your delivery information
          </p>
          <p className="mt-1 text-sm leading-5 text-gray-600">
            Accurate phone numbers and complete addresses help riders deliver
            parcels without unnecessary delays.
          </p>
        </div>
      </div>

      <form
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          void form.handleSubmit();
        }}
        className="space-y-5"
      >
        {/* Sender details */}
        <section className={sectionClassName}>
          <SectionHeader
            icon={UserRound}
            title="Sender information"
            description="Provide the contact details for parcel collection."
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <form.Field name="senderName">
              {(field) => (
                <div>
                  <FieldLabel htmlFor={field.name} required>
                    Sender name
                  </FieldLabel>

                  <input
                    id={field.name}
                    name={field.name}
                    autoComplete="name"
                    className={inputClassName}
                    placeholder="Enter sender's full name"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                  />

                  <FieldError errors={field.state.meta.errors} />
                </div>
              )}
            </form.Field>

            <form.Field name="senderPhone">
              {(field) => (
                <div>
                  <FieldLabel htmlFor={field.name} required>
                    Sender phone
                  </FieldLabel>

                  <input
                    id={field.name}
                    name={field.name}
                    type="tel"
                    autoComplete="tel"
                    inputMode="numeric"
                    className={inputClassName}
                    placeholder="01XXXXXXXXX"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                  />

                  <FieldError errors={field.state.meta.errors} />
                </div>
              )}
            </form.Field>

            <div className="sm:col-span-2">
              <form.Field name="senderAddress">
                {(field) => (
                  <div>
                    <FieldLabel htmlFor={field.name} required>
                      Sender address
                    </FieldLabel>

                    <textarea
                      id={field.name}
                      name={field.name}
                      autoComplete="street-address"
                      rows={3}
                      className={`${inputClassName} resize-y`}
                      placeholder="House, road, area, city..."
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                    />

                    <FieldError errors={field.state.meta.errors} />
                  </div>
                )}
              </form.Field>
            </div>
          </div>
        </section>

        {/* Recipient details */}
        <section className={sectionClassName}>
          <SectionHeader
            icon={MapPin}
            title="Recipient information"
            description="Where should the parcel be delivered?"
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <form.Field name="recipientName">
              {(field) => (
                <div>
                  <FieldLabel htmlFor={field.name} required>
                    Recipient name
                  </FieldLabel>

                  <input
                    id={field.name}
                    name={field.name}
                    autoComplete="off"
                    className={inputClassName}
                    placeholder="Enter recipient's full name"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                  />

                  <FieldError errors={field.state.meta.errors} />
                </div>
              )}
            </form.Field>

            <form.Field name="recipientPhone">
              {(field) => (
                <div>
                  <FieldLabel htmlFor={field.name} required>
                    Recipient phone
                  </FieldLabel>

                  <input
                    id={field.name}
                    name={field.name}
                    type="tel"
                    inputMode="numeric"
                    autoComplete="off"
                    className={inputClassName}
                    placeholder="01XXXXXXXXX"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                  />

                  <FieldError errors={field.state.meta.errors} />
                </div>
              )}
            </form.Field>

            <div className="sm:col-span-2">
              <form.Field name="recipientAddress">
                {(field) => (
                  <div>
                    <FieldLabel htmlFor={field.name} required>
                      Recipient address
                    </FieldLabel>

                    <textarea
                      id={field.name}
                      name={field.name}
                      rows={3}
                      autoComplete="off"
                      className={`${inputClassName} resize-y`}
                      placeholder="House, road, area, city..."
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                    />

                    <FieldError errors={field.state.meta.errors} />
                  </div>
                )}
              </form.Field>
            </div>
          </div>
        </section>

        {/* Parcel details */}
        <section className={sectionClassName}>
          <SectionHeader
            icon={Package}
            title="Parcel details"
            description="Tell us what you are sending and configure payment collection."
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <form.Field name="parcelType">
              {(field) => (
                <div>
                  <FieldLabel htmlFor={field.name} required>
                    Parcel type
                  </FieldLabel>

                  <select
                    id={field.name}
                    name={field.name}
                    className={inputClassName}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                  >
                    <option value="">Select parcel type</option>
                    <option value="DOCUMENT">Document</option>
                    <option value="ELECTRONICS">Electronics</option>
                    <option value="CLOTHING">Clothing</option>
                    <option value="FOOD">Food</option>
                    <option value="FRAGILE">Fragile item</option>
                    <option value="OTHER">Other</option>
                  </select>

                  <FieldError errors={field.state.meta.errors} />
                </div>
              )}
            </form.Field>

            <form.Field name="weight">
              {(field) => (
                <div>
                  <FieldLabel htmlFor={field.name}>
                    Parcel weight (kg)
                  </FieldLabel>

                  <input
                    id={field.name}
                    name={field.name}
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    className={inputClassName}
                    placeholder="e.g. 1.5"
                    value={field.state.value ?? ""}
                    onBlur={field.handleBlur}
                    onChange={(event) => {
                      const rawValue = event.target.value;

                      field.handleChange(
                        rawValue === "" ? undefined : Number(rawValue),
                      );
                    }}
                  />

                  <p className="mt-1.5 text-xs text-gray-400">
                    Optional. Maximum weight: 100 kg.
                  </p>

                  <FieldError errors={field.state.meta.errors} />
                </div>
              )}
            </form.Field>

            <div className="sm:col-span-2">
              <form.Field name="parcelDescription">
                {(field) => (
                  <div>
                    <FieldLabel htmlFor={field.name}>
                      Parcel description
                    </FieldLabel>

                    <textarea
                      id={field.name}
                      name={field.name}
                      rows={3}
                      maxLength={500}
                      className={`${inputClassName} resize-y`}
                      placeholder="Add any useful parcel details (optional)"
                      value={field.state.value ?? ""}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                    />

                    <FieldError errors={field.state.meta.errors} />
                  </div>
                )}
              </form.Field>
            </div>

            <div className="sm:col-span-2">
              <form.Field name="codAmount">
                {(field) => (
                  <div>
                    <FieldLabel htmlFor={field.name}>
                      Cash on delivery (COD) amount (৳)
                    </FieldLabel>

                    <input
                      id={field.name}
                      name={field.name}
                      type="number"
                      min="0"
                      step="0.01"
                      className={inputClassName}
                      placeholder="0"
                      value={field.state.value ?? 0}
                      onBlur={field.handleBlur}
                      onChange={(event) => {
                        const rawValue = event.target.value;

                        field.handleChange(
                          rawValue === "" ? undefined : Number(rawValue),
                        );
                      }}
                    />

                    <p className="mt-1.5 text-xs text-gray-400">
                      Enter 0 if no payment needs to be collected from the
                      recipient.
                    </p>

                    <FieldError errors={field.state.meta.errors} />
                  </div>
                )}
              </form.Field>
            </div>
          </div>
        </section>

        {/* Actions */}
        <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-5 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            disabled={createShipment.isPending}
            onClick={() => form.reset()}
            className="h-11 rounded-xl"
          >
            <RotateCcw className="mr-2 size-4" />
            Reset form
          </Button>

          <Button
            type="submit"
            disabled={createShipment.isPending}
            className="h-11 rounded-xl bg-orange-600 px-6 text-white hover:bg-orange-700"
          >
            {createShipment.isPending ? (
              <>
                <span className="mr-2 size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Creating shipment...
              </>
            ) : (
              <>
                Create shipment
                <ArrowRight className="ml-2 size-4" />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
