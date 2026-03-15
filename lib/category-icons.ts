import {
  TrafficCone,
  FileText,
  Users,
  Shield,
  Leaf,
  HelpCircle,
  type LucideProps,
} from "lucide-react";
import { type ComponentType } from "react";

type CategoryIconConfig = {
  icon: ComponentType<LucideProps>;
  iconBgClass: string;
  iconColorClass: string;
};

const FALLBACK: CategoryIconConfig = {
  icon: HelpCircle,
  iconBgClass: "bg-slate-100 dark:bg-slate-800",
  iconColorClass: "text-slate-500 dark:text-slate-400",
};

const MAPPINGS: { keywords: string[]; config: CategoryIconConfig }[] = [
  {
    keywords: ["infrastructure", "road", "traffic"],
    config: {
      icon: TrafficCone,
      iconBgClass: "bg-blue-100 dark:bg-blue-900/30",
      iconColorClass: "text-primary",
    },
  },
  {
    keywords: ["permit", "licens"],
    config: {
      icon: FileText,
      iconBgClass: "bg-indigo-100 dark:bg-indigo-900/30",
      iconColorClass: "text-indigo-600 dark:text-indigo-400",
    },
  },
  {
    keywords: ["social", "housing", "family"],
    config: {
      icon: Users,
      iconBgClass: "bg-purple-100 dark:bg-purple-900/30",
      iconColorClass: "text-purple-600 dark:text-purple-400",
    },
  },
  {
    keywords: ["safety", "emergency", "fire"],
    config: {
      icon: Shield,
      iconBgClass: "bg-red-100 dark:bg-red-900/30",
      iconColorClass: "text-red-600 dark:text-red-400",
    },
  },
  {
    keywords: ["environment", "park", "waste"],
    config: {
      icon: Leaf,
      iconBgClass: "bg-emerald-100 dark:bg-emerald-900/30",
      iconColorClass: "text-emerald-600 dark:text-emerald-400",
    },
  },
];

export function getCategoryIcon(name: string): CategoryIconConfig {
  const lower = name.toLowerCase();
  for (const { keywords, config } of MAPPINGS) {
    if (keywords.some((kw) => lower.includes(kw))) {
      return config;
    }
  }
  return FALLBACK;
}
