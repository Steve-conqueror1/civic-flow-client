export function HowItWorksHero() {
  return (
    <section aria-label="How It Works hero" className="w-full  mx-auto">
      <div className="flex min-h-[480px] flex-col gap-6  items-center justify-center p-8 relative overflow-hidden shadow-lg bg-gradient-to-br from-[#0d3b6e] via-[#1985f0] to-[#0f2744]">
        <div className="absolute inset-0 bg-slate-900/40" aria-hidden="true" />
        <div className="relative z-10 flex flex-col gap-4 text-center max-w-3xl mx-auto">
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
            A Smarter Way to Connect with Alberta Services
          </h1>
          <p className="text-slate-200 text-lg md:text-xl font-normal leading-relaxed">
            Learn how CivicFlow connects citizens and government staff
            efficiently and effectively, ensuring your voice is heard and issues
            are resolved.
          </p>
        </div>
      </div>
    </section>
  );
}
