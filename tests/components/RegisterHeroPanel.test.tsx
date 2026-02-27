import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { RegisterHeroPanel } from "@/components/auth/signup";

describe("RegisterHeroPanel", () => {
  it("renders the main heading", () => {
    render(<RegisterHeroPanel />);
    expect(
      screen.getByRole("heading", {
        name: /welcome to alberta's digital services/i,
      }),
    ).toBeDefined();
  });

  it("renders the description text", () => {
    render(<RegisterHeroPanel />);
    expect(
      screen.getByText(/securely connect with municipal services/i),
    ).toBeDefined();
  });

  it("renders Identity Verification feature", () => {
    render(<RegisterHeroPanel />);
    expect(screen.getByText("Identity Verification")).toBeDefined();
  });

  it("renders Bank-grade Encryption feature", () => {
    render(<RegisterHeroPanel />);
    expect(screen.getByText("Bank-grade Encryption")).toBeDefined();
  });

  it("renders 24/7 Access feature", () => {
    render(<RegisterHeroPanel />);
    expect(screen.getByText("24/7 Access")).toBeDefined();
  });

  it("renders the copyright notice", () => {
    render(<RegisterHeroPanel />);
    expect(screen.getByText(/government of alberta/i)).toBeDefined();
  });
});
