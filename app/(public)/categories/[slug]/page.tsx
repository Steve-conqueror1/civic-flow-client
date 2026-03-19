import { notFound } from "next/navigation";
import { Building2 } from "lucide-react";
import {
  ServiceListHero,
  ServiceListTable,
  ServiceListCTA,
} from "@/components/services";
import type { GetServicesGroupedByCategoryResponse } from "@/app/types/service";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { slug } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/services/grouped/category`,
    { cache: "no-store" },
  );

  if (!response.ok) {
    notFound();
  }

  const json: GetServicesGroupedByCategoryResponse = await response.json();

  if (!json.success) {
    notFound();
  }

  const group = json.data.groups.find((g) => g.category.slug === slug);

  if (!group) {
    notFound();
  }

  const { category, services } = group;

  return (
    <main className="flex-1 w-full bg-background">
      <ServiceListHero
        title={category.name}
        description={category.description}
        icon={<Building2 className="w-75 h-75" />}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: category.name },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-10 relative pb-20">
        <div className="mt-8">
          <ServiceListTable services={services} />
        </div>
        <ServiceListCTA moduleName={category.name} />
      </div>
    </main>
  );
};

export default CategoryPage;
