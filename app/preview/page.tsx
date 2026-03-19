import { MapPin, Keyboard, Building2 } from "lucide-react";
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
import {
  ServiceListHero,
  ServiceListTable,
  ServiceListCTA,
} from "@/components/services";
import type { Service } from "@/app/types/service";

const previewServices: Service[] = [
  {
    id: "1",
    name: "Pothole Repair",
    description:
      "Report damage to road surfaces on city streets and residential roads for rapid assessment and filling.",
    slug: "pothole-repair",
    instructions: "Take a photo of the pothole and note the street address.",
    categoryId: "cat-1",
    departmentId: "dep-1",
    minResponseDays: 3,
    maxResponseDays: 5,
    isActive: true,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: "2",
    name: "Street Light Maintenance",
    description:
      "Report flickering, damaged, or dark street lights to ensure neighborhood safety and visibility.",
    slug: "street-light-maintenance",
    instructions: "Provide the pole number if visible.",
    categoryId: "cat-1",
    departmentId: "dep-1",
    minResponseDays: 1,
    maxResponseDays: 5,
    isActive: true,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: "3",
    name: "Waste Collection Request",
    description:
      "Schedule bulk item pickup or report missed collection services for your residential area.",
    slug: "waste-collection-request",
    instructions: "Specify the type of waste and preferred pickup window.",
    categoryId: "cat-1",
    departmentId: "dep-1",
    minResponseDays: 1,
    maxResponseDays: 4,
    isActive: true,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
];

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

      {/* ServiceListHero */}
      <section>
        <h2 className="text-xl font-bold mb-4 text-slate-700 dark:text-slate-300 border-b pb-2">
          ServiceListHero
        </h2>
        <ServiceListHero
          title="Infrastructure & Public Works"
          description="Comprehensive public services and infrastructure management for the Alberta community."
          icon={<Building2 className="w-[300px] h-[300px]" />}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Infrastructure" },
          ]}
        />
      </section>

      {/* ServiceListTable */}
      <section>
        <h2 className="text-xl font-bold mb-4 text-slate-700 dark:text-slate-300 border-b pb-2">
          ServiceListTable
        </h2>
        <ServiceListTable services={previewServices} />
      </section>

      {/* ServiceListCTA */}
      <section>
        <h2 className="text-xl font-bold mb-4 text-slate-700 dark:text-slate-300 border-b pb-2">
          ServiceListCTA
        </h2>
        {/* <ServiceListCTA /> */}
      </section>
    </div>
  );
};

export default PreviewPage;
