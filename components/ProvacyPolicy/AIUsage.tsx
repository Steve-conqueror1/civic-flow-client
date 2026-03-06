import { CheckCircle, AlertTriangle } from "lucide-react";
import { PolicyHeading } from "./PolicyHeading";

const AI_ITEMS = [
  {
    icon: <CheckCircle size={20} className="text-primary shrink-0 mt-0.5" aria-hidden="true" />,
    label: "Categorization:",
    text: 'AI automatically tags requests (e.g., "Roads", "Parks") to route them to the correct department.',
  },
  {
    icon: <CheckCircle size={20} className="text-primary shrink-0 mt-0.5" aria-hidden="true" />,
    label: "Deduplication:",
    text: "Identifying similar requests in the same area to consolidate resources.",
  },
  {
    icon: <AlertTriangle size={20} className="text-primary shrink-0 mt-0.5" aria-hidden="true" />,
    label: "No Automated Decisions:",
    text: "AI does not approve or deny service requests. Final decisions are always made by a human municipal officer.",
  },
];

export function AIUsage() {
  return (
    <section aria-labelledby="ai-usage-heading">
      <PolicyHeading number="03" title="How We Use AI" />
      <div className="bg-primary/5 dark:bg-primary/10 border-l-4 border-primary p-6 rounded-r-xl">
        <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed mb-4">
          CivicFlow utilizes advanced machine learning models to improve service
          delivery speed. We are transparent about our AI usage:
        </p>
        <ul className="space-y-3 list-none">
          {AI_ITEMS.map((item) => (
            <li
              key={item.label}
              className="flex items-start gap-2 text-slate-700 dark:text-slate-300"
            >
              {item.icon}
              <span>
                <strong>{item.label}</strong> {item.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
