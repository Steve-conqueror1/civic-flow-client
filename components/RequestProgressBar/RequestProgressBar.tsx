import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface RequestProgressBarProps {
  steps: string[];
  currentStep: number; // 1-based
}

export default function RequestProgressBar({
  steps,
  currentStep,
}: RequestProgressBarProps) {
  const progressPercent = Math.round((currentStep / steps.length) * 100);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between text-sm font-medium text-slate-500 dark:text-slate-400">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          return (
            <div key={step} className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <span
                  className={cn(
                    "text-xs transition-colors",
                    isActive
                      ? "text-primary font-bold"
                      : isCompleted
                        ? "text-primary/60"
                        : "text-slate-400 dark:text-slate-500",
                  )}
                  aria-hidden="true"
                >
                  {stepNumber}.
                </span>
                <span
                  className={cn(
                    "transition-colors",
                    isActive
                      ? "text-primary font-bold"
                      : isCompleted
                        ? "text-primary/60"
                        : "text-slate-400 dark:text-slate-500",
                  )}
                >
                  {step}
                </span>
              </div>
              {index < steps.length - 1 && (
                <ChevronRight
                  className="size-4 text-slate-300 dark:text-slate-700"
                  aria-hidden="true"
                />
              )}
            </div>
          );
        })}
      </div>

      <div
        role="progressbar"
        aria-valuenow={progressPercent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Step ${currentStep} of ${steps.length}`}
        className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden"
      >
        <div
          data-testid="progress-fill"
          className="h-full bg-primary rounded-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}
