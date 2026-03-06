import { FileText, Bot, Users, CheckCircle } from "lucide-react";
import { ProcessStepCard } from "./ProcessStepCard";

const STEPS = [
  {
    stepNumber: 1,
    icon: <FileText size={24} />,
    title: "Submit Request",
    description:
      "Citizens easily submit service requests through our accessible, user-friendly platform, detailing the issue and location.",
  },
  {
    stepNumber: 2,
    icon: <Bot size={24} />,
    title: "AI Analysis & Routing",
    description:
      "Our secure AI analyzes the request context and automatically routes it to the most appropriate government department or municipality.",
  },
  {
    stepNumber: 3,
    icon: <Users size={24} />,
    title: "Staff Review",
    description:
      "Government staff review the prioritized request, ensuring human oversight, expertise, and empathy are applied to complex issues.",
  },
  {
    stepNumber: 4,
    icon: <CheckCircle size={24} />,
    title: "Resolution & Feedback",
    description:
      "The issue is resolved, citizens are notified of the outcome, and can provide valuable feedback on their experience.",
  },
];

export function HowItWorksProcessSection() {
  return (
    <section
      aria-labelledby="process-heading"
      className="w-full max-w-[1200px] px-4 py-16 mx-auto"
    >
      <div className="flex flex-col gap-4 mb-12 text-center md:text-left">
        <p className="text-primary font-semibold tracking-wide uppercase text-sm">
          The Process
        </p>
        <h2
          id="process-heading"
          className="text-slate-900 dark:text-white text-3xl md:text-4xl font-bold leading-tight max-w-[720px]"
        >
          How CivicFlow Works
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-[720px]">
          Our simple 4-step process ensures your requests are handled swiftly,
          accurately, and with full transparency.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {STEPS.map((step) => (
          <ProcessStepCard
            key={step.stepNumber}
            stepNumber={step.stepNumber}
            icon={step.icon}
            title={step.title}
            description={step.description}
          />
        ))}
      </div>
    </section>
  );
}
