import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import TermsTitleSection from "@/components/TermsTitleSection";

describe("TermsTitleSection", () => {
  it("renders the main heading", () => {
    render(<TermsTitleSection />);
    expect(
      screen.getByRole("heading", { level: 1, name: /terms of service/i })
    ).toBeDefined();
  });

  it("renders the last updated date", () => {
    render(<TermsTitleSection />);
    expect(screen.getByText(/last updated/i)).toBeDefined();
  });

  it("renders the intro paragraph", () => {
    render(<TermsTitleSection />);
    expect(screen.getByText(/alberta government-grade/i)).toBeDefined();
  });
});
