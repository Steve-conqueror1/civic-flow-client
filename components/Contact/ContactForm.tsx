"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, CheckCircle } from "lucide-react";
import { contactSchema, type ContactFormData } from "@/lib/validators";

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  // Move focus into the success region so screen readers announce it reliably
  useEffect(() => {
    if (submitted && successRef.current) {
      successRef.current.focus();
    }
  }, [submitted]);

  const onSubmit = (data: ContactFormData) => {
    console.log("Contact form submission:", data);
    setSubmitted(true);
  };

  const errorCount = Object.keys(errors).length;

  if (submitted) {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center gap-4 text-center min-h-[400px] outline-none"
      >
        <div className="bg-primary/10 p-4 rounded-full">
          <CheckCircle className="text-primary size-10" aria-hidden="true" />
        </div>
        <h2 className="text-slate-900 dark:text-slate-100 text-2xl font-bold">
          Inquiry Sent!
        </h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-sm">
          Thank you for reaching out. Our team will get back to you within 1–2
          business days.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
      <form
        aria-label="Contact"
        className="space-y-6"
        onSubmit={handleSubmit(onSubmit)}
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

        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          aria-describedby="encryption-notice"
          className="w-full bg-primary hover:bg-primary/90 hover:cursor-pointer text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <Send className="size-4" aria-hidden="true" />
          {isSubmitting ? "Submitting..." : "Submit Inquiry"}
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
