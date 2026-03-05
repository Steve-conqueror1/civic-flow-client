import {
  Grid2X2Plus,
  LocateIcon,
  MapIcon,
  MapPin,
  MonitorSmartphone,
  Notebook,
  User,
} from "lucide-react";

export const CollectedInfo = () => {
  return (
    <div className="grid gap-4">
      <p className="text-slate-700 dark:text-slate-300 mb-2">
        To provide efficient public services, we collect the following
        categories of data:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-start gap-3 p-4 bg-primary/5 dark:bg-primary/10 rounded-lg">
          <User className="text-primary" />
          <div>
            <p className="font-bold text-slate-900 dark:text-slate-100">
              Identifiers
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Name, email address, and phone number.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-4 bg-primary/5 dark:bg-primary/10 rounded-lg">
          <MapPin className="text-primary" />
          <div>
            <p className="font-bold text-slate-900 dark:text-slate-100">
              Location Data
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              GPS coordinates or addresses for service requests.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-4 bg-primary/5 dark:bg-primary/10 rounded-lg">
          <Notebook className="text-primary" />
          <div>
            <p className="font-bold text-slate-900 dark:text-slate-100">
              Request Details
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Photos, descriptions, and timestamps of reports.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-4 bg-primary/5 dark:bg-primary/10 rounded-lg">
          <MonitorSmartphone className="text-primary" />
          <div>
            <p className="font-bold text-slate-900 dark:text-slate-100">
              Technical Data
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              IP address and browser type for security monitoring.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
