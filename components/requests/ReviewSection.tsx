import { Info, MapPin, Paperclip, type LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  info: Info,
  location_on: MapPin,
  photo_library: Paperclip,
};

interface ReviewSectionProps {
  title: string;
  /** Key from ICON_MAP or any lucide icon name */
  icon: string;
  onEdit?: () => void;
  showEdit?: boolean;
  children: React.ReactNode;
}

export function ReviewSection({
  title,
  icon,
  onEdit,
  showEdit = true,
  children,
}: ReviewSectionProps) {
  const Icon = ICON_MAP[icon] ?? Info;

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-slate-900 dark:text-slate-100 text-lg font-bold flex items-center gap-2">
          <Icon className="size-5 text-primary" aria-hidden="true" />
          {title}
        </h3>
        {showEdit && (
          <button
            type="button"
            onClick={onEdit}
            className="text-primary text-sm font-medium hover:underline"
            aria-label={`Edit ${title}`}
          >
            Edit
          </button>
        )}
      </div>
      {children}
    </section>
  );
}
