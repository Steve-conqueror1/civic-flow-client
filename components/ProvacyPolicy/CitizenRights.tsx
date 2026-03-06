import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PolicyHeading } from "./PolicyHeading";

const ACTIONS = [
  {
    label: "Request Access to My Data",
    href: "/citizen/profile",
  },
  {
    label: "Correct My Information",
    href: "/citizen/profile",
  },
];

export function CitizenRights() {
  return (
    <section aria-labelledby="citizen-rights-heading">
      <PolicyHeading number="05" title="Citizen Rights" />
      <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed mb-6">
        Under FOIP legislation, you have the right to access personal
        information held about you and request corrections if the data is
        inaccurate or incomplete.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ACTIONS.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:border-primary transition-all group"
          >
            <span className="font-semibold text-slate-900 dark:text-slate-100">
              {action.label}
            </span>
            <ArrowRight
              size={20}
              className="text-primary group-hover:translate-x-1 transition-transform"
              aria-hidden="true"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
