import {
  Construction,
  CalendarDays,
  Receipt,
  Store,
  TrafficCone,
  FileText,
  Users,
  Shield,
  Leaf,
  Star,
} from "lucide-react";

import {
  ServiceCategoryCard,
  ServicesAIAssistant,
  ServicesAlerts,
  ServicesHero,
  ServicesQuickLinks,
  PopularServiceCard,
} from "@/components/services";

const popularServices = [
  {
    title: "Report Pothole",
    href: "/services/infrastructure/pothole",
    icon: Construction,
  },
  {
    title: "Waste Schedule",
    href: "/services/environment/waste-schedule",
    icon: CalendarDays,
  },
  { title: "Pay Ticket", href: "/services/payments/ticket", icon: Receipt },
  { title: "Business Permit", href: "/services/permits/business", icon: Store },
];

const categories = [
  {
    name: "Infrastructure",
    description: "Roads, utilities, and public works maintenance.",
    responseTime: "Response: 2-3 days",
    icon: TrafficCone,
    iconBgClass: "bg-blue-100 dark:bg-blue-900/30",
    iconColorClass: "text-primary",
    services: [
      {
        name: "Road Repair Request",
        href: "/services/infrastructure/road-repair",
      },
      {
        name: "Snow Removal Status",
        href: "/services/infrastructure/snow-removal",
      },
    ],
    viewAllHref: "/services/infrastructure",
    viewAllLabel: "View all Infrastructure services",
  },
  {
    name: "Permits & Licensing",
    description: "Business, residential, and professional certifications.",
    responseTime: "Response: 1-2 days",
    icon: FileText,
    iconBgClass: "bg-indigo-100 dark:bg-indigo-900/30",
    iconColorClass: "text-indigo-600 dark:text-indigo-400",
    services: [
      {
        name: "Business License Application",
        href: "/services/permits/business-license",
      },
      { name: "Building Permit Status", href: "/services/permits/building" },
    ],
    viewAllHref: "/services/permits",
    viewAllLabel: "View all Permit services",
  },
  {
    name: "Social Programs",
    description: "Community support, housing, and family services.",
    responseTime: "Response: 5-7 days",
    icon: Users,
    iconBgClass: "bg-purple-100 dark:bg-purple-900/30",
    iconColorClass: "text-purple-600 dark:text-purple-400",
    services: [
      { name: "Housing Support Application", href: "/services/social/housing" },
      { name: "Child Care Subsidy", href: "/services/social/childcare" },
    ],
    viewAllHref: "/services/social",
    viewAllLabel: "View all Social services",
  },
  {
    name: "Public Safety",
    description: "Emergency services, permits, and community safety.",
    responseTime: "Response: 24 hours",
    icon: Shield,
    iconBgClass: "bg-red-100 dark:bg-red-900/30",
    iconColorClass: "text-red-600 dark:text-red-400",
    services: [
      {
        name: "Non-emergency Reporting",
        href: "/services/safety/non-emergency",
      },
      { name: "Fire Permits", href: "/services/safety/fire-permits" },
    ],
    viewAllHref: "/services/safety",
    viewAllLabel: "View all Safety services",
  },
  {
    name: "Environment",
    description: "Parks, waste management, and conservation efforts.",
    responseTime: "Response: 3-5 days",
    icon: Leaf,
    iconBgClass: "bg-emerald-100 dark:bg-emerald-900/30",
    iconColorClass: "text-emerald-600 dark:text-emerald-400",
    services: [
      {
        name: "Waste Collection Schedule",
        href: "/services/environment/waste-schedule",
      },
      {
        name: "Park Facility Booking",
        href: "/services/environment/park-booking",
      },
    ],
    viewAllHref: "/services/environment",
    viewAllLabel: "View all Environment services",
  },
];

const ServicesPage = () => {
  return (
    <main className="flex-grow  w-full bg-background">
      <ServicesHero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Popular Services */}
        <section className="mb-16" aria-labelledby="popular-services-heading">
          <h2
            id="popular-services-heading"
            className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2"
          >
            <Star className="w-5 h-5 text-primary" aria-hidden="true" />
            Popular Services
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {popularServices.map((service) => (
              <PopularServiceCard key={service.title} {...service} />
            ))}
          </div>
        </section>

        {/* Two-column layout: categories + sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Browse by Category */}
          <section
            className="lg:col-span-2 space-y-8"
            aria-labelledby="browse-heading"
          >
            <div className="flex items-end justify-between border-b border-slate-200 dark:border-slate-700 pb-4">
              <div>
                <h2
                  id="browse-heading"
                  className="text-2xl font-bold text-slate-900 dark:text-white"
                >
                  Browse by Category
                </h2>
                <p className="text-slate-500 dark:text-slate-400 mt-1">
                  Find the department or service you need.
                </p>
              </div>
            </div>
            {categories.map((category) => (
              <ServiceCategoryCard key={category.name} {...category} />
            ))}
          </section>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            <ServicesAIAssistant />
            <ServicesQuickLinks />
            <ServicesAlerts />
          </aside>
        </div>
      </div>
    </main>
  );
};

export default ServicesPage;
