"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { GoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
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
        onError: (err: any) => {
          toast.error(err.message || "Something went wrong. Please try again.");
        },
      },
    );
  };

  const handleGoogleFailed = () => {
    toast.error("Google authentication failed. Please try again.");
  };

 return (
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
);
}
