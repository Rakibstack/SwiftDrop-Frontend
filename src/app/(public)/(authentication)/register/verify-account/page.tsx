import VerifyAccountForm from "@/components/form/VerifyAccountForm";
import Logo from "@/components/shared/Logo";

const VerifyEmailPage = () => {
  return (
    <main className="min-h-screen bg-background">
      <div className="grid min-h-screen lg:grid-cols-[0.9fr_1.1fr]">
        {/* Brand panel */}

        <section className="relative hidden overflow-hidden bg-foreground text-background lg:flex lg:flex-col">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-40 top-1/4 size-[500px] rounded-full bg-primary/20 blur-3xl" />

            <div className="absolute -bottom-40 right-0 size-[500px] rounded-full bg-primary/10 blur-3xl" />

            <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:56px_56px]" />
          </div>

          <div className="relative z-10 flex min-h-screen flex-col p-10 xl:p-14">
            <Logo />

            <div className="flex flex-1 items-center">
              <div className="max-w-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  Secure account verification
                </p>

                <h1 className="mt-6 text-5xl font-bold leading-[1.03] tracking-[-0.05em] xl:text-6xl">
                  One step away
                  <br />
                  from <span className="text-primary">SwiftDrop.</span>
                </h1>

                <p className="mt-6 max-w-lg text-base leading-7 text-background/55">
                  Verify your email address to activate your account and
                  securely access your delivery workspace.
                </p>

                <div className="mt-10 space-y-4">
                  <VerificationPoint
                    number="01"
                    title="Check your inbox"
                    description="We've sent a 6-digit verification code to your email."
                  />

                  <VerificationPoint
                    number="02"
                    title="Enter your code"
                    description="Use the verification code to confirm your email."
                  />

                  <VerificationPoint
                    number="03"
                    title="Start managing deliveries"
                    description="Access your SwiftDrop workspace after verification."
                  />
                </div>
              </div>
            </div>

            <p className="text-xs text-background/35">
              © {new Date().getFullYear()} SwiftDrop. Built for better
              deliveries.
            </p>
          </div>
        </section>

        {/* Verification panel */}

        <section className="flex min-h-screen items-center justify-center px-5 py-12 sm:px-8 lg:px-12 xl:px-20">
          <div className="w-full max-w-md">
            <div className="mb-8 lg:hidden">
              <Logo />
            </div>

            <VerifyAccountForm mode="merchant" />
          </div>
        </section>
      </div>
    </main>
  );
};

interface VerificationPointProps {
  number: string;
  title: string;
  description: string;
}

const VerificationPoint = ({
  number,
  title,
  description,
}: VerificationPointProps) => {
  return (
    <div className="flex gap-4">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05] text-[10px] font-bold text-primary">
        {number}
      </div>

      <div>
        <p className="text-sm font-semibold">{title}</p>

        <p className="mt-1 text-xs leading-5 text-background/40">
          {description}
        </p>
      </div>
    </div>
  );
};

export default VerifyEmailPage;