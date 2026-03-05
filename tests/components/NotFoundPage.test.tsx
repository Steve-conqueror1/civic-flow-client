import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import NotFoundPage from "@/components/NotFoundPage";

describe("NotFoundPage", () => {
  it("renders the 404 display number", () => {
    render(<NotFoundPage />);
    expect(screen.getByText("404")).toBeInTheDocument();
  });

  it("renders the main heading", () => {
    render(<NotFoundPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /we couldn't find that page/i })
    ).toBeInTheDocument();
  });

  it("renders the description with Coming Soon mention", () => {
    render(<NotFoundPage />);
    expect(screen.getByText(/Coming Soon/i)).toBeInTheDocument();
  });

  it("renders a Return to Home link pointing to /", () => {
    render(<NotFoundPage />);
    const link = screen.getByRole("link", { name: /return to home/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });

  it("renders a Contact Support link", () => {
    render(<NotFoundPage />);
    expect(screen.getByRole("link", { name: /contact support/i })).toBeInTheDocument();
  });

  it("renders the Explore CivicFlow section heading", () => {
    render(<NotFoundPage />);
    expect(screen.getByText(/explore civicflow/i)).toBeInTheDocument();
  });

  it("renders all four quick-nav links", () => {
    render(<NotFoundPage />);
    expect(screen.getByRole("link", { name: /dashboard/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /analytics/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /consultations/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /roadmap/i })).toBeInTheDocument();
  });
});
