import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import AuthNavbar from "@/components/auth/AuthNavbar";

const mockUsePathname = vi.fn();
vi.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}));

describe("AuthNavbar", () => {
  it("renders as a header landmark", () => {
    mockUsePathname.mockReturnValue("/register");
    render(<AuthNavbar />);
    expect(screen.getByRole("banner")).toBeDefined();
  });

  it("renders the brand logo with default name", () => {
    mockUsePathname.mockReturnValue("/register");
    render(<AuthNavbar />);
    expect(screen.getByText("CivicFlow")).toBeDefined();
  });

  it("accepts a custom brand name", () => {
    mockUsePathname.mockReturnValue("/register");
    render(<AuthNavbar brandName="MyApp" />);
    expect(screen.getByText("MyApp")).toBeDefined();
  });

  it("logo links back to homepage", () => {
    mockUsePathname.mockReturnValue("/register");
    render(<AuthNavbar />);
    const homeLink = screen.getByRole("link", { name: /civicflow/i });
    expect(homeLink).toBeDefined();
  });

  describe("/register route", () => {
    it("shows 'Already have an account?' prompt", () => {
      mockUsePathname.mockReturnValue("/register");
      render(<AuthNavbar />);
      expect(screen.getByText("Already have an account?")).toBeDefined();
    });

    it("shows Sign in link pointing to /login", () => {
      mockUsePathname.mockReturnValue("/register");
      render(<AuthNavbar />);
      expect(screen.getByRole("link", { name: "Sign in" })).toBeDefined();
    });
  });

  describe("/login route", () => {
    it("shows Secure Connection text", () => {
      mockUsePathname.mockReturnValue("/login");
      render(<AuthNavbar />);
      expect(screen.getByText("Secure Connection")).toBeDefined();
    });

    it("does not show a sign in or support link", () => {
      mockUsePathname.mockReturnValue("/login");
      render(<AuthNavbar />);
      expect(screen.queryByRole("link", { name: /sign in/i })).toBeNull();
      expect(screen.queryByRole("button")).toBeNull();
    });
  });

  describe("/mfa route", () => {
    it("shows Need help? text", () => {
      mockUsePathname.mockReturnValue("/mfa");
      render(<AuthNavbar />);
      expect(screen.getByText("Need help?")).toBeDefined();
    });

    it("shows Support button", () => {
      mockUsePathname.mockReturnValue("/mfa");
      render(<AuthNavbar />);
      expect(screen.getByRole("button", { name: /support/i })).toBeDefined();
    });
  });
});
