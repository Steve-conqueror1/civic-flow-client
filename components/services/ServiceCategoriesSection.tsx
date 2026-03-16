"use client";

import { useGetServicesGroupedByCategoryQuery } from "@/app/state/api";
import { getCategoryIcon } from "@/lib/category-icons";
import { Skeleton } from "@/components/ui/skeleton";
import { ServiceCategoryCard } from "./ServiceCategoryCard";
import type { Service } from "@/app/types/service";

function getResponseTime(services: Service[]): string {
  if (services.length === 0) return "Response: varies";
  const { minResponseDays, maxResponseDays } = services[0];
  if (minResponseDays === maxResponseDays) {
    return `Response: ${minResponseDays} day${minResponseDays === 1 ? "" : "s"}`;
  }
  return `Response: ${minResponseDays}–${maxResponseDays} days`;
}

export const ServiceCategoriesSection = () => {
  const { data, isLoading, isError } = useGetServicesGroupedByCategoryQuery({
    limit: 2,
  });

  const groups = data?.data?.groups ?? [];

  return (
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

      {isLoading && (
        <div className="space-y-8">
          <Skeleton className="h-48 w-full rounded-xl" />
          <Skeleton className="h-48 w-full rounded-xl" />
          <Skeleton className="h-48 w-full rounded-xl" />
        </div>
      )}

      {isError && (
        <p className="text-sm text-red-600 dark:text-red-400">
          Failed to load service categories. Please try again later.
        </p>
      )}

      {!isLoading && !isError && groups.length === 0 && (
        <p className="text-sm text-slate-500 dark:text-slate-400">
          No service categories are available at this time.
        </p>
      )}

      {!isLoading && !isError && groups.length > 0 && (
        <div className="space-y-8">
          {groups.map(({ category, services }) => {
            const { icon, iconBgClass, iconColorClass } = getCategoryIcon(
              category.name,
            );
            return (
              <ServiceCategoryCard
                key={category.id}
                name={category.name}
                description={category.description}
                responseTime={getResponseTime(services)}
                icon={icon}
                iconBgClass={iconBgClass}
                iconColorClass={iconColorClass}
                services={services.map((s) => ({ name: s.name, slug: s.slug }))}
                viewAllHref={`/categories/${category.slug}`}
                viewAllLabel={`View all ${category.name} services`}
              />
            );
          })}
        </div>
      )}
    </section>
  );
};
