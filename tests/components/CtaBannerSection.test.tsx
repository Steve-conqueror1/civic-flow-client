import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import CtaBannerSection from "@/components/CtaBannerSection";

describe("CtaBannerSection", () => {
  it("renders the heading", () => {
    render(<CtaBannerSection />);
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /ready to improve your community/i,
      })
    ).toBeDefined();
  });

  it("renders the description", () => {
    render(<CtaBannerSection />);
    expect(screen.getByText(/join thousands of albertans/i)).toBeDefined();
  });

  it("renders the Register Now link", () => {
    render(<CtaBannerSection />);
    expect(
      screen.getByRole("link", { name: /register now/i })
    ).toBeDefined();
  });

  it("renders the Learn More link", () => {
    render(<CtaBannerSection />);
    expect(
      screen.getByRole("link", { name: /learn more/i })
    ).toBeDefined();
  });

  it("renders as a section landmark", () => {
    render(<CtaBannerSection />);
    expect(screen.getByRole("region")).toBeDefined();
  });
});
