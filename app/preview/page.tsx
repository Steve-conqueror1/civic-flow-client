import AppNavbar from "@/components/AppNavbar";
import AppFooter from "@/components/AppFooter";
import MapView from "@/components/maps";
import ServicesHero from "@/components/ServicesHero";
import PopularServiceCard from "@/components/PopularServiceCard";
import ServiceCategoryCard from "@/components/ServiceCategoryCard";
import ServicesAIAssistant from "@/components/ServicesAIAssistant";
import ServicesQuickLinks from "@/components/ServicesQuickLinks";
import ServicesAlerts from "@/components/ServicesAlerts";
import RequestProgressBar from "@/components/RequestProgressBar";
import AISuggestionPanel from "@/components/AISuggestionPanel";
import { Construction, TrafficCone } from "lucide-react";
const page = () => {
  return (
    <div>
      <h1 className="p-4 text-lg font-bold text-slate-500">
        Component Preview
      </h1>

      {/* AppNavbar */}
      <section>
        <p className="px-4 pb-2 text-sm font-medium text-slate-400 uppercase tracking-wide">
          AppNavbar
        </p>
        <AppNavbar />
      </section>

      {/* MapView */}
      <section className="mt-8">
        <p className="px-4 pb-2 text-sm font-medium text-slate-400 uppercase tracking-wide">
          MapView
        </p>
        <div className="px-4">
          <MapView />
        </div>
      </section>

      {/* AppFooter */}
      <section className="mt-8">
        <p className="px-4 pb-2 text-sm font-medium text-slate-400 uppercase tracking-wide">
          AppFooter
        </p>
        <AppFooter />
      </section>

      {/* PrivacyPolicyTitleSection */}
      <section className="mt-8">
        <p className="px-4 pb-2 text-sm font-medium text-slate-400 uppercase tracking-wide">
          PrivacyPolicyTitleSection
        </p>
      </section>

      {/* PrivacyPolicyContentSection */}
      <section className="mt-8">
        <p className="px-4 pb-2 text-sm font-medium text-slate-400 uppercase tracking-wide">
          PrivacyPolicyContentSection
        </p>
      </section>

      {/* ServicesHero */}
      <section className="mt-8">
        <p className="px-4 pb-2 text-sm font-medium text-slate-400 uppercase tracking-wide">
          ServicesHero
        </p>
        <ServicesHero />
      </section>

      {/* PopularServiceCard */}
      <section className="mt-8">
        <p className="px-4 pb-2 text-sm font-medium text-slate-400 uppercase tracking-wide">
          PopularServiceCard
        </p>
        <div className="px-4 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl">
          <PopularServiceCard title="Report Pothole" href="/services/infrastructure/pothole" icon={Construction} />
        </div>
      </section>

      {/* ServiceCategoryCard */}
      <section className="mt-8">
        <p className="px-4 pb-2 text-sm font-medium text-slate-400 uppercase tracking-wide">
          ServiceCategoryCard
        </p>
        <div className="px-4 max-w-2xl">
          <ServiceCategoryCard
            name="Infrastructure"
            description="Roads, utilities, and public works maintenance."
            responseTime="Response: 2-3 days"
            icon={TrafficCone}
            iconBgClass="bg-blue-100 dark:bg-blue-900/30"
            iconColorClass="text-primary"
            services={[
              { name: "Road Repair Request", href: "/services/infrastructure/road-repair" },
              { name: "Snow Removal Status", href: "/services/infrastructure/snow-removal" },
            ]}
            viewAllHref="/services/infrastructure"
            viewAllLabel="View all Infrastructure services"
          />
        </div>
      </section>

      {/* ServicesAIAssistant */}
      <section className="mt-8">
        <p className="px-4 pb-2 text-sm font-medium text-slate-400 uppercase tracking-wide">
          ServicesAIAssistant
        </p>
        <div className="px-4 max-w-sm">
          <ServicesAIAssistant />
        </div>
      </section>

      {/* ServicesQuickLinks */}
      <section className="mt-8">
        <p className="px-4 pb-2 text-sm font-medium text-slate-400 uppercase tracking-wide">
          ServicesQuickLinks
        </p>
        <div className="px-4 max-w-sm">
          <ServicesQuickLinks />
        </div>
      </section>

      {/* ServicesAlerts */}
      <section className="mt-8">
        <p className="px-4 pb-2 text-sm font-medium text-slate-400 uppercase tracking-wide">
          ServicesAlerts
        </p>
        <div className="px-4 max-w-sm">
          <ServicesAlerts />
        </div>
      </section>

      {/* RequestProgressBar */}
      <section className="mt-8">
        <p className="px-4 pb-2 text-sm font-medium text-slate-400 uppercase tracking-wide">
          RequestProgressBar
        </p>
        <div className="px-4 max-w-2xl">
          <RequestProgressBar
            steps={["Description", "Location", "Upload", "Review"]}
            currentStep={2}
          />
        </div>
      </section>

      {/* AISuggestionPanel */}
      <section className="mt-8 mb-8">
        <p className="px-4 pb-2 text-sm font-medium text-slate-400 uppercase tracking-wide">
          AISuggestionPanel
        </p>
        <div className="px-4 max-w-sm">
          <AISuggestionPanel suggestedCategory="Infrastructure" />
        </div>
      </section>
    </div>
  );
};

export default page;
