import React from "react";

interface HowItWorksStepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function HowItWorksStep({
  icon,
  title,
  description,
}: HowItWorksStepProps) {
  return (
    <div className="flex flex-col gap-4 p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#111a22] hover:border-primary/50 transition-colors group">
      <div
        className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors"
        aria-hidden="true"
      >
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
