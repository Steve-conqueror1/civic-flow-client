import Link from "next/link";

export const ServiceListCTA = () => {
  return (
    <section
      aria-labelledby="cta-heading"
      className="mt-12 bg-slate-100 dark:bg-slate-800/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-700"
    >
      <div className="max-w-2xl">
        <h2
          id="cta-heading"
          className="text-2xl font-bold text-slate-900 dark:text-white mb-4"
        >
          Can&apos;t find what you&apos;re looking for?
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
          Our service directory is always growing. If the specific issue or
          government service you are looking for isn&apos;t listed above, our team
          can help direct you to the right department.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/citizen/requests/new"
            className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
          >
            Start General Request
          </Link>
          <Link
            href="/contact-us"
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-primary/50 text-slate-700 dark:text-slate-200 px-8 py-3 rounded-xl font-bold transition-all flex items-center justify-center"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </section>
  );
};
