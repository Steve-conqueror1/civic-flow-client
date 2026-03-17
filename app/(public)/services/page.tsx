"use client";

import { Star } from "lucide-react";

import { useGetPopularServicesQuery } from "@/app/state/api";
import {
  ServiceCategoriesSection,
  ServicesAIAssistant,
  ServicesAlerts,
  ServicesHero,
  ServicesQuickLinks,
  PopularServiceCard,
} from "@/components/services";

const PopularServicesSkeleton = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {Array.from({ length: 4 }).map((_, i) => (
      <div
        key={i}
        className="flex flex-col items-center p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 animate-pulse"
      >
        <div className="h-12 w-12 rounded-full bg-slate-200 dark:bg-slate-700 mb-3" />
        <div className="h-4 w-20 rounded bg-slate-200 dark:bg-slate-700" />
      </div>
    ))}
  </div>
);

const ServicesPage = () => {
  const { data, isLoading, isError } = useGetPopularServicesQuery();

  const popularServices = data?.data.services;

  return (
    <main className="grow  w-full bg-background">
      <ServicesHero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Popular Services */}
        {!isError && (
          <section className="mb-16" aria-labelledby="popular-services-heading">
            <h2
              id="popular-services-heading"
              className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2"
            >
              <Star className="w-5 h-5 text-primary" aria-hidden="true" />
              Popular Services
            </h2>
            {isLoading ? (
              <PopularServicesSkeleton />
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {popularServices?.map((service) => (
                  <PopularServiceCard
                    key={service.id}
                    title={service.name}
                    href={`/services/${service.slug}`}
                  />
                ))}
              </div>
            )}
          </section>
        )}

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
