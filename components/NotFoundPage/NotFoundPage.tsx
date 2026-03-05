import Link from "next/link";
import {
  SearchX,
  Home,
  HeadphonesIcon,
  LayoutDashboard,
  BarChart3,
  MessageSquare,
  Map,
} from "lucide-react";

const quickLinks = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Consultations", href: "/consultations", icon: MessageSquare },
  { label: "Roadmap", href: "/roadmap", icon: Map },
];

const NotFoundPage = () => {
  return (
    <main
      className="flex-grow flex items-center justify-center px-6 py-20"
      aria-labelledby="not-found-heading"
    >
      <div className="max-w-2xl w-full text-center">
        {/* 404 graphic with overlaid icon */}
        <div className="relative mb-12" aria-hidden="true">
          <div className="text-[12rem] font-black text-slate-200 dark:text-slate-800 leading-none select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-primary/10 dark:bg-primary/20 p-8 rounded-full">
              <SearchX className="w-20 h-20 text-primary" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        {/* Heading */}
        <h1
          id="not-found-heading"
          className="text-3xl font-bold mb-4 text-foreground"
        >
          We couldn&apos;t find that page
        </h1>

        {/* Description */}
        <p className="text-slate-600 dark:text-slate-400 text-lg mb-8 max-w-lg mx-auto">
          The feature you&apos;re looking for might have been moved, or is
          currently{" "}
          <span className="text-primary font-semibold">&apos;Coming Soon&apos;</span>{" "}
          as part of CivicFlow&apos;s ongoing AI-enabled development for Alberta.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="flex items-center gap-2 px-8 py-3 bg-primary text-white font-bold rounded-xl hover:shadow-lg transition-all w-full sm:w-auto justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Home className="w-5 h-5" aria-hidden="true" />
            Return to Home
          </Link>
          <Link
            href="/contact"
            className="flex items-center gap-2 px-8 py-3 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold rounded-xl hover:bg-slate-300 dark:hover:bg-slate-700 transition-all w-full sm:w-auto justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <HeadphonesIcon className="w-5 h-5" aria-hidden="true" />
            Contact Support
          </Link>
        </div>

        {/* Quick navigation */}
        <div className="mt-16 p-6 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">
            Explore CivicFlow
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickLinks.map(({ label, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                className="p-4 rounded-xl hover:bg-primary/5 transition-colors flex flex-col items-center gap-2"
              >
                <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
                <span className="block text-sm font-semibold">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
