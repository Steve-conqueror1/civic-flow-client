"use client";

import { CheckCircle, Send, ShieldCheck } from "lucide-react";
import { ReviewSection } from "./ReviewSection";
import { AttachmentThumbnailGrid } from "./AttachmentThumbnailGrid";
import MapView from "@/components/maps";
import type { WizardLocation } from "@/app/types/geocode";

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

interface IssueReviewProps {
  location?: WizardLocation | null;
}

export const IssueReview = ({ location }: IssueReviewProps) => {
  const handleSubmit = () => {
    // Submit logic — will call API
  };
  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto w-full px-6 py-8 flex flex-col gap-8">
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
                    {location?.address ?? "No location selected"}
                  </p>
                </div>
                <div className="w-full sm:w-48 h-32 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-600">
                  {location ? (
                    <MapView
                      longitude={location.longitude}
                      latitude={location.latitude}
                      height="128px"
                      zoom={14}
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                      <span className="text-xs text-slate-400 dark:text-slate-500">
                        No location
                      </span>
                    </div>
                  )}
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
              <button
                onClick={handleSubmit}
                className="flex-2 py-3 bg-primary hover:bg-primary/90 text-white font-bold shadow-sm flex items-center justify-center gap-2 rounded-lg hover:cursor-pointer"
              >
                Confirm &amp; Submit
                <Send className="size-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
