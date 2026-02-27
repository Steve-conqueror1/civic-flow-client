"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Lock, ShieldCheck, Eye, EyeOff, ArrowLeft, ArrowRight, CheckCircle, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/shared";
import { cn } from "@/lib/utils";

type ResetPasswordValues = {
  newPassword: string;
  confirmPassword: string;
};

const requirements = [
  { label: "Minimum 8 characters", test: (p: string) => p.length >= 8 },
  { label: "At least one number", test: (p: string) => /\d/.test(p) },
  { label: "Includes a special character", test: (p: string) => /[^A-Za-z0-9]/.test(p) },
];

export const ResetPasswordForm = () => {
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordValues>();

  const newPassword = watch("newPassword", "");

  const onSubmit = (_data: ResetPasswordValues) => {
    // TODO: call reset password API endpoint
  };

  return (
    <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="px-8 pt-8 pb-4 flex flex-col gap-6">
        {/* Heading */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center">
              <ShieldCheck size={28} className="text-primary" aria-hidden="true" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Set New Password
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
            Please create a new password for your account.
          </p>
        </div>

        {/* Form */}
        <form
          aria-label="Reset password form"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
          noValidate
        >
          {/* New Password */}
          <FormField
            id="newPassword"
            label="New Password"
            required
            icon={<Lock size={16} aria-hidden="true" />}
            type={showNew ? "text" : "password"}
            placeholder="••••••••"
            autoComplete="new-password"
            error={errors.newPassword?.message}
            endAddon={
              <button
                type="button"
                aria-label={showNew ? "Hide password" : "Show password"}
                onClick={() => setShowNew((p) => !p)}
                className="flex items-center justify-center px-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 focus:outline-none"
              >
                {showNew ? (
                  <EyeOff size={16} aria-hidden="true" />
                ) : (
                  <Eye size={16} aria-hidden="true" />
                )}
              </button>
            }
            {...register("newPassword", { required: "New password is required" })}
          />

          {/* Confirm Password */}
          <FormField
            id="confirmPassword"
            label="Confirm New Password"
            required
            icon={<Lock size={16} aria-hidden="true" />}
            type={showConfirm ? "text" : "password"}
            placeholder="••••••••"
            autoComplete="new-password"
            error={errors.confirmPassword?.message}
            endAddon={
              <button
                type="button"
                aria-label={showConfirm ? "Hide password" : "Show password"}
                onClick={() => setShowConfirm((p) => !p)}
                className="flex items-center justify-center px-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 focus:outline-none"
              >
                {showConfirm ? (
                  <EyeOff size={16} aria-hidden="true" />
                ) : (
                  <Eye size={16} aria-hidden="true" />
                )}
              </button>
            }
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (val) =>
                val === newPassword || "Passwords do not match",
            })}
          />

          {/* Password Requirements */}
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 border border-slate-100 dark:border-slate-800">
            <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
              Password Requirements
            </h3>
            <ul className="space-y-2" aria-label="Password requirements">
              {requirements.map(({ label, test }) => {
                const met = newPassword ? test(newPassword) : false;
                return (
                  <li
                    key={label}
                    className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300"
                  >
                    {met ? (
                      <CheckCircle
                        size={16}
                        className="text-green-500 shrink-0"
                        aria-hidden="true"
                      />
                    ) : (
                      <Circle
                        size={16}
                        className={cn(
                          "shrink-0",
                          newPassword
                            ? "text-red-400"
                            : "text-slate-300 dark:text-slate-600",
                        )}
                        aria-hidden="true"
                      />
                    )}
                    <span>{label}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full mt-2"
            disabled={isSubmitting}
          >
            Reset Password
            <ArrowRight size={18} aria-hidden="true" />
          </Button>
        </form>

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
