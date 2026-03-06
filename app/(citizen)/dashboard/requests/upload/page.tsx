"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  RequestProgressBar,
  FileDropZone,
  UploadedFileCard,
  DocumentRequirements,
} from "@/components/requests";

const WIZARD_STEPS = ["Description", "Location", "Upload", "Review"];

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  type: string;
  previewUrl?: string;
}

function formatSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getType(name: string): string {
  const ext = name.split(".").pop()?.toUpperCase() ?? "FILE";
  return ext;
}

export default function RequestUploadPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const handleFileSelect = (selected: File[]) => {
    const newFiles: UploadedFile[] = selected.map((file) => ({
      id: `${file.name}-${Date.now()}`,
      name: file.name,
      size: formatSize(file.size),
      type: getType(file.name),
      previewUrl: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : undefined,
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleDelete = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <main className="flex flex-1 flex-col overflow-y-auto">
      <div className="max-w-7xl mx-auto w-full px-6 py-8">
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
            <Link href="/dashboard/requests/upload" className="text-primary">
              Upload
            </Link>
          </span>
        </div>
        {/* Page header */}
        <div className="flex flex-col gap-1 mb-6">
          <h1 className="text-slate-900 dark:text-white text-3xl font-bold leading-tight">
            Submit New Request
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Step 3: Upload photos
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-10">
          <RequestProgressBar steps={WIZARD_STEPS} currentStep={3} />
        </div>

        {/* Section header */}
        <div className="mb-8">
          <h2 className="text-slate-900 dark:text-white text-2xl font-bold leading-tight mb-2">
            Upload Images and Photos
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base">
            To help us process your request more efficiently, you may upload
            images or photos of any relevant documents. Please ensure that all
            text in the images is clear and legible. This step is optional.
          </p>
        </div>

        {/* Drop zone */}
        <div className="mb-8">
          <FileDropZone onFileSelect={handleFileSelect} />
        </div>

        {/* Uploaded files list */}
        {files.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4 px-1">
              <h3 className="text-slate-900 dark:text-white font-bold">
                Uploaded Documents ({files.length})
              </h3>
              <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest font-semibold">
                Ready to review
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {files.map((file) => (
                <UploadedFileCard
                  key={file.id}
                  {...file}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </div>
        )}

        {/* Requirements */}
        <div className="mb-10">
          <DocumentRequirements />
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between py-4 border-t border-slate-200 dark:border-slate-800">
          <Button variant="outline" asChild>
            <Link
              href="/dashboard/requests/location"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Back to Step 2
            </Link>
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-semibold shadow-lg shadow-primary/30 flex items-center gap-2 hover:cursor-pointer">
            Review &amp; Submit
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </main>
  );
}
