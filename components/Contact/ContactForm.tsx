"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { contactSchema, type ContactFormData } from "@/lib/validators";
import { useSubmitContactMutation } from "@/app/state/api";

const ContactForm = () => {
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const [submitContact, { isLoading }] = useSubmitContactMutation();

  const onSubmit = async (data: ContactFormData) => {
    try {
      await submitContact({
        name: data.fullName,
        email: data.email,
        subject: data.subject,
        message: data.message,
        turnstileToken: turnstileToken!,
      }).unwrap();
      toast.success(
        "Inquiry sent! We'll get back to you within 1–2 business days.",
      );
      reset();
      turnstileRef.current?.reset();
    } catch (err: unknown) {
      const apiErr = err as { data?: { message?: string } };
      toast.error(
        apiErr.data?.message ?? "Something went wrong. Please try again.",
      );
    }
  };

  const errorCount = Object.keys(errors).length;

  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
      <form
        aria-label="Contact"
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(onSubmit);
        }}
        noValidate
      >
        {/* Required-fields legend */}
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Fields marked with <span aria-hidden="true">*</span>
          <span className="sr-only">an asterisk</span> are required.
        </p>

        {/* Polite error summary announced on submit */}
        {errorCount > 0 && (
          <div
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className="sr-only"
          >
            {errorCount} error{errorCount > 1 ? "s" : ""} found. Please review
            the fields below.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="fullName"
              className="text-slate-700 dark:text-slate-300 text-sm font-semibold"
            >
              Full Name <span aria-hidden="true">*</span>
            </label>
            <input
              id="fullName"
              type="text"
              required
              placeholder="Jane Doe"
              aria-invalid={!!errors.fullName}
              aria-describedby={errors.fullName ? "fullName-error" : undefined}
              className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 focus:border-primary focus:ring-primary h-12 px-4 transition-all"
              {...register("fullName")}
            />
            {errors.fullName && (
              <p id="fullName-error" className="text-xs text-red-500">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email Address */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-slate-700 dark:text-slate-300 text-sm font-semibold"
            >
              Email Address <span aria-hidden="true">*</span>
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="jane@government.ca"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 focus:border-primary focus:ring-primary h-12 px-4 transition-all"
              {...register("email")}
            />
            {errors.email && (
              <p id="email-error" className="text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        {/* Subject */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="subject"
            className="text-slate-700 dark:text-slate-300 text-sm font-semibold"
          >
            Subject <span aria-hidden="true">*</span>
          </label>
          <input
            id="subject"
            type="text"
            required
            placeholder="How can we help?"
            aria-invalid={!!errors.subject}
            aria-describedby={errors.subject ? "subject-error" : undefined}
            className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 focus:border-primary focus:ring-primary h-12 px-4 transition-all"
            {...register("subject")}
          />
          {errors.subject && (
            <p id="subject-error" className="text-xs text-red-500">
              {errors.subject.message}
            </p>
          )}
        </div>

        {/* Message */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="message"
            className="text-slate-700 dark:text-slate-300 text-sm font-semibold"
          >
            Message <span aria-hidden="true">*</span>
          </label>
          <textarea
            id="message"
            rows={5}
            required
            placeholder="Provide details about your inquiry..."
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
            className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 focus:border-primary focus:ring-primary p-4 transition-all resize-none"
            {...register("message")}
          />
          {errors.message && (
            <p id="message-error" className="text-xs text-red-500">
              {errors.message.message}
            </p>
          )}
        </div>

        <Turnstile
          options={{ size: "flexible" }}
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
          aria-describedby="encryption-notice"
          className="w-full bg-primary hover:bg-primary/90 hover:cursor-pointer text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <Send className="size-4" aria-hidden="true" />
          {isLoading ? "Submitting..." : "Submit Inquiry"}
        </button>

        <p
          id="encryption-notice"
          className="text-center text-xs text-slate-500 dark:text-slate-500 italic"
        >
          Your data is encrypted using AES-256 government-standard security.
        </p>
      </form>
    </div>
  );
};

export default ContactForm;
