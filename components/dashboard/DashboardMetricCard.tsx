interface DashboardMetricCardProps {
  label: string;
  value: number | string;
  icon: React.ReactNode;
}

export function DashboardMetricCard({
  label,
  value,
  icon,
}: DashboardMetricCardProps) {
  return (
    <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
          {label}
        </p>
        <span aria-hidden="true">{icon}</span>
      </div>
      <p className="text-slate-900 dark:text-slate-100 text-3xl font-bold mt-2">
        {value}
      </p>
    </div>
  );
}
