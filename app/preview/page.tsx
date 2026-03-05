import AppNavbar from "@/components/AppNavbar";
import AppFooter from "@/components/AppFooter";
import MapView from "@/components/maps";
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
    </div>
  );
};

export default page;
