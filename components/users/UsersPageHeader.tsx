import { ChevronRight, Download, UserPlus } from "lucide-react";

interface UsersPageHeaderProps {
  onInvite?: () => void;
  onExport?: () => void;
}

export function UsersPageHeader({ onInvite, onExport }: UsersPageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
      <div>
        <nav
          className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-widest mb-2"
          aria-label="Breadcrumb"
        >
          <span>Platform</span>
          <ChevronRight className="size-3" aria-hidden="true" />
          <span className="text-primary">User Management</span>
        </nav>
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          System Users
        </h1>
        <p className="text-slate-500 mt-2 text-sm">
          Manage access control, audit activity, and configure account roles for
          the entire organization.
        </p>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onExport}
          className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2.5 rounded-lg text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm"
          type="button"
        >
          <Download className="size-4" aria-hidden="true" />
          Export List
        </button>
        <button
          onClick={onInvite}
          className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-primary-dark transition-all shadow-sm"
          type="button"
        >
          <UserPlus className="size-4" aria-hidden="true" />
          Invite User
        </button>
      </div>
    </div>
  );
}
