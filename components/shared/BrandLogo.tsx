import { Landmark } from "lucide-react";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  brandName?: string;
  iconSize?: number;
  className?: string;
  brandNameClassName?: string;
}

export const BrandLogo = ({
  brandName = "CivicFlow",
  iconSize = 28,
  className,
  brandNameClassName,
}: BrandLogoProps) => (
  <div
    className={cn(
      "flex items-center gap-4 text-slate-900 dark:text-white",
      className,
    )}
  >
    <div className="text-primary flex items-center justify-center">
      <Landmark size={iconSize} aria-hidden="true" />
    </div>
    <span
      className={cn(
        "text-xl font-bold leading-tight tracking-[-0.015em]",
        brandNameClassName,
      )}
    >
      {brandName}
    </span>
  </div>
);
