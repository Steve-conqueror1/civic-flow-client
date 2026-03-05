import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CitizenRightsAction {
  label: string;
  href: string;
}

interface CitizenRightsProps {
  description?: string;
  actions?: CitizenRightsAction[];
}

const DEFAULT_ACTIONS: CitizenRightsAction[] = [
  { label: "Request Access to My Data", href: "/citizen/profile" },
  { label: "Correct My Information", href: "/citizen/profile" },
];

export const CitizenRights = ({
  description = "Under FOIP legislation, you have the right to access personal information held about you and request corrections if the data is inaccurate or incomplete.",
  actions = DEFAULT_ACTIONS,
}: CitizenRightsProps) => {
  return (
    <section aria-label="Citizen Rights">
      <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed mb-6">
        {description}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {actions.map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:border-primary transition-all group max-w-70"
          >
            <span className="font-semibold text-slate-900 dark:text-slate-100">
              {label}
            </span>
            <ArrowRight
              size={18}
              className="text-primary group-hover:translate-x-1 transition-transform"
              aria-hidden="true"
            />
          </Link>
        ))}
      </div>
    </section>
  );
};
