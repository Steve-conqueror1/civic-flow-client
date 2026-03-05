import { Calendar } from "lucide-react";
import { format } from "date-fns";

export function PrivacyPolicyTitleSection() {
  const raw = process.env.NEXT_PUBLIC_PRIVACY_POLICY_LAST_UPDATED;
  const date = raw ? new Date(raw) : new Date("2026-03-05");
  const formatted = format(date, "MMMM dd, yyyy");
  return (
    <header
      aria-label="Privacy Policy header"
      className="w-full  dark:bg-background border-b border-slate-100 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto pt-8  md:pt-8">
        <div className="flex flex-col gap-4 mb-10 border-b border-slate-200 dark:border-slate-800 pb-8">
          <h1 className="text-slate-900 dark:text-slate-100 text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">
            Privacy Policy
          </h1>
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <span className="material-symbols-outlined text-sm">
              <Calendar className="w-4 h-4" />
            </span>
            <p className="text-sm font-normal">Last Updated: {formatted}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
