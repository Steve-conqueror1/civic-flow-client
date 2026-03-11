"use client";

import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { Label } from "@/components/ui/label";
import {
  accessibilityFeedbackSchema,
  type AccessibilityFeedbackData,
} from "@/lib/validators";
import { useSubmitContactMutation } from "@/app/state/api";

export const AccessibilityFeedbackForm = () => {
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth < 432);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AccessibilityFeedbackData>({
    resolver: zodResolver(accessibilityFeedbackSchema),
  });

  const [submitContact, { isLoading }] = useSubmitContactMutation();

  const onSubmit = async (data: AccessibilityFeedbackData) => {
    if (!turnstileToken) {
      toast.error("Please complete the verification.");
      return;
    }
    try {
      await submitContact({
        name: data.fullName,
        email: data.email,
        subject: "Accessibility Enquiry",
        message: data.feedback,
        turnstileToken: turnstileToken!,
      }).unwrap();
      toast.success("Feedback received! We'll respond within 2 business days.");

      reset();
      setTurnstileToken(null);

      if (turnstileRef.current) {
        turnstileRef.current?.reset();
      }
    } catch (err: unknown) {
      const apiErr = err as { data?: { message?: string } };
      toast.error(
        apiErr.data?.message ?? "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
      <form
        aria-label="Accessibility feedback"
        className="space-y-6"
        onSubmit={(e) => {
          handleSubmit(onSubmit)(e);
        }}
        noValidate
      >
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Fields marked with <span aria-hidden="true">*</span>
          <span className="sr-only">an asterisk</span> are required.
        </p>

        {/* Polite error summary */}
        {Object.keys(errors).length > 0 && (
          <div
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className="sr-only"
          >
            {Object.keys(errors).length} error
            {Object.keys(errors).length > 1 ? "s" : ""} found. Please review the
            fields below.
          </div>
        )}

        {/* Full Name */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="a11y-fullName">
            Full Name <span aria-hidden="true">*</span>
          </Label>
          <input
            className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 focus:border-primary focus:ring-primary h-12 px-4 transition-all"
            id="a11y-fullName"
            type="text"
            required
            placeholder="Jane Doe"
            aria-invalid={!!errors.fullName}
            aria-describedby={
              errors.fullName ? "a11y-fullName-error" : undefined
            }
            {...register("fullName")}
          />
          {errors.fullName && (
            <p id="a11y-fullName-error" className="text-xs text-red-500">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="a11y-email">
            Email Address <span aria-hidden="true">*</span>
          </Label>
          <input
            className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 focus:border-primary focus:ring-primary h-12 px-4 transition-all"
            id="a11y-email"
            type="email"
            required
            placeholder="jane@example.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "a11y-email-error" : undefined}
            {...register("email")}
          />
          {errors.email && (
            <p id="a11y-email-error" className="text-xs text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Feedback */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="a11y-feedback">
            What can we improve? <span aria-hidden="true">*</span>
          </Label>
          <textarea
            className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 focus:border-primary focus:ring-primary p-4 transition-all resize-none"
            id="a11y-feedback"
            rows={4}
            required
            placeholder="Describe the accessibility barrier you encountered..."
            aria-invalid={!!errors.feedback}
            aria-describedby={
              errors.feedback ? "a11y-feedback-error" : undefined
            }
            {...register("feedback")}
          />
          {errors.feedback && (
            <p id="a11y-feedback-error" className="text-xs text-red-500">
              {errors.feedback.message}
            </p>
          )}
        </div>

        <Turnstile
          options={{
            size: isMobile ? "compact" : "flexible",
          }}
          ref={turnstileRef}
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
          onSuccess={(token) => setTurnstileToken(token)}
          onExpire={() => setTurnstileToken(null)}
          onError={() => setTurnstileToken(null)}
        />

        <button
          type="submit"
          disabled={isLoading || !turnstileToken}
          aria-busy={isLoading}
          className="w-full bg-primary hover:bg-primary/90 hover:cursor-pointer text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <Send className="size-4" aria-hidden="true" />
          {isLoading ? "Submitting..." : "Submit Feedback"}
        </button>
      </form>
    </div>
  );
};
