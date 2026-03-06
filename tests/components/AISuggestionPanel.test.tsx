import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import AISuggestionPanel from "@/components/AISuggestionPanel";

describe("AISuggestionPanel", () => {
  it("renders the AI Suggestion heading", () => {
    render(<AISuggestionPanel />);
    expect(screen.getByText("AI Suggestion")).toBeDefined();
  });

  it("renders the suggested category when provided", () => {
    render(<AISuggestionPanel suggestedCategory="Infrastructure" />);
    expect(screen.getByText("Infrastructure")).toBeDefined();
  });

  it("renders the Suggested Category label", () => {
    render(<AISuggestionPanel suggestedCategory="Roads" />);
    expect(screen.getByText(/suggested category/i)).toBeDefined();
  });

  it("renders Apply Category button", () => {
    render(<AISuggestionPanel />);
    expect(screen.getByRole("button", { name: /apply category/i })).toBeDefined();
  });

  it("renders Change Category button", () => {
    render(<AISuggestionPanel />);
    expect(screen.getByRole("button", { name: /change category/i })).toBeDefined();
  });

  it("calls onApply when Apply Category is clicked", async () => {
    const onApply = vi.fn();
    render(<AISuggestionPanel suggestedCategory="Infrastructure" onApply={onApply} />);
    await userEvent.click(screen.getByRole("button", { name: /apply category/i }));
    expect(onApply).toHaveBeenCalledOnce();
  });

  it("calls onChangeCategory when Change Category is clicked", async () => {
    const onChangeCategory = vi.fn();
    render(<AISuggestionPanel onChangeCategory={onChangeCategory} />);
    await userEvent.click(screen.getByRole("button", { name: /change category/i }));
    expect(onChangeCategory).toHaveBeenCalledOnce();
  });

  it("shows placeholder text when no category provided", () => {
    render(<AISuggestionPanel />);
    expect(screen.getByText(/analyzing/i)).toBeDefined();
  });
});
