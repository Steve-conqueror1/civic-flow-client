type Prop = {
  number: string;
  title: string;
};
export const PolicyHeading = ({ number, title }: Prop) => {
  return (
    <h2 className="text-slate-900 dark:text-slate-100 text-[24px] font-bold leading-tight my-6 flex items-center gap-3">
      <span className="text-primary/40">{number}</span> {title}
    </h2>
  );
};
