import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import HowItWorksSection from "@/components/HowItWorksSection";

describe("HowItWorksSection", () => {
  it("renders the section heading", () => {
    render(<HowItWorksSection />);
    expect(
      screen.getByRole("heading", { level: 2, name: /how it works/i })
    ).toBeDefined();
  });

  it("renders the subtitle", () => {
    render(<HowItWorksSection />);
    expect(
      screen.getByText(/streamlined process from submission to resolution/i)
    ).toBeDefined();
  });

  it("renders all three step titles", () => {
    render(<HowItWorksSection />);
    expect(screen.getByRole("heading", { name: /submit request/i })).toBeDefined();
    expect(screen.getByRole("heading", { name: /ai analysis/i })).toBeDefined();
    expect(screen.getByRole("heading", { name: /3\. resolution/i })).toBeDefined();
  });

  it("renders all three step descriptions", () => {
    render(<HowItWorksSection />);
    expect(screen.getByText(/describe your issue in plain language/i)).toBeDefined();
    expect(screen.getByText(/categorizes urgency and routes/i)).toBeDefined();
    expect(screen.getByText(/real-time status updates/i)).toBeDefined();
  });

  it("has an id for anchor navigation", () => {
    const { container } = render(<HowItWorksSection />);
    expect(container.querySelector("#how-it-works")).toBeDefined();
  });

  it("renders as a section landmark", () => {
    render(<HowItWorksSection />);
    expect(screen.getByRole("region")).toBeDefined();
  });
});
