import { Bot, CheckCircle } from "lucide-react";
import MapView from "../maps";

export default function HeroImageCard() {
  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-slate-100 dark:bg-slate-800 group">
      <MapView markerLabel="6 Stanton St." />
      {/* Gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
        aria-hidden="true"
      />

      {/* Floating status card */}
      <div className="absolute bottom-4 left-6 right-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm p-4 rounded-xl border border-white/20 shadow-lg">
        <div className="flex items-start gap-4">
          <div
            className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg text-green-600 dark:text-green-400"
            aria-hidden="true"
          >
            <CheckCircle />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white">
              Pothole Repair - Downtown
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Status: Resolved • 2 hours ago
            </p>
            <div className="mt-2 text-xs font-medium text-slate-400 flex items-center gap-1">
              <Bot size={20} />
              <span>Routed by AI Assistant</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
