"use client";

import { GoogleLogin } from "@react-oauth/google";
import { ArrowRight, Bike } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useGoogleOAuth } from "@/hooks";

export default function GoogleLoginComponent() {
  const { mutate: googleLogin, isPending } = useGoogleOAuth();
  const router = useRouter();

  const handleGoogleSuccess = (credentialResponse: { credential?: string }) => {
    const idToken = credentialResponse.credential;

    if (!idToken) {
      toast.error("Google OAuth failed");
      return;
    }

    googleLogin(
      { idToken },
      {
        onSuccess: () => {
          toast.success("Google login successful");
          router.push("/");
        },
        onError: (err: Error) => {
          toast.error(err.message || "Something went wrong. Please try again.");
        },
      },
    );
  };

  const handleGoogleFailed = () => {
    toast.error("Google authentication failed. Please try again.");
  };

  const handleApplyAsRider = () => {
    router.push("/apply-as-rider");
  };

  return (
    <div className="flex w-full flex-col items-center gap-5">
      {/* Google Login */}
      <div className="flex w-full justify-center">
        <GoogleLogin
          theme="outline"
          shape="pill"
          text="continue_with"
          size="large"
          width="360"
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleFailed}
        />
      </div>

      {/* Divider */}
      <div className="flex w-full max-w-[360px] items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs font-medium text-muted-foreground">OR</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* Apply as Rider */}
      <div className="w-full max-w-[360px] rounded-2xl border border-orange-200/70 bg-orange-50/50 p-4 dark:border-orange-900/50 dark:bg-orange-950/20">
        <div className="flex items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600">
            <Bike className="size-6" />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-semibold text-foreground">
              Become a SwiftDrop Rider
            </h3>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Join our delivery team and start your journey.
            </p>
          </div>
        </div>

        <Button
          type="button"
          onClick={handleApplyAsRider}
          disabled={isPending}
          className="mt-4 w-full gap-2 rounded-xl bg-orange-500 font-semibold text-white hover:bg-orange-600"
        >
          Apply as Rider
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
