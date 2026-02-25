import { Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const AVATARS = [
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAfsLmDftAh3bKJBigquF_dfByNQyK2D9dbVMhRwYxyD-AZjLoF2GENthcIHVMBSDYTJqF0I3Em-t-5BD_Ha2eaOn-TCFSZZSH4ayZLLRI-FoegFtVIzjc99VtG-EHaAx5jxl6tSnH9gEwXef5_ZTvGLVfkV9xJRnqrzR5u-OlAVwuuZI02zh948twn5g_s82Foiw9RvgNrZOggy0AX8JlIGuONFGgEjm3eCUU3roygbKq_3qIlzUiLKxVn4VDkE2XcahkNJ9lZpw",
    alt: "User avatar 1",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuB5clpLOo5SBb3_I5_UsvdjSwGU2zLvyZLCJTkAIzMqcjS7F2UvQ3iJSrMt6L0KFwnCfIY-fKcjAoY4tJiKb-Pg8gxNnH5XTdii57JaCllAefW7GNeLfm6j_7rXIoGZQqzePbt6obpW9qbgfwspBx_pDTyEbWoCSQlg_n-TsEu4tgi6aRrn1DJePRJCiv_1I5ymBleTUN_B4TTw6m6t_eoAUySIxblSUP-nOmSn8bkIsHhWbFp_HGsLojjAeNf1eC-GTV632HtBLA",
    alt: "User avatar 2",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuC46cA_sHDKw52wELNWIAPFovKY8-MI5XY6N9U0aogL_vgnppAqlihB1I0p-F7wF1M3q-6AopJq_tYWQLEYsTS0hV5qPjjMva56DQRBVhn7HdNqEgePKWQ0edudMtt3WMpIBx-GKzICZIP7c59pslLEQk0RtkbD02oAkviqX_1MUpG-_jkFpJjIoh7JkDlVnhOOISj5hwNTX64kbiaLvs8YPicbG4admuyBr1RF38KoD5vfSdP6buCllB4iQJdFs1XsCVKDHU3hKQ",
    alt: "User avatar 3",
  },
];

export default function HeroContent() {
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
      <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mt-4">
        <div className="flex -space-x-2" aria-hidden="true">
          {AVATARS.map((avatar) => (
            <div
              key={avatar.alt}
              className="relative size-8 rounded-full border-2 border-white dark:border-[#111a22] overflow-hidden"
            >
              <Image
                src={avatar.src}
                alt={avatar.alt}
                fill
                className="object-cover"
                sizes="32px"
              />
            </div>
          ))}
        </div>
        <p>Used by 10,000+ Albertans</p>
      </div>
    </div>
  );
}
