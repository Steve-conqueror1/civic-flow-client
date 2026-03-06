import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import DashboardMetricCard from "@/components/DashboardMetricCard";

describe("DashboardMetricCard", () => {
  const defaultProps = {
    label: "Active Requests",
    value: 2,
    icon: <span data-testid="metric-icon">icon</span>,
  };

  it("renders the label", () => {
    render(<DashboardMetricCard {...defaultProps} />);
    expect(screen.getByText("Active Requests")).toBeDefined();
  });

  it("renders the value", () => {
    render(<DashboardMetricCard {...defaultProps} />);
    expect(screen.getByText("2")).toBeDefined();
  });

  it("renders the icon", () => {
    render(<DashboardMetricCard {...defaultProps} />);
    expect(screen.getByTestId("metric-icon")).toBeDefined();
  });

  it("renders different values", () => {
    render(
      <DashboardMetricCard label="Resolved" value={5} icon={<span />} />
    );
    expect(screen.getByText("5")).toBeDefined();
    expect(screen.getByText("Resolved")).toBeDefined();
  });
});
