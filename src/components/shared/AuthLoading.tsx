import { Package } from "lucide-react";

const AuthLoading = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5">
      <div className="flex w-full max-w-sm flex-col items-center text-center">
        {/* Icon */}
        <div className="relative flex size-16 items-center justify-center rounded-[20px] bg-foreground text-background shadow-xl shadow-black/10">
          <Package className="size-7" strokeWidth={1.8} />

          <span className="absolute inset-0 animate-ping rounded-[20px] bg-primary/20" />
        </div>

        {/* Text */}
        <p className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-primary">
          SwiftDrop
        </p>

        <h1 className="mt-2 text-xl font-bold tracking-[-0.035em]">
          Checking your workspace
        </h1>

        <p className="mt-2 max-w-xs text-sm leading-6 text-muted-foreground">
          Verifying your account and preparing your delivery workspace...
        </p>

        {/* Progress */}
        <div className="mt-7 h-1 w-40 overflow-hidden rounded-full bg-secondary">
          <div className="h-full w-1/2 animate-[auth-loading_1.4s_ease-in-out_infinite] rounded-full bg-primary" />
        </div>

        <p className="mt-4 text-[11px] text-muted-foreground/70">
          Please wait a moment
        </p>
      </div>
    </main>
  );
};

export default AuthLoading;
