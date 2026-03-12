"use client";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { UsersCount } from "./UsersCount";

export function HeroContent() {
  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-primary/10 w-fit">
        <Sparkles className="text-primary" size={16} aria-hidden="true" />
        <span className="text-primary text-xs font-bold uppercase tracking-wide">
          AI-Powered Citizen Services
        </span>
      </div>

      <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-[-0.033em] text-slate-900 dark:text-white">
        Simplifying Public Service Requests Across Alberta
      </h1>

      <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
        Experience faster resolutions with our AI-assisted platform. We
        instantly connect citizens to the right government departments, removing
        bureaucratic hurdles.
      </p>

      {/* CTA buttons */}
      <div className="flex flex-wrap gap-4 pt-4">
        <Link
          href="/request/new"
          className="flex items-center justify-center rounded-lg h-12 px-6 bg-primary hover:bg-primary-dark text-white text-base font-bold shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5"
        >
          Submit a Request
        </Link>
        <Link
          href="/track"
          className="flex items-center justify-center rounded-lg h-12 px-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700 text-base font-bold transition-all"
        >
          Track Your Request
        </Link>
      </div>

      {/* Social proof */}
      <UsersCount />
    </div>
  );
}
