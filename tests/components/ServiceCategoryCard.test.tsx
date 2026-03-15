import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Construction } from "lucide-react";
import { ServiceCategoryCard } from "@/components/services";

const defaultProps = {
  name: "Infrastructure",
  description: "Roads, utilities, and public works maintenance.",
  responseTime: "Response: 2-3 days",
  icon: Construction,
  iconBgClass: "bg-blue-100 dark:bg-blue-900/30",
  iconColorClass: "text-primary",
  services: [
    { name: "Road Repair Request" },
    { name: "Snow Removal Status" },
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

  it("renders all service items as plain text", () => {
    render(<ServiceCategoryCard {...defaultProps} />);
    expect(screen.getByText("Road Repair Request")).toBeInTheDocument();
    expect(screen.getByText("Snow Removal Status")).toBeInTheDocument();
  });

  it("renders no anchor elements for service items", () => {
    const { container } = render(<ServiceCategoryCard {...defaultProps} />);
    const serviceList = container.querySelector("ul");
    const anchors = serviceList?.querySelectorAll("a");
    expect(anchors?.length).toBe(0);
  });

  it("renders the view all link", () => {
    render(<ServiceCategoryCard {...defaultProps} />);
    const viewAllLink = screen.getByRole("link", {
      name: /view all infrastructure services/i,
    });
    expect(viewAllLink).toBeInTheDocument();
    expect(viewAllLink).toHaveAttribute("href", "/services/infrastructure");
  });

  it("renders without crashing when services is empty", () => {
    render(<ServiceCategoryCard {...defaultProps} services={[]} />);
    expect(
      screen.getByRole("heading", { name: /infrastructure/i }),
    ).toBeInTheDocument();
  });
});
