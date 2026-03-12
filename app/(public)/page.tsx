import CtaBannerSection from "@/components/CtaBannerSection";
import { HeroSection } from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import { ServiceDepartmentsSection } from "@/components/ServiceDepartmentsSection";

const page = () => {
  return (
    <div className="w-full">
      <HeroSection />
      <HowItWorksSection />
      <ServiceDepartmentsSection />
      <CtaBannerSection />
    </div>
  );
};

export default page;
