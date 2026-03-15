import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Construction } from "lucide-react";
import ServiceCategoryCard from "@/components/services";

const defaultProps = {
  name: "Infrastructure",
  description: "Roads, utilities, and public works maintenance.",
  responseTime: "Response: 2-3 days",
  icon: Construction,
  iconBgClass: "bg-blue-100 dark:bg-blue-900/30",
  iconColorClass: "text-primary",
  services: [
    {
      name: "Road Repair Request",
      href: "/services/infrastructure/road-repair",
    },
    {
      name: "Snow Removal Status",
      href: "/services/infrastructure/snow-removal",
    },
  ],
  viewAllHref: "/services/infrastructure",
  viewAllLabel: "View all Infrastructure services",
};

describe("ServiceCategoryCard", () => {
  it("renders the category name", () => {
    render(<ServiceCategoryCard {...defaultProps} />);
    expect(
      screen.getByRole("heading", { name: /infrastructure/i }),
    ).toBeInTheDocument();
  });

  it("renders the response time badge", () => {
    render(<ServiceCategoryCard {...defaultProps} />);
    expect(screen.getByText("Response: 2-3 days")).toBeInTheDocument();
  });

  it("renders the description", () => {
    render(<ServiceCategoryCard {...defaultProps} />);
    expect(
      screen.getByText(/roads, utilities, and public works/i),
    ).toBeInTheDocument();
  });

  it("renders all service links", () => {
    render(<ServiceCategoryCard {...defaultProps} />);
    expect(
      screen.getByRole("link", { name: /road repair request/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /snow removal status/i }),
    ).toBeInTheDocument();
  });

  it("renders the view all link", () => {
    render(<ServiceCategoryCard {...defaultProps} />);
    const viewAllLink = screen.getByRole("link", {
      name: /view all infrastructure services/i,
    });
    expect(viewAllLink).toBeInTheDocument();
    expect(viewAllLink).toHaveAttribute("href", "/services/infrastructure");
  });
});
