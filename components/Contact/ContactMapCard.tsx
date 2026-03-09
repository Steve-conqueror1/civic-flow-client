import Image from "next/image";
import { MapPin, Navigation } from "lucide-react";
import Link from "next/link";

const ContactMapCard = () => {
  return (
    <div className="relative w-full h-64 rounded-xl overflow-hidden shadow-inner border border-slate-200 dark:border-slate-800 bg-slate-200 dark:bg-slate-800">
      {/* Gradient overlay */}
      <div
        className="absolute inset-0 flex items-center justify-center opacity-40 mix-blend-multiply dark:mix-blend-overlay z-10"
        aria-hidden="true"
      >
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/30 via-transparent to-transparent" />
      </div>

      {/* Map image */}
      <div className="relative h-full w-full">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuADjp8MGNQi__zQJju-0J8-GUH3ozCA82Rc3BjFIvV7JmZKPbEUvnb0pcQmxxyVJDrydJjGpkbLoVbB_IxNtv8fNloD2n93cd3yTuz4lmZ5QtKo5Hl4mB4fRQ5KKrjJ3my85xH8ofOCd7e-Og7NDU5_u6lFkLPiMBwgKNV3saYP4aD5qKx1JoPeMn87kpC-wHDwARgsGEYDHjbAV-1G9wzAAjNfS3rmlRbJR2_hJ9F0PPTMVEKgbFHp2UNLYkCEidbb91Ie8Fp6Og"
          alt="Stylized map of Edmonton city center"
          fill
          className="object-cover grayscale opacity-60 dark:opacity-40"
          unoptimized
        />

        {/* Location pin */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
          aria-hidden="true"
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-primary/30 rounded-full animate-ping" />
            <MapPin className="text-primary size-9 relative z-10 fill-primary/20" />
          </div>
        </div>

        {/* Open in Maps bar */}
        <Link
          target="_blank"
          href="https://www.google.com/maps/place/10235+101+St+NW+%231500,+Edmonton,+AB+T5J+3E8/@53.5449253,-113.495684,17z/data=!3m1!4b1!4m5!3m4!1s0x53a0224f40266ecb:0x9bf0d4862bf92d79!8m2!3d53.5449221!4d-113.4931091?entry=ttu&g_ep=EgoyMDI2MDMwNS4wIKXMDSoASAFQAw%3D%3D"
          className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm p-3 rounded-lg border border-slate-200/50 dark:border-slate-700/50 flex items-center gap-3 z-20"
        >
          <Navigation className="text-primary size-5" aria-hidden="true" />
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
            Open in Maps
          </span>
        </Link>
      </div>
    </div>
  );
};

export default ContactMapCard;
