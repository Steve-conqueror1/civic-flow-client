import { Sparkles } from "lucide-react";

interface RequestContextCardProps {
  descriptionExcerpt?: string;
  suggestedCategory?: string;
}

export function RequestContextCard({
  descriptionExcerpt,
  suggestedCategory,
}: RequestContextCardProps) {
  return (
    <div className="bg-gradient-to-br from-white to-blue-50 dark:from-[#1a2634] dark:to-[#1a2634] rounded-xl shadow-sm border border-blue-100 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-primary/10 border-b border-primary/10 flex items-center gap-3">
        <div className="size-8 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center text-primary shadow-sm">
          <Sparkles className="size-4" aria-hidden="true" />
        </div>
        <h3 className="font-bold text-slate-900 dark:text-white text-sm">
          CivicFlow AI Assistant
        </h3>
      </div>

      {/* Body */}
      <div className="p-5">
        {!descriptionExcerpt && !suggestedCategory ? (
          <p className="text-sm text-slate-400 dark:text-slate-500 italic">
            Analyzing your request…
          </p>
        ) : (
          <div className="mb-4">
            {descriptionExcerpt && (
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                Based on your description of{" "}
                <span className="font-medium text-slate-900 dark:text-white">
                  &ldquo;{descriptionExcerpt}&rdquo;
                </span>
                , we&apos;ve auto-selected the category:
              </p>
            )}
            {suggestedCategory && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-primary dark:text-blue-300 text-sm font-bold border border-blue-200 dark:border-blue-800/50">
                {suggestedCategory}
              </div>
            )}
          </div>
        )}

        {suggestedCategory && (
          <p className="text-xs text-slate-500 dark:text-slate-400 italic">
            This location helps our crews verify the issue. Please place the pin
            directly on the hazard if possible.
          </p>
        )}
      </div>

      {/* Decorative gradient line */}
      <div
        className="h-1 w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent"
        aria-hidden="true"
      />
    </div>
  );
}
