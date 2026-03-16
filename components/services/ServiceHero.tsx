import { type ReactNode } from "react";

interface ServiceHeroProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export const ServiceHero = ({ icon, title, description }: ServiceHeroProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-6 items-start">
      <div
        className="flex-shrink-0 bg-primary/10 dark:bg-primary/20 text-primary p-4 rounded-xl flex items-center justify-center h-24 w-24"
        aria-hidden="true"
      >
        {icon}
      </div>
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold leading-tight tracking-[-0.015em] mb-2 text-slate-900 dark:text-slate-100">
          {title}
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-lg font-normal leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};
