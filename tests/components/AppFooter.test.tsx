import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AppFooter from "@/components/AppFooter";

describe("AppFooter", () => {
  it("renders the footer landmark", () => {
    render(<AppFooter />);
    expect(screen.getByRole("contentinfo")).toBeDefined();
  });

  it("renders the brand name", () => {
    render(<AppFooter />);
    expect(screen.getByText("CivicFlow")).toBeDefined();
  });

  it("renders the brand description", () => {
    render(<AppFooter />);
    expect(screen.getByText(/AI-driven public service/i)).toBeDefined();
  });

  it("renders social links with accessible labels", () => {
    render(<AppFooter />);
    expect(screen.getByRole("link", { name: /twitter/i })).toBeDefined();
    expect(screen.getByRole("link", { name: /linkedin/i })).toBeDefined();
  });

  it("renders all three navigation column headings", () => {
    render(<AppFooter />);
    expect(screen.getByText("Platform")).toBeDefined();
    expect(screen.getByText("Support")).toBeDefined();
    expect(screen.getByText("Legal")).toBeDefined();
  });

  it("renders copyright notice", () => {
    render(<AppFooter />);
    expect(screen.getByText(/CivicFlow Alberta/i)).toBeDefined();
  });

  it("renders Alberta tagline", () => {
    render(<AppFooter />);
    expect(screen.getByText(/Proudly serving Alberta/i)).toBeDefined();
  });

  it("renders the Alberta flag image", () => {
    render(<AppFooter />);
    expect(screen.getByRole("img", { name: /flag of alberta/i })).toBeDefined();
  });
});
