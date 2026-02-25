import Link from "next/link";

export type FooterLink = { label: string; href: string };

export const FooterLinkGroup = ({
  heading,
  links,
}: {
  heading: string;
  links: FooterLink[];
}) => (
  <div>
    <h3 className="font-bold text-slate-900 dark:text-white mb-4">{heading}</h3>
    <ul className="flex flex-col gap-3 text-sm text-slate-600 dark:text-slate-400">
      {links.map((link) => (
        <li key={link.label}>
          <Link
            href={link.href}
            className="hover:text-primary transition-colors"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);
