"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lock, HelpCircle } from "lucide-react";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { Button } from "@/components/ui/button";

interface AuthNavbarProps {
  brandName?: string;
}

const AuthNavbar: React.FC<AuthNavbarProps> = ({ brandName = "CivicFlow" }) => {
  const pathname = usePathname();

  return (
    <header
      aria-label="Authentication navigation"
      className="sticky top-0 z-50 w-full bg-white dark:bg-card border-b border-slate-200 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-3  flex items-center justify-between">
        <Link href="/">
          <BrandLogo brandName={brandName} className="h-10" />
          <span className="sr-only">— Go to homepage</span>
        </Link>

        {pathname === "/mfa" && (
          <nav aria-label="Authentication options">
            <div className="flex items-center gap-3 ">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400 hidden sm:block">
                Need help?
              </span>
              <Button
                type="button"
                variant="secondary"
                size="lg"
                aria-label="Support"
              >
                <HelpCircle aria-hidden="true" />
                <span className="hidden sm:inline rounded-lg">Support</span>
              </Button>
            </div>
          </nav>
        )}

        {pathname === "/login" && (
          <div
            className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400"
            aria-label="Secure Connection indicator"
          >
            <Lock size={16} aria-hidden="true" />
            <span>Secure Connection</span>
          </div>
        )}

        {pathname === "/register" && (
          <nav aria-label="Authentication options">
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <span>Already have an account?</span>
              <Link
                href="/login"
                className="font-semibold text-primary hover:text-primary-dark transition-colors"
              >
                Sign in
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default AuthNavbar;
