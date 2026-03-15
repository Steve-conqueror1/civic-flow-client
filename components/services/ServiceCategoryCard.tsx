import Link from "next/link";
import { ArrowRight, ChevronRight, type LucideProps } from "lucide-react";
import { type ComponentType } from "react";

interface ServiceLink {
  name: string;
  href: string;
}

interface ServiceCategoryCardProps {
  name: string;
  description: string;
  responseTime: string;
  icon: ComponentType<LucideProps>;
  iconBgClass: string;
  iconColorClass: string;
  services: ServiceLink[];
  viewAllHref: string;
  viewAllLabel: string;
}

export const ServiceCategoryCard = ({
  name,
  description,
  responseTime,
  icon: Icon,
  iconBgClass,
  iconColorClass,
  services,
  viewAllHref,
  viewAllLabel,
}: ServiceCategoryCardProps) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        {/* Category icon */}
        <div
          className={`p-3 rounded-lg ${iconBgClass} ${iconColorClass} flex-shrink-0`}
        >
          <Icon className="w-6 h-6" aria-hidden="true" />
        </div>

        <div className="flex-1">
          {/* Header row */}
          <div className="flex justify-between items-start gap-2">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {name}
            </h3>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 whitespace-nowrap">
              {responseTime}
            </span>
          </div>

          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 mb-4">
            {description}
          </p>

          {/* Service links */}
          <ul className="space-y-3">
            {services.map((service) => (
              <li key={service.name}>
                <Link
                  href={service.href}
                  className="text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary flex items-center gap-2 group"
                >
                  <ChevronRight
                    className="w-4 h-4 text-slate-400 group-hover:text-primary flex-shrink-0"
                    aria-hidden="true"
                  />
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* View all link */}
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
            <Link
              href={viewAllHref}
              className="text-sm font-bold text-primary hover:underline flex items-center gap-1"
            >
              {viewAllLabel}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
