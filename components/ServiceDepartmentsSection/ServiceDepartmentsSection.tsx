"use client";

import {
  Car,
  FileText,
  HelpCircle,
  type LucideIcon,
  MoveRight,
  Recycle,
  TreePine,
  Users,
} from "lucide-react";
import Link from "next/link";
import { ServiceDepartmentCard } from "./ServiceDepartmentCard";
import { useGetDepartmentsQuery } from "@/app/state/api";

const DEPARTMENTS_ICONS: Record<string, LucideIcon> = {
  car: Car,
  permits: FileText,
  "tree-pine": TreePine,
  recycle: Recycle,
  users: Users,
  "help-circle": HelpCircle,
};

export function ServiceDepartmentsSection() {
  const { data, isLoading, isError } = useGetDepartmentsQuery();
  const departments = data?.data?.departments ?? [];

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
              Service Departments
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

        {isLoading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-32 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 animate-pulse"
              />
            ))}
          </div>
        )}

        {isError && (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Unable to load departments. Please try again later.
          </p>
        )}

        {!isLoading && !isError && departments.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {departments
              .filter((dept) => dept.isActive)
              .map((dept) => {
                console.log("----department icon----", dept.icon);
                const Icon = DEPARTMENTS_ICONS[dept.icon] ?? HelpCircle;
                return (
                  <ServiceDepartmentCard
                    key={dept.id}
                    icon={<Icon size={28} />}
                    label={dept.name}
                    href={`/services/${dept.slug}`}
                  />
                );
              })}
          </div>
        )}
      </div>
    </section>
  );
}
