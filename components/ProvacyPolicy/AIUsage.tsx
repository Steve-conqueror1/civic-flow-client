import { CheckCircle, TriangleAlert } from "lucide-react";

export const AIUsage = () => {
  return (
    <div className="bg-primary/5 dark:bg-primary/10 border-l-4 border-primary p-6 rounded-r-xl">
      <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed mb-4">
        CivicFlow utilizes advanced machine learning models to improve service
        delivery speed. We are transparent about our AI usage:
      </p>
      <ul className="space-y-3 list-none">
        <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
          <CheckCircle size={18} className="text-primary shrink-0" />
          <span>
            <strong>Categorization:</strong> AI automatically tags requests
            (e.g., &quot;Roads&quot;, &quot;Parks&quot;) to route them to the
            correct department.
          </span>
        </li>
        <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
          <CheckCircle size={18} className="text-primary shrink-0" />
          <span>
            <strong>Deduplication:</strong> Identifying similar requests in the
            same area to consolidate resources.
          </span>
        </li>
        <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
          <TriangleAlert size={18} className="text-primary shrink-0" />
          <span>
            <strong>No Automated Decisions:</strong> AI does not approve or deny
            service requests. Final decisions are always made by a human
            municipal officer.
          </span>
        </li>
      </ul>
    </div>
  );
};
