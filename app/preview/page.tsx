import AppNavbar from "@/components/AppNavbar";
import AppFooter from "@/components/AppFooter";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";

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

      {/* PublicLayout */}
      <section className="mt-8">
        <p className="px-4 pb-2 text-sm font-medium text-slate-400 uppercase tracking-wide">
          PublicLayout (navbar + footer shell)
        </p>
        <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden"></div>
      </section>

      {/* HeroSection */}
      <section className="mt-8">
        <p className="px-4 pb-2 text-sm font-medium text-slate-400 uppercase tracking-wide">
          HeroSection
        </p>
        <HeroSection />
      </section>

      {/* HowItWorksSection */}
      <section className="mt-8">
        <p className="px-4 pb-2 text-sm font-medium text-slate-400 uppercase tracking-wide">
          HowItWorksSection
        </p>
        <HowItWorksSection />
      </section>

      {/* AppFooter */}
      <section className="mt-8">
        <p className="px-4 pb-2 text-sm font-medium text-slate-400 uppercase tracking-wide">
          AppFooter
        </p>
        <AppFooter />
      </section>
    </div>
  );
};

export default page;
