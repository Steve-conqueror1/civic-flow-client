import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface ServiceBreadcrumbProps {
  items: BreadcrumbItem[];
}

export const ServiceBreadcrumb = ({ items }: ServiceBreadcrumbProps) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm">
      <ol className="flex flex-wrap items-center gap-2 list-none p-0 m-0">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-2">
              {isLast || !item.href ? (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={
                    isLast
                      ? "text-slate-900 dark:text-slate-100 font-medium leading-normal"
                      : "text-slate-500 dark:text-slate-400 font-medium leading-normal"
                  }
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary transition-colors font-medium leading-normal"
                >
                  {item.label}
                </Link>
              )}
              {!isLast && (
                <span
                  aria-hidden="true"
                  className="text-slate-400 dark:text-slate-500 font-medium leading-normal"
                >
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
