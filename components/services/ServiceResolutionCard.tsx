import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";

interface ServiceResolutionCardProps {
  resolutionTime: string;
  note?: string;
  startHref: string;
  serviceName: string;
}

export const ServiceResolutionCard = ({
  resolutionTime,
  note,
  startHref,
  serviceName,
}: ServiceResolutionCardProps) => {
  return (
    <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-6 border border-primary/20">
      <div className="flex items-center gap-3 mb-4">
        <Clock className="text-primary w-8 h-8 flex-shrink-0" aria-hidden="true" />
        <div>
          <h3 className="font-bold text-slate-900 dark:text-slate-100">Average Resolution</h3>
          <p className="text-primary font-semibold">{resolutionTime}</p>
        </div>
      </div>
      {note && (
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">{note}</p>
      )}
      <Link
        href={startHref}
        aria-label={`Start ${serviceName} request`}
        className="w-full flex items-center justify-center gap-2 rounded-xl h-12 px-6 bg-primary text-white hover:bg-primary/90 transition-colors font-bold text-lg shadow-sm"
      >
        <span>Start Request</span>
        <ArrowRight className="w-5 h-5" aria-hidden="true" />
      </Link>
    </div>
  );
};
