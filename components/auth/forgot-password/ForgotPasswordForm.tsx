"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Mail, ArrowRight, ArrowLeft, KeyRound, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/shared";

type ForgotPasswordValues = {
  email: string;
};

export const ForgotPasswordForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordValues>();

  const onSubmit = (data: ForgotPasswordValues) => {
    setSubmittedEmail(data.email);
    setSubmitted(true);
    // TODO: call password reset API endpoint
  };

  return (
    <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
      {/* Icon header */}
      <div className="bg-primary/5 dark:bg-primary/10 py-8 flex justify-center border-b border-slate-100 dark:border-slate-800">
        <div className="h-20 w-20 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-sm text-primary">
          <KeyRound size={36} aria-hidden="true" />
        </div>
      </div>

      <div className="px-8 py-8 flex flex-col gap-6">
        {submitted ? (
          /* Success state */
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex items-center justify-center size-12 rounded-full bg-green-50 dark:bg-green-900/20">
              <CheckCircle
                size={24}
                className="text-green-600 dark:text-green-400"
                aria-hidden="true"
              />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Check your email
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                If an account exists for{" "}
                <span className="font-medium text-slate-800 dark:text-slate-200">
                  {submittedEmail}
                </span>
                , you will receive password reset instructions shortly.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Text content */}
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Forgot Password?
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                No worries, we&apos;ll send you reset instructions.
              </p>
            </div>

            {/* Form */}
            <form
              aria-label="Forgot password form"
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-5"
              noValidate
            >
              <FormField
                id="email"
                label="Email Address"
                required
                icon={<Mail size={16} aria-hidden="true" />}
                type="email"
                placeholder="name@example.com"
                autoComplete="email"
                hint="Enter the email associated with your account."
                error={errors.email?.message}
                {...register("email", { required: "Email is required" })}
              />

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                Send Reset Link
                <ArrowRight size={18} aria-hidden="true" />
              </Button>
            </form>
          </>
        )}

        {/* Back to login */}
        <div className="text-center pt-2 border-t border-slate-100 dark:border-slate-800">
          <Link
            href="/login"
            className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};
