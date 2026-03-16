import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ServiceBreadcrumb } from "@/components/services/ServiceBreadcrumb";

describe("ServiceBreadcrumb", () => {
  const items = [
    { label: "Services", href: "/services" },
    { label: "Infrastructure", href: "/services/infrastructure" },
    { label: "Pothole Repair" },
  ];

  it("renders all breadcrumb labels", () => {
    render(<ServiceBreadcrumb items={items} />);
    expect(screen.getByText("Services")).toBeInTheDocument();
    expect(screen.getByText("Infrastructure")).toBeInTheDocument();
    expect(screen.getByText("Pothole Repair")).toBeInTheDocument();
  });

  it("renders links for items with href", () => {
    render(<ServiceBreadcrumb items={items} />);
    const servicesLink = screen.getByRole("link", { name: "Services" });
    expect(servicesLink).toHaveAttribute("href", "/services");
    const infraLink = screen.getByRole("link", { name: "Infrastructure" });
    expect(infraLink).toHaveAttribute("href", "/services/infrastructure");
  });

  it("renders the last item as current page without link", () => {
    render(<ServiceBreadcrumb items={items} />);
    const current = screen.getByText("Pothole Repair");
    expect(current.tagName).not.toBe("A");
    expect(current).toHaveAttribute("aria-current", "page");
  });

  it("has accessible breadcrumb nav landmark", () => {
    render(<ServiceBreadcrumb items={items} />);
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
  });

  it("renders separators between items", () => {
    render(<ServiceBreadcrumb items={items} />);
    const separators = screen.getAllByText("/");
    expect(separators).toHaveLength(2);
  });
});
