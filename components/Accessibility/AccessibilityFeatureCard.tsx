import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface AccessibilityFeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const AccessibilityFeatureCard = ({
  icon,
  title,
  description,
}: AccessibilityFeatureCardProps) => {
  return (
    <Card className="flex flex-col p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 shadow-none">
      <CardContent className="px-0 flex flex-col gap-3">
        <div className="text-primary" aria-hidden="true">
          {icon}
        </div>
        <h3 className="text-slate-900 dark:text-slate-100 text-lg font-bold">
          {title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export { AccessibilityFeatureCard };
export default AccessibilityFeatureCard;
