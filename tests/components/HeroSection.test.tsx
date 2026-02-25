import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import HeroSection from "@/components/HeroSection";

describe("HeroSection", () => {
  it("renders as a section landmark", () => {
    render(<HeroSection />);
    expect(screen.getByRole("region")).toBeDefined();
  });

  it("renders the AI badge", () => {
    render(<HeroSection />);
    expect(screen.getByText("AI-Powered Citizen Services")).toBeDefined();
  });

  it("renders the main heading", () => {
    render(<HeroSection />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Simplifying Public Service Requests Across Alberta/i,
      })
    ).toBeDefined();
  });

  it("renders the description paragraph", () => {
    render(<HeroSection />);
    expect(screen.getByText(/AI-assisted platform/i)).toBeDefined();
  });

  it("renders the Submit a Request link", () => {
    render(<HeroSection />);
    expect(
      screen.getByRole("link", { name: /submit a request/i })
    ).toBeDefined();
  });

  it("renders the Track Your Request link", () => {
    render(<HeroSection />);
    expect(
      screen.getByRole("link", { name: /track your request/i })
    ).toBeDefined();
  });

  it("renders the social proof text", () => {
    render(<HeroSection />);
    expect(screen.getByText(/10,000\+ Albertans/i)).toBeDefined();
  });

  it("renders the floating status card", () => {
    render(<HeroSection />);
    expect(screen.getByText(/Pothole Repair - Downtown/i)).toBeDefined();
    expect(screen.getByText(/Status: Resolved/i)).toBeDefined();
  });

  it("renders the AI routing attribution", () => {
    render(<HeroSection />);
    expect(screen.getByText(/Routed by AI Assistant/i)).toBeDefined();
  });

  it("renders the Alberta landscape image", () => {
    render(<HeroSection />);
    expect(
      screen.getByAltText(/Scenic view of Alberta landscape/i)
    ).toBeDefined();
  });
});
