import { CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

const PasswordRequirement = ({
  met,
  label,
}: {
  met: boolean;
  label: string;
}) => (
  <div className="flex items-center gap-1.5">
    {met ? (
      <CheckCircle2
        size={14}
        className="text-green-500 shrink-0"
        aria-hidden="true"
      />
    ) : (
      <Circle
        size={14}
        className="text-slate-300 dark:text-slate-600 shrink-0"
        aria-hidden="true"
      />
    )}
    <span
      className={cn(
        "text-xs",
        met
          ? "text-green-600 dark:text-green-400"
          : "text-slate-500 dark:text-slate-400",
      )}
    >
      {label}
    </span>
  </div>
);

export const PasswordStrengthChecker = ({ password }: { password: string }) => {
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    symbol: /[^A-Za-z0-9]/.test(password),
  };

  return (
    <div className="mt-3 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-md border border-slate-100 dark:border-slate-700">
      <p className="text-xs font-semibold text-slate-500 mb-2">
        Password must contain:
      </p>
      <div className="grid grid-cols-2 gap-2">
        <PasswordRequirement met={checks.length} label="8+ characters" />
        <PasswordRequirement met={checks.uppercase} label="One uppercase" />
        <PasswordRequirement met={checks.number} label="One number" />
        <PasswordRequirement met={checks.symbol} label="One symbol" />
      </div>
    </div>
  );
};
