"use client";

import { Users, UserCheck, UserX, ClockArrowUp } from "lucide-react";
import { UserStatCard, UsersPageHeader, UsersTable } from "@/components/users";
import { useGetUsersQuery } from "@/app/state/api";

const STATS = [
  {
    icon: <Users className="size-5" aria-hidden="true" />,
    iconClassName: "bg-blue-50 text-primary",
    label: "Total Users",
    valueKey: "total" as const,
    badge: "+12%",
    badgeClassName: "bg-emerald-100 text-emerald-700",
  },
  {
    icon: <UserCheck className="size-5" aria-hidden="true" />,
    iconClassName: "bg-emerald-50 text-emerald-600",
    label: "Active Now",
    valueKey: null,
    staticValue: "842",
    badge: "98%",
    badgeClassName: "bg-emerald-100 text-emerald-700",
  },
  {
    icon: <ClockArrowUp className="size-5" aria-hidden="true" />,
    iconClassName: "bg-amber-50 text-amber-600",
    label: "Pending Staff",
    valueKey: null,
    staticValue: "24",
    badge: "Review",
    badgeClassName: "bg-amber-100 text-amber-700",
  },
  {
    icon: <UserX className="size-5" aria-hidden="true" />,
    iconClassName: "bg-red-50 text-red-600",
    label: "Suspended",
    valueKey: null,
    staticValue: "16",
    badge: "Stable",
    badgeClassName: "bg-slate-100 text-slate-500",
  },
];

export default function UsersPage() {
  const { data, isLoading } = useGetUsersQuery({});
  const users = data?.data?.users ?? [];
  const total = data?.data?.total ?? 0;

  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      <UsersPageHeader />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {STATS.map((stat) => (
          <UserStatCard
            key={stat.label}
            icon={stat.icon}
            iconClassName={stat.iconClassName}
            label={stat.label}
            value={stat.valueKey === "total" ? total : (stat.staticValue ?? "—")}
            badge={stat.badge}
            badgeClassName={stat.badgeClassName}
          />
        ))}
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-12 text-center text-sm text-slate-400">
          Loading users…
        </div>
      ) : (
        <UsersTable users={users} />
      )}
    </div>
  );
}
