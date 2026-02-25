import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AppNavbar from "@/components/AppNavbar";

describe("AppNavbar", () => {
  it("renders the brand name", () => {
    render(<AppNavbar />);
    expect(screen.getByText("CivicFlow")).toBeDefined();
  });

  it("renders all navigation links", () => {
    render(<AppNavbar />);
    expect(screen.getByRole("link", { name: "Home" })).toBeDefined();
    expect(screen.getByRole("link", { name: "Services" })).toBeDefined();
    expect(screen.getByRole("link", { name: "How It Works" })).toBeDefined();
    expect(screen.getByRole("link", { name: "Sign In" })).toBeDefined();
  });

  it("renders the Register link", () => {
    render(<AppNavbar />);
    expect(screen.getByRole("link", { name: /register/i })).toBeDefined();
  });

  it("renders the mobile menu button", () => {
    render(<AppNavbar />);
    expect(
      screen.getByRole("button", { name: /open menu/i })
    ).toBeDefined();
  });

  it("renders as a header landmark", () => {
    render(<AppNavbar />);
    expect(screen.getByRole("banner")).toBeDefined();
  });
});
