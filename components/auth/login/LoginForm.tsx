"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InputGroupButton } from "@/components/ui/input-group";
import { FormField } from "@/components/shared";
import FormHeader from "../FormHeader";
import { loginSchema } from "@/lib/validators";
import { useAuth } from "@/app/hooks/use-auth";
import type { LoginFormValues } from "@/types";

export const LoginForm = ({ redirect }: { redirect?: string }) => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const { loginMutation } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        const redirectPath = redirect ?? "/dashboard";
        router.push(redirectPath);
      },
    });
  };

  return (
    <div className="col-span-1 lg:col-span-7 p-6 md:p-10 lg:p-12 flex flex-col justify-center">
      <FormHeader
        title=" Sign In"
        description="Welcome back. Enter your credentials to access your account."
      />

      <form
        aria-label="Sign in form"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
        noValidate
      >
        {/* Email */}
        <FormField
          id="email"
          label="Email Address"
          required
          icon={<Mail size={16} aria-hidden="true" />}
          type="email"
          placeholder="jane@example.com"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />

        {/* Password */}
        <div className="space-y-1">
          <FormField
            id="password"
            label="Password"
            required
            icon={<Lock size={16} aria-hidden="true" />}
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            autoComplete="current-password"
            error={errors.password?.message}
            endAddon={
              <InputGroupButton
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <EyeOff size={16} aria-hidden="true" />
                ) : (
                  <Eye size={16} aria-hidden="true" />
                )}
              </InputGroupButton>
            }
            {...register("password")}
          />

          <div className="flex justify-end pt-0.5">
            <Link
              href="/forgot-password"
              className="text-xs text-primary hover:text-primary-dark hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-2 space-y-2">
          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={loginMutation.isPending}
          >
            Sign In
            <ArrowRight size={18} aria-hidden="true" />
          </Button>
          {loginMutation.isError && (
            <p role="alert" className="text-sm text-red-600 dark:text-red-400">
              {loginMutation.error?.message}
            </p>
          )}
        </div>
      </form>

      {/* Mobile-only register link */}
      <div className="mt-6 text-center lg:hidden">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-bold text-primary hover:text-primary-dark"
          >
            Create an account
          </Link>
        </p>
      </div>
      <div className="hidden lg:flex flex-col gap-4 mt-8">
        <div className="relative flex  items-center">
          <div className="grow border-t border-slate-200 dark:border-slate-700"></div>
          <span className="shrink-0 mx-4 text-slate-400 dark:text-slate-500 text-xs font-medium uppercase tracking-wider">
            New User?
          </span>
          <div className="grow border-t border-slate-200 dark:border-slate-700"></div>
        </div>

        <div className="mt-4 w-full flex justify-center">
          <Link className="text-primary" href={"/register"}>
            Create account &rarr;
          </Link>
        </div>
      </div>
      {/* Security badge */}
      <div className="mt-8 flex justify-center items-center gap-2 text-slate-400 dark:text-slate-500">
        <Lock size={16} aria-hidden="true" />
        <span className="text-xs font-medium uppercase tracking-wider">
          Secure SSL Encryption
        </span>
      </div>
    </div>
  );
};
