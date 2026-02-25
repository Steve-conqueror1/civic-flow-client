"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { BrandLogo } from "@/components/shared/BrandLogo";

interface AppNavbarProps {
  brandName?: string;
}

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Sign In", href: "#" },
];

const AppNavbar: React.FC<AppNavbarProps> = ({ brandName = "CivicFlow" }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-[#111a22] border-b border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 md:px-10 py-3  flex items-center justify-between">
        <BrandLogo brandName={brandName} />

        {/* Desktop nav */}
        <div className="hidden md:flex flex-1 items-center justify-end gap-8">
          <nav aria-label="Main navigation" className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium hover:text-primary transition-colors text-slate-700 dark:text-slate-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/register"
            className="flex items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary hover:bg-primary-dark text-white text-sm font-bold transition-colors shadow-sm"
          >
            <span className="truncate">Register</span>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-slate-900 dark:text-white"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-[#111a22] border-t border-slate-200 dark:border-slate-800 px-4 pb-4">
          <nav
            aria-label="Mobile navigation"
            className="flex flex-col gap-1 pt-3"
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-primary transition-colors py-2"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/register"
            className="mt-4 flex items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary hover:bg-primary-dark text-white text-sm font-bold transition-colors shadow-sm w-full"
            onClick={() => setMobileOpen(false)}
          >
            <span className="truncate">Register</span>
          </Link>
        </div>
      )}
    </header>
  );
};

export default AppNavbar;
