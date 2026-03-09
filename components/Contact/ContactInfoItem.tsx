import { ReactNode } from "react";

interface ContactInfoItemProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
  /** Heading level — defaults to 3. Adjust to match the page's heading hierarchy. */
  headingLevel?: 2 | 3 | 4;
}

const ContactInfoItem = ({
  icon,
  title,
  children,
  headingLevel = 3,
}: ContactInfoItemProps) => {
  const Heading = `h${headingLevel}` as "h2" | "h3" | "h4";

  return (
    <div className="flex items-start gap-4">
      <div
        className="bg-primary/10 p-3 rounded-lg text-primary shrink-0"
        aria-hidden="true"
      >
        {icon}
      </div>
      <div>
        <Heading className="text-slate-900 dark:text-slate-100 font-bold text-lg">
          {title}
        </Heading>
        <div className="text-slate-600 dark:text-slate-400">{children}</div>
      </div>
    </div>
  );
};

export { ContactInfoItem };
export default ContactInfoItem;
