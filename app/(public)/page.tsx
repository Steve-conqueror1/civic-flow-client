import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ServiceCategoriesSection from "@/components/ServiceCategoriesSection";

const page = () => {
  return (
    <div className="w-full">
      <HeroSection />
      <HowItWorksSection />
      <ServiceCategoriesSection />
    </div>
  );
};

export default page;
