"use client";

import { useState } from "react";
import Link from "next/link";
import { Landmark, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      <div className="px-4 md:px-10 py-3 flex items-center justify-between max-w-7xl mx-auto">
        {/* Brand */}
        <div className="flex items-center gap-4 text-slate-900 dark:text-white">
          <div className="size-8 text-[#1985f0] flex items-center justify-center">
            <Landmark size={28} aria-hidden="true" />
          </div>
          <span className="text-xl font-bold leading-tight tracking-[-0.015em]">
            {brandName}
          </span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex flex-1 justify-end gap-8 items-center">
          <nav aria-label="Main navigation" className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium hover:text-[#1985f0] transition-colors text-slate-700 dark:text-slate-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Button className="bg-[#1985f0] hover:bg-[#106ac5] text-white text-sm font-bold shadow-sm">
            Register
          </Button>
        </div>

        {/* Mobile hamburger */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-slate-900 dark:text-white"
          aria-label="Open menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-[#111a22] border-t border-slate-100 dark:border-slate-800 px-4 pb-4">
          <nav
            aria-label="Mobile navigation"
            className="flex flex-col gap-3 pt-3"
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-[#1985f0] transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Button className="mt-4 w-full bg-[#1985f0] hover:bg-[#106ac5] text-white text-sm font-bold">
            Register
          </Button>
        </div>
      )}
    </header>
  );
};

export default AppNavbar;
