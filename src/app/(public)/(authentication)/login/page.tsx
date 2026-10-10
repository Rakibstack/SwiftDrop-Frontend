import Link from "next/link";
import LoginForm from "@/components/form/LoginForm";
import Logo from "@/components/shared/Logo";

const LoginPage = () => {
  return (
    <main className="min-h-screen bg-background">
      <div className="grid min-h-screen lg:grid-cols-[0.9fr_1.1fr]">
        {/* Left — Brand Panel */}
        <section className="relative hidden overflow-hidden bg-foreground lg:flex lg:flex-col">
          {/* Ambient glow */}
          <div className="absolute -left-32 -top-32 size-96 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-40 -right-32 size-[28rem] rounded-full bg-primary/10 blur-3xl" />

          {/* Grid texture */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          <div className="relative z-10 flex h-full flex-col px-10 py-10 xl:px-14">
            <Logo />

            <div className="my-auto max-w-lg">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                SwiftDrop Logistics
              </p>

              <h1 className="mt-5 text-5xl font-bold leading-[1.05] tracking-[-0.05em] text-background xl:text-6xl">
                Your deliveries.
                <br />
                <span className="text-primary">Under control.</span>
              </h1>

              <p className="mt-6 max-w-md text-sm leading-7 text-background/60">
                Manage shipments, payments, riders and delivery operations from
                one powerful logistics workspace.
              </p>

              {/* Product preview */}
              <div className="mt-10 overflow-hidden rounded-3xl border border-background/10 bg-background/[0.06] p-4 backdrop-blur">
                <div className="rounded-2xl border border-background/10 bg-background/[0.05] p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-background/45">
                        Active shipment
                      </p>

                      <p className="mt-1 text-sm font-semibold text-background">
                        SD-20481
                      </p>
                    </div>

                    <span className="rounded-full bg-primary/15 px-2.5 py-1 text-[10px] font-semibold text-primary">
                      IN TRANSIT
                    </span>
                  </div>

                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                      G
                    </div>

                    <div className="h-px flex-1 bg-background/10" />

                    <div className="flex size-9 items-center justify-center rounded-full border border-background/10 text-xs font-bold text-background/70">
                      M
                    </div>
                  </div>

                  <div className="mt-2 flex justify-between text-[10px] text-background/40">
                    <span>Gulshan</span>
                    <span>Mirpur</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-8">
                <div>
                  <p className="text-2xl font-bold text-background">1,284</p>
                  <p className="mt-1 text-xs text-background/40">
                    Deliveries completed
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-bold text-background">24</p>
                  <p className="mt-1 text-xs text-background/40">
                    Active riders
                  </p>
                </div>
              </div>
            </div>

            <p className="text-xs text-background/35">
              © {new Date().getFullYear()} SwiftDrop. Built for modern logistics
              teams.
            </p>
          </div>
        </section>

        {/* Right — Login Workspace */}
        <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
          <div className="w-full max-w-md">
            {/* Mobile logo */}
            <div className="mb-10 lg:hidden">
              <Logo />
            </div>

            {/* Header */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                Welcome back
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
                Sign in to SwiftDrop
              </h2>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Access your logistics workspace and keep every delivery moving.
              </p>
            </div>

            {/* Login form */}
            <div className="mt-8">
              <LoginForm />
            </div>

            {/* Register CTA */}
            <p className="mt-8 text-center text-xs text-muted-foreground">
              New to SwiftDrop?{" "}
              <Link
                href="/register"
                className="font-semibold text-primary transition-colors hover:text-primary/80"
              >
                Create your merchant account
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default LoginPage;
