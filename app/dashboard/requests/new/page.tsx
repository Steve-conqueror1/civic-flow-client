"use client";

import { useState, useCallback } from "react";
import {
  IssueFiles,
  IssueForm,
  IssueLocation,
  IssueReview,
} from "@/components/requests";

import { AppStepper } from "@/components/stepper/AppStepper";

export default function NewRequestPage() {
  const [hasAnalysis, setHasAnalysis] = useState(false);

  const handleAnalysisChange = useCallback((value: boolean) => {
    setHasAnalysis(value);
  }, []);

  const requestSteps = [
    {
      position: 1,
      title: "Issue Form",
      description: "Describe the Issue",
      content: <IssueForm onAnalysisChange={handleAnalysisChange} />,
      canProceed: hasAnalysis,
    },
    {
      position: 2,
      title: "Issue Location",
      description: "Select The location",
      content: <IssueLocation />,
    },
    {
      position: 3,
      title: "Issue files",
      description: "Upload related files",
      content: <IssueFiles />,
    },
    {
      position: 4,
      title: "Issue Review",
      description: "Review The issue",
      content: <IssueReview />,
    },
  ];

  return (
    <main className="flex flex-1 flex-col overflow-y-auto">
      <div className="max-w-7xl mx-auto w-full px-6 py-8">
        <AppStepper steps={requestSteps} />
      </div>
    </main>
  );
}
