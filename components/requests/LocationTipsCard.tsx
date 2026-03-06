import { Lightbulb } from "lucide-react";

const DEFAULT_TIPS = [
  "Use satellite view to spot landmarks like trees or hydrants.",
  "If indoors, use the building entrance as the primary point.",
  "Double check intersection names for corner issues.",
];

interface LocationTipsCardProps {
  tips?: string[];
}

export function LocationTipsCard({
  tips = DEFAULT_TIPS,
}: LocationTipsCardProps) {
  return (
    <div className="bg-white dark:bg-[#1a2634] rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-5">
      <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-4 flex items-center gap-2">
        <Lightbulb className="size-5 text-slate-400" aria-hidden="true" />
        Location Tips
      </h4>
      <ul className="space-y-3">
        {tips.map((tip, index) => (
          <li key={index} className="flex gap-3 items-start">
            <span
              className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0"
              aria-hidden="true"
            />
            <p className="text-sm text-slate-600 dark:text-slate-300">{tip}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
