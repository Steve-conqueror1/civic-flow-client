interface TermsSectionProps {
  sectionNumber: number;
  title: string;
  children: React.ReactNode;
}

export function TermsSection({
  sectionNumber,
  title,
  children,
}: TermsSectionProps) {
  return (
    <section>
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-4 flex items-center gap-3">
        <span
          className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm shrink-0"
          aria-hidden="true"
        >
          {sectionNumber}
        </span>
        {title}
      </h2>
      <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed">
        {children}
      </div>
    </section>
  );
}
