import CtaBannerSection from "@/components/home/CtaBannerSection";
import { HeroSection } from "@/components/home/HeroSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import { ServiceDepartmentsSection } from "@/components/home/ServiceDepartmentsSection";

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
