import { Calendar } from "lucide-react";

export function PrivacyPolicyTitleSection() {
  return (
    <div className="flex flex-col gap-4 mb-10 border-b border-slate-200 dark:border-slate-800 pb-8">
      <h1 className="text-slate-900 dark:text-slate-100 text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">
        Privacy Policy
      </h1>
      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
        <Calendar size={16} aria-hidden="true" />
        <p className="text-sm font-normal">Last Updated: October 26, 2023</p>
      </div>
    </div>
  );
}
