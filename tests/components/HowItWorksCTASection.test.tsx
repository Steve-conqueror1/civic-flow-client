import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import HowItWorksCTASection from "@/components/HowItWorksCTASection";

describe("HowItWorksCTASection", () => {
  it("renders the heading", () => {
    render(<HowItWorksCTASection />);
    expect(
      screen.getByRole("heading", { name: /ready to experience/i })
    ).toBeDefined();
  });

  it("renders the subtext", () => {
    render(<HowItWorksCTASection />);
    expect(screen.getByText(/thousands of albertans/i)).toBeDefined();
  });

  it("renders the Get Started Now link", () => {
    render(<HowItWorksCTASection />);
    expect(screen.getByRole("link", { name: /get started now/i })).toBeDefined();
  });
});
