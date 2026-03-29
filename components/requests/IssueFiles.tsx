"use client";
import React from "react";
import { DocumentRequirements } from "./DocumentRequirements";
import { FileDropZone } from "./FileDropZone";
import { UploadedFileCard } from "./UploadedFileCard";
import { fileFormatSize, getFileType } from "@/lib/utils";

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  type: string;
  previewUrl?: string;
}

export const IssueFiles = () => {
  const [files, setFiles] = React.useState<UploadedFile[]>([]);

  const handleFileSelect = (selected: File[]) => {
    const newFiles: UploadedFile[] = selected.map((file) => ({
      id: `${file.name}-${Date.now()}`,
      name: file.name,
      size: fileFormatSize(file.size),
      type: getFileType(file.name),
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
    <div className="w-full">
      <div className="max-w-7xl mx-auto w-full px-6 py-8">
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
      </div>
    </div>
  );
};
