import Image from "next/image";

import Logo from "@/components/shared/Logo";
import RegisterForm from "@/components/form/RegisterForm";
import {
  CheckCircle2,
  CircleDot,
  Package,
  ShieldCheck,
  Truck,
} from "lucide-react";

const RegisterPage = () => {
  return (
    <main className="min-h-screen bg-background">
      <div className="grid min-h-screen lg:grid-cols-[0.95fr_1.05fr]">
        {/* ─────────────────────────────────────────────
            LEFT — PRODUCT / BRAND EXPERIENCE
        ───────────────────────────────────────────── */}

        <section className="relative hidden min-h-screen overflow-hidden bg-foreground text-background lg:flex lg:flex-col">
          {/* Ambient background */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-40 top-20 size-[520px] rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -bottom-40 right-0 size-[480px] rounded-full bg-primary/10 blur-3xl" />

            <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:56px_56px]" />
          </div>

          <div className="relative z-10 flex min-h-screen flex-col px-10 py-9 xl:px-14">
            {/* Logo */}
            <Logo />

            {/* Main content */}
            <div className="flex flex-1 items-center py-12">
              <div className="w-full max-w-xl">
                {/* Eyebrow */}
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-background/60 backdrop-blur">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/50" />
                    <span className="relative inline-flex size-2 rounded-full bg-primary" />
                  </span>
                  Modern logistics platform
                </div>

                {/* Heading */}
                <h1 className="mt-7 max-w-lg text-5xl font-bold leading-[1.02] tracking-[-0.055em] xl:text-6xl">
                  Your deliveries,
                  <br />
                  <span className="text-primary">under control.</span>
                </h1>

                <p className="mt-6 max-w-lg text-[15px] leading-7 text-background/55">
                  Create shipments, coordinate riders, manage payments, and
                  track every delivery from one connected workspace.
                </p>

                {/* Product visual */}
                <div className="relative mt-10">
                  <div className="absolute -inset-5 rounded-[2rem] bg-primary/10 blur-2xl" />

                  <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.045] shadow-2xl">
                    <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-background/40">
                          Merchant workspace
                        </p>

                        <p className="mt-1 text-sm font-semibold">
                          Delivery overview
                        </p>
                      </div>

                      <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1.5">
                        <span className="size-1.5 rounded-full bg-primary" />
                        <span className="text-[10px] font-medium text-primary">
                          Live
                        </span>
                      </div>
                    </div>

                    <div className="relative h-[260px] overflow-hidden">
                      <Image
                        src="/login1.jpg"
                        alt="SwiftDrop delivery operations"
                        fill
                        className="object-cover opacity-75"
                        sizes="(max-width: 1280px) 50vw, 600px"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/10 to-transparent" />

                      {/* Shipment floating card */}
                      <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/10 bg-foreground/75 p-4 backdrop-blur-xl">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex size-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
                              <Package className="size-4" />
                            </div>

                            <div>
                              <p className="text-xs font-semibold">
                                SD-20481
                              </p>
                              <p className="mt-0.5 text-[10px] text-background/45">
                                Gulshan → Mirpur
                              </p>
                            </div>
                          </div>

                          <div className="rounded-full bg-primary/10 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wide text-primary">
                            In transit
                          </div>
                        </div>

                        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                          <div className="h-full w-[72%] rounded-full bg-primary" />
                        </div>

                        <div className="mt-2 flex justify-between text-[9px] text-background/35">
                          <span>Picked up</span>
                          <span>72% delivered</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating metrics */}
                  <div className="absolute -right-4 -top-4 hidden rounded-2xl border border-white/10 bg-foreground/90 p-3 shadow-xl backdrop-blur-xl xl:block">
                    <div className="flex items-center gap-2.5">
                      <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Truck className="size-4" />
                      </div>

                      <div>
                        <p className="text-[10px] text-background/40">
                          Active riders
                        </p>
                        <p className="text-sm font-bold">24</p>
                      </div>
                    </div>
                  </div>

                  <div className="absolute -bottom-5 -left-4 hidden rounded-2xl border border-white/10 bg-foreground/90 px-4 py-3 shadow-xl backdrop-blur-xl xl:block">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="size-4 text-primary" />

                      <div>
                        <p className="text-[10px] text-background/40">
                          Deliveries completed
                        </p>
                        <p className="text-sm font-bold">1,284</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trust points */}
                <div className="mt-12 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                  <TrustPoint
                    icon={ShieldCheck}
                    title="Secure"
                    description="Protected payments"
                  />

                  <TrustPoint
                    icon={Truck}
                    title="Reliable"
                    description="Rider operations"
                  />

                  <TrustPoint
                    icon={CircleDot}
                    title="Connected"
                    description="Live tracking"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-white/10 pt-6">
              <p className="text-[11px] text-background/35">
                © {new Date().getFullYear()} SwiftDrop
              </p>

              <p className="text-[11px] text-background/30">
                Built for better deliveries.
              </p>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────
            RIGHT — REGISTER WORKSPACE
        ───────────────────────────────────────────── */}

        <section className="relative min-h-screen bg-background">
          {/* Mobile header */}
          <div className="border-b border-border px-5 py-5 lg:hidden">
            <Logo />
          </div>

          <div className="mx-auto flex min-h-[calc(100vh-73px)] max-w-2xl items-center px-5 py-12 sm:px-8 lg:min-h-screen lg:px-12 xl:px-20">
            <div className="w-full">
              {/* Small progress indicator */}
              <div className="mb-8 flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="flex size-6 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    1
                  </span>

                  <span className="text-xs font-semibold">
                    Account
                  </span>
                </div>

                <div className="h-px w-8 bg-border" />

                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="flex size-6 items-center justify-center rounded-full border border-border text-[10px] font-semibold">
                    2
                  </span>

                  <span className="text-xs font-medium">
                    Verification
                  </span>
                </div>

                <div className="hidden h-px w-8 bg-border sm:block" />

                <div className="hidden items-center gap-2 text-muted-foreground sm:flex">
                  <span className="flex size-6 items-center justify-center rounded-full border border-border text-[10px] font-semibold">
                    3
                  </span>

                  <span className="text-xs font-medium">
                    Workspace
                  </span>
                </div>
              </div>

              {/* Register form */}
              <RegisterForm />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

interface TrustPointProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const TrustPoint = ({
  icon: Icon,
  title,
  description,
}: TrustPointProps) => {
  return (
    <div className="flex items-start gap-2.5">
      <Icon className="mt-0.5 size-4 shrink-0 text-primary" />

      <div>
        <p className="text-[11px] font-semibold">{title}</p>

        <p className="mt-0.5 text-[10px] text-background/35">
          {description}
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;