import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ServiceListTable } from "@/components/services/ServiceListTable";
import type { Service } from "@/app/types/service";

const mockServices: Service[] = [
  {
    id: "1",
    name: "Pothole Repair",
    description: "Report damage to road surfaces on city streets.",
    slug: "pothole-repair",
    instructions: "Take a photo of the pothole.",
    categoryId: "cat-1",
    departmentId: "dep-1",
    minResponseDays: 3,
    maxResponseDays: 5,
    isActive: true,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: "2",
    name: "Street Light Maintenance",
    description: "Report flickering or dark street lights.",
    slug: "street-light-maintenance",
    instructions: "Provide the pole number.",
    categoryId: "cat-1",
    departmentId: "dep-1",
    minResponseDays: 1,
    maxResponseDays: 5,
    isActive: true,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
];

describe("ServiceListTable", () => {
  it("renders all service names as paragraph elements (not headings)", () => {
    render(<ServiceListTable services={mockServices} />);
    expect(screen.getByText("Pothole Repair")).toBeInTheDocument();
    expect(screen.getByText("Street Light Maintenance")).toBeInTheDocument();
    // Service names must not be headings inside table cells (invalid HTML + heading level skip)
    expect(screen.queryByRole("heading", { name: "Pothole Repair" })).toBeNull();
  });

  it("renders service descriptions", () => {
    render(<ServiceListTable services={mockServices} />);
    expect(
      screen.getByText("Report damage to road surfaces on city streets."),
    ).toBeInTheDocument();
  });

  it("renders estimated resolution times", () => {
    render(<ServiceListTable services={mockServices} />);
    // Each resolution time appears twice: once inline (mobile) and once in the table column
    expect(screen.getAllByText("3–5 Business Days").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("1–5 Business Days").length).toBeGreaterThanOrEqual(1);
  });

  it("renders a single-day resolution as singular form", () => {
    const singleDay: Service[] = [
      { ...mockServices[0], minResponseDays: 1, maxResponseDays: 1 },
    ];
    render(<ServiceListTable services={singleDay} />);
    expect(screen.getAllByText("1 Business Day").length).toBeGreaterThanOrEqual(1);
  });

  it("renders Request Service links with unique accessible names per service", () => {
    render(<ServiceListTable services={mockServices} />);
    const link1 = screen.getByRole("link", {
      name: /Request service: Pothole Repair/i,
    });
    const link2 = screen.getByRole("link", {
      name: /Request service: Street Light Maintenance/i,
    });
    expect(link1).toHaveAttribute("href", "/services/pothole-repair");
    expect(link2).toHaveAttribute("href", "/services/street-light-maintenance");
  });

  it("renders resolution time inline inside the service cell for mobile accessibility", () => {
    render(<ServiceListTable services={[mockServices[0]]} />);
    // There should be two instances: one in the hidden column, one inline in the cell
    const times = screen.getAllByText("3–5 Business Days");
    expect(times.length).toBeGreaterThanOrEqual(1);
  });

  it("shows an empty-state message when services array is empty", () => {
    render(<ServiceListTable services={[]} />);
    expect(screen.getByText(/No services found/i)).toBeInTheDocument();
  });

  it("has accessible table column headers", () => {
    render(<ServiceListTable services={mockServices} />);
    expect(
      screen.getByRole("columnheader", { name: /Service Details/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: /Estimated Resolution/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: /Action/i }),
    ).toBeInTheDocument();
  });
});
