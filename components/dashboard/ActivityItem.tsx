import { cn } from "@/lib/utils";

type StatusVariant = "active" | "closed" | "pending";

const STATUS_STYLES: Record<StatusVariant, string> = {
  active: "text-primary bg-primary/10",
  closed: "text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30",
  pending: "text-amber-600 bg-amber-100 dark:bg-amber-900/30",
};

interface ActivityItemProps {
  icon: React.ReactNode;
  title: string;
  department: string;
  timeLabel: string;
  status: string;
  statusVariant: StatusVariant;
  isLast?: boolean;
}

export function ActivityItem({
  icon,
  title,
  department,
  timeLabel,
  status,
  statusVariant,
  isLast = false,
}: ActivityItemProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-4 p-5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors",
        !isLast && "border-b border-slate-100 dark:border-slate-800",
      )}
    >
      <div className="shrink-0 size-12 rounded-lg flex items-center justify-center">
        {icon}
      </div>
      <div className="flex flex-1 flex-col justify-center min-w-0">
        <p className="text-slate-900 dark:text-slate-100 text-base font-medium">
          {title}
        </p>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">
          {department}
        </p>
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          <span className="text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">
            {timeLabel}
          </span>
          <span
            className={cn(
              "text-xs px-2 py-1 rounded-md font-medium",
              STATUS_STYLES[statusVariant],
            )}
          >
            {status}
          </span>
        </div>
      </div>
    </div>
  );
}
