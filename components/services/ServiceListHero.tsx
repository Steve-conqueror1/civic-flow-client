import Link from "next/link";
import type { ReactNode } from "react";
import type { BreadcrumbItem } from "./ServiceBreadcrumb";

interface ServiceListHeroProps {
  title: string;
  description: string;
  icon: ReactNode;
  breadcrumbs: BreadcrumbItem[];
}

export const ServiceListHero = ({
  title,
  description,
  icon,
  breadcrumbs,
}: ServiceListHeroProps) => {
  return (
    <section
      aria-labelledby="service-list-hero-title"
      className="bg-[#004f84] text-white pt-16 pb-20 overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-10 relative mb-12">
        <div className="max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 list-none p-0 m-0 text-xs text-blue-200/70 uppercase tracking-widest font-bold">
              {breadcrumbs.map((item, index) => {
                const isLast = index === breadcrumbs.length - 1;
                return (
                  <li
                    key={item.href ?? item.label}
                    className="flex items-center gap-2"
                  >
                    {isLast || !item.href ? (
                      <span
                        aria-current={isLast ? "page" : undefined}
                        className={isLast ? "text-white" : ""}
                      >
                        {item.label}
                      </span>
                    ) : (
                      <Link
                        href={item.href}
                        className="hover:text-white transition-colors"
                      >
                        {item.label}
                      </Link>
                    )}
                    {!isLast && (
                      <span aria-hidden="true" className="text-blue-200/50">
                        ›
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>

          <h1
            id="service-list-hero-title"
            className="text-5xl lg:text-6xl font-black mb-6 tracking-tight leading-tight"
          >
            {title}
          </h1>
          <p className="text-xl text-blue-100/90 leading-relaxed font-medium">
            {description}
          </p>
        </div>

        <div
          aria-hidden="true"
          className="absolute right-0 top-0 opacity-10 pointer-events-none hidden lg:block"
        >
          {icon}
        </div>
      </div>
    </section>
  );
};
