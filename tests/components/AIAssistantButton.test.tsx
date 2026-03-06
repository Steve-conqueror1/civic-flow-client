import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import AIAssistantButton from "@/components/AIAssistantButton";

describe("AIAssistantButton", () => {
  it("renders the button", () => {
    render(<AIAssistantButton />);
    expect(
      screen.getByRole("button", { name: /ai assistant/i })
    ).toBeDefined();
  });

  it("calls onClick when clicked", async () => {
    const onClick = vi.fn();
    render(<AIAssistantButton onClick={onClick} />);
    await userEvent.click(
      screen.getByRole("button", { name: /ai assistant/i })
    );
    expect(onClick).toHaveBeenCalledOnce();
  });
});
