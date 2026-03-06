import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import HowItWorksAISection from "@/components/HowItWorks";

describe("HowItWorksAISection", () => {
  it("renders the section heading", () => {
    render(<HowItWorksAISection />);
    expect(
      screen.getByRole("heading", { name: /enhancing, not replacing/i }),
    ).toBeDefined();
  });

  it("renders the label", () => {
    render(<HowItWorksAISection />);
    expect(screen.getByText(/powered by responsible ai/i)).toBeDefined();
  });

  it("renders the description text", () => {
    render(<HowItWorksAISection />);
    expect(screen.getByText(/handle initial triage/i)).toBeDefined();
  });

  it("renders the benefit list items", () => {
    render(<HowItWorksAISection />);
    expect(screen.getByText(/reduces processing time/i)).toBeDefined();
    expect(screen.getByText(/eliminates misrouted requests/i)).toBeDefined();
    expect(screen.getByText(/continuous learning/i)).toBeDefined();
  });
});
