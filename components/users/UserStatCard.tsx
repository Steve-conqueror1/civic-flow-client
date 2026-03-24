import { cn } from "@/lib/utils";

export interface UserStatCardProps {
  icon: React.ReactNode;
  iconClassName?: string;
  label: string;
  value: string | number;
  badge: string;
  badgeClassName?: string;
}

export function UserStatCard({
  icon,
  iconClassName,
  label,
  value,
  badge,
  badgeClassName,
}: UserStatCardProps) {
  return (
    <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div
          className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center",
            iconClassName,
          )}
          aria-hidden="true"
        >
          {icon}
        </div>
        <span
          className={cn(
            "text-[10px] font-bold px-2 py-0.5 rounded-full",
            badgeClassName,
          )}
        >
          {badge}
        </span>
      </div>
      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
        {label}
      </p>
      <p className="text-2xl font-black text-slate-900 dark:text-slate-100">
        {value}
      </p>
    </div>
  );
}
