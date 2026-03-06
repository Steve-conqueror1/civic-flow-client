import { ShieldCheck } from "lucide-react";

export function HowItWorksPrivacySection() {
  return (
    <section
      aria-labelledby="privacy-heading"
      className="w-full max-w-[1200px] px-4 py-16 mx-auto text-center"
    >
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
        <div
          className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 text-primary flex items-center justify-center mb-2"
          aria-hidden="true"
        >
          <ShieldCheck size={32} />
        </div>
        <h2
          id="privacy-heading"
          className="text-slate-900 dark:text-white text-3xl font-bold leading-tight"
        >
          Privacy &amp; Security First
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
          We prioritize your data privacy. CivicFlow adheres to strict Alberta
          government standards (FOIP) and employs robust encryption protocols to
          ensure your personal information is protected at all times.
        </p>
      </div>
    </section>
  );
}
