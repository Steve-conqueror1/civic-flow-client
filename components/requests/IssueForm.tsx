"use client";
import React from "react";

import { IconSparkles } from "@tabler/icons-react";

import { AISummaryPanel } from "./AISummaryPanel";
import { Info } from "lucide-react";

export const IssueForm = () => {
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);
  const [suggestedCategory, setSuggestedCategory] = React.useState<
    string | undefined
  >(undefined);

  const [description, setDescription] = React.useState("");

  const handleChangeCategory = () => {
    setSuggestedCategory(undefined);
  };

  const handleApplyCategory = () => {
    // Category applied — will be used in subsequent steps
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setDescription(e.target.value);

    // Simulate AI suggestion after typing enough text
    if (e.target.value.length > 30 && !suggestedCategory) {
      setIsAnalyzing(true);
      const timer = setTimeout(() => {
        setSuggestedCategory("Infrastructure");
        setIsAnalyzing(false);
      }, 1200);
      return () => clearTimeout(timer);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full flex flex-col lg:flex-row gap-8">
        {/* Form area */}
        <div className="w-full bg-white p-8 rounded-2xl">
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
              ></textarea>

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
              ></textarea>
              <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-2">
                <Info size={20} className="text-primary" />
                Our AI assistant will analyze this description to categorize
                your request automatically.
              </p>
            </div>
            <div className="w-full flex justify-end">
              <button className="bg-primary py-2 px-6 text-white rounded-lg hover:cursor-pointer max-w-72 flex items-center gap-2">
                <IconSparkles />
                <span>AI Analysis</span>
              </button>
            </div>
          </div>
        </div>

        {/* AI Suggestion panel */}
        <aside className="w-full lg:w-80 shrink-0">
          <AISummaryPanel />
        </aside>
      </div>
    </div>
  );
};
