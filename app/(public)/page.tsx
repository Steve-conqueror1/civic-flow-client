import CtaBannerSection from "@/components/CtaBannerSection";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ServiceCategoriesSection from "@/components/ServiceCategoriesSection";

const page = () => {
  return (
    <div className="w-full">
      <HeroSection />
      <HowItWorksSection />
      <ServiceCategoriesSection />
      <CtaBannerSection />
    </div>
  );
};

export default page;
