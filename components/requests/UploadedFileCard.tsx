import Image from "next/image";
import { FileText, Trash2 } from "lucide-react";

interface UploadedFileCardProps {
  id: string;
  name: string;
  size: string;
  type: string;
  previewUrl?: string;
  onDelete?: (id: string) => void;
}

export function UploadedFileCard({
  id,
  name,
  size,
  type,
  previewUrl,
  onDelete,
}: UploadedFileCardProps) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      {/* Thumbnail */}
      <div className="relative size-16 flex-shrink-0 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden flex items-center justify-center">
        {previewUrl ? (
          <Image src={previewUrl} alt={name} fill className="object-cover" />
        ) : (
          <FileText
            data-testid="file-icon"
            className="size-8 text-primary/40"
            aria-hidden="true"
          />
        )}
      </div>

      {/* File info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
          {name}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {size} &bull; {type}
        </p>
      </div>

      {/* Delete */}
      <button
        type="button"
        onClick={() => onDelete?.(id)}
        aria-label={`Delete ${name}`}
        className="text-slate-400 hover:text-red-500 transition-colors p-1 rounded"
      >
        <Trash2 className="size-4" aria-hidden="true" />
        <span className="sr-only">Delete</span>
      </button>
    </div>
  );
}
