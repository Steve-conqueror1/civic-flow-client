"use client";

import { useState, useCallback } from "react";
import {
  IssueFiles,
  IssueForm,
  IssueLocation,
  IssueReview,
} from "@/components/requests";

import { AppStepper } from "@/components/stepper/AppStepper";
import { useRequestWizard } from "@/app/hooks/use-request-wizard";
import type { WizardLocation } from "@/app/types/geocode";

export default function NewRequestPage() {
  const [hasAnalysis, setHasAnalysis] = useState(false);
  const { location, setLocation, clearLocation } = useRequestWizard();

  const handleAnalysisChange = useCallback((value: boolean) => {
    setHasAnalysis(value);
  }, []);

  const handleLocationConfirm = useCallback(
    (loc: WizardLocation) => {
      setLocation(loc);
    },
    [setLocation],
  );

  const handleLocationClear = useCallback(() => {
    clearLocation();
  }, [clearLocation]);

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
      content: (
        <IssueLocation
          location={location}
          onLocationConfirm={handleLocationConfirm}
          onLocationClear={handleLocationClear}
        />
      ),
      canProceed: location !== null,
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
      content: <IssueReview location={location} />,
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
