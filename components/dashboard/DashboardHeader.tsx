import Link from "next/link";
import { Plus } from "lucide-react";

interface DashboardHeaderProps {
  name: string;
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export function DashboardHeader({ name }: DashboardHeaderProps) {
  return (
    <header className="flex flex-wrap justify-between items-center gap-4 mb-8">
      <div>
        <h2 className="text-slate-900 dark:text-slate-100 text-3xl font-bold leading-tight">
          {getGreeting()}, {name}
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Here is an overview of your civic activities.
        </p>
      </div>
      <Link
        href="/dashboard/requests/new"
        className="flex items-center gap-2 rounded-lg h-10 px-5 bg-primary text-white hover:bg-primary-dark text-sm font-semibold transition-colors shadow-sm"
      >
        <Plus size={18} aria-hidden="true" />
        Submit New Request
      </Link>
    </header>
  );
}
