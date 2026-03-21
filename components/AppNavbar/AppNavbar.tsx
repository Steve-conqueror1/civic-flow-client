"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { useAuth } from "@/app/hooks/use-auth";

interface AppNavbarProps {
  brandName?: string;
}

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "How It Works", href: "/how-it-works" },
];

const linkClass =
  "text-sm font-medium hover:text-primary transition-colors text-slate-700 dark:text-slate-300";

const AppNavbar: React.FC<AppNavbarProps> = ({ brandName = "CivicFlow" }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, isLoading, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-card border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-3  flex items-center justify-between">
        <Link href="/">
          <BrandLogo brandName={brandName} className="h-10" />
          <span className="sr-only">— Go to homepage</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex flex-1 items-center justify-end gap-8">
          <nav aria-label="Main navigation" className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} className={linkClass}>
                {link.label}
              </Link>
            ))}
            {!isLoading && isAuthenticated && (
              <Link href="/dashboard" className={linkClass}>
                Dashboard
              </Link>
            )}
            {!isLoading && !isAuthenticated && (
              <Link href="/login" className={linkClass}>
                Sign In
              </Link>
            )}
          </nav>
          {!isLoading && isAuthenticated && (
            <button
              onClick={logout}
              className="flex items-center justify-center rounded-lg h-10 px-4 border border-slate-300 dark:border-slate-600 text-primary text-sm font-bold transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              Logout
            </button>
          )}
          {!isLoading && !isAuthenticated && (
            <Link
              href="/register"
              className="flex items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary hover:bg-primary-dark text-white text-sm font-bold transition-colors shadow-sm"
            >
              <span className="truncate">Register</span>
            </Link>
          )}
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
            {!isLoading && isAuthenticated && (
              <Link
                href="/dashboard"
                className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-primary transition-colors py-2"
                onClick={() => setMobileOpen(false)}
              >
                Dashboard
              </Link>
            )}
            {!isLoading && !isAuthenticated && (
              <Link
                href="/login"
                className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-primary transition-colors py-2"
                onClick={() => setMobileOpen(false)}
              >
                Sign In
              </Link>
            )}
          </nav>
          {!isLoading && isAuthenticated && (
            <button
              onClick={() => {
                setMobileOpen(false);
                logout();
              }}
              className="mt-4 flex items-center justify-center rounded-lg h-10 px-4 border border-slate-300 dark:border-slate-600 text-primary text-sm font-bold transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer w-full"
            >
              Logout
            </button>
          )}
          {!isLoading && !isAuthenticated && (
            <Link
              href="/register"
              className="mt-4 flex items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary hover:bg-primary-dark text-white text-sm font-bold transition-colors shadow-sm w-full"
              onClick={() => setMobileOpen(false)}
            >
              <span className="truncate">Register</span>
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default AppNavbar;
