import Link from "next/link";

export default function CtaBannerSection() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="w-full py-16 px-4 md:px-10 bg-background"
    >
      <div className="max-w-7xl mx-auto rounded-2xl bg-slate-900 dark:bg-slate-800 overflow-hidden relative">
        {/* Decorative gradients */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"
          aria-hidden="true"
        />
        <div
          className="absolute -right-20 -top-20 size-64 bg-primary/20 rounded-full blur-3xl"
          aria-hidden="true"
        />

        <div className="relative z-10 px-6 py-12 md:px-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <h2 id="cta-heading" className="text-3xl font-bold text-white mb-4">
              Ready to improve your community?
            </h2>
            <p className="text-slate-300 text-lg">
              Join thousands of Albertans making a difference. Report issues,
              track progress, and help us build better services.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <Link
              href="/register"
              className="flex items-center justify-center rounded-lg h-12 px-8 bg-primary hover:bg-primary-dark text-white text-base font-bold transition-all w-full sm:w-auto"
            >
              Register Now
            </Link>
            <Link
              href="#how-it-works"
              className="flex items-center justify-center rounded-lg h-12 px-8 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-base font-bold transition-all w-full sm:w-auto backdrop-blur-sm"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
