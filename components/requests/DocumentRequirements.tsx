import { Info, CheckCircle } from "lucide-react";

const DEFAULT_REQUIREMENTS = [
  "All documents must be valid and not expired.",
  "Photographs of documents must be taken in a well-lit area with all four corners visible.",
  "PDF files should not be password protected.",
];

interface DocumentRequirementsProps {
  requirements?: string[];
}

export function DocumentRequirements({
  requirements = DEFAULT_REQUIREMENTS,
}: DocumentRequirementsProps) {
  return (
    <div className="bg-slate-100 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
      <h5 className="text-slate-900 dark:text-white font-bold mb-4 flex items-center gap-2">
        <Info className="size-5 text-primary" aria-hidden="true" />
        Document Requirements
      </h5>
      <ul className="space-y-3">
        {requirements.map((req, index) => (
          <li
            key={index}
            className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400"
          >
            <CheckCircle
              className="size-4 text-primary mt-0.5 shrink-0"
              aria-hidden="true"
            />
            {req}
          </li>
        ))}
      </ul>
    </div>
  );
}
