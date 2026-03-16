import { Construction, CalendarDays, Receipt, Store, Star } from "lucide-react";

import {
  ServiceCategoriesSection,
  ServicesAIAssistant,
  ServicesAlerts,
  ServicesHero,
  ServicesQuickLinks,
  PopularServiceCard,
} from "@/components/services";

const popularServices = [
  {
    title: "Report Pothole",
    href: "/services/pothole",
    icon: Construction,
  },
  {
    title: "Waste Schedule",
    href: "/services/waste-schedule",
    icon: CalendarDays,
  },
  { title: "Pay Ticket", href: "/services/ticket", icon: Receipt },
  { title: "Business Permit", href: "/services/business", icon: Store },
];

const ServicesPage = () => {
  return (
    <main className="grow  w-full bg-background">
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
          <ServiceCategoriesSection />

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
