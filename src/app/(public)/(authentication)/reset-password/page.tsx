
import { KeyRound, ShieldCheck } from "lucide-react";

import Logo from "@/components/shared/Logo";
import ResetPasswordForm from "@/components/form/ResetPasswordForm";

const ResetPasswordPage = () => {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-2">
        {/* Left Panel */}
        <section className="relative hidden overflow-hidden bg-foreground p-10 text-background lg:flex lg:flex-col lg:justify-between">
          <div className="absolute -left-32 -top-32 size-96 rounded-full bg-primary/20 blur-3xl" />

          <div className="relative">
            <Logo />
          </div>

          <div className="relative max-w-md">
            <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <ShieldCheck className="size-6" />
            </div>

            <h1 className="text-4xl font-semibold tracking-tight xl:text-5xl">
              Secure your account again.
            </h1>

            <p className="mt-5 text-sm leading-7 text-background/60">
              Choose a strong password and get back to managing your
              shipments, riders, payments, and deliveries.
            </p>

            <div className="mt-8 flex items-center gap-3 text-sm text-background/70">
              <KeyRound className="size-5 text-primary" />
              Your account stays protected
            </div>
          </div>

          <p className="relative text-xs text-background/40">
            © {new Date().getFullYear()} SwiftDrop. All rights reserved.
          </p>
        </section>

        {/* Right Panel */}
        <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
          <div className="w-full max-w-md">
            <div className="mb-10 lg:hidden">
              <Logo />
            </div>

            <div className="mb-8">
              <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <KeyRound className="size-5" />
              </div>

              <h2 className="text-3xl font-semibold tracking-tight">
                Create a new password
              </h2>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Enter the verification code sent to your email and
                choose a new password for your account.
              </p>
            </div>

            <ResetPasswordForm />
          </div>
        </section>
      </div>
    </main>
  );
};

export default ResetPasswordPage;