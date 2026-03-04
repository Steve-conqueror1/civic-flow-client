import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AuthPageFooter from "@/components/auth/AuthPageFooter";

describe("AuthPageFooter", () => {
  it("renders Privacy Statement link", () => {
    render(<AuthPageFooter />);
    expect(screen.getByRole("link", { name: /privacy statement/i })).toBeDefined();
  });

  it("renders Terms of Use link", () => {
    render(<AuthPageFooter />);
    expect(screen.getByRole("link", { name: /terms of use/i })).toBeDefined();
  });

  it("renders Help Center link", () => {
    render(<AuthPageFooter />);
    expect(screen.getByRole("link", { name: /help center/i })).toBeDefined();
  });

  it("renders copyright text", () => {
    render(<AuthPageFooter />);
    expect(screen.getByText(/government of alberta/i)).toBeDefined();
  });
});
