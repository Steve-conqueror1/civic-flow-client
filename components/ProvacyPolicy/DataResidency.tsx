import { Shield } from "lucide-react";

export const DataResidency = () => {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-6 items-center">
      <div className="flex-1">
        <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed mb-4">
          Your data never leaves Canadian soil. We adhere to the highest
          industry standards for government-grade data protection.
        </p>
        <div className="flex flex-wrap gap-4">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-bold rounded-full">
            <span className="material-symbols-outlined text-sm">lock</span>
            AES-256 Encryption
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-bold rounded-full">
            <span className="material-symbols-outlined text-sm">public</span>
            Hosted in Canada
          </span>
        </div>
      </div>
      <div className="w-24 h-24 md:w-32 md:h-32 bg-background-light dark:bg-slate-800 rounded-full flex items-center justify-center border-4 border-primary/20">
        <Shield size={48} className="text-primary" />
      </div>
    </div>
  );
};
