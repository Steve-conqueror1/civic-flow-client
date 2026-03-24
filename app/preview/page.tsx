import { MapPin, Keyboard, Building2, Users, UserCheck, UserX, ClockArrowUp } from "lucide-react";
import { UserStatCard, UsersPageHeader, UsersTable } from "@/components/users";
import type { UserProfile } from "@/app/types/user";
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

const previewUsers: UserProfile[] = [
  {
    id: "1",
    firstName: "Marcus",
    lastName: "Chen",
    email: "marcus.chen@civicflow.gov",
    phoneNumber: "",
    address: "",
    role: "admin",
    mfaEnabled: true,
    status: "active",
    createdAt: "2024-01-10T09:00:00Z",
    updatedAt: "2024-03-20T14:30:00Z",
  },
  {
    id: "2",
    firstName: "Sarah",
    lastName: "Jenkins",
    email: "s.jenkins@civicflow.gov",
    phoneNumber: "",
    address: "",
    role: "citizen",
    mfaEnabled: false,
    status: "active",
    createdAt: "2024-02-01T00:00:00Z",
    updatedAt: "2024-03-21T10:00:00Z",
  },
  {
    id: "3",
    firstName: "Robert",
    lastName: "Jordan",
    email: "rob.jordan@gmail.com",
    phoneNumber: "",
    address: "",
    role: "citizen",
    mfaEnabled: false,
    status: "inactive",
    createdAt: "2023-11-15T00:00:00Z",
    updatedAt: "2024-03-18T08:00:00Z",
  },
];

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

      {/* UsersPageHeader */}
      <section>
        <h2 className="text-xl font-bold mb-4 text-slate-700 dark:text-slate-300 border-b pb-2">
          UsersPageHeader
        </h2>
        <UsersPageHeader />
      </section>

      {/* UserStatCard */}
      <section>
        <h2 className="text-xl font-bold mb-4 text-slate-700 dark:text-slate-300 border-b pb-2">
          UserStatCard
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <UserStatCard
            icon={<Users className="size-5" aria-hidden="true" />}
            iconClassName="bg-blue-50 text-primary"
            label="Total Users"
            value="12,842"
            badge="+12%"
            badgeClassName="bg-emerald-100 text-emerald-700"
          />
          <UserStatCard
            icon={<UserCheck className="size-5" aria-hidden="true" />}
            iconClassName="bg-emerald-50 text-emerald-600"
            label="Active Now"
            value="842"
            badge="98%"
            badgeClassName="bg-emerald-100 text-emerald-700"
          />
          <UserStatCard
            icon={<ClockArrowUp className="size-5" aria-hidden="true" />}
            iconClassName="bg-amber-50 text-amber-600"
            label="Pending Staff"
            value="24"
            badge="Review"
            badgeClassName="bg-amber-100 text-amber-700"
          />
          <UserStatCard
            icon={<UserX className="size-5" aria-hidden="true" />}
            iconClassName="bg-red-50 text-red-600"
            label="Suspended"
            value="16"
            badge="Stable"
            badgeClassName="bg-slate-100 text-slate-500"
          />
        </div>
      </section>

      {/* UsersTable */}
      <section>
        <h2 className="text-xl font-bold mb-4 text-slate-700 dark:text-slate-300 border-b pb-2">
          UsersTable
        </h2>
        <UsersTable users={previewUsers} />
      </section>
    </div>
  );
};

export default PreviewPage;
