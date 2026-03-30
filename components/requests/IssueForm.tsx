"use client";

import React, { useCallback, useRef } from "react";
import { IconSparkles } from "@tabler/icons-react";
import { Info } from "lucide-react";
import { useAnalyseRequestMutation } from "@/app/state/api";
import { AISummaryPanel } from "./AISummaryPanel";
import type { AISummaryState } from "./AISummaryPanel";

interface IssueFormProps {
  onAnalysisChange?: (hasAnalysis: boolean) => void;
}

export const IssueForm = ({ onAnalysisChange }: IssueFormProps) => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [note, setNote] = React.useState("");

  const [analyseRequest, { isLoading }] = useAnalyseRequestMutation();
  const [summaryState, setSummaryState] = React.useState<AISummaryState>({
    status: "idle",
  });

  // Track whether we had a successful analysis (to detect edits after success)
  const hadSuccess = useRef(false);

  const canAnalyse = title.trim().length > 0 && description.trim().length > 0;

  const clearAnalysis = useCallback(() => {
    if (hadSuccess.current) {
      hadSuccess.current = false;
      setSummaryState({ status: "idle" });
      onAnalysisChange?.(false);
    }
  }, [onAnalysisChange]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    clearAnalysis();
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setDescription(e.target.value);
    clearAnalysis();
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
    clearAnalysis();
  };

  const handleAnalyse = async () => {
    if (!canAnalyse || isLoading) return;

    setSummaryState({ status: "loading" });

    try {
      const result = await analyseRequest({
        title: title.trim(),
        description: description.trim(),
        note: note.trim() || undefined,
      }).unwrap();

      hadSuccess.current = true;
      setSummaryState({ status: "success", data: result.data });
      onAnalysisChange?.(true);
    } catch (err) {
      hadSuccess.current = false;
      const message =
        (err as { status?: number })?.status === 503
          ? "AI service temporarily unavailable. Please try again later."
          : "Something went wrong. Please try again.";
      setSummaryState({ status: "error", message });
      onAnalysisChange?.(false);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full flex flex-col lg:flex-row gap-8">
        {/* Form area */}
        <div className="w-full bg-white dark:bg-surface-dark p-8 rounded-2xl">
          <div className="flex-1 flex flex-col gap-6">
            <div className="space-y-1">
              <label
                className="block text-sm font-semibold text-slate-700 dark:text-slate-200"
                htmlFor="short-title"
              >
                Request Title <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-gray-50 dark:bg-gray-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all shadow-sm"
                id="short-title"
                placeholder="e.g. Large Pothole on Main St."
                type="text"
                value={title}
                onChange={handleTitleChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="description"
                className="text-slate-900 dark:text-slate-100 text-lg font-semibold"
              >
                Problem Description
              </label>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Please describe the issue in detail. Our AI will help categorize
                it automatically.
              </p>
              <textarea
                className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-gray-50 dark:bg-gray-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all shadow-sm p-4 resize-y text-base"
                id="description"
                placeholder="Describe the issue in detail. Include specific location markers (e.g., near the red hydrant), time of day observed, or any immediate hazards to pedestrians or vehicles."
                rows={8}
                value={description}
                onChange={handleDescriptionChange}
              />

              <label
                htmlFor="note"
                className="text-slate-900 dark:text-slate-100 text-lg font-semibold"
              >
                Add a note
              </label>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Include any extra details that might help
              </p>
              <textarea
                className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-gray-50 dark:bg-gray-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all shadow-sm p-4 resize-y text-base"
                id="note"
                placeholder="Add any additional notes or context (optional)"
                rows={4}
                value={note}
                onChange={handleNoteChange}
              />
              <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-2">
                <Info size={20} className="text-primary" />
                Our AI assistant will analyze this description to categorize
                your request automatically.
              </p>
            </div>
            <div className="w-full flex justify-end">
              <button
                className="bg-primary py-2 px-6 text-white rounded-lg hover:cursor-pointer max-w-72 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!canAnalyse || isLoading}
                onClick={handleAnalyse}
              >
                <IconSparkles />
                <span>{isLoading ? "Analysing..." : "AI Analysis"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* AI Summary panel */}
        <aside className="w-full lg:w-80 shrink-0">
          <AISummaryPanel state={summaryState} />
        </aside>
      </div>
    </div>
  );
};
