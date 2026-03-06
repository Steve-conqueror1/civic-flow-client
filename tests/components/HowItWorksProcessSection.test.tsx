import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import HowItWorksProcessSection from "@/components/HowItWorksProcessSection";

describe("HowItWorksProcessSection", () => {
  it("renders the section label", () => {
    render(<HowItWorksProcessSection />);
    expect(screen.getByText(/the process/i)).toBeDefined();
  });

  it("renders the section heading", () => {
    render(<HowItWorksProcessSection />);
    expect(
      screen.getByRole("heading", { name: /how civicflow works/i })
    ).toBeDefined();
  });

  it("renders all four step titles", () => {
    render(<HowItWorksProcessSection />);
    expect(screen.getByRole("heading", { name: /submit request/i })).toBeDefined();
    expect(screen.getByRole("heading", { name: /ai analysis/i })).toBeDefined();
    expect(screen.getByRole("heading", { name: /staff review/i })).toBeDefined();
    expect(screen.getByRole("heading", { name: /resolution/i })).toBeDefined();
  });

  it("renders step numbers 1 through 4", () => {
    render(<HowItWorksProcessSection />);
    expect(screen.getByText("1")).toBeDefined();
    expect(screen.getByText("2")).toBeDefined();
    expect(screen.getByText("3")).toBeDefined();
    expect(screen.getByText("4")).toBeDefined();
  });
});
