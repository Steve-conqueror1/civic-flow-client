import { Lock, Globe, Clock, Bell, Shield } from "lucide-react";
import { PolicyHeading } from "./PolicyHeading";

const SECURITY_BADGES = [
  {
    icon: <Lock size={14} aria-hidden="true" />,
    label: "AES-256 Encryption",
  },
  {
    icon: <Globe size={14} aria-hidden="true" />,
    label: "Hosted in Canada (Alberta)",
  },
  {
    icon: <Clock size={14} aria-hidden="true" />,
    label: "Data Retention Policy",
  },
  {
    icon: <Bell size={14} aria-hidden="true" />,
    label: "Breach Notification",
  },
];

export function DataResidency() {
  return (
    <section aria-labelledby="data-residency-heading">
      <PolicyHeading number="04" title="Data Residency & Security" />
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-6 items-center">
        <div className="flex-1">
          <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed mb-4">
            Your data never leaves Canadian soil. We adhere to the highest
            industry standards for government-grade data protection.
          </p>
          <div className="flex flex-wrap gap-3">
            {SECURITY_BADGES.map((badge) => (
              <span
                key={badge.label}
                className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-bold rounded-full"
              >
                {badge.icon}
                {badge.label}
              </span>
            ))}
          </div>
        </div>
        <div
          className="w-32 h-32 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center border-4 border-primary/20 shrink-0"
          aria-hidden="true"
        >
          <Shield size={48} className="text-primary" />
        </div>
      </div>
    </section>
  );
}
