"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  User,
  Phone,
  Mail,
  Home,
  MapPin,
  Lock,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { InputGroupButton } from "@/components/ui/input-group";
import { FormField } from "@/components/shared";
import { PasswordStrengthChecker } from "./PasswordStrengthChecker";
import FormHeader from "../FormHeader";

type RegisterFormValues = {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  password: string;
  terms: boolean;
};

export const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>();

  const password = watch("password", "");

  const onSubmit = (_data: RegisterFormValues) => {
    // TODO: connect to registration API endpoint
  };

  return (
    <div className="col-span-1 lg:col-span-7 p-6 md:p-10 lg:p-12 flex flex-col justify-center">
      <FormHeader
        title="Create your Account"
        description="Enter your details to register for CivicFlow."
      />
      <form
        aria-label="Registration form"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
        noValidate
      >
        {/* Full Name + Phone row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField
            id="fullName"
            label="Full Name"
            required
            icon={<User size={16} aria-hidden="true" />}
            type="text"
            placeholder="Jane Doe"
            autoComplete="name"
            error={errors.fullName?.message}
            {...register("fullName", { required: "Full name is required" })}
          />

          <FormField
            id="phone"
            label="Phone Number"
            required
            icon={<Phone size={16} aria-hidden="true" />}
            type="tel"
            placeholder="(780) 555-0123"
            autoComplete="tel"
            error={errors.phone?.message}
            {...register("phone", { required: "Phone number is required" })}
          />
        </div>

        {/* Email */}
        <FormField
          id="email"
          label="Email Address"
          required
          icon={<Mail size={16} aria-hidden="true" />}
          type="email"
          placeholder="jane@example.com"
          autoComplete="email"
          hint="We'll send a verification link to this email."
          error={errors.email?.message}
          {...register("email", { required: "Email is required" })}
        />

        {/* Residential Address */}
        <FormField
          id="address"
          label="Residential Address"
          required
          icon={<Home size={16} aria-hidden="true" />}
          type="text"
          placeholder="123 Maple Ave, Edmonton, AB"
          autoComplete="street-address"
          error={errors.address?.message}
          endAddon={
            <InputGroupButton
              type="button"
              aria-label="Use current location"
              title="Use current location"
            >
              <MapPin size={16} aria-hidden="true" />
            </InputGroupButton>
          }
          {...register("address", { required: "Address is required" })}
        />

        {/* Password */}
        <div className="space-y-1.5">
          <FormField
            id="password"
            label="Password"
            required
            icon={<Lock size={16} aria-hidden="true" />}
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            autoComplete="new-password"
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
            {...register("password", { required: "Password is required" })}
          />

          <PasswordStrengthChecker password={password} />
        </div>

        {/* Terms */}
        <div className="flex items-center gap-3 mt-4 ">
          <div className="flex h-6 items-center">
            <input
              id="terms"
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary bg-white dark:bg-slate-800 cursor-pointer"
              aria-required="true"
              {...register("terms", { required: true })}
            />
          </div>
          <div className="text-sm leading-6">
            <label
              htmlFor="terms"
              className="font-medium text-slate-700 dark:text-slate-300 cursor-pointer"
            >
              I agree to the{" "}
              <Link href="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
              .
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-2">
          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
          >
            Create Account
            <ArrowRight size={18} aria-hidden="true" />
          </Button>
        </div>
      </form>

      {/* Mobile-only sign-in link */}
      <div className="mt-6 text-center lg:hidden">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-bold text-primary hover:text-primary-dark"
          >
            Sign In
          </Link>
        </p>
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
