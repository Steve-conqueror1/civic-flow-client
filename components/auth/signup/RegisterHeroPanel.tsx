import { ShieldCheck, Lock, Clock } from "lucide-react";

const features = [
  { icon: ShieldCheck, label: "Identity Verification" },
  { icon: Lock, label: "Bank-grade Encryption" },
  { icon: Clock, label: "24/7 Access" },
];

export const RegisterHeroPanel = () => (
  <aside
    aria-label="About CivicFlow registration"
    className="hidden lg:flex lg:col-span-5 bg-gradient-to-br from-primary to-[#0c66c2] text-white p-10 flex-col justify-between relative overflow-hidden"
  >
    {/* Top content */}
    <div className="relative z-10">
      <div className="mb-8">
        <ShieldCheck
          size={48}
          className="mb-4 text-white/90"
          aria-hidden="true"
        />
        <h2 className="text-3xl font-bold leading-tight mb-4">
          Welcome to Alberta&apos;s Digital Services
        </h2>
        <p className="text-blue-100 text-lg leading-relaxed">
          Securely connect with municipal services, track your requests, and
          participate in community initiatives.
        </p>
      </div>
    </div>

    {/* Bottom content */}
    <div className="relative z-10">
      <ul className="flex flex-col gap-4" aria-label="Platform features">
        {features.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-3">
            <Icon
              size={20}
              className="text-blue-200 shrink-0"
              aria-hidden="true"
            />
            <span className="text-sm font-medium">{label}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8 pt-6 border-t border-white/20">
        <p className="text-xs text-blue-200">
          © {new Date().getFullYear()} Government of Alberta. All rights
          reserved.
        </p>
      </div>
    </div>
  </aside>
);
