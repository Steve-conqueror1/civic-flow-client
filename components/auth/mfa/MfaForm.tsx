"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { ShieldCheck, ArrowRight, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const DIGITS = 6;
const INITIAL_SECONDS = 5 * 60; // 5 minutes

interface MfaFormProps {
  /** Masked email shown in the description, e.g. "joh***@alberta.ca" */
  maskedEmail?: string;
}

export const MfaForm: React.FC<MfaFormProps> = ({
  maskedEmail = "joh***@alberta.ca",
}) => {
  const [digits, setDigits] = useState<string[]>(Array(DIGITS).fill(""));
  const [secondsLeft, setSecondsLeft] = useState(INITIAL_SECONDS);
  const inputRefs = useRef<Array<HTMLInputElement | null>>(
    Array(DIGITS).fill(null),
  );

  // Countdown timer
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const id = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [secondsLeft]);

  const formattedTime = `${String(Math.floor(secondsLeft / 60)).padStart(2, "0")}:${String(secondsLeft % 60).padStart(2, "0")}`;

  const focusIndex = useCallback((index: number) => {
    inputRefs.current[index]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[index] = digit;
    setDigits(next);
    if (digit && index < DIGITS - 1) focusIndex(index + 1);
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      focusIndex(index - 1);
    }
    if (e.key === "ArrowLeft" && index > 0) focusIndex(index - 1);
    if (e.key === "ArrowRight" && index < DIGITS - 1) focusIndex(index + 1);
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, DIGITS);
    const next = [...digits];
    pasted.split("").forEach((ch, i) => (next[i] = ch));
    setDigits(next);
    const lastFilled = Math.min(pasted.length, DIGITS - 1);
    focusIndex(lastFilled);
  };

  const handleResend = () => {
    setDigits(Array(DIGITS).fill(""));
    setSecondsLeft(INITIAL_SECONDS);
    focusIndex(0);
    // TODO: call resend OTP API endpoint
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: call verify OTP API endpoint with digits.join("")
  };

  const isComplete = digits.every(Boolean);

  return (
    <div className="w-full max-w-[480px] bg-white dark:bg-[#1a2632] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
      {/* Progress bar — step 2 of 3 */}
      <div
        role="progressbar"
        aria-valuenow={66}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Verification progress"
        className="h-1 w-full bg-slate-100 dark:bg-slate-800"
      >
        <div className="h-full w-2/3 bg-primary rounded-r-full" />
      </div>

      <div className="p-8 sm:p-10 flex flex-col items-center">
        {/* Icon */}
        <div className="mb-6 size-16 rounded-full bg-primary/10 flex items-center justify-center">
          <ShieldCheck size={32} className="text-primary" aria-hidden="true" />
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Verify your identity
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed">
            Enter the 6-digit code sent to your registered email{" "}
            <span className="font-medium text-slate-800 dark:text-slate-200">
              {maskedEmail}
            </span>
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          aria-label="MFA verification form"
          className="w-full flex flex-col items-center"
        >
          {/* OTP inputs */}
          <fieldset
            className="flex justify-between gap-2 sm:gap-3 w-full mb-6"
            aria-label="One-time passcode"
          >
            <legend className="sr-only">Enter 6-digit verification code</legend>
            {digits.map((digit, i) => (
              <input
                key={i}
                ref={(el) => {
                  inputRefs.current[i] = el;
                }}
                aria-label={`Digit ${i + 1}`}
                inputMode="numeric"
                maxLength={1}
                pattern="[0-9]"
                type="text"
                value={digit}
                autoComplete={i === 0 ? "one-time-code" : "off"}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                onPaste={i === 0 ? handlePaste : undefined}
                className={cn(
                  "w-12 h-14 sm:w-14 sm:h-16 text-center bg-slate-50 dark:bg-slate-800",
                  "border border-slate-300 dark:border-slate-700 rounded-lg",
                  "text-2xl font-bold text-slate-900 dark:text-white",
                  "focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all",
                )}
              />
            ))}
          </fieldset>

          {/* Timer */}
          <div className="flex items-center gap-2 mb-8 text-sm text-slate-500 dark:text-slate-400">
            <Timer size={18} aria-hidden="true" />
            <span>
              Code expires in{" "}
              <span className="font-medium text-primary">{formattedTime}</span>
            </span>
          </div>

          {/* Actions */}
          <div className="w-full flex flex-col gap-3">
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={!isComplete || secondsLeft === 0}
            >
              Verify Identity
              <ArrowRight size={18} aria-hidden="true" />
            </Button>

            <Button
              type="button"
              variant="outline"
              size="lg"
              className="w-full"
              onClick={handleResend}
            >
              Resend Code
            </Button>
          </div>
        </form>

        {/* Alternative method */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 w-full text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
          >
            Try another authentication method
          </Link>
        </div>
      </div>
    </div>
  );
};
