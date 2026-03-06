"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RequestProgressBar } from "@/components/requests";
import { AISuggestionPanel } from "@/components/requests";
import Link from "next/link";

const WIZARD_STEPS = ["Description", "Location", "Upload", "Review"];

export default function NewRequestPage() {
  const [description, setDescription] = useState("");
  const [suggestedCategory, setSuggestedCategory] = useState<
    string | undefined
  >(undefined);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

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

  const handleApplyCategory = () => {
    // Category applied — will be used in subsequent steps
  };

  const handleChangeCategory = () => {
    setSuggestedCategory(undefined);
  };

  const handleNext = () => {
    // Navigate to step 2 (Location)
  };

  return (
    <main className="flex flex-1 flex-col overflow-y-auto">
      <div className="max-w-7xl mx-auto w-full px-6 py-10">
        <div className="flex items-center gap-2 my-4 text-slate-500 dark:text-slate-400 text-sm">
          <span>
            <Link href="/dashboard">Dashboard</Link>
          </span>
          <span>&frasl;</span>
          <span>
            <Link href="/dashboard/requests/new">Requests</Link>
          </span>
          <span>&frasl;</span>
          <span>
            <Link href="/dashboard/requests/new" className="text-primary">
              New
            </Link>
          </span>
        </div>
        {/* Page header */}
        <div className="flex flex-col gap-1 mb-8">
          <h1 className="text-slate-900 dark:text-white text-3xl font-bold leading-tight">
            Submit New Request
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-base">
            Step 1: Category &amp; Description
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-10">
          <RequestProgressBar steps={WIZARD_STEPS} currentStep={1} />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form area */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="description"
                className="text-slate-900 dark:text-slate-100 text-lg font-semibold"
              >
                Problem Description
              </Label>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Please describe the issue in detail. Our AI will help categorize
                it automatically.
              </p>
              <Textarea
                id="description"
                rows={8}
                value={description}
                onChange={handleDescriptionChange}
                placeholder="e.g. There is a large pothole on Main Street near the intersection..."
                className="resize-none rounded-xl border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:border-primary focus:ring-1 focus:ring-primary text-base shadow-sm"
              />
            </div>

            <div className="flex justify-end mt-4">
              <Button
                onClick={handleNext}
                disabled={description.trim().length === 0}
                className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-medium shadow-sm flex items-center gap-2"
              >
                Next Step
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
            </div>
          </div>

          {/* AI Suggestion panel */}
          <aside className="w-full lg:w-80 shrink-0">
            <AISuggestionPanel
              suggestedCategory={suggestedCategory}
              isLoading={isAnalyzing}
              onApply={handleApplyCategory}
              onChangeCategory={handleChangeCategory}
            />
          </aside>
        </div>
      </div>
    </main>
  );
}
