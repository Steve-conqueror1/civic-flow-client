import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ServiceListHero } from "@/components/services/ServiceListHero";

describe("ServiceListHero", () => {
  const defaultProps = {
    title: "Infrastructure & Public Works",
    description:
      "Comprehensive public services and infrastructure management for the Alberta community.",
    icon: <div>mock-icon</div>,
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Infrastructure" },
    ],
  };

  it("renders the title", () => {
    render(<ServiceListHero {...defaultProps} />);
    expect(
      screen.getByRole("heading", { name: /Infrastructure & Public Works/i }),
    ).toBeInTheDocument();
  });

  it("renders the description", () => {
    render(<ServiceListHero {...defaultProps} />);
    expect(
      screen.getByText(/Comprehensive public services/i),
    ).toBeInTheDocument();
  });

  it("renders breadcrumb navigation", () => {
    render(<ServiceListHero {...defaultProps} />);
    expect(
      screen.getByRole("navigation", { name: /breadcrumb/i }),
    ).toBeInTheDocument();
  });

  it("renders breadcrumb links for non-terminal items", () => {
    render(<ServiceListHero {...defaultProps} />);
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Services" })).toBeInTheDocument();
  });

  it("marks the last breadcrumb as the current page", () => {
    render(<ServiceListHero {...defaultProps} />);
    const current = screen.getByText("Infrastructure");
    expect(current).toHaveAttribute("aria-current", "page");
  });

  it("does not render a link for the last breadcrumb", () => {
    render(<ServiceListHero {...defaultProps} />);
    const links = screen.getAllByRole("link");
    const linkLabels = links.map((l) => l.textContent);
    expect(linkLabels).not.toContain("Infrastructure");
  });
});
