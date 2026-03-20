import { ClipboardList, Hourglass, CheckCircle } from "lucide-react";
import { DashboardHeader, DashboardMetricCard } from "@/components/dashboard";
import { DashboardRecentActivity } from "@/components/dashboard";
import { AIAssistantButton } from "@/components/dashboard";

const METRICS = [
  {
    label: "Active Requests",
    value: 2,
    icon: (
      <span className="p-1.5 rounded-full bg-primary/10">
        <ClipboardList size={20} className="text-primary" aria-hidden="true" />
      </span>
    ),
  },
  {
    label: "Pending Approval",
    value: 1,
    icon: (
      <span className="p-1.5 rounded-full bg-amber-500/10">
        <Hourglass size={20} className="text-amber-500" aria-hidden="true" />
      </span>
    ),
  },
  {
    label: "Resolved Requests",
    value: 5,
    icon: (
      <span className="p-1.5 rounded-full bg-emerald-500/10">
        <CheckCircle
          size={20}
          className="text-emerald-500"
          aria-hidden="true"
        />
      </span>
    ),
  },
];

export default function DashboardPage() {
  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 ">
      <DashboardHeader name="Alex" />

      <section
        aria-label="Summary metrics"
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
      >
        {METRICS.map((metric) => (
          <DashboardMetricCard
            key={metric.label}
            label={metric.label}
            value={metric.value}
            icon={metric.icon}
          />
        ))}
      </section>

      <DashboardRecentActivity />

      <AIAssistantButton />
    </div>
  );
}
