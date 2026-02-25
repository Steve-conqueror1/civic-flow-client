import { type ReactNode } from "react";
import Link from "next/link";

interface ServiceCategoryCardProps {
  icon: ReactNode;
  label: string;
  href: string;
}

export default function ServiceCategoryCard({
  icon,
  label,
  href,
}: ServiceCategoryCardProps) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md transition-all text-center group h-32"
    >
      <span
        className="text-slate-400 group-hover:text-primary transition-colors"
        aria-hidden="true"
      >
        {icon}
      </span>
      <span className="text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">
        {label}
      </span>
    </Link>
  );
}
