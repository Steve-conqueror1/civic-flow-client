import { Brain, Check } from "lucide-react";

const BENEFITS = [
  "Reduces processing time by up to 40%",
  "Eliminates misrouted requests",
  "Continuous learning for better accuracy",
];

export function HowItWorksAISection() {
  return (
    <section
      aria-labelledby="ai-section-heading"
      className="w-full bg-slate-50 dark:bg-slate-800/50 py-16"
    >
      <div className="max-w-[1200px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 text-primary font-semibold tracking-wide uppercase text-sm">
            <Brain size={20} aria-hidden="true" />
            Powered by Responsible AI
          </div>
          <h2
            id="ai-section-heading"
            className="text-slate-900 dark:text-white text-3xl md:text-4xl font-bold leading-tight"
          >
            Enhancing, Not Replacing, Human Expertise
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
            CivicFlow utilizes artificial intelligence responsibly. Our AI
            models are designed to handle initial triage, categorization, and
            routing, freeing up valuable time for government staff to focus on
            what matters most: solving complex problems and serving citizens
            with empathy. Every significant decision remains under human
            oversight.
          </p>
          <ul className="flex flex-col gap-3 mt-4" aria-label="AI benefits">
            {BENEFITS.map((benefit) => (
              <li
                key={benefit}
                className="flex items-start gap-3 text-slate-700 dark:text-slate-300"
              >
                <Check
                  size={20}
                  className="text-primary mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 h-[400px] bg-gradient-to-br from-primary/20 via-slate-200 to-slate-300 dark:from-primary/30 dark:via-slate-700 dark:to-slate-800 flex items-center justify-center"
          aria-hidden="true"
        >
          <Brain size={80} className="text-primary/30" />
        </div>
      </div>
    </section>
  );
}
