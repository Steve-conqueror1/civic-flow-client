import { User, MapPin, FileText, Monitor } from "lucide-react";
import { PolicyHeading } from "./PolicyHeading";

const DATA_CATEGORIES = [
  {
    icon: <User size={20} aria-hidden="true" />,
    title: "Identifiers",
    description: "Name, email address, and phone number.",
  },
  {
    icon: <MapPin size={20} aria-hidden="true" />,
    title: "Location Data",
    description: "GPS coordinates or addresses for service requests.",
  },
  {
    icon: <FileText size={20} aria-hidden="true" />,
    title: "Request Details",
    description: "Photos, descriptions, and timestamps of reports.",
  },
  {
    icon: <Monitor size={20} aria-hidden="true" />,
    title: "Technical Data",
    description: "IP address and browser type for security monitoring.",
  },
];

export function CollectedInfo() {
  return (
    <section aria-labelledby="collected-info-heading">
      <PolicyHeading number="02" title="Information We Collect" />
      <div className="grid gap-4">
        <p className="text-slate-700 dark:text-slate-300 mb-2">
          To provide efficient public services, we collect the following
          categories of data:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DATA_CATEGORIES.map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-3 p-4 bg-primary/5 dark:bg-primary/10 rounded-lg"
            >
              <span className="text-primary mt-0.5 shrink-0">{item.icon}</span>
              <div>
                <p className="font-bold text-slate-900 dark:text-slate-100">
                  {item.title}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
