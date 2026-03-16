"use client";
import Link from "next/link";
import { Wrench, Clock, ArrowRight } from "lucide-react";
import type { Service } from "@/app/types/service";

interface ServiceListTableProps {
  services: Service[];
}

function formatResolutionTime(min: number, max: number): string {
  if (min === max) {
    return `${min} Business Day${min === 1 ? "" : "s"}`;
  }
  return `${min}–${max} Business Days`;
}

export const ServiceListTable = ({ services }: ServiceListTableProps) => {
  return (
    <div className="bg-white dark:bg-[#111a22] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden w-full">
      <div className="overflow-x-auto relative">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
              <th
                scope="col"
                className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest"
              >
                Service Details
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest hidden md:table-cell"
              >
                Estimated Resolution
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest hidden md:table-cell text-right"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {services.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="px-6 py-12 text-center text-slate-500 dark:text-slate-400"
                >
                  No services found.
                </td>
              </tr>
            ) : (
              services.map((service) => (
                <tr
                  key={service.id}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors group"
                >
                  <td className="px-6 py-5">
                    <div className="flex flex-col md:flex-row items-start gap-4 w-full">
                      <div
                        aria-hidden="true"
                        className="w-10 h-10 shrink-0 rounded bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-[#004f84] dark:text-blue-400"
                      >
                        <Wrench className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white mb-1 group-hover:text-primary transition-colors">
                          {service.name}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl">
                          {service.description}
                        </p>
                        {/* Mobile-only resolution time — the table column is hidden on small screens */}
                        <p className="mt-1.5 flex items-center gap-1 text-xs font-semibold text-slate-500 dark:text-slate-400 md:hidden">
                          <Clock aria-hidden="true" className="w-3.5 h-3.5" />
                          {formatResolutionTime(
                            service.minResponseDays,
                            service.maxResponseDays,
                          )}
                        </p>
                        <div className="my-4 md:hidden">
                          <Link
                            href={`/services/${service.slug}`}
                            aria-label={`Request service: ${service.name}`}
                            className="inline-flex items-center gap-2 bg-primary/10 hover:bg-primary text-primary hover:text-white px-4 py-2 rounded  text-xs transition-all  tracking-wider"
                          >
                            Request Service &rarr;
                          </Link>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5 hidden md:table-cell">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
                      <Clock
                        aria-hidden="true"
                        className="w-4 h-4 text-slate-400"
                      />
                      {formatResolutionTime(
                        service.minResponseDays,
                        service.maxResponseDays,
                      )}
                    </div>
                  </td>

                  <td className="px-6 py-5 text-right hidden md:table-cell">
                    <Link
                      href={`/services/${service.slug}`}
                      aria-label={`Request service: ${service.name}`}
                      className="inline-flex items-center gap-2 bg-primary/10 hover:bg-primary text-primary hover:text-white px-4 py-2 rounded text-xs transition-all tracking-wider"
                    >
                      Request Service &rarr;
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
