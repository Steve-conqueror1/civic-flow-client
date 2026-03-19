import Link from "next/link";

interface Props {
  moduleName: string;
}

export const ServiceListCTA: React.FC<Props> = (props) => {
  const { moduleName } = props;
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
          Sign in to search across all {moduleName} services, and quickly find
          the support you need—even if it&apos;s not listed above.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/login"
            className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
          >
            Sign In
          </Link>
        </div>
      </div>
    </section>
  );
};
