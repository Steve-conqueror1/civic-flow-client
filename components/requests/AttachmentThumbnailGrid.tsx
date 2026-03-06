import Image from "next/image";
import { ImageIcon } from "lucide-react";

interface Attachment {
  id: string;
  src: string;
  alt: string;
}

interface AttachmentThumbnailGridProps {
  attachments: Attachment[];
}

export function AttachmentThumbnailGrid({
  attachments,
}: AttachmentThumbnailGridProps) {
  if (attachments.length === 0) {
    return (
      <p className="text-sm text-slate-500 dark:text-slate-400 italic flex items-center gap-2">
        <ImageIcon className="size-4" aria-hidden="true" />
        No attachments uploaded.
      </p>
    );
  }

  return (
    <div className="flex flex-wrap gap-4">
      {attachments.map((attachment) => (
        <div
          key={attachment.id}
          className="relative w-24 h-24 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden group flex-shrink-0"
        >
          <Image
            src={attachment.src}
            alt={attachment.alt}
            fill
            className="object-cover"
          />
          <div
            className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            aria-hidden="true"
          />
        </div>
      ))}
    </div>
  );
}
