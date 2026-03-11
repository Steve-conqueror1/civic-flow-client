import {
  ShieldCheck,
  Keyboard,
  Eye,
  Contrast,
  Brain,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import {
  AccessibilityFeatureCard,
  AccessibilityComplianceTable,
  AccessibilityFeedbackForm,
} from "@/components/Accessibility";

const FEATURE_CARDS = [
  {
    icon: <Keyboard className="size-8" />,
    title: "Navigation & Keyboard Support",
    description:
      "Our interface is fully navigable using a keyboard. We utilize logical tab orders, skip-to-content links, and highly visible focus indicators to ensure a seamless experience without a mouse.",
  },
  {
    icon: <Eye className="size-8" />,
    title: "Screen Reader Compatibility",
    description:
      "We use semantic HTML and ARIA landmarks to ensure that screen readers (like NVDA, JAWS, and VoiceOver) correctly interpret the hierarchy and interactive elements of our platform.",
  },
  {
    icon: <Contrast className="size-8" />,
    title: "Visual Design",
    description:
      "We maintain high contrast ratios (minimum 4.5:1 for normal text) and ensure that text can be resized up to 200% without loss of content or functionality. Color is never used as the sole indicator of information.",
  },
  {
    icon: <Brain className="size-8" />,
    title: "AI & Data Accessibility",
    description:
      "Our AI assistant provides text-based descriptions for complex charts and visualizations. All AI-generated outputs are structured for screen readers to ensure cognitive ease and clarity.",
  },
];

const AccessibilityPage = () => {
  return (
    <main className="flex-1 w-full px-4 md:px-10 py-12 md:py-20 bg-background">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Hero */}
        <div>
          <span className="inline-block py-2 px-4 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
            Accessibility First
          </span>
          <h1 className="text-slate-900 dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-tight mb-6">
            Accessibility Statement
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-3xl leading-relaxed">
            CivicFlow is committed to ensuring digital accessibility for people
            with disabilities. We are continuously improving the user experience
            for everyone and applying the relevant accessibility standards.
          </p>
        </div>

        {/* Our Commitment */}
        <section
          aria-labelledby="commitment-heading"
          className="bg-white dark:bg-slate-900/50 p-8 rounded-xl border border-slate-200 dark:border-slate-800"
        >
          <div className="flex items-center gap-3 mb-4 text-primary">
            <ShieldCheck className="size-8" aria-hidden="true" />
            <h2
              id="commitment-heading"
              className="text-slate-900 dark:text-slate-100 text-2xl font-bold"
            >
              Our Commitment
            </h2>
          </div>
          <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed mb-4">
            We aim to conform to the World Wide Web Consortium (W3C) Web Content
            Accessibility Guidelines (WCAG) 2.1 Level AA. These guidelines
            explain how to make web content more accessible for people with a
            wide array of disabilities.
          </p>
          <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed">
            CivicFlow views accessibility as an ongoing effort. We perform
            regular accessibility audits and integrate inclusive design
            practices into every stage of our product development lifecycle.
          </p>
        </section>

        {/* Feature Cards */}
        <section aria-label="Accessibility features">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FEATURE_CARDS.map((card) => (
              <AccessibilityFeatureCard key={card.title} {...card} />
            ))}
          </div>
        </section>

        {/* Compliance Table */}
        <AccessibilityComplianceTable />

        {/* Reporting Section */}
        <section
          aria-labelledby="reporting-heading"
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start bg-primary/5 md:p-12 rounded-2xl border border-primary/10"
        >
          <div>
            <h2
              id="reporting-heading"
              className="text-slate-900 dark:text-slate-100 text-2xl font-bold mb-4"
            >
              Reporting Accessibility Issues
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              Despite our best efforts, you may encounter some limitations. If
              you find any accessibility issues or need help using our platform,
              please let us know. We aim to respond to all feedback within 2
              business days.
            </p>
            <ul className="space-y-4" aria-label="Contact methods">
              <li className="flex items-center gap-3">
                <Mail
                  className="text-primary size-5 shrink-0"
                  aria-hidden="true"
                />
                <span className="font-medium text-slate-800 dark:text-slate-200">
                  accessibility@civicflow.com
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone
                  className="text-primary size-5 shrink-0"
                  aria-hidden="true"
                />
                <span className="font-medium text-slate-800 dark:text-slate-200">
                  +1 (800) 555-0199
                </span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin
                  className="text-primary size-5 shrink-0"
                  aria-hidden="true"
                />
                <span className="font-medium text-slate-800 dark:text-slate-200">
                  10235 101 St NW, Suite 1500 <br /> Edmonton, AB T5J 3G1,
                  Canada
                </span>
              </li>
            </ul>
          </div>

          <AccessibilityFeedbackForm />
        </section>
      </div>
    </main>
  );
};

export default AccessibilityPage;
