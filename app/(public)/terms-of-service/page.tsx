import Link from "next/link";
import { TermsSection, TermsTitleSection } from "@/components/TermsOfService";

const page = () => {
  return (
    <main className="flex-1 w-full  px-6 py-12 md:py-16 bg-background">
      <div className="max-w-7xl mx-auto md:px-10">
        <TermsTitleSection />

        <article className="space-y-10">
          <TermsSection sectionNumber={1} title="Acceptance of Terms">
            <p className="mb-4">
              By accessing or using the CivicFlow platform, services, or
              applications (collectively, the &quot;Platform&quot;), you agree
              to be bound by these Terms. If you do not agree to these Terms,
              you must not access or use the Platform.
            </p>
            <p>
              These Terms constitute a legally binding agreement between you and
              the Government of Alberta (represented by CivicFlow). We reserve
              the right to update these Terms at any time without prior notice.
              Continued use of the Platform after changes are posted constitutes
              your acceptance of the revised Terms.
            </p>
          </TermsSection>

          <TermsSection sectionNumber={2} title="User Responsibilities">
            <p className="mb-4">As a user of CivicFlow, you agree to:</p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>
                Provide accurate, current, and complete information when
                creating an account or submitting forms.
              </li>
              <li>
                Maintain the security and confidentiality of your account
                credentials.
              </li>
              <li>
                Notify us immediately of any unauthorized access to or use of
                your account.
              </li>
              <li>
                Use the Platform only for lawful purposes related to accessing
                Alberta public services.
              </li>
            </ul>
            <p>
              You are strictly prohibited from attempting to compromise the
              security of the Platform, reverse-engineering its underlying
              technologies (including AI models), or using the Platform to
              distribute malicious code.
            </p>
          </TermsSection>

          <TermsSection sectionNumber={3} title="AI Usage Policy">
            <p className="mb-4">
              CivicFlow utilizes Artificial Intelligence (AI) to enhance service
              delivery, process documents, and provide automated assistance. By
              using the Platform, you acknowledge that:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>
                Certain interactions, such as virtual assistants and document
                pre-screening, are fully or partially automated by AI.
              </li>
              <li>
                AI-generated guidance is intended for informational purposes and
                does not constitute formal legal or professional advice.
              </li>
              <li>
                The Government of Alberta maintains human oversight mechanisms
                for critical decisions affecting citizen rights or benefits.
              </li>
            </ul>
            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-primary p-4 rounded-r-lg mt-4">
              <p className="text-sm text-slate-800 dark:text-slate-200 m-0">
                <strong>Transparency Notice:</strong> You will always be
                informed when you are interacting with an AI system rather than
                a human representative.
              </p>
            </div>
          </TermsSection>

          <TermsSection sectionNumber={4} title="Data Privacy & FOIP">
            <p className="mb-4">
              Your privacy is paramount. All personal information collected
              through CivicFlow is managed in strict accordance with the Freedom
              of Information and Protection of Privacy Act (FOIP) of Alberta.
            </p>
            <p>
              Data submitted to our AI systems is processed securely within
              Canadian data centers and is not used to train external, public AI
              models. For detailed information on how we collect, use, and
              protect your data, please review our{" "}
              <Link
                href="/privacy-policy"
                className="text-primary hover:underline font-medium"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </TermsSection>

          <TermsSection sectionNumber={5} title="Limitation of Liability">
            <p>
              To the maximum extent permitted by law, the Government of Alberta
              and its affiliates shall not be liable for any indirect,
              incidental, special, consequential, or punitive damages resulting
              from your use of or inability to use the Platform, unauthorized
              access to your data, or any AI-generated inaccuracies that you
              relied upon without human verification.
            </p>
          </TermsSection>

          <TermsSection sectionNumber={6} title="Governing Law">
            <p>
              These Terms shall be governed by and construed in accordance with
              the laws of the Province of Alberta and the federal laws of Canada
              applicable therein. Any disputes arising under these Terms shall
              be subject to the exclusive jurisdiction of the courts located in
              Edmonton, Alberta.
            </p>
          </TermsSection>
        </article>
      </div>
      {/* <TermsAcceptanceActions /> */}
    </main>
  );
};

export default page;
