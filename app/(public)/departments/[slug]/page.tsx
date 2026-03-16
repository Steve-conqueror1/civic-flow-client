import { notFound } from "next/navigation";
import { Landmark } from "lucide-react";
import {
  ServiceListHero,
  ServiceListTable,
  ServiceListCTA,
} from "@/components/services";
import type { GetDepartmentsResponse } from "@/app/types/department";
import type { GetServicesByDepartmentResponse } from "@/app/types/service";

interface DepartmentPageProps {
  params: Promise<{ slug: string }>;
}

const DepartmentPage = async ({ params }: DepartmentPageProps) => {
  const { slug } = await params;

  const depsResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/departments`,
    { cache: "no-store" },
  );

  if (!depsResponse.ok) {
    notFound();
  }

  const depsJson: GetDepartmentsResponse = await depsResponse.json();

  if (!depsJson.success) {
    notFound();
  }

  const department = depsJson.data.departments.find((d) => d.slug === slug);

  if (!department) {
    notFound();
  }

  const servicesResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/services/department/${department.id}`,
    { cache: "no-store" },
  );

  const servicesJson: GetServicesByDepartmentResponse =
    await servicesResponse.json();
  const services = servicesJson.success ? servicesJson.data.services : [];

  return (
    <main className="flex-1 w-full bg-background">
      <ServiceListHero
        title={department.name}
        description={department.description}
        icon={<Landmark className="w-[300px] h-[300px]" />}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: department.name },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-10 relative pb-20 pb-20">
        <div className="mt-8">
          <ServiceListTable services={services} />
        </div>
        <ServiceListCTA />
      </div>
    </main>
  );
};

export default DepartmentPage;
