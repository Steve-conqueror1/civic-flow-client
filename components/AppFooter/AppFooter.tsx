import Image from "next/image";
import Link from "next/link";
import { FooterLinkGroup, FooterLink } from "./FooterLinkGroup";
import { BrandLogo } from "../shared";

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
            <BrandLogo
              iconSize={20}
              className="gap-3 text-slate-900 dark:text-white mb-6"
              brandNameClassName="text-lg font-bold"
            />
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              Empowering citizens and government staff with AI-driven public
              service solutions.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                aria-label="Twitter"
                className="transition-[filter] hover:[filter:brightness(0)_saturate(100%)_invert(38%)_sepia(82%)_saturate(1234%)_hue-rotate(199deg)_brightness(99%)_contrast(96%)]"
              >
                <Image
                  src="/icons/twitter.svg"
                  alt=""
                  width={20}
                  height={20}
                  aria-hidden="true"
                />
              </Link>
              <Link
                href="#"
                aria-label="LinkedIn"
                className="transition-[filter] hover:[filter:brightness(0)_saturate(100%)_invert(38%)_sepia(82%)_saturate(1234%)_hue-rotate(199deg)_brightness(99%)_contrast(96%)]"
              >
                <Image
                  src="/icons/linkedin.svg"
                  alt=""
                  width={20}
                  height={20}
                  aria-hidden="true"
                />
              </Link>
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
