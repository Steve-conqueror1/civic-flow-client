import {
  Car,
  FileText,
  HelpCircle,
  MoveRight,
  Recycle,
  TreePine,
  Users,
} from "lucide-react";
import Link from "next/link";
import ServiceCategoryCard from "./ServiceCategoryCard";

const CATEGORIES = [
  {
    icon: <Car size={28} />,
    label: "Roads & Traffic",
    href: "/services/roads-traffic",
  },
  {
    icon: <FileText size={28} />,
    label: "Permits",
    href: "/services/permits",
  },
  {
    icon: <TreePine size={28} />,
    label: "Parks & Rec",
    href: "/services/parks-rec",
  },
  {
    icon: <Recycle size={28} />,
    label: "Waste Mgmt",
    href: "/services/waste-management",
  },
  {
    icon: <Users size={28} />,
    label: "Social Services",
    href: "/services/social-services",
  },
  {
    icon: <HelpCircle size={28} />,
    label: "General Help",
    href: "/services/general-help",
  },
];

export default function ServiceCategoriesSection() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="w-full bg-white dark:bg-card py-16 border-y border-slate-100 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <h2
              id="services-heading"
              className="text-3xl font-bold text-slate-900 dark:text-white"
            >
              Service Categories
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2">
              Browse services by department.
            </p>
          </div>
          <Link
            href="/services"
            className="text-primary font-bold text-sm  flex items-center gap-1"
          >
            <span className="hover:underline">View All Services</span>
            <MoveRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => (
            <ServiceCategoryCard
              key={cat.label}
              icon={cat.icon}
              label={cat.label}
              href={cat.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
