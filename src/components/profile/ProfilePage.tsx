"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useForm } from "@tanstack/react-form";
import {
  Building2,
  Camera,
  Check,
  CircleUserRound,
  Clock3,
  ImagePlus,
  LockKeyhole,
  LogOut,
  Mail,
  MapPin,
  Pencil,
  Phone,
  ShieldCheck,
  Truck,
  UserRound,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useCurrentUser, useLogout } from "@/hooks";

import type {
  ProfileUser,
  UpdateMerchantProfilePayload,
  UpdateRiderProfilePayload,
} from "@/types/profile.types";

import {
  updateMerchantProfileSchema,
  updateRiderProfileSchema,
} from "@/validation/profile.validation";

import {
  useUpdateMerchantProfile,
  useUpdateProfileImage,
  useUpdateRiderProfile,
} from "@/hooks/use-profile-mutations";

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500";

const cardClass =
  "overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900";

const headingClass = "font-bold text-slate-900 dark:text-slate-100";

const descriptionClass = "mt-1 text-sm text-slate-500 dark:text-slate-400";

function getInitials(name: string) {
  return (
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "SD"
  );
}

function formatRole(role?: string) {
  if (!role) return "User";

  return role
    .toLowerCase()
    .split("_")
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(" ");
}

function formatDate(value?: string) {
  if (!value) return "Not available";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Not available";
  }

  return new Intl.DateTimeFormat("en-BD", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function Info({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value?: string | null;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-500 ring-1 ring-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs text-slate-400 dark:text-slate-500">{label}</p>

        <p className="mt-1 break-words text-sm font-semibold text-slate-800 dark:text-slate-100">
          {value?.trim() || "Not provided"}
        </p>
      </div>
    </div>
  );
}

function FieldError({ errors }: { errors: unknown[] }) {
  return (
    <>
      {errors.map((error, index) => (
        <p key={index} className="text-xs text-red-600 dark:text-red-400">
          {String(error)}
        </p>
      ))}
    </>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const query = useCurrentUser();

  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  const merchantMutation = useUpdateMerchantProfile();
  const riderMutation = useUpdateRiderProfile();
  const imageMutation = useUpdateProfileImage();

  const rawUser = query.data as
    | (ProfileUser & { data?: ProfileUser })
    | undefined;

  const user = rawUser?.data ?? rawUser;

  const merchant = user?.merchantProfile;
  const rider = user?.riderProfile;

  const businessName = merchant?.businessName ?? user?.businessName ?? "";
  const businessPhone = merchant?.businessPhone ?? user?.businessPhone ?? "";
  const businessAddress =
    merchant?.businessAddress ?? user?.businessAddress ?? "";

  const phone = rider?.phone ?? user?.phone ?? "";
  const address = rider?.address ?? user?.address ?? "";

  const vehicleType = rider?.vehicleType ?? user?.vehicleType ?? undefined;
  const licenseNumber = rider?.licenseNumber ?? user?.licenseNumber ?? "";

  const isMerchant = user?.role === "MERCHANT";
  const isRider = user?.role === "RIDER";
  const canEditProfile = isMerchant || isRider;

  const name = user?.name || "SwiftDrop User";
  const role = formatRole(user?.role);

  const [editOpen, setEditOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const fileRef = useRef<HTMLInputElement>(null);

  // Logout handler
  function handleLogout() {
    logout(undefined, {
      onSuccess: () => {
        toast.success("Logged out successfully.");

        queryClient.removeQueries({
          queryKey: ["current-user"],
        });

        setLogoutOpen(false);

        router.push("/login");
        router.refresh();
      },

      onError: (error: Error) => {
        toast.error(error.message || "Failed to logout.");
      },
    });
  }

  // Merchant form
  const merchantForm = useForm({
    defaultValues: {
      businessName,
      businessPhone,
      businessAddress,
    } as UpdateMerchantProfilePayload,

    validators: {
      onSubmit: updateMerchantProfileSchema,
    },

    onSubmit: async ({ value }) => {
      const payload: UpdateMerchantProfilePayload = {};

      if (value.businessName?.trim()) {
        payload.businessName = value.businessName.trim();
      }

      if (value.businessPhone?.trim()) {
        payload.businessPhone = value.businessPhone.trim();
      }

      if (value.businessAddress?.trim()) {
        payload.businessAddress = value.businessAddress.trim();
      }

      try {
        await merchantMutation.mutateAsync(payload);
        setEditOpen(false);
      } catch {
      }
    },
  });

  // Rider form
  const riderForm = useForm({
    defaultValues: {
      phone,
      address,
      vehicleType,
      licenseNumber,
    } as UpdateRiderProfilePayload,

    validators: {
      onSubmit: updateRiderProfileSchema,
    },

    onSubmit: async ({ value }) => {
      const payload: UpdateRiderProfilePayload = {};

      if (value.phone?.trim()) {
        payload.phone = value.phone.trim();
      }

      if (value.address?.trim()) {
        payload.address = value.address.trim();
      }

      if (value.vehicleType) {
        payload.vehicleType = value.vehicleType;
      }

      if (value.licenseNumber?.trim()) {
        payload.licenseNumber = value.licenseNumber.trim();
      }

      try {
        await riderMutation.mutateAsync(payload);
        setEditOpen(false);
      } catch {
        // The mutation hook handles the error toast.
      }
    },
  });

  // Reset forms when user data changes.
  useEffect(() => {
    merchantForm.reset({
      businessName,
      businessPhone,
      businessAddress,
    });
  }, [businessName, businessPhone, businessAddress,merchantForm]);

  useEffect(() => {
    riderForm.reset({
      phone,
      address,
      vehicleType,
      licenseNumber,
    });
  }, [phone, address, vehicleType, licenseNumber,riderForm]);

  useEffect(() => {
    if (!imageFile) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(imageFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

  function openEditor() {
    merchantForm.reset({
      businessName,
      businessPhone,
      businessAddress,
    });

    riderForm.reset({
      phone,
      address,
      vehicleType,
      licenseNumber,
    });

    setEditOpen(true);
  }

  function selectImage(file?: File) {
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Choose a JPG, PNG, or WebP image.");
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      toast.error("Image size must be 4 MB or less.");
      return;
    }

    setImageFile(file);
  }

  if (query.isPending) {
    return (
      <div className="mx-auto max-w-7xl animate-pulse space-y-6">
        <div className="h-8 w-52 rounded-lg bg-slate-200 dark:bg-slate-800" />
        <div className="h-64 rounded-3xl bg-slate-100 dark:bg-slate-800" />
        <div className="h-80 rounded-3xl bg-slate-100 dark:bg-slate-800" />
      </div>
    );
  }

  if (query.isError || !user) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
        <CircleUserRound className="mb-4 size-12 text-slate-300" />

        <h1 className="text-xl font-bold text-slate-900 dark:text-white">
          Profile unavailable
        </h1>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          We couldn&apos;t load your account details.
        </p>

        <Button
          type="button"
          onClick={() => query.refetch()}
          className="mt-5 bg-orange-500 text-white hover:bg-orange-600"
        >
          Try again
        </Button>
      </div>
    );
  }

  const image = preview || user.imageUrl;

  return (
    <div className="mx-auto w-full max-w-7xl space-y-7 pb-10">
      {/* Page heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-3 text-xs font-medium text-slate-400">
            Workspace /{" "}
            <span className="text-slate-600 dark:text-slate-300">
              My profile
            </span>
          </p>

          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-orange-500 text-white">
              <Link href="/">
                <CircleUserRound className="size-6" />
              </Link>
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-3xl">
                Profile &amp; workspace
              </h1>

              <p className={descriptionClass}>
                Manage your identity and account information.
              </p>
            </div>
          </div>
        </div>

        {canEditProfile && (
          <Button
            type="button"
            onClick={openEditor}
            className="h-11 gap-2 rounded-xl bg-slate-950 text-white hover:bg-slate-800 dark:bg-orange-500 dark:hover:bg-orange-600"
          >
            <Pencil className="size-4" />
            Edit profile
          </Button>
        )}
      </div>

      {/* Profile hero */}
      <section className="relative overflow-hidden rounded-[28px] bg-slate-950 text-white shadow-xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(249,115,22,0.24),transparent_48%)]" />

        <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:p-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="relative size-24 shrink-0 sm:size-28">
              <div className="absolute -inset-1 rounded-[30px] bg-gradient-to-br from-orange-400 to-orange-700 opacity-80 blur-sm" />

              <div className="relative size-full overflow-hidden rounded-[26px] border border-white/20 bg-slate-800">
                {image ? (
                  <Image
                    src={image}
                    alt={`${name} profile`}
                    width={500}
                    height={500}
                    unoptimized
                    className="size-full object-cover"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center bg-gradient-to-br from-orange-400 to-orange-700 text-3xl font-bold">
                    {getInitials(name)}
                  </div>
                )}
              </div>

              <button
                type="button"
                disabled={imageMutation.isPending}
                onClick={() => fileRef.current?.click()}
                aria-label="Choose profile image"
                className="absolute -bottom-2 -right-2 flex size-10 items-center justify-center rounded-xl border-2 border-slate-950 bg-orange-500 text-white"
              >
                <Camera className="size-4" />
              </button>

              <input
                ref={fileRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(event) => {
                  selectImage(event.target.files?.[0]);
                  event.currentTarget.value = "";
                }}
              />
            </div>

            <div className="min-w-0">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.07] px-2.5 py-1 text-[11px] font-semibold text-slate-200">
                <ShieldCheck className="size-3.5 text-emerald-400" />
                {role}
              </span>

              <h2 className="mt-2 truncate text-2xl font-bold sm:text-3xl">
                {name}
              </h2>

              <p className="mt-2 flex items-center gap-2 break-all text-sm text-slate-400">
                <Mail className="size-4 shrink-0" />
                {user.email || "No email available"}
              </p>

              <p className="mt-3 text-xs text-slate-500">
                Member since {formatDate(user.createdAt)}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-white/10 pt-5 lg:min-w-52 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <div className="flex items-center gap-3">
              <Building2 className="size-5 text-orange-300" />

              <div>
                <p className="text-xs text-slate-400">Workspace</p>
                <p className="text-sm font-semibold">
                  {isMerchant ? "Merchant account" : `${role} account`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <LockKeyhole className="size-5 text-emerald-300" />

              <div>
                <p className="text-xs text-slate-400">Account access</p>
                <p className="text-sm font-semibold">Role protected</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profile information */}
      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(300px,0.8fr)]">
        {isMerchant && (
          <section className={cardClass}>
            <div className="flex items-center justify-between border-b border-slate-100 p-5 dark:border-slate-700 sm:p-7">
              <div>
                <h2 className={headingClass}>Business information</h2>
                <p className={descriptionClass}>
                  Your merchant workspace details.
                </p>
              </div>

              <button
                type="button"
                onClick={openEditor}
                className="rounded-xl px-3 py-2 text-xs font-semibold text-orange-600 hover:bg-orange-50 dark:text-orange-400 dark:hover:bg-slate-800"
              >
                Edit <Pencil className="inline size-3.5" />
              </button>
            </div>

            <div className="grid gap-6 p-5 sm:grid-cols-2 sm:p-7">
              <Info
                icon={<Building2 className="size-4" />}
                label="Business name"
                value={businessName}
              />

              <Info
                icon={<Phone className="size-4" />}
                label="Business phone"
                value={businessPhone}
              />

              <div className="sm:col-span-2">
                <Info
                  icon={<MapPin className="size-4" />}
                  label="Business address"
                  value={businessAddress}
                />
              </div>
            </div>
          </section>
        )}

        {isRider && (
          <section className={cardClass}>
            <div className="flex items-center justify-between border-b border-slate-100 p-5 dark:border-slate-700 sm:p-7">
              <div>
                <h2 className={headingClass}>Rider information</h2>
                <p className={descriptionClass}>
                  Your contact and vehicle details.
                </p>
              </div>

              <button
                type="button"
                onClick={openEditor}
                className="rounded-xl px-3 py-2 text-xs font-semibold text-orange-600 hover:bg-orange-50 dark:text-orange-400 dark:hover:bg-slate-800"
              >
                Edit <Pencil className="inline size-3.5" />
              </button>
            </div>

            <div className="grid gap-6 p-5 sm:grid-cols-2 sm:p-7">
              <Info
                icon={<Phone className="size-4" />}
                label="Phone"
                value={phone}
              />

              <Info
                icon={<Truck className="size-4" />}
                label="Vehicle type"
                value={vehicleType}
              />

              <Info
                icon={<ShieldCheck className="size-4" />}
                label="License number"
                value={licenseNumber}
              />

              <div className="sm:col-span-2">
                <Info
                  icon={<MapPin className="size-4" />}
                  label="Address"
                  value={address}
                />
              </div>
            </div>
          </section>
        )}

        {!canEditProfile && (
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <ShieldCheck className="mb-3 size-6 text-orange-500" />

            <h2 className={headingClass}>Administrator account</h2>

            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
              You can update your profile image. Profile information editing is
              not available for this role.
            </p>
          </section>
        )}

        {/* Account overview and logout */}
        <div className="space-y-6">
          <section className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <CircleUserRound className="size-5 text-slate-700 dark:text-slate-200" />

              <div>
                <h2 className={headingClass}>Account overview</h2>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Your registered details
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <Info
                icon={<Mail className="size-4" />}
                label="Login email"
                value={user.email}
              />

              <Info
                icon={<ShieldCheck className="size-4" />}
                label="Assigned role"
                value={role}
              />

              <Info
                icon={<Clock3 className="size-4" />}
                label="Account created"
                value={formatDate(user.createdAt)}
              />
            </div>

            <div className="my-6 border-t border-slate-100 dark:border-slate-700" />

            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400">
                <LogOut className="size-4" />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Sign out
                </h3>

                <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                  Sign out of your SwiftDrop account on this device.
                </p>

                <Button
                  type="button"
                  variant="outline"
                  disabled={isLoggingOut}
                  onClick={() => setLogoutOpen(true)}
                  className="mt-3 gap-2 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950/40"
                >
                  <LogOut className="size-4" />
                  Logout
                </Button>
              </div>
            </div>
          </section>

          <section className="rounded-3xl bg-gradient-to-br from-orange-500 to-orange-600 p-6 text-white shadow-lg">
            <div className="mb-4 flex size-11 items-center justify-center rounded-2xl bg-white/15">
              {isRider ? (
                <Truck className="size-5" />
              ) : isMerchant ? (
                <Building2 className="size-5" />
              ) : (
                <UserRound className="size-5" />
              )}
            </div>

            <h2 className="text-lg font-bold">
              {isRider
                ? "Ready for every delivery"
                : isMerchant
                  ? "Built for your business"
                  : "Your SwiftDrop account"}
            </h2>

            <p className="mt-2 text-sm leading-6 text-orange-50">
              {isRider
                ? "Keep your delivery contact and vehicle details accurate."
                : isMerchant
                  ? "Keep your merchant contact information accurate for daily shipping operations."
                  : "Keep your profile image up to date and your account secure."}
            </p>

            <div className="mt-5 flex items-center gap-2 text-xs font-semibold">
              <Check className="size-4" />
              SwiftDrop workspace
            </div>
          </section>
        </div>
      </div>

      {/* Logout confirmation dialog */}
      <Dialog open={logoutOpen} onOpenChange={setLogoutOpen}>
        <DialogContent className="rounded-2xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-slate-900 dark:text-slate-100">
              Confirm logout
            </DialogTitle>

            <DialogDescription className="text-slate-500 dark:text-slate-400">
              Are you sure you want to log out of your SwiftDrop account?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={isLoggingOut}
              onClick={() => setLogoutOpen(false)}
            >
              Cancel
            </Button>

            <Button
              type="button"
              disabled={isLoggingOut}
              onClick={handleLogout}
              className="gap-2 bg-red-600 text-white hover:bg-red-700"
            >
              {isLoggingOut ? (
                "Logging out..."
              ) : (
                <>
                  <LogOut className="size-4" />
                  Yes, logout
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit profile dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-0 dark:border-slate-700 dark:bg-slate-900 sm:max-w-xl">
          <div className="border-b border-slate-100 bg-slate-50/80 px-6 py-5 dark:border-slate-700 dark:bg-slate-800/70">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">
                {isRider ? "Edit rider profile" : "Edit business profile"}
              </DialogTitle>

              <DialogDescription className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Changes will be saved to your SwiftDrop account.
              </DialogDescription>
            </DialogHeader>
          </div>

          {/* Merchant form */}
          {isMerchant && (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                event.stopPropagation();
                void merchantForm.handleSubmit();
              }}
              className="space-y-5 px-6 py-6 text-slate-900 dark:text-slate-100"
            >
              <merchantForm.Field name="businessName">
                {(field) => (
                  <div className="space-y-2">
                    <label
                      htmlFor={field.name}
                      className="text-sm font-semibold"
                    >
                      Business name
                    </label>

                    <input
                      id={field.name}
                      className={inputClass}
                      maxLength={150}
                      value={field.state.value ?? ""}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                    />

                    <FieldError errors={field.state.meta.errors} />
                  </div>
                )}
              </merchantForm.Field>

              <merchantForm.Field name="businessPhone">
                {(field) => (
                  <div className="space-y-2">
                    <label
                      htmlFor={field.name}
                      className="text-sm font-semibold"
                    >
                      Business phone
                    </label>

                    <input
                      id={field.name}
                      type="tel"
                      inputMode="numeric"
                      className={inputClass}
                      placeholder="01XXXXXXXXX"
                      maxLength={11}
                      value={field.state.value ?? ""}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                    />

                    <FieldError errors={field.state.meta.errors} />
                  </div>
                )}
              </merchantForm.Field>

              <merchantForm.Field name="businessAddress">
                {(field) => (
                  <div className="space-y-2">
                    <label
                      htmlFor={field.name}
                      className="text-sm font-semibold"
                    >
                      Business address
                    </label>

                    <textarea
                      id={field.name}
                      className={`${inputClass} min-h-24`}
                      maxLength={300}
                      value={field.state.value ?? ""}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                    />

                    <FieldError errors={field.state.meta.errors} />
                  </div>
                )}
              </merchantForm.Field>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditOpen(false)}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={merchantMutation.isPending}
                  className="bg-orange-500 text-white hover:bg-orange-600"
                >
                  {merchantMutation.isPending ? "Saving..." : "Save changes"}
                </Button>
              </DialogFooter>
            </form>
          )}

          {/* Rider form */}
          {isRider && (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                event.stopPropagation();
                void riderForm.handleSubmit();
              }}
              className="space-y-5 px-6 py-6 text-slate-900 dark:text-slate-100"
            >
              <riderForm.Field name="phone">
                {(field) => (
                  <div className="space-y-2">
                    <label
                      htmlFor={field.name}
                      className="text-sm font-semibold"
                    >
                      Phone
                    </label>

                    <input
                      id={field.name}
                      type="tel"
                      inputMode="numeric"
                      className={inputClass}
                      placeholder="01XXXXXXXXX"
                      maxLength={11}
                      value={field.state.value ?? ""}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                    />

                    <FieldError errors={field.state.meta.errors} />
                  </div>
                )}
              </riderForm.Field>

              <riderForm.Field name="address">
                {(field) => (
                  <div className="space-y-2">
                    <label
                      htmlFor={field.name}
                      className="text-sm font-semibold"
                    >
                      Address
                    </label>

                    <textarea
                      id={field.name}
                      className={`${inputClass} min-h-24`}
                      maxLength={300}
                      value={field.state.value ?? ""}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                    />

                    <FieldError errors={field.state.meta.errors} />
                  </div>
                )}
              </riderForm.Field>

              <riderForm.Field name="vehicleType">
                {(field) => (
                  <div className="space-y-2">
                    <label
                      htmlFor={field.name}
                      className="text-sm font-semibold"
                    >
                      Vehicle type
                    </label>

                    <select
                      id={field.name}
                      className={inputClass}
                      value={field.state.value ?? ""}
                      onBlur={field.handleBlur}
                      onChange={(event) => {
                        const value = event.target.value;

                        field.handleChange(
                          value ? (value as "BIKE" | "MOTORCYCLE") : undefined,
                        );
                      }}
                    >
                      <option value="">Select vehicle</option>
                      <option value="BIKE">Bike</option>
                      <option value="MOTORCYCLE">Motorcycle</option>
                    </select>

                    <FieldError errors={field.state.meta.errors} />
                  </div>
                )}
              </riderForm.Field>

              <riderForm.Field name="licenseNumber">
                {(field) => (
                  <div className="space-y-2">
                    <label
                      htmlFor={field.name}
                      className="text-sm font-semibold"
                    >
                      License number
                    </label>

                    <input
                      id={field.name}
                      className={inputClass}
                      maxLength={50}
                      value={field.state.value ?? ""}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                    />

                    <FieldError errors={field.state.meta.errors} />
                  </div>
                )}
              </riderForm.Field>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditOpen(false)}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={riderMutation.isPending}
                  className="bg-orange-500 text-white hover:bg-orange-600"
                >
                  {riderMutation.isPending ? "Saving..." : "Save changes"}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Selected image upload panel */}
      {imageFile && (
        <div className="fixed bottom-5 right-5 z-40 flex max-w-[calc(100vw-40px)] items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl dark:border-slate-700 dark:bg-slate-900">
          <div className="flex size-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400">
            <ImagePlus className="size-5" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="max-w-40 truncate text-xs font-semibold text-slate-900 dark:text-slate-100">
              {imageFile.name}
            </p>

            <p className="text-[11px] text-slate-400">
              {imageMutation.isPending ? "Uploading..." : "Ready to upload"}
            </p>
          </div>

          <Button
            type="button"
            disabled={imageMutation.isPending}
            onClick={() =>
              imageMutation.mutate(imageFile, {
                onSuccess: () => {
                  setImageFile(null);
                  setPreview(null);
                },
              })
            }
            className="h-9 rounded-lg bg-orange-500 px-3 text-xs text-white hover:bg-orange-600"
          >
            {imageMutation.isPending ? "Uploading" : "Upload"}
          </Button>

          <button
            type="button"
            disabled={imageMutation.isPending}
            aria-label="Remove selected image"
            onClick={() => setImageFile(null)}
            className="flex size-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="size-4" />
          </button>
        </div>
      )}
    </div>
  );
}
