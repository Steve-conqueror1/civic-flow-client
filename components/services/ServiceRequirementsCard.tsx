import { type ReactNode } from "react";

export interface RequirementItem {
  icon: ReactNode;
  label: string;
  description: string;
}

interface ServiceRequirementsCardProps {
  items: RequirementItem[];
}

export const ServiceRequirementsCard = ({ items }: ServiceRequirementsCardProps) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
      <h2 className="text-xl font-bold leading-tight tracking-[-0.015em] mb-4 text-slate-900 dark:text-slate-100 flex items-center gap-2">
        What You&apos;ll Need
      </h2>
      <ul className="space-y-4">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className="mt-1 flex-shrink-0 text-primary" aria-hidden="true">
              {item.icon}
            </div>
            <div>
              <strong className="block text-slate-900 dark:text-slate-100">{item.label}</strong>
              <span className="text-slate-600 dark:text-slate-400 text-sm">
                {item.description}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
