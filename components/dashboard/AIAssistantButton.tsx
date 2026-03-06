"use client";

import { Bot } from "lucide-react";

interface AIAssistantButtonProps {
  onClick?: () => void;
}

export function AIAssistantButton({ onClick }: AIAssistantButtonProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        aria-label="Open AI assistant"
        onClick={onClick}
        className="bg-primary hover:bg-primary-dark text-white rounded-full size-14 flex items-center justify-center shadow-lg transition-transform hover:scale-105"
      >
        <Bot size={24} aria-hidden="true" />
      </button>
    </div>
  );
}
