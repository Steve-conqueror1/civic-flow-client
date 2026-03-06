import Link from "next/link";
import { AlertTriangle, Trees, Lightbulb } from "lucide-react";
import { ActivityItem } from "./ActivityItem";

const ACTIVITIES = [
  {
    icon: (
      <div className="size-12 rounded-lg bg-amber-500/10 flex items-center justify-center">
        <AlertTriangle
          size={22}
          className="text-amber-500"
          aria-hidden="true"
        />
      </div>
    ),
    title: "Pothole on Main St",
    department: "Assigned to Public Works",
    timeLabel: "Submitted 2 days ago",
    status: "In Progress",
    statusVariant: "active" as const,
  },
  {
    icon: (
      <div className="size-12 rounded-lg bg-emerald-500/10 flex items-center justify-center">
        <Trees size={22} className="text-emerald-500" aria-hidden="true" />
      </div>
    ),
    title: "Broken Park Bench",
    department: "Parks & Recreation",
    timeLabel: "Resolved yesterday",
    status: "Closed",
    statusVariant: "closed" as const,
  },
  {
    icon: (
      <div className="size-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
        <Lightbulb size={22} className="text-blue-500" aria-hidden="true" />
      </div>
    ),
    title: "Streetlight Outage",
    department: "Utility Services",
    timeLabel: "Submitted 5 days ago",
    status: "Pending Review",
    statusVariant: "pending" as const,
  },
];

export function DashboardRecentActivity() {
  return (
    <section aria-labelledby="recent-activity-heading">
      <div className="flex justify-between items-center mb-4">
        <h3
          id="recent-activity-heading"
          className="text-slate-900 dark:text-slate-100 text-xl font-bold"
        >
          Recent Activity
        </h3>
        <Link
          href="/citizen/requests"
          className="text-primary text-sm font-medium hover:underline"
        >
          View All
        </Link>
      </div>
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {ACTIVITIES.map((item, i) => (
          <ActivityItem
            key={item.title}
            icon={item.icon}
            title={item.title}
            department={item.department}
            timeLabel={item.timeLabel}
            status={item.status}
            statusVariant={item.statusVariant}
            isLast={i === ACTIVITIES.length - 1}
          />
        ))}
      </div>
    </section>
  );
}
