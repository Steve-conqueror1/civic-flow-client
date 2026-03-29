import {
  BotMessageSquare,
  CircleCheck,
  MoveRight,
  Target,
  TriangleAlert,
} from "lucide-react";
import Link from "next/link";

export const AISummaryPanel = () => {
  return (
    <div className="lg:col-span-4 space-y-6">
      <div className="bg-linear-to-b from-blue-50 to-white dark:from-slate-800 dark:to-surface-dark rounded-xl shadow-md border border-blue-100 dark:border-slate-700 overflow-hidden sticky top-28">
        <div className="bg-primary/5 dark:bg-slate-800 border-b border-blue-100 dark:border-slate-700 px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary font-bold">
            <BotMessageSquare className="text-xl animate-pulse" />
            <span>CivicFlow AI</span>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200">
            Beta
          </span>
        </div>
        <div className="p-5 space-y-6">
          <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-sm">
            <div className="flex gap-1 h-3 items-center">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></span>
            </div>
            <span>Analyzing your input...</span>
          </div>

          <div className="bg-white dark:bg-surface-dark rounded-lg p-4 border border-blue-100 dark:border-slate-700 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2 opacity-50 group-hover:opacity-100 transition-opacity">
              <CircleCheck className="text-green-500 text-sm" />
            </div>
            <h4 className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 tracking-wider mb-2">
              Category Prediction
            </h4>
            <div className="flex items-center gap-3 mb-1">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-lg">
                <Target />
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-white leading-tight">
                  Road Maintenance
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Pothole Repair
                </p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <div className="h-1.5 grow bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-[92%] rounded-full"></div>
              </div>
              <span className="text-xs font-bold text-green-600 dark:text-green-400">
                92% Match
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 tracking-wider mb-3">
              Live Summary Preview
            </h4>
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 text-sm text-slate-700 dark:text-slate-300 leading-relaxed border border-slate-100 dark:border-slate-700/50">
              <ul className="space-y-2 list-none">
                <li className="flex gap-2">
                  <MoveRight className="text-primary text-base shrink-0 mt-0.5" />
                  <span>User reporting a large pothole on 104th Ave.</span>
                </li>
                <li className="flex gap-2">
                  <MoveRight className="text-primary text-base shrink-0 mt-0.5" />
                  <span>Issue causing traffic slowdowns during rush hour.</span>
                </li>
                <li className="flex gap-2">
                  <MoveRight className="text-primary text-base shrink-0 mt-0.5" />
                  <span>Potential tire damage hazard identified.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex gap-3 items-start bg-yellow-50 dark:bg-yellow-900/10 p-3 rounded-lg border border-yellow-100 dark:border-yellow-900/20">
            <TriangleAlert className="text-yellow-600 dark:text-yellow-500 shrink-0" />
            <div className="space-y-1">
              <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-500">
                Duplicate Alert
              </p>
              <p className="text-xs text-yellow-700 dark:text-yellow-600 leading-snug">
                We found 2 similar reports in this area from the last 24 hours.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-slate-800/50 px-5 py-3 border-t border-gray-100 dark:border-slate-700 text-center">
          <p className="text-[11px] text-slate-400">
            AI predictions are for assistance only. A human administrator will
            review all submissions.
          </p>
        </div>
      </div>
    </div>
  );
};
