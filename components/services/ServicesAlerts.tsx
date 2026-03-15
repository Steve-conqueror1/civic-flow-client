import { AlertTriangle } from "lucide-react";

interface ServiceAlert {
  title: string;
  message: string;
}

const defaultAlerts: ServiceAlert[] = [
  {
    title: "System Maintenance",
    message: "Payments will be unavailable on Sunday from 2am-4am.",
  },
];

interface ServicesAlertsProps {
  alerts?: ServiceAlert[];
}

export const ServicesAlerts = ({
  alerts = defaultAlerts,
}: ServicesAlertsProps) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm">
      <h3 className="font-bold text-slate-900 dark:text-white mb-2">
        Service Alerts
      </h3>
      <ul className="space-y-3">
        {alerts.map((alert, idx) => (
          <li
            key={idx}
            className="flex items-start gap-3 bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg border border-yellow-100 dark:border-yellow-900/30"
            role="alert"
          >
            <AlertTriangle
              className="w-5 h-5 text-yellow-600 dark:text-yellow-500 mt-0.5 flex-shrink-0"
              aria-hidden="true"
            />
            <div>
              <p className="text-xs font-bold text-yellow-800 dark:text-yellow-300">
                {alert.title}
              </p>
              <p className="text-xs text-yellow-700 dark:text-yellow-400 mt-1">
                {alert.message}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
