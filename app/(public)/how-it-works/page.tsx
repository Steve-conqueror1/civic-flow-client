import {
  HowItWorksAISection,
  HowItWorksCTASection,
  HowItWorksHero,
  HowItWorksPrivacySection,
  HowItWorksProcessSection,
} from "@/components/HowItWorks";

const page = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <HowItWorksHero />
      <HowItWorksProcessSection />
      <HowItWorksAISection />
      <HowItWorksPrivacySection />
      <HowItWorksCTASection />
    </div>
  );
};

export default page;
