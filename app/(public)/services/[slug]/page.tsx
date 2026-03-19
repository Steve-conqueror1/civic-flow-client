import { notFound } from "next/navigation";
import { Wrench, MapPin, Camera, FileText } from "lucide-react";
import {
  ServiceBreadcrumb,
  ServiceHero,
  ServiceDescriptionCard,
  ServiceRequirementsCard,
  ServiceResolutionCard,
  ServiceFAQAccordion,
  type BreadcrumbItem,
  type RequirementItem,
  type FAQItem,
} from "@/components/services";
import type { GetServiceBySlugResponse } from "@/app/types/service";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

function formatResolutionTime(min: number, max: number): string {
  if (min === max) {
    return `${min} Business Day${min === 1 ? "" : "s"}`;
  }
  return `${min}\u2013${max} Business Days`;
}

const requirements: RequirementItem[] = [
  {
    icon: <MapPin className="w-5 h-5" />,
    label: "Location",
    description: "Street name, nearby intersection, or exact address.",
  },
  {
    icon: <Camera className="w-5 h-5" />,
    label: "Photo (Optional but recommended)",
    description: "A clear picture showing the size and context of the issue.",
  },
  {
    icon: <FileText className="w-5 h-5" />,
    label: "Description",
    description:
      "Brief details about the severity (e.g., deep, shallow, wide).",
  },
];

const faqs: FAQItem[] = [
  {
    question: "What types of issues can I report through CivicFlow?",
    answer:
      "CivicFlow allows residents to report a variety of community issues and request municipal services. These may include road damage, broken streetlights, sidewalk hazards, graffiti, waste problems, park maintenance issues, snow removal concerns, and other public infrastructure problems.",
  },
  {
    question: "Can I track the status of my request?",
    answer:
      "Yes. Once submitted, you can monitor the progress of your request through your dashboard. Requests typically move through statuses such as Open, In Progress, and Resolved",
  },
  {
    question: "Can I include photos with my request?",
    answer:
      "Yes. Photos help city staff better understand the issue and may assist in faster evaluation and response.",
  },
];

const ServicePage = async ({ params }: ServicePageProps) => {
  const { slug } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/services/${slug}`,
  );

  if (!response.ok) {
    notFound();
  }

  const json: GetServiceBySlugResponse = await response.json();

  if (!json.success) {
    notFound();
  }

  const service = json.data.service;

  const breadcrumbs: BreadcrumbItem[] = [
    {
      label: "Services",
      href: `/services`,
    },
    {
      label: service.categoryName,
      href: `/categories/${service.categorySlug}`,
    },
    { label: service.name },
  ];

  return (
    <main className="flex-1 w-full  py-8 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ServiceBreadcrumb items={breadcrumbs} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8 ">
            <ServiceHero
              departmentName={service.departmentName}
              icon={<Wrench className="w-12 h-12" aria-hidden="true" />}
              title={service.name}
              description={service.description}
            />

            <ServiceDescriptionCard
              title="Service Description"
              icon={<FileText className="w-5 h-5" />}
              paragraphs={[service.instructions]}
            />

            <ServiceRequirementsCard items={requirements} />
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <ServiceResolutionCard
              resolutionTime={formatResolutionTime(
                service.minResponseDays,
                service.maxResponseDays,
              )}
              note="Based on AI prediction from recent similar requests in your area."
              startHref={`/services/${slug}/new`}
              serviceName={service.name}
            />
            <ServiceFAQAccordion items={faqs} />
          </aside>
        </div>
      </div>
    </main>
  );
};

export default ServicePage;
