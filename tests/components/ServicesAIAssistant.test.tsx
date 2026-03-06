import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ServicesAIAssistant from "@/components/ServicesAIAssistant";

describe("ServicesAIAssistant", () => {
  it("renders the Need Help heading", () => {
    render(<ServicesAIAssistant />);
    expect(screen.getByText(/need help\?/i)).toBeInTheDocument();
  });

  it("renders the description", () => {
    render(<ServicesAIAssistant />);
    expect(screen.getByText(/ai assistant/i)).toBeInTheDocument();
  });

  it("renders the Start Chat button", () => {
    render(<ServicesAIAssistant />);
    expect(screen.getByRole("button", { name: /start chat/i })).toBeInTheDocument();
  });
});
