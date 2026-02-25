import HeroContent from "./HeroContent";
import HeroImageCard from "./HeroImageCard";

export default function HeroSection() {
  return (
    <section
      aria-label="Hero"
      className="w-full bg-white dark:bg-[#111a22] border-b border-slate-100 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 py-12 md:px-10 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <HeroContent />
          <HeroImageCard />
        </div>
      </div>
    </section>
  );
}
