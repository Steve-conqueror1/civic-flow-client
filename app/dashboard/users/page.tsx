"use client";

import { Users, UserCheck, UserX, ClockArrowUp } from "lucide-react";
import { UserStatCard, UsersPageHeader, UsersTable } from "@/components/users";
import { useGetUsersQuery, useGetUserStatsQuery } from "@/app/state/api";
import type { UserStatsData } from "@/app/types/user";

const STAT_CARDS: {
  icon: React.ReactNode;
  iconClassName: string;
  label: string;
  key: keyof UserStatsData;
  badge: string;
  badgeClassName: string;
}[] = [
  {
    icon: <Users className="size-5" aria-hidden="true" />,
    iconClassName: "bg-blue-50 text-primary",
    label: "Total Users",
    key: "totalUsers",
    badge: "Users",
    badgeClassName: "bg-green-50 text-green-700 border border-green-100",
  },
  {
    icon: <UserCheck className="size-5" aria-hidden="true" />,
    iconClassName: "bg-amber-50 text-amber-600",
    label: "Total Staff",
    key: "totalStaff",
    badge: "Staff",
    badgeClassName: "bg-amber-50 text-amber-700 border border-amber-100",
  },
  {
    icon: <ClockArrowUp className="size-5" aria-hidden="true" />,
    iconClassName: "bg-amber-50 text-amber-600",
    label: "Inactive Users",
    key: "inactiveUsers",
    badge: "Inactive",
    badgeClassName: "bg-amber-50 text-amber-700 border border-amber-100",
  },
  {
    icon: <UserX className="size-5" aria-hidden="true" />,
    iconClassName: "bg-red-50 text-red-600",
    label: "Suspended",
    key: "suspendedUsers",
    badge: "Suspended",
    badgeClassName: "bg-red-50 text-red-700 border border-red-100",
  },
];

export default function UsersPage() {
  const {
    data: statsData,
    isLoading: statsLoading,
    isError: statsError,
  } = useGetUserStatsQuery(undefined, { pollingInterval: 30000 });
  const { data, isLoading } = useGetUsersQuery({});
  const users = data?.data?.users ?? [];
  const stats = statsData?.data;

  console.log(users);

  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      <UsersPageHeader />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {statsLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-slate-100 dark:bg-slate-800 rounded-xl h-28"
            />
          ))
        ) : statsError ? (
          <div className="col-span-full bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-xl p-4 text-sm text-center">
            Failed to load user statistics. Please refresh.
          </div>
        ) : (
          STAT_CARDS.map((stat) => (
            <UserStatCard
              key={stat.label}
              icon={stat.icon}
              iconClassName={stat.iconClassName}
              label={stat.label}
              value={stats?.[stat.key] ?? 0}
              badge={stat.badge}
              badgeClassName={stat.badgeClassName}
            />
          ))
        )}
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
