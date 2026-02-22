import Image from "next/image";
import { Landmark } from "lucide-react";
import { FooterLinkGroup, FooterLink } from "./FooterLinkGroup";

const platformLinks: FooterLink[] = [
  { label: "Browse Services", href: "#" },
  { label: "Track Request", href: "#" },
  { label: "Mobile App", href: "#" },
  { label: "For Government Staff", href: "#" },
];

const supportLinks: FooterLink[] = [
  { label: "Help Center", href: "#" },
  { label: "Contact Us", href: "#" },
  { label: "Accessibility", href: "#" },
  { label: "Report a Bug", href: "#" },
];

const legalLinks: FooterLink[] = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Data Protection", href: "#" },
];

const AppFooter: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-[#111a22] border-t border-slate-200 dark:border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand column */}
          <div className="col-span-1">
            <div className="flex items-center gap-3 text-slate-900 dark:text-white mb-6">
              <div className="size-6 text-[#1985f0]">
                <Landmark size={20} aria-hidden="true" />
              </div>
              <span className="text-lg font-bold">CivicFlow</span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              Empowering citizens and government staff with AI-driven public
              service solutions.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                aria-label="Twitter"
                className="text-slate-400 hover:text-[#1985f0] transition-colors"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-slate-400 hover:text-[#1985f0] transition-colors"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          <FooterLinkGroup heading="Platform" links={platformLinks} />
          <FooterLinkGroup heading="Support" links={supportLinks} />
          <FooterLinkGroup heading="Legal" links={legalLinks} />
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-100 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} CivicFlow Alberta. All rights reserved.
          </p>
          <div className="flex items-center gap-2 opacity-60 grayscale hover:grayscale-0 transition-all">
            <Image
              src="/Flag_of_Alberta.svg"
              alt="Flag of Alberta"
              width={36}
              height={24}
              className="h-6 w-auto"
            />
            <span className="text-xs text-slate-500 font-medium">
              Proudly serving Alberta
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
