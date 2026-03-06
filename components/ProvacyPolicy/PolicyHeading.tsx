interface PolicyHeadingProps {
  number: string;
  title: string;
}

export function PolicyHeading({ number, title }: PolicyHeadingProps) {
  return (
    <h2 className="text-slate-900 dark:text-slate-100 text-[24px] font-bold leading-tight mb-4 flex items-center gap-3">
      <span className="text-primary/40" aria-hidden="true">
        {number}
      </span>
      {title}
    </h2>
  );
}
