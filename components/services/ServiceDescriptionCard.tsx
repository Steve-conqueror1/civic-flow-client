import { type ReactNode } from "react";

interface ServiceDescriptionCardProps {
  title: string;
  icon: ReactNode;
  paragraphs: string[];
}

export const ServiceDescriptionCard = ({
  title,
  icon,
  paragraphs,
}: ServiceDescriptionCardProps) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
      <h2 className="text-xl font-bold leading-tight tracking-[-0.015em] mb-4 text-slate-900 dark:text-slate-100 flex items-center gap-2">
        <span className="text-primary" aria-hidden="true">
          {icon}
        </span>
        {title}
      </h2>
      <div className="space-y-4">
        {paragraphs.map((para, index) => (
          <p key={index} className="text-slate-600 dark:text-slate-300 leading-relaxed">
            {para}
          </p>
        ))}
      </div>
    </div>
  );
};
