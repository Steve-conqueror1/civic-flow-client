import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ServiceCategoryCard from "@/components/ServiceCategoriesSection/ServiceCategoryCard";

describe("ServiceCategoryCard", () => {
  const defaultProps = {
    icon: <span data-testid="test-icon">icon</span>,
    label: "Roads & Traffic",
    href: "/services/roads-traffic",
  };

  it("renders the label", () => {
    render(<ServiceCategoryCard {...defaultProps} />);
    expect(screen.getByText("Roads & Traffic")).toBeDefined();
  });

  it("renders as a link with the correct href", () => {
    render(<ServiceCategoryCard {...defaultProps} />);
    const link = screen.getByRole("link", { name: /roads & traffic/i });
    expect(link).toBeDefined();
    expect(link.getAttribute("href")).toBe("/services/roads-traffic");
  });

  it("renders the icon slot", () => {
    render(<ServiceCategoryCard {...defaultProps} />);
    expect(screen.getByTestId("test-icon")).toBeDefined();
  });

  it("renders different content when given different props", () => {
    render(
      <ServiceCategoryCard
        icon={<span>icon</span>}
        label="Permits"
        href="/services/permits"
      />
    );
    expect(screen.getByRole("link", { name: /permits/i })).toBeDefined();
  });
});
