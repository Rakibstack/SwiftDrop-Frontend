
"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Building2,
  Camera,
  Check,
  ChevronRight,
  CircleUserRound,
  Clock3,
  ImagePlus,
  LockKeyhole,
  Mail,
  MapPin,
  Pencil,
  Phone,
  ShieldCheck,
  Sparkles,
  Truck,
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
import { useCurrentUser } from "@/hooks";

type MerchantProfile = {
  businessName?: string | null;
  businessPhone?: string | null;
  businessAddress?: string | null;
};

type ProfileUser = {
  id?: string;
  name?: string ;
  email?: string 
  role?: string;
  status?: string;
  imageUrl?: string | null;
  emailVerified?: boolean;
  createdAt?: string;
  merchantProfile?: MerchantProfile | null;
  businessName?: string | null;
  businessPhone?: string | null;
  businessAddress?: string | null;
};

type MerchantFormValues = {
  businessName: string;
  businessPhone: string;
  businessAddress: string;
};

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10";

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
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function formatDate(value?: string) {
  if (!value) return "Not available";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Not available";

  return new Intl.DateTimeFormat("en-BD", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function ProfileSkeleton() {
  return (
    <div className="mx-auto max-w-7xl animate-pulse space-y-6">
      <div className="h-8 w-52 rounded-lg bg-slate-200" />
      <div className="h-64 rounded-3xl bg-slate-100" />
      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="h-80 rounded-3xl bg-slate-100" />
        <div className="h-80 rounded-3xl bg-slate-100" />
      </div>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string | null;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-500 ring-1 ring-slate-100">
        {icon}
      </div>
      <div className="min-w-0 flex-1 pt-0.5">
        <p className="text-xs font-medium text-slate-400">{label}</p>
        <p className="mt-1 break-words text-sm font-semibold leading-6 text-slate-800">
          {value?.trim() || "Not provided"}
        </p>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const currentUserQuery = useCurrentUser();

  const rawUser = currentUserQuery.data as
    | (ProfileUser & { data?: ProfileUser })
    | undefined;

  const user = rawUser?.data ?? rawUser;

  const merchant = user?.merchantProfile;

  const businessName =
    merchant?.businessName ?? user?.businessName ?? "";

  const businessPhone =
    merchant?.businessPhone ?? user?.businessPhone ?? "";

  const businessAddress =
    merchant?.businessAddress ?? user?.businessAddress ?? "";

  const profileImage =
    user?.imageUrl ?? null;

  const [editOpen, setEditOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [form, setForm] = useState<MerchantFormValues>({
    businessName: "",
    businessPhone: "",
    businessAddress: "",
  });

  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof MerchantFormValues, string>>
  >({});

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setForm({
      businessName,
      businessPhone,
      businessAddress,
    });
  }, [businessName, businessPhone, businessAddress]);

  useEffect(() => {
    if (!imageFile) {
      setImagePreview(null);
      return;
    }

    const url = URL.createObjectURL(imageFile);
    setImagePreview(url);

    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  const isMerchant = user?.role === "MERCHANT";
  const displayName = user?.name || "SwiftDrop User";
  const displayRole = formatRole(user?.role);
  const displayImage = imagePreview || profileImage;

  const openEditor = () => {
    setForm({
      businessName,
      businessPhone,
      businessAddress,
    });
    setFieldErrors({});
    setEditOpen(true);
  };

  const validateForm = () => {
    const errors: typeof fieldErrors = {};

    const name = form.businessName.trim();
    const phone = form.businessPhone.trim();
    const address = form.businessAddress.trim();

    if (name && (name.length < 2 || name.length > 150)) {
      errors.businessName =
        "Business name must be between 2 and 150 characters.";
    }

    if (phone && !/^01[3-9]\d{8}$/.test(phone)) {
      errors.businessPhone =
        "Enter a valid Bangladeshi mobile number.";
    }

    if (address && (address.length < 5 || address.length > 300)) {
      errors.businessAddress =
        "Address must be between 5 and 300 characters.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) return;

    // TODO: Connect the merchant profile update mutation here.
    // Send only the supported fields to the backend.
    toast.info("Merchant profile update API is not connected yet.");
  };

  const handleImageSelection = (file?: File) => {
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      toast.error("Choose a JPG, PNG, or WebP image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be 5 MB or less.");
      return;
    }

    setImageFile(file);
    toast.info("Image preview updated. Upload API is not connected yet.");
  };

  if (currentUserQuery.isPending) {
    return <ProfileSkeleton />;
  }

  if (currentUserQuery.isError || !user) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
        <CircleUserRound className="mb-4 size-12 text-slate-300" />
        <h1 className="text-xl font-bold text-slate-900">
          Profile unavailable
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          We couldn&apos;t load your account details.
        </p>
        <Button
          type="button"
          onClick={() => currentUserQuery.refetch()}
          disabled={currentUserQuery.isFetching}
          className="mt-5 bg-orange-500 text-white hover:bg-orange-600"
        >
          {currentUserQuery.isFetching ? "Loading..." : "Try again"}
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-7 pb-10">
      {/* Heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="mb-3 flex items-center gap-2 text-xs font-medium text-slate-400">
            <span>Workspace</span>
            <ChevronRight className="size-3.5" />
            <span className="text-slate-600">My profile</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-lg shadow-orange-500/20">
              <CircleUserRound className="size-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                Profile & workspace
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Manage your identity and business information.
              </p>
            </div>
          </div>
        </div>

        <Button
          type="button"
          onClick={openEditor}
          className="h-11 gap-2 rounded-xl bg-slate-950 px-5 text-white shadow-sm hover:bg-slate-800"
        >
          <Pencil className="size-4" />
          Edit profile
        </Button>
      </div>

      {/* Hero card */}
      <section className="relative overflow-hidden rounded-[28px] bg-slate-950 text-white shadow-xl shadow-slate-900/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(249,115,22,0.24),transparent_48%)]" />
        <div className="absolute -right-16 -top-28 size-80 rounded-full border border-white/[0.07]" />
        <div className="absolute -right-4 -top-16 size-56 rounded-full border border-white/[0.07]" />
        <div className="absolute bottom-0 left-1/3 h-1 w-1/3 bg-gradient-to-r from-transparent via-orange-400/70 to-transparent" />

        <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:p-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="relative size-24 shrink-0 sm:size-28">
              <div className="absolute -inset-1 rounded-[30px] bg-gradient-to-br from-orange-400 to-orange-700 opacity-80 blur-sm" />
              <div className="relative size-full overflow-hidden rounded-[26px] border border-white/20 bg-slate-800">
                {displayImage ? (
                  <img
                    src={displayImage}
                    alt={`${displayName} profile`}
                    className="size-full object-cover"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center bg-gradient-to-br from-orange-400 to-orange-700 text-3xl font-bold">
                    {getInitials(displayName)}
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                aria-label="Choose profile image"
                className="absolute -bottom-2 -right-2 flex size-10 items-center justify-center rounded-xl border-2 border-slate-950 bg-orange-500 text-white shadow-lg transition hover:bg-orange-400"
              >
                <Camera className="size-4" />
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(event) => {
                  handleImageSelection(event.target.files?.[0]);
                  event.currentTarget.value = "";
                }}
              />
            </div>

            <div className="min-w-0">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.07] px-2.5 py-1 text-[11px] font-semibold tracking-wide text-slate-200">
                  <ShieldCheck className="size-3.5 text-emerald-400" />
                  {displayRole}
                </span>
                {user.status && (
                  <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-300">
                    {formatRole(user.status)}
                  </span>
                )}
              </div>

              <h2 className="truncate text-2xl font-bold tracking-tight sm:text-3xl">
                {displayName}
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

          <div className="flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row lg:min-w-52 lg:flex-col lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-white/[0.07]">
                <Building2 className="size-5 text-orange-300" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Workspace</p>
                <p className="mt-0.5 text-sm font-semibold">
                  {isMerchant ? "Merchant account" : `${displayRole} account`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-white/[0.07]">
                <LockKeyhole className="size-5 text-emerald-300" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Account access</p>
                <p className="mt-0.5 text-sm font-semibold">
                  Role protected
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profile content */}
      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(300px,0.8fr)]">
        {/* Business information */}
        <section className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm">
          <div className="flex items-start justify-between gap-4 border-b border-slate-100 p-5 sm:p-7">
            <div className="flex gap-3">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
                <Building2 className="size-5" />
              </div>
              <div>
                <h2 className="font-bold text-slate-900">
                  Business information
                </h2>
                <p className="mt-1 text-sm leading-5 text-slate-500">
                  Your merchant workspace details.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={openEditor}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold text-orange-600 transition hover:bg-orange-50"
            >
              Edit
              <ArrowUpRight className="size-3.5" />
            </button>
          </div>

          <div className="grid gap-6 p-5 sm:grid-cols-2 sm:p-7">
            <InfoRow
              icon={<Building2 className="size-4" />}
              label="Business name"
              value={businessName}
            />

            <InfoRow
              icon={<Phone className="size-4" />}
              label="Business phone"
              value={businessPhone}
            />

            <div className="sm:col-span-2">
              <InfoRow
                icon={<MapPin className="size-4" />}
                label="Business address"
                value={businessAddress}
              />
            </div>
          </div>

          {!businessName && !businessPhone && !businessAddress && (
            <div className="mx-5 mb-5 rounded-2xl border border-dashed border-orange-200 bg-orange-50/60 p-4 sm:mx-7 sm:mb-7">
              <div className="flex items-start gap-3">
                <Sparkles className="mt-0.5 size-5 shrink-0 text-orange-500" />
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Complete your business profile
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Add your business contact details to keep your merchant
                    workspace information up to date.
                  </p>
                  <button
                    type="button"
                    onClick={openEditor}
                    className="mt-3 text-xs font-bold text-orange-600 hover:text-orange-700"
                  >
                    Add business information →
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Account panel */}
        <div className="space-y-6">
          <section className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                <CircleUserRound className="size-5" />
              </div>
              <div>
                <h2 className="font-bold text-slate-900">Account overview</h2>
                <p className="mt-1 text-xs text-slate-500">
                  Your registered details
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <InfoRow
                icon={<Mail className="size-4" />}
                label="Login email"
                value={user.email}
              />

              <InfoRow
                icon={<ShieldCheck className="size-4" />}
                label="Assigned role"
                value={displayRole}
              />

              <InfoRow
                icon={<Clock3 className="size-4" />}
                label="Account created"
                value={formatDate(user.createdAt)}
              />
            </div>
          </section>

          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 to-orange-600 p-6 text-white shadow-lg shadow-orange-500/15">
            <div className="absolute -right-8 -top-8 size-36 rounded-full border border-white/15" />
            <div className="absolute -right-1 -top-1 size-20 rounded-full border border-white/15" />

            <div className="relative">
              <div className="mb-4 flex size-11 items-center justify-center rounded-2xl bg-white/15">
                <Truck className="size-5" />
              </div>

              <h2 className="text-lg font-bold">Built for your business</h2>
              <p className="mt-2 text-sm leading-6 text-orange-50">
                Keep your merchant contact information accurate so your
                workspace stays ready for daily shipping operations.
              </p>

              <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-white/90">
                <Check className="size-4" />
                SwiftDrop merchant workspace
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Merchant profile edit modal */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-0 sm:max-w-xl">
          <div className="border-b border-slate-100 bg-slate-50/80 px-6 py-5 sm:px-7">
            <DialogHeader>
              <div className="mb-3 flex size-11 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                <Building2 className="size-5" />
              </div>
              <DialogTitle className="text-xl font-bold tracking-tight text-slate-950">
                Edit business profile
              </DialogTitle>
              <DialogDescription className="mt-1 text-sm leading-6 text-slate-500">
                Update your merchant business details. Your changes will be
                saved when the profile update API is connected.
              </DialogDescription>
            </DialogHeader>
          </div>

          <form onSubmit={handleSave}>
            <div className="space-y-5 px-6 py-6 sm:px-7">
              <div className="space-y-2">
                <label
                  htmlFor="businessName"
                  className="text-sm font-semibold text-slate-700"
                >
                  Business name
                </label>
                <input
                  id="businessName"
                  className={inputClass}
                  placeholder="e.g. Rakib Enterprise"
                  value={form.businessName}
                  maxLength={150}
                  onChange={(event) => {
                    setForm((previous) => ({
                      ...previous,
                      businessName: event.target.value,
                    }));
                    setFieldErrors((previous) => ({
                      ...previous,
                      businessName: undefined,
                    }));
                  }}
                  aria-invalid={Boolean(fieldErrors.businessName)}
                />
                {fieldErrors.businessName ? (
                  <p className="text-xs text-red-600">
                    {fieldErrors.businessName}
                  </p>
                ) : (
                  <p className="text-xs text-slate-400">
                    2–150 characters. Leave empty if not applicable.
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="businessPhone"
                  className="text-sm font-semibold text-slate-700"
                >
                  Business phone
                </label>
                <div className="relative">
                  <Phone className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                  <input
                    id="businessPhone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    className={`${inputClass} pl-10`}
                    placeholder="01XXXXXXXXX"
                    value={form.businessPhone}
                    maxLength={11}
                    onChange={(event) => {
                      setForm((previous) => ({
                        ...previous,
                        businessPhone: event.target.value,
                      }));
                      setFieldErrors((previous) => ({
                        ...previous,
                        businessPhone: undefined,
                      }));
                    }}
                    aria-invalid={Boolean(fieldErrors.businessPhone)}
                  />
                </div>
                {fieldErrors.businessPhone ? (
                  <p className="text-xs text-red-600">
                    {fieldErrors.businessPhone}
                  </p>
                ) : (
                  <p className="text-xs text-slate-400">
                    Use a valid Bangladeshi mobile number.
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="businessAddress"
                  className="text-sm font-semibold text-slate-700"
                >
                  Business address
                </label>
                <div className="relative">
                  <MapPin className="pointer-events-none absolute left-3.5 top-3.5 size-4 text-slate-400" />
                  <textarea
                    id="businessAddress"
                    className={`${inputClass} min-h-28 resize-y pl-10`}
                    placeholder="Enter your full business address"
                    value={form.businessAddress}
                    maxLength={300}
                    onChange={(event) => {
                      setForm((previous) => ({
                        ...previous,
                        businessAddress: event.target.value,
                      }));
                      setFieldErrors((previous) => ({
                        ...previous,
                        businessAddress: undefined,
                      }));
                    }}
                    aria-invalid={Boolean(fieldErrors.businessAddress)}
                  />
                </div>
                {fieldErrors.businessAddress ? (
                  <p className="text-xs text-red-600">
                    {fieldErrors.businessAddress}
                  </p>
                ) : (
                  <p className="text-xs text-slate-400">
                    5–300 characters. Leave empty if not applicable.
                  </p>
                )}
              </div>
            </div>

            <DialogFooter className="flex flex-col-reverse gap-2 border-t border-slate-100 bg-slate-50/70 px-6 py-4 sm:flex-row sm:px-7">
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditOpen(false)}
                className="rounded-xl"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                className="gap-2 rounded-xl bg-orange-500 text-white hover:bg-orange-600"
              >
                <Check className="size-4" />
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Image upload is intentionally separate from business details. */}
      {imageFile && (
        <div className="fixed bottom-5 right-5 z-40 flex max-w-[calc(100vw-40px)] items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
            <ImagePlus className="size-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-slate-800">
              {imageFile.name}
            </p>
            <p className="text-[11px] text-slate-400">
              Preview only · Upload API pending
            </p>
          </div>
          <button
            type="button"
            aria-label="Remove selected image"
            onClick={() => setImageFile(null)}
            className="flex size-8 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="size-4" />
          </button>
        </div>
      )}
    </div>
  );
}
