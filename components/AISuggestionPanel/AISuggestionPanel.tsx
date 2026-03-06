"use client";

import { Sparkles, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AISuggestionPanelProps {
  suggestedCategory?: string;
  isLoading?: boolean;
  onApply?: () => void;
  onChangeCategory?: () => void;
}

export default function AISuggestionPanel({
  suggestedCategory,
  isLoading = false,
  onApply,
  onChangeCategory,
}: AISuggestionPanelProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-primary/20 dark:border-primary/30 shadow-md p-6 relative overflow-hidden">
      {/* Decorative background blur */}
      <div
        className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="flex items-center gap-3 mb-4">
        <Sparkles
          className="text-primary size-6"
          aria-hidden="true"
        />
        <h3 className="text-slate-900 dark:text-white text-lg font-bold">
          AI Suggestion
        </h3>
      </div>

      <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
        Based on your description, we predict the following category for your
        request:
      </p>

      <div className="bg-primary/10 dark:bg-primary/20 rounded-lg p-4 mb-6 border border-primary/20">
        <div className="flex flex-col gap-1">
          <span className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
            Suggested Category
          </span>
          {isLoading || !suggestedCategory ? (
            <span className="text-slate-400 dark:text-slate-500 text-base italic">
              Analyzing your description…
            </span>
          ) : (
            <span className="text-primary text-xl font-bold">
              {suggestedCategory}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2 text-sm"
          onClick={onApply}
          disabled={!suggestedCategory || isLoading}
        >
          <CheckCircle className="size-4" aria-hidden="true" />
          Apply Category
        </Button>
        <Button
          variant="ghost"
          className="w-full text-slate-500 dark:text-slate-400 text-sm"
          onClick={onChangeCategory}
        >
          Change Category
        </Button>
      </div>
    </div>
  );
}
