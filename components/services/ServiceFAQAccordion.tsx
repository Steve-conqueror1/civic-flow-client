import { HelpCircle, ChevronDown } from "lucide-react";

export interface FAQItem {
  question: string;
  answer: string;
}

interface ServiceFAQAccordionProps {
  items: FAQItem[];
}

export const ServiceFAQAccordion = ({ items }: ServiceFAQAccordionProps) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
      <h2 className="font-bold text-lg mb-4 text-slate-900 dark:text-slate-100 flex items-center gap-2">
        <HelpCircle className="text-slate-500 w-5 h-5" aria-hidden="true" />
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index}>
            {index > 0 && (
              <div className="h-px bg-slate-100 dark:bg-slate-800 w-full mb-4" />
            )}
            <details className="group">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-slate-800 dark:text-slate-200 hover:text-primary transition-colors text-sm">
                <span>{item.question}</span>
                <ChevronDown
                  className="w-4 h-4 transition-transform group-open:rotate-180 flex-shrink-0"
                  aria-hidden="true"
                />
              </summary>
              <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm leading-relaxed">
                {item.answer}
              </p>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
};
