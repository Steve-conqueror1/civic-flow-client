"use client";

import { useRef, useState } from "react";
import { CloudUpload, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FileDropZoneProps {
  accept?: string;
  multiple?: boolean;
  onFileSelect?: (files: File[]) => void;
}

export function FileDropZone({
  accept = ".jpg,.jpeg,.png,.pdf",
  multiple = true,
  onFileSelect,
}: FileDropZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    onFileSelect?.(Array.from(files));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => setIsDraggingOver(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div
      role="region"
      aria-label="File upload area"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "bg-white dark:bg-slate-900 border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-center transition-colors",
        isDraggingOver
          ? "border-primary bg-primary/5"
          : "border-slate-300 dark:border-slate-700 hover:border-primary/50",
      )}
    >
      <div className="bg-primary/10 rounded-full p-4 mb-4">
        <CloudUpload className="size-10 text-primary" aria-hidden="true" />
      </div>

      <h4 className="text-slate-900 dark:text-white text-lg font-bold mb-2">
        Drag and drop files here
      </h4>
      <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 max-w-sm">
        Accepted formats: JPG, PNG, PDF. Max file size: 10MB per document.
      </p>

      <Button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="bg-primary hover:bg-primary/90 text-white font-bold shadow-md flex items-center gap-2"
      >
        <Plus className="size-4" aria-hidden="true" />
        Browse Files
      </Button>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="sr-only"
        aria-label="File input"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}
