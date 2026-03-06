import {
  PrivacyPolicyTitleSection,
  CollectedInfo,
  AIUsage,
  DataResidency,
  CitizenRights,
  PolicyHeading,
} from "@/components/ProvacyPolicy";

const PrivacyPolicyPage = () => {
  return (
    <main className="flex flex-1 justify-center py-10 px-6 md:px-20  w-full bg-background">
      <div className="flex flex-col max-w-7xl flex-1 mx-auto px-4 sm:px-6 md:px-10">
        <PrivacyPolicyTitleSection />

        <div className="space-y-12">
          {/* Section 01 — Introduction */}
          <section aria-labelledby="intro-heading">
            <PolicyHeading number="01" title="Introduction" />
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed">
                CivicFlow is committed to protecting your privacy. This policy
                outlines our practices regarding the collection, use, and
                disclosure of personal information. As an Alberta-based service
                provider, we operate in strict compliance with the{" "}
                <strong>
                  Freedom of Information and Protection of Privacy Act (FOIP)
                </strong>{" "}
                and the{" "}
                <strong>Personal Information Protection Act (PIPA)</strong>{" "}
                where applicable.
              </p>
            </div>
          </section>

          <CollectedInfo />
          <AIUsage />
          <DataResidency />
          <CitizenRights />
        </div>
      </div>
    </main>
  );
};

export default PrivacyPolicyPage;
