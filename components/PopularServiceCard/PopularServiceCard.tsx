import Link from "next/link";
import { type LucideProps } from "lucide-react";
import { type ComponentType } from "react";

interface PopularServiceCardProps {
  title: string;
  href: string;
  icon: ComponentType<LucideProps>;
}

const PopularServiceCard = ({ title, href, icon: Icon }: PopularServiceCardProps) => {
  return (
    <Link
      href={href}
      className="group flex flex-col items-center p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-primary/50 transition-all duration-200"
    >
      <div className="h-12 w-12 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-primary mb-3 group-hover:scale-110 transition-transform">
        <Icon className="w-7 h-7" aria-hidden="true" />
      </div>
      <h3 className="font-bold text-slate-900 dark:text-white text-center text-sm">
        {title}
      </h3>
    </Link>
  );
};

export default PopularServiceCard;
