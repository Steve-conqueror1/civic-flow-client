import React from "react";
import { cn } from "@/lib/utils";

interface ProcessStepCardProps {
  stepNumber: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function ProcessStepCard({
  stepNumber,
  icon,
  title,
  description,
  className,
}: ProcessStepCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 bg-white dark:bg-[#111a22] rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow relative",
        className,
      )}
    >
      <div
        className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold shadow-sm"
        aria-hidden="true"
      >
        {stepNumber}
      </div>
      <div
        className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-2"
        aria-hidden="true"
      >
        {icon}
      </div>
      <h4 className="text-slate-900 dark:text-white text-xl font-bold leading-tight">
        {title}
      </h4>
      <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
        {description}
      </p>
    </div>
  );
}
