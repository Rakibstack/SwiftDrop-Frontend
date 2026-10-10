import { Package } from "lucide-react";

const Loading = () => {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-5">
      <div className="flex flex-col items-center text-center">
        {/* Logo mark */}
        <div className="relative flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
          <Package className="size-6" strokeWidth={1.9} />

          <span className="absolute inset-0 animate-ping rounded-2xl bg-primary/20" />
        </div>

        {/* Loading text */}
        <div className="mt-6">
          <p className="text-sm font-semibold tracking-tight">
            Loading SwiftDrop
          </p>

          <p className="mt-1.5 text-xs text-muted-foreground">
            Preparing your delivery workspace...
          </p>
        </div>

        {/* Progress indicator */}
        <div className="mt-6 h-1 w-32 overflow-hidden rounded-full bg-secondary">
          <div className="h-full w-1/2 animate-[loading_1.4s_ease-in-out_infinite] rounded-full bg-primary" />
        </div>
      </div>
    </main>
  );
};

export default Loading;
