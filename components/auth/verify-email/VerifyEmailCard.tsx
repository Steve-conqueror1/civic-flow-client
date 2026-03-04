"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle, XCircle, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VerifyEmailCardProps {
  token: string | null;
}

type VerifyState = "loading" | "success" | "error";

const VerifyEmailCard = ({ token }: VerifyEmailCardProps) => {
  const [state, setState] = useState<VerifyState>("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setState("error");
      setErrorMessage("Invalid or missing verification token.");
      return;
    }

    const verify = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/verify-email?token=${token}`,
        );
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(
            err?.message ?? "Verification failed. Please try again.",
          );
        }
        setState("success");
      } catch (err) {
        setState("error");
        setErrorMessage(
          err instanceof Error
            ? err.message
            : "Verification failed. Please try again.",
        );
      }
    };

    verify();
  }, [token]);

  return (
    <div
      className="max-w-md w-full bg-white dark:bg-card p-8 rounded-xl shadow-sm border border-primary/10 flex flex-col items-center text-center"
      aria-live="polite"
    >
      {state === "loading" && (
        <>
          <div className="mb-6 flex items-center justify-center">
            <div className="size-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
              <Loader2
                className="size-10 text-primary animate-spin"
                aria-hidden="true"
              />
            </div>
          </div>
          <h1 className="text-slate-900 dark:text-slate-100 text-3xl font-bold tracking-tight mb-4">
            Verifying your email&hellip;
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
            Please wait while we verify your email address.
          </p>
        </>
      )}

      {state === "success" && (
        <>
          <div className="mb-6 flex items-center justify-center">
            <div className="size-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <CheckCircle
                className="size-10 text-green-600 dark:text-green-400"
                aria-hidden="true"
              />
            </div>
          </div>
          <h1 className="text-slate-900 dark:text-slate-100 text-3xl font-bold tracking-tight mb-4">
            Email Verified Successfully
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed mb-8">
            Thank you for verifying your email address. Your account is now
            active and you can access all Alberta public services.
          </p>
          <Button asChild size="lg" className="w-full">
            <Link href="/login">
              Proceed to Login
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </Button>
        </>
      )}

      {state === "error" && (
        <>
          <div className="mb-6 flex items-center justify-center">
            <div className="size-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
              <XCircle
                className="size-10 text-red-600 dark:text-red-400"
                aria-hidden="true"
              />
            </div>
          </div>
          <h1 className="text-slate-900 dark:text-slate-100 text-3xl font-bold tracking-tight mb-4">
            Verification Failed
          </h1>
          <p
            role="alert"
            className="text-slate-600 dark:text-slate-400 text-base leading-relaxed mb-8"
          >
            {errorMessage}
          </p>
        </>
      )}

      <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 w-full">
        <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-widest font-semibold">
          Authorized by the Government of Alberta
        </p>
      </div>
    </div>
  );
};

export default VerifyEmailCard;
