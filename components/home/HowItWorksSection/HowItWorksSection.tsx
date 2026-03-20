import { BadgeCheck, Brain, FilePen } from "lucide-react";
import HowItWorksStep from "./HowItWorksStep";

const STEPS = [
  {
    icon: <FilePen size={24} />,
    title: "1. Submit Request",
    description:
      "Describe your issue in plain language. Upload photos or location data directly from your device.",
  },
  {
    icon: <Brain size={24} />,
    title: "2. AI Analysis",
    description:
      "Our AI automatically categorizes urgency and routes your request to the exact department instantly.",
  },
  {
    icon: <BadgeCheck size={24} />,
    title: "3. Resolution",
    description:
      "Receive real-time status updates and get a speedy resolution from the responsible team.",
  },
];

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="w-full py-16 bg-background"
    >
      <div className="px-4 md:px-10 max-w-7xl mx-auto">
        <div className="flex flex-col gap-2 mb-10">
          <h2
            id="how-it-works-heading"
            className="text-3xl font-bold text-slate-900 dark:text-white"
          >
            How It Works
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            Streamlined process from submission to resolution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((step) => (
            <HowItWorksStep
              key={step.title}
              icon={step.icon}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
