import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import HowItWorksPrivacySection from "@/components/HowItWorksPrivacySection";

describe("HowItWorksPrivacySection", () => {
  it("renders the heading", () => {
    render(<HowItWorksPrivacySection />);
    expect(
      screen.getByRole("heading", { name: /privacy.*security first/i })
    ).toBeDefined();
  });

  it("renders the description text", () => {
    render(<HowItWorksPrivacySection />);
    expect(screen.getByText(/foip/i)).toBeDefined();
  });

  it("renders as a section landmark", () => {
    render(<HowItWorksPrivacySection />);
    expect(screen.getByRole("region")).toBeDefined();
  });
});
