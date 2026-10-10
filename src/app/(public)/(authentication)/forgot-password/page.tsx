import { ArrowLeft, KeyRound, ShieldCheck } from "lucide-react";
import Link from "next/link";
import ForgotPasswordForm from "@/components/form/ForgotPasswordForm";
import Logo from "@/components/shared/Logo";

const ForgotPasswordPage = () => {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-2">
        {/* Left Panel */}
        <section className="relative hidden overflow-hidden bg-foreground p-10 text-background lg:flex lg:flex-col lg:justify-between">
          <div className="absolute -right-32 -top-32 size-96 rounded-full bg-primary/20 blur-3xl" />

          <div className="relative">
            <Logo />
          </div>

          <div className="relative max-w-md">
            <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <KeyRound className="size-6" />
            </div>

            <h1 className="text-4xl font-semibold tracking-tight xl:text-5xl">
              Get back into your workspace.
            </h1>

            <p className="mt-5 text-sm leading-7 text-background/60">
              Enter the email address associated with your SwiftDrop account.
              We&apos;ll send you a secure verification code to reset your
              password.
            </p>

            <div className="mt-8 flex items-center gap-3 text-sm text-background/70">
              <ShieldCheck className="size-5 text-primary" />
              Secure password recovery
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

            <Link
              href="/login"
              className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-4" />
              Back to login
            </Link>

            <div className="mb-8">
              <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <KeyRound className="size-5" />
              </div>

              <h2 className="text-3xl font-semibold tracking-tight">
                Forgot your password?
              </h2>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                No worries. Enter your email and we&apos;ll send you a
                verification code to create a new password.
              </p>
            </div>

            <ForgotPasswordForm />
          </div>
        </section>
      </div>
    </main>
  );
};

export default ForgotPasswordPage;
