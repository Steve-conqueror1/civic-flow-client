import {
  AIUsage,
  CitizenRights,
  DataResidency,
  PrivacyPolicyTitleSection,
} from "@/components/ProvacyPolicy";
import { PolicyHeading } from "@/components/ProvacyPolicy";
import { CollectedInfo } from "@/components/ProvacyPolicy/CollectedInfo";

const PrivacyPolicyPage = () => {
  return (
    <main className="bg-background w-full py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-10 ">
        <PrivacyPolicyTitleSection />
        <div className="flex flex-col gap-6">
          <div className="w-full">
            <PolicyHeading number="01" title="Introduction" />
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm  mb-8">
              <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed">
                CivicFlow is committed to protecting your privacy. This policy
                outlines our practices regarding the collection, use, and
                disclosure of personal information. As an Alberta-based service
                provider, we operate in strict compliance with the{" "}
                <span className="font-bold">
                  Freedom of Information and Protection of Privacy Act
                  (FOIP){" "}
                </span>
                and the{" "}
                <span className="font-bold">
                  Personal Information Protection Act (PIPA){" "}
                </span>{" "}
                where applicable.
              </p>
            </div>
          </div>

          <div className="w-full">
            <PolicyHeading number="02" title="Information We Collect" />
            <CollectedInfo />
          </div>

          <div className="w-full">
            <PolicyHeading number="03" title="How We Use AI" />
            <AIUsage />
          </div>
          <div className="w-full">
            <PolicyHeading number="04" title="Data Residency & Security" />
            <DataResidency />
          </div>
          <div className="w-full">
            <PolicyHeading number="05" title="Citizen Rights" />
            <CitizenRights />
          </div>
        </div>
      </div>
    </main>
  );
};

export default PrivacyPolicyPage;
