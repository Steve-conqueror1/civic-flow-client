import { Bot, CheckCircle } from "lucide-react";
import Image from "next/image";

const HERO_IMAGE_SRC =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDin4NQQP6Dhby4l63Lcr2OiVeLQqMEGbsJxYyVuAyA8VB8Z2CB0U0cBKzO355e5j3kDR0m1N-PZjEBWvT7lL_WV-moc9aObO9ZADYRZoHF_OGQ_NAx75APhhZO48M9ofXHqUuEhHZeSdaamhSsaAhjPadAarLHAuhkBFMY9eejoE0QAwoa6sB6fKqw0E-ueTJa_TbBvV-Hmakzh8igBJ2kwBIW7JsswgvG9rKExUuKJYk4vUoJYGvEJ6vFmh2aS9YdUSm4g_0oxg";

export default function HeroImageCard() {
  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-slate-100 dark:bg-slate-800 group">
      <Image
        src={HERO_IMAGE_SRC}
        alt="Scenic view of Alberta landscape with mountains"
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 1024px) 100vw, 50vw"
        priority
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
        aria-hidden="true"
      />

      {/* Floating status card */}
      <div className="absolute bottom-6 left-6 right-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm p-5 rounded-xl border border-white/20 shadow-lg">
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
