import Link from "next/link";

export function HowItWorksCTASection() {
  return (
    <section
      aria-labelledby="hiw-cta-heading"
      className="w-full bg-primary py-16 mt-8"
    >
      <div className="max-w-[800px] mx-auto px-4 flex flex-col items-center text-center gap-8">
        <h2
          id="hiw-cta-heading"
          className="text-white text-3xl md:text-4xl font-bold leading-tight"
        >
          Ready to experience a better way to connect?
        </h2>
        <p className="text-blue-100 text-lg">
          Join thousands of Albertans already using CivicFlow to improve their
          communities.
        </p>
        <Link
          href="/register"
          className="flex min-w-[120px] cursor-pointer items-center justify-center rounded-lg h-14 px-8 bg-white text-primary hover:bg-slate-50 text-base font-bold leading-normal tracking-wide transition-colors shadow-lg hover:shadow-xl"
        >
          Get Started Now
        </Link>
      </div>
    </section>
  );
}
