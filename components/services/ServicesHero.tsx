import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, LogIn, SearchCheck } from "lucide-react";

export const ServicesHero = () => {
  return (
    <section className="relative bg-slate-900 py-24 sm:py-32 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/services/services-hero.png"
          alt="Modern Alberta Architecture"
          fill
          className="object-cover"
          priority
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/80 to-background"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-20 max-w-5xl mx-auto px-4 text-center">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 backdrop-blur-md">
          <BadgeCheck className="text-primary w-4 h-4" aria-hidden="true" />
          <span className="text-xs font-bold text-blue-100 uppercase tracking-widest">
            Official Alberta Services Portal
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-6">
          Services Directory
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-slate-200 font-medium max-w-2xl mx-auto leading-relaxed">
          Instant access to provincial services. Simple, secure, and always
          available.
        </p>

        {/* AI Search callout */}
        <div className="mt-10 max-w-xl mx-auto p-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          <div className="flex flex-col sm:flex-row items-center gap-4 p-4 text-left">
            <div
              className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary border border-primary/30"
              aria-hidden="true"
            >
              <SearchCheck className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h4 className="text-white font-bold text-sm mb-0.5 flex items-center gap-2">
                Advanced AI Search
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-blue-500 text-white uppercase tracking-wider font-black">
                  Beta
                </span>
              </h4>
              <p className="text-slate-300 text-xs leading-relaxed">
                Sign in to access our intelligent search engine and find
                services instantly using natural language.
              </p>
            </div>
            <div className="shrink-0 w-full sm:w-auto">
              <Link
                href="/login"
                className="w-full bg-white hover:bg-slate-100 text-slate-900 text-sm font-bold py-2.5 px-6 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
              >
                Sign In
                <LogIn className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
