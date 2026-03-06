import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import HowItWorksHero from "@/components/HowItWorksHero";

describe("HowItWorksHero", () => {
  it("renders the main heading", () => {
    render(<HowItWorksHero />);
    expect(
      screen.getByRole("heading", {
        name: /a smarter way to connect with alberta services/i,
      })
    ).toBeDefined();
  });

  it("renders the description text", () => {
    render(<HowItWorksHero />);
    expect(
      screen.getByText(/connects citizens and government staff/i)
    ).toBeDefined();
  });

  it("renders as a section landmark", () => {
    render(<HowItWorksHero />);
    expect(screen.getByRole("region")).toBeDefined();
  });
});
