"use client";

import {
  BotMessageSquare,
  CircleCheck,
  MoveRight,
  Target,
  TriangleAlert,
  AlertCircle,
  Sparkles,
} from "lucide-react";

import type { AnalyseRequestData } from "@/app/types/request";

type IdleState = { status: "idle" };
type LoadingState = { status: "loading" };
type SuccessState = { status: "success"; data: AnalyseRequestData };
type ErrorState = { status: "error"; message: string };

export type AISummaryState =
  | IdleState
  | LoadingState
  | SuccessState
  | ErrorState;

interface AISummaryPanelProps {
  state: AISummaryState;
}

export const AISummaryPanel = ({ state }: AISummaryPanelProps) => {
  return (
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
        {state.status === "idle" && <IdleContent />}
        {state.status === "loading" && <LoadingContent />}
        {state.status === "success" && <SuccessContent data={state.data} />}
        {state.status === "error" && <ErrorContent message={state.message} />}
      </div>

      <div className="bg-gray-50 dark:bg-slate-800/50 px-5 py-3 border-t border-gray-100 dark:border-slate-700 text-center">
        <p className="text-[11px] text-slate-400">
          AI predictions are for assistance only. A human administrator will
          review all submissions.
        </p>
      </div>
    </div>
  );
};

function IdleContent() {
  return (
    <div className="flex flex-col items-center gap-3 py-8 text-center">
      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full">
        <Sparkles className="size-6 text-primary" />
      </div>
      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
        Run AI Analysis to see results
      </p>
      <p className="text-xs text-slate-400 dark:text-slate-500 max-w-50">
        Fill in the title and description, then click &quot;AI Analysis&quot; to
        get category predictions and a summary.
      </p>
    </div>
  );
}

function LoadingContent() {
  return (
    <div className="flex flex-col items-center gap-3 py-8">
      <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-sm">
        <div className="flex gap-1 h-3 items-center">
          <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
          <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
          <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" />
        </div>
        <span>Analyzing your input...</span>
      </div>
    </div>
  );
}

function SuccessContent({ data }: { data: AnalyseRequestData }) {
  const isLowConfidence = data.category.matchPercentage < 30;

  return (
    <>
      {/* Category prediction */}
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
              {data.category.name}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {data.service.name}
            </p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <div className="h-1.5 grow bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${isLowConfidence ? "bg-yellow-500" : "bg-green-500"}`}
              style={{ width: `${data.category.matchPercentage}%` }}
            />
          </div>
          <span
            className={`text-xs font-bold ${isLowConfidence ? "text-yellow-600 dark:text-yellow-400" : "text-green-600 dark:text-green-400"}`}
          >
            {data.category.matchPercentage}% Match
          </span>
        </div>
        {isLowConfidence && (
          <p className="mt-2 text-xs text-yellow-600 dark:text-yellow-400 flex items-center gap-1">
            <TriangleAlert className="size-3 shrink-0" />
            Low confidence — an admin will verify the category.
          </p>
        )}
      </div>

      {/* Summary */}
      {data.summary.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 tracking-wider mb-3">
            Live Summary Preview
          </h4>
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 text-sm text-slate-700 dark:text-slate-300 leading-relaxed border border-slate-100 dark:border-slate-700/50">
            <ul className="space-y-2 list-none">
              {data.summary.map((point, i) => (
                <li key={i} className="flex gap-2">
                  <MoveRight className="text-primary text-base shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Alerts */}
      {data.alert && (
        <div className="flex gap-3 items-start bg-yellow-50 dark:bg-yellow-900/10 p-3 rounded-lg border border-yellow-100 dark:border-yellow-900/20">
          <TriangleAlert className="text-yellow-600 dark:text-yellow-500 shrink-0" />
          <div className="space-y-1">
            <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-500">
              {data.alert.title}
            </p>
            <p className="text-xs text-yellow-700 dark:text-yellow-600 leading-snug">
              {data.alert.message}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

function ErrorContent({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center gap-3 py-8 text-center">
      <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-full">
        <AlertCircle className="size-6 text-red-500" />
      </div>
      <p className="text-sm font-medium text-red-700 dark:text-red-400">
        Analysis failed
      </p>
      <p className="text-xs text-slate-500 dark:text-slate-400 max-w-55">
        {message}
      </p>
    </div>
  );
}
