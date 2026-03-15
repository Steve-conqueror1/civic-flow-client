import Link from "next/link";
import {
  User,
  ClipboardList,
  Map,
  CreditCard,
  ChevronRight,
} from "lucide-react";

const quickLinks = [
  { label: "My Account", href: "/citizen/profile", icon: User },
  {
    label: "Application Status",
    href: "/citizen/requests",
    icon: ClipboardList,
  },
  { label: "Service Locations", href: "/services/locations", icon: Map },
  { label: "Make a Payment", href: "/citizen/payments", icon: CreditCard },
];

export const ServicesQuickLinks = () => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm">
      <h3 className="font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-100 dark:border-slate-700 pb-2">
        Quick Links
      </h3>
      <nav aria-label="Quick links">
        <ul className="flex flex-col gap-1">
          {quickLinks.map(({ label, href, icon: Icon }) => (
            <li key={label}>
              <Link
                href={href}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-300 transition-colors group"
              >
                <span className="flex items-center gap-3">
                  <Icon
                    className="w-5 h-5 text-slate-400 group-hover:text-primary"
                    aria-hidden="true"
                  />
                  {label}
                </span>
                <ChevronRight
                  className="w-4 h-4 text-slate-300"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
