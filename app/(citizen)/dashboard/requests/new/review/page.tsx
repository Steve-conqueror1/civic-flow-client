"use client";

import { ArrowLeft, Send, ShieldCheck, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  RequestProgressBar,
  ReviewSection,
  AttachmentThumbnailGrid,
} from "@/components/requests";
import MapView from "@/components/maps";

const WIZARD_STEPS = ["Description", "Location", "Upload", "Review"];

// Placeholder data — in production this comes from wizard state / API
const REVIEW_DATA = {
  category: "Road Maintenance",
  issueType: "Pothole Repair",
  description:
    "There is a very deep pothole in the right lane going northbound. It's causing cars to swerve dangerously into the adjacent lane to avoid it. About 2 feet wide and quite deep.",
  address: "109 St NW & 82 Ave NW\nEdmonton, AB T6G 0B4",
  locationNotes:
    "Right in front of the coffee shop, near the intersection crosswalk.",
  attachments: [] as { id: string; src: string; alt: string }[],
};

export default function RequestReviewPage() {
  const handleSubmit = () => {
    // Submit logic — will call API
  };

  return (
    <main className="flex flex-1 flex-col overflow-y-auto">
      <div className="max-w-7xl mx-auto w-full px-6 py-8 flex flex-col gap-8">
        {/* Page header */}
        <div className="flex flex-col gap-1">
          <h1 className="text-slate-900 dark:text-white text-3xl font-bold leading-tight">
            Submit New Request
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Step 4: Review &amp; Submit
          </p>
        </div>

        {/* Progress bar */}
        <RequestProgressBar steps={WIZARD_STEPS} currentStep={4} />

        {/* Review card */}
        <div className="bg-white dark:bg-[#15232d] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          {/* Card header */}
          <div className="p-8 border-b border-slate-200 dark:border-slate-800">
            <h2 className="text-slate-900 dark:text-slate-100 text-3xl font-bold leading-tight mb-2">
              Review Your Request
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-base">
              Please ensure all details are correct before submitting your
              request to the city.
            </p>
          </div>

          {/* Sections */}
          <div className="p-8 flex flex-col gap-8">
            {/* Request Details */}
            <ReviewSection
              title="Request Details"
              icon="info"
              onEdit={() => {}}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-6 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg border border-slate-100 dark:border-slate-700">
                <div className="md:col-span-1">
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">
                    Category
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-slate-900 dark:text-slate-100 font-medium">
                      {REVIEW_DATA.category}
                    </p>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800">
                      <CheckCircle className="size-3" aria-hidden="true" />
                      AI Confirmed
                    </span>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">
                    Issue Type
                  </p>
                  <p className="text-slate-900 dark:text-slate-100 font-medium">
                    {REVIEW_DATA.issueType}
                  </p>
                </div>
                <div className="md:col-span-3 mt-2">
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">
                    Description
                  </p>
                  <p className="text-slate-700 dark:text-slate-300">
                    {REVIEW_DATA.description}
                  </p>
                </div>
              </div>
            </ReviewSection>

            <hr className="border-slate-200 dark:border-slate-800" />

            {/* Location */}
            <ReviewSection
              title="Location"
              icon="location_on"
              onEdit={() => {}}
            >
              <div className="flex flex-col sm:flex-row gap-6 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg border border-slate-100 dark:border-slate-700">
                <div className="flex-1">
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">
                    Address
                  </p>
                  <p className="text-slate-900 dark:text-slate-100 font-medium mb-4 whitespace-pre-line">
                    {REVIEW_DATA.address}
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">
                    Additional Notes
                  </p>
                  <p className="text-slate-700 dark:text-slate-300 text-sm">
                    {REVIEW_DATA.locationNotes}
                  </p>
                </div>
                {/* Map placeholder */}
                <div className="w-full sm:w-48 h-32 rounded-lg bg-slate-200 dark:bg-slate-700 overflow-hidden relative border border-slate-200 dark:border-slate-600 flex items-center justify-center">
                  {/* <MapView /> */}

                  <span className="text-xs text-slate-400 dark:text-slate-500"></span>
                </div>
              </div>
            </ReviewSection>

            <hr className="border-slate-200 dark:border-slate-800" />

            {/* Attachments */}
            <ReviewSection
              title="Attachments"
              icon="photo_library"
              onEdit={() => {}}
            >
              <AttachmentThumbnailGrid attachments={REVIEW_DATA.attachments} />
            </ReviewSection>
          </div>

          {/* Footer actions */}
          <div className="bg-slate-50 dark:bg-slate-800/80 p-8 border-t border-slate-200 dark:border-slate-800 flex flex-col items-center gap-6">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
              <ShieldCheck
                className="size-5 text-green-500"
                aria-hidden="true"
              />
              <span>
                Your submission is secure and will be processed by City of
                Edmonton Services.
              </span>
            </div>
            <div className="flex gap-4 w-full max-w-md">
              <Button variant="outline" asChild className="flex-1 py-3">
                <Link
                  href="/dashboard/requests/upload"
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="size-4" aria-hidden="true" />
                  Back
                </Link>
              </Button>
              <Button
                onClick={handleSubmit}
                className="flex-[2] py-3 bg-primary hover:bg-primary/90 text-white font-bold shadow-sm flex items-center justify-center gap-2"
              >
                Confirm &amp; Submit
                <Send className="size-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-400 dark:text-slate-500 text-sm pb-4">
          &copy; 2024 CivicFlow Alberta. All rights reserved.
        </p>
      </div>
    </main>
  );
}
