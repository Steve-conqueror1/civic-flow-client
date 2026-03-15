import { Bot, Send } from "lucide-react";

export const ServicesAIAssistant = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 rounded-xl border border-primary/20 p-6 shadow-sm relative overflow-hidden">
      {/* Decorative background icon */}
      <div className="absolute top-0 right-0 p-4 opacity-10" aria-hidden="true">
        <Bot className="w-24 h-24 text-primary" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <div className="bg-white p-2 rounded-full shadow-sm">
            <Bot className="w-5 h-5 text-primary" aria-hidden="true" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white">
            Need Help?
          </h3>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
          Not sure which service you need? Our AI Assistant can guide you to the
          right form.
        </p>

        <button
          type="button"
          className="w-full bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 text-primary dark:text-white font-bold py-2 px-4 rounded-lg border border-slate-200 dark:border-slate-600 transition-colors flex items-center justify-center gap-2 shadow-sm"
        >
          <span>Start Chat</span>
          <Send className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};
