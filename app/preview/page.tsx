import { MapPin, Keyboard } from "lucide-react";
import {
  ContactInfoItem,
  ContactForm,
  ContactMapCard,
} from "@/components/Contact";
import {
  AccessibilityFeatureCard,
  AccessibilityComplianceTable,
  AccessibilityFeedbackForm,
} from "@/components/Accessibility";

const PreviewPage = () => {
  return (
    <div className="p-8 space-y-16 max-w-4xl mx-auto">
      {/* ContactInfoItem */}
      <section>
        <h2 className="text-xl font-bold mb-4 text-slate-700 dark:text-slate-300 border-b pb-2">
          ContactInfoItem
        </h2>
        <ContactInfoItem
          icon={<MapPin className="size-6" />}
          title="Main Office"
        >
          <p>10235 101 St NW, Suite 1500</p>
          <p>Edmonton, AB T5J 3G1, Canada</p>
        </ContactInfoItem>
      </section>

      {/* ContactMapCard */}
      <section>
        <h2 className="text-xl font-bold mb-4 text-slate-700 dark:text-slate-300 border-b pb-2">
          ContactMapCard
        </h2>
        <ContactMapCard />
      </section>

      {/* ContactForm */}
      <section>
        <h2 className="text-xl font-bold mb-4 text-slate-700 dark:text-slate-300 border-b pb-2">
          ContactForm
        </h2>
        <ContactForm />
      </section>

      {/* AccessibilityFeatureCard */}
      <section>
        <h2 className="text-xl font-bold mb-4 text-slate-700 dark:text-slate-300 border-b pb-2">
          AccessibilityFeatureCard
        </h2>
        <AccessibilityFeatureCard
          icon={<Keyboard className="size-8" />}
          title="Navigation & Keyboard Support"
          description="Our interface is fully navigable using a keyboard."
        />
      </section>

      {/* AccessibilityComplianceTable */}
      <section>
        <h2 className="text-xl font-bold mb-4 text-slate-700 dark:text-slate-300 border-b pb-2">
          AccessibilityComplianceTable
        </h2>
        <AccessibilityComplianceTable />
      </section>

      {/* AccessibilityFeedbackForm */}
      <section>
        <h2 className="text-xl font-bold mb-4 text-slate-700 dark:text-slate-300 border-b pb-2">
          AccessibilityFeedbackForm
        </h2>
        <AccessibilityFeedbackForm />
      </section>
    </div>
  );
};

export default PreviewPage;
