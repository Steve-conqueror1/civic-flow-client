"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";

const ServicesHero = () => {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search handling wired up by parent or future implementation
  };

  return (
    <section className="relative bg-slate-900 py-16 sm:py-24">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 to-slate-900/90 z-10" />

      {/* Background image placeholder */}
      <div className="absolute inset-0 bg-slate-800" aria-hidden="true" />

      <div className="relative z-20 max-w-3xl mx-auto px-4 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
          Services Directory
        </h1>
        <p className="text-lg text-slate-300 mb-8 font-light max-w-2xl mx-auto">
          Fast, simple, secure access to public services. Powered by CivicFlow
          AI.
        </p>

        {/* Search bar */}
        <form
          onSubmit={handleSearch}
          className="relative max-w-2xl mx-auto group"
          role="search"
          aria-label="Search services"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-200" />
          <div className="relative flex items-center bg-white rounded-lg shadow-xl">
            <div
              className="pl-4 text-primary flex items-center"
              aria-hidden="true"
            >
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="How can we help you today? (e.g., street light out, business license)"
              className="w-full py-4 px-4 text-slate-900 placeholder-slate-400 bg-transparent border-none focus:ring-0 text-base focus:outline-none"
              aria-label="Search services"
            />
            <div className="pr-2">
              <button
                type="submit"
                className="bg-primary hover:bg-[#106ac5] text-white rounded-md px-6 py-2.5 font-bold text-sm transition-colors flex items-center gap-2"
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ServicesHero;
